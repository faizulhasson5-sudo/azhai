const {google} = require('googleapis');
const path = require('path');

const keyFile = path.join(__dirname, '..', 'google-service-account.json');
const keys = require(keyFile);

const auth = new google.auth.GoogleAuth({
  keyFile,
  scopes: [
    'https://www.googleapis.com/auth/webmasters.readonly',
    'https://www.googleapis.com/auth/tagmanager.readonly',
    'https://www.googleapis.com/auth/analytics.readonly'
  ]
});

async function testGSC() {
  try {
    const searchconsole = google.searchconsole({version: 'v1', auth});
    const res = await searchconsole.sites.list();
    const sites = res.data.siteEntry || [];
    console.log('GSC: OK - Properties found:', sites.map(s => s.siteUrl).join(', '));
    return true;
  } catch(e) {
    console.log('GSC: FAILED -', e.message);
    return false;
  }
}

async function testGTM() {
  try {
    const tagmanager = google.tagmanager({version: 'v2', auth});
    const res = await tagmanager.accounts.list();
    const accounts = res.data.account || [];
    console.log('GTM: OK - Accounts found:', accounts.map(a => a.name).join(', '));
    return true;
  } catch(e) {
    console.log('GTM: FAILED -', e.message);
    return false;
  }
}

async function testGA4() {
  try {
    const {BetaAnalyticsDataClient} = require('@google-analytics/data');
    const client = new BetaAnalyticsDataClient({keyFile});
    const [response] = await client.runReport({
      property: 'properties/543379329',
      dateRanges: [{startDate: '7daysAgo', endDate: 'today'}],
      metrics: [{name: 'activeUsers'}]
    });
    console.log('GA4: OK - Active users (7 days):', response.rows?.[0]?.metricValues?.[0]?.value || 0);
    return true;
  } catch(e) {
    console.log('GA4: FAILED -', e.message);
    return false;
  }
}

(async () => {
  console.log('Testing Google API connections...\n');
  const gsc = await testGSC();
  const gtm = await testGTM();
  const ga4 = await testGA4();
  console.log('\nSummary:', gsc && gtm && ga4 ? 'ALL SERVICES CONNECTED' : 'Some services failed');
})();
