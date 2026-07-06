const gsc = require('./gsc-report');
const ga4 = require('./ga4-report');

async function generateWeeklyReport() {
  console.log('\n' + '='.repeat(70));
  console.log('  WEEKLY SEO REPORT — azhai-six.vercel.app');
  console.log('  Generated: ' + new Date().toISOString().slice(0, 10));
  console.log('='.repeat(70));

  // GA4 Overview
  console.log('\n📊 GA4 ANALYTICS (Last 7 days)');
  console.log('─'.repeat(50));
  const ga = await ga4.getActiveUsers(7);
  console.log('  Active Users:   ' + ga.activeUsers);
  console.log('  Sessions:       ' + ga.sessions);
  console.log('  Pageviews:      ' + ga.pageviews);

  // Top Pages
  console.log('\n📄 TOP PAGES');
  console.log('─'.repeat(50));
  const pages = await ga4.getTopPages(7, 10);
  pages.forEach((p, i) => {
    console.log('  ' + (i+1) + '. ' + p.page.replace('https://azhai-six.vercel.app', ''));
    console.log('     Views: ' + p.views + ' | Bounce: ' + p.bounceRate);
  });

  // Traffic Sources
  console.log('\n🔗 TRAFFIC SOURCES');
  console.log('─'.repeat(50));
  const sources = await ga4.getTopSources(7, 5);
  sources.forEach((s, i) => {
    console.log('  ' + (i+1) + '. ' + s.source + ' — ' + s.sessions + ' sessions');
  });

  // Devices
  console.log('\n📱 DEVICES');
  console.log('─'.repeat(50));
  const devices = await ga4.getDeviceBreakdown(7);
  devices.forEach(d => {
    console.log('  ' + d.device + ': ' + d.sessions + ' sessions');
  });

  // Top Countries
  console.log('\n🌍 TOP COUNTRIES');
  console.log('─'.repeat(50));
  const countries = await ga4.getCountryBreakdown(7, 5);
  countries.forEach((c, i) => {
    console.log('  ' + (i+1) + '. ' + c.country + ': ' + c.sessions + ' sessions');
  });

  // Events
  console.log('\n⚡ EVENTS');
  console.log('─'.repeat(50));
  const events = await ga4.getEventBreakdown(7);
  events.forEach((e, i) => {
    console.log('  ' + (i+1) + '. ' + e.event + ': ' + e.count);
  });

  // GSC Search Performance
  console.log('\n🔍 SEARCH CONSOLE (Last 28 days)');
  console.log('─'.repeat(50));
  try {
    const queries = await gsc.getTopQueries(28, 10);
    console.log('  Top Queries:');
    queries.forEach((q, i) => {
      console.log('  ' + (i+1) + '. "' + q.query + '"');
      console.log('     Clicks: ' + q.clicks + ' | Impressions: ' + q.impressions + ' | CTR: ' + q.ctr + ' | Pos: ' + q.position);
    });
  } catch(e) {
    console.log('  (GSC data unavailable: ' + e.message + ')');
  }

  // Top Pages from GSC
  try {
    const topPages = await gsc.getTopPages(28, 5);
    console.log('\n  Top Pages by Clicks:');
    topPages.forEach((p, i) => {
      console.log('  ' + (i+1) + '. ' + p.page.replace('https://azhai-six.vercel.app', '/'));
      console.log('     Clicks: ' + p.clicks + ' | Impressions: ' + p.impressions + ' | CTR: ' + p.ctr);
    });
  } catch(e) {}

  console.log('\n' + '='.repeat(70));
  console.log('  Report complete. Run: node scripts/weekly-report.js');
  console.log('='.repeat(70) + '\n');
}

if (require.main === module) {
  generateWeeklyReport().catch(e => console.error('Error:', e.message));
}

module.exports = {generateWeeklyReport};
