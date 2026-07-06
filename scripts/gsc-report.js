const {google} = require('googleapis');
const config = require('./google-config');

const auth = new google.auth.GoogleAuth({
  keyFile: require('path').join(__dirname, '..', 'google-service-account.json'),
  scopes: [config.scopes.searchConsole]
});

const searchconsole = google.searchconsole({version: 'v1', auth});

async function getSearchAnalytics(options = {}) {
  const {
    days = 28,
    dimensions = ['query'],
    rowLimit = 100,
    startRow = 0,
    dimensionFilter = null
  } = options;

  const endDate = new Date();
  endDate.setDate(endDate.getDate() - 3); // GSC has 3-day delay
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - days);

  const iso = (d) => d.toISOString().slice(0, 10);

  const requestBody = {
    startDate: iso(startDate),
    endDate: iso(endDate),
    dimensions,
    rowLimit,
    startRow
  };

  if (dimensionFilter) {
    requestBody.dimensionFilter = dimensionFilter;
  }

  const res = await searchconsole.searchanalytics.query({
    siteUrl: config.siteUrl,
    requestBody
  });

  return {
    rows: res.data.rows || [],
    totalRows: res.data.rowsAvailable || 0,
    dateRange: { start: iso(startDate), end: iso(endDate) }
  };
}

async function getTopQueries(days = 28, limit = 20) {
  const data = await getSearchAnalytics({ days, dimensions: ['query'], rowLimit: limit });
  return data.rows.map(row => ({
    query: row.keys[0],
    clicks: row.clicks,
    impressions: row.impressions,
    ctr: (row.ctr * 100).toFixed(2) + '%',
    position: row.position.toFixed(1)
  }));
}

async function getTopPages(days = 28, limit = 20) {
  const data = await getSearchAnalytics({ days, dimensions: ['page'], rowLimit: limit });
  return data.rows.map(row => ({
    page: row.keys[0],
    clicks: row.clicks,
    impressions: row.impressions,
    ctr: (row.ctr * 100).toFixed(2) + '%',
    position: row.position.toFixed(1)
  }));
}

async function getQueryByPage(pageUrl, days = 28, limit = 50) {
  const data = await getSearchAnalytics({
    days,
    dimensions: ['query'],
    rowLimit: limit,
    dimensionFilter: {
      dimension: 'page',
      expression: pageUrl
    }
  });
  return data.rows.map(row => ({
    query: row.keys[0],
    clicks: row.clicks,
    impressions: row.impressions,
    ctr: (row.ctr * 100).toFixed(2) + '%',
    position: row.position.toFixed(1)
  }));
}

async function submitSitemap(sitemapUrl) {
  try {
    await searchconsole.sitemaps.submit({
      siteUrl: config.siteUrl,
      feedpath: sitemapUrl
    });
    return { success: true, message: 'Sitemap submitted: ' + sitemapUrl };
  } catch(e) {
    return { success: false, message: e.message };
  }
}

async function listSitemaps() {
  try {
    const res = await searchconsole.sitemaps.list({ siteUrl: config.siteUrl });
    return res.data.sitemap || [];
  } catch(e) {
    return [];
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const cmd = args[0];

  (async () => {
    try {
      switch(cmd) {
        case 'queries':
          const queries = await getTopQueries(parseInt(args[1]) || 28, parseInt(args[2]) || 20);
          console.log('\nTop Queries (' + (args[1] || 28) + ' days):');
          console.log('─'.repeat(80));
          queries.forEach((q, i) => {
            console.log((i+1) + '. ' + q.query);
            console.log('   Clicks: ' + q.clicks + ' | Impressions: ' + q.impressions + ' | CTR: ' + q.ctr + ' | Position: ' + q.position);
          });
          break;

        case 'pages':
          const pages = await getTopPages(parseInt(args[1]) || 28, parseInt(args[2]) || 20);
          console.log('\nTop Pages (' + (args[1] || 28) + ' days):');
          console.log('─'.repeat(80));
          pages.forEach((p, i) => {
            console.log((i+1) + '. ' + p.page.replace(config.siteUrl, '/'));
            console.log('   Clicks: ' + p.clicks + ' | Impressions: ' + p.impressions + ' | CTR: ' + p.ctr + ' | Position: ' + p.position);
          });
          break;

        case 'page-queries':
          if (!args[1]) { console.log('Usage: node gsc-report.js page-queries <url>'); break; }
          const pageQ = await getQueryByPage(args[1], parseInt(args[2]) || 28);
          console.log('\nQueries for: ' + args[1]);
          console.log('─'.repeat(80));
          pageQ.forEach((q, i) => {
            console.log((i+1) + '. ' + q.query);
            console.log('   Clicks: ' + q.clicks + ' | Impressions: ' + q.impressions + ' | CTR: ' + q.ctr + ' | Position: ' + q.position);
          });
          break;

        case 'submit-sitemap':
          const result = await submitSitemap(args[1] || config.siteUrl + 'sitemap.xml');
          console.log(result.message);
          break;

        case 'sitemaps':
          const sitemaps = await listSitemaps();
          console.log('\nRegistered Sitemaps:');
          sitemaps.forEach(s => console.log(' -', s.path, '(' + (s.contents?.length || 0) + ' URLs)'));
          break;

        default:
          console.log('\nGSC Report Tool');
          console.log('Usage:');
          console.log('  node gsc-report.js queries [days] [limit]     - Top search queries');
          console.log('  node gsc-report.js pages [days] [limit]       - Top performing pages');
          console.log('  node gsc-report.js page-queries <url> [days]  - Queries for a specific page');
          console.log('  node gsc-report.js submit-sitemap [url]       - Submit sitemap to Google');
          console.log('  node gsc-report.js sitemaps                   - List registered sitemaps');
      }
    } catch(e) {
      console.error('Error:', e.message);
    }
  })();
}

module.exports = { getSearchAnalytics, getTopQueries, getTopPages, getQueryByPage, submitSitemap, listSitemaps };
