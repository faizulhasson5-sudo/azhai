const {google} = require('googleapis');
const path = require('path');
const config = require('./scripts/google-config');
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, 'google-service-account.json'),
  scopes: [config.scopes.searchConsole]
});
const searchconsole = google.searchconsole({version: 'v1', auth});

(async () => {
  try {
    const res = await searchconsole.searchanalytics.query({
      siteUrl: config.siteUrl,
      requestBody: {
        startDate: '2026-07-14', endDate: '2026-07-20',
        dimensions: ['query'],
        dimensionFilter: { dimension: 'page', expression: 'https://azhai-six.vercel.app/blog/what-is-keyword-density.html' },
        rowLimit: 15
      }
    });
    console.log('=== QUERIES for /blog/what-is-keyword-density.html (Jul 14-20) ===');
    (res.data.rows||[]).forEach((r,i) => {
      console.log((i+1)+'. '+r.keys[0]+' | Clicks: '+r.clicks+' | Impressions: '+r.impressions+' | CTR: '+(r.ctr*100).toFixed(1)+'% | Pos: '+r.position.toFixed(1));
    });

    const res2 = await searchconsole.searchanalytics.query({
      siteUrl: config.siteUrl,
      requestBody: {
        startDate: '2026-07-14', endDate: '2026-07-20',
        dimensions: ['page'],
        rowLimit: 10
      }
    });
    console.log('\n=== TOP 10 PAGES (Jul 14-20) ===');
    (res2.data.rows||[]).forEach((r,i) => {
      console.log((i+1)+'. '+r.keys[0].replace('https://azhai-six.vercel.app','')+' | Clicks: '+r.clicks+' | Impressions: '+r.impressions+' | Pos: '+r.position.toFixed(1));
    });
  } catch(e) {
    console.error('Error:', e.message);
  }
  process.exit(0);
})();
