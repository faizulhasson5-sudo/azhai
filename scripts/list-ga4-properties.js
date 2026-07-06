const {google} = require('googleapis');
const path = require('path');

const keyFile = path.join(__dirname, '..', 'google-service-account.json');

const auth = new google.auth.GoogleAuth({
  keyFile,
  scopes: ['https://www.googleapis.com/auth/analytics.readonly']
});

async function listProperties() {
  try {
    const analyticsadmin = google.analyticsadmin({version: 'v1beta', auth});
    const res = await analyticsadmin.accountSummaries.list();
    const summaries = res.data.accountSummaries || [];
    for (const account of summaries) {
      console.log('Account:', account.displayName, '(' + account.account + ')');
      for (const prop of account.propertySummaries || []) {
        console.log('  Property:', prop.displayName, '-> ID:', prop.property, '(', prop.propertyType, ')');
      }
    }
  } catch(e) {
    console.log('Error:', e.message);
  }
}

listProperties();
