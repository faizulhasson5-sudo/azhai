const {BetaAnalyticsDataClient} = require('@google-analytics/data');
const config = require('./google-config');

const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFile: require('path').join(__dirname, '..', 'google-service-account.json')
});

const property = 'properties/' + config.ga4PropertyId;

async function getActiveUsers(days = 7) {
  const [response] = await analyticsDataClient.runReport({
    property,
    dateRanges: [{startDate: `${days}daysAgo`, endDate: 'today'}],
    metrics: [{name: 'activeUsers'}, {name: 'sessions'}, {name: 'screenPageViews'}]
  });
  const row = response.rows?.[0];
  return {
    activeUsers: parseInt(row?.metricValues?.[0]?.value || 0),
    sessions: parseInt(row?.metricValues?.[1]?.value || 0),
    pageviews: parseInt(row?.metricValues?.[2]?.value || 0)
  };
}

async function getTopPages(days = 7, limit = 20) {
  const [response] = await analyticsDataClient.runReport({
    property,
    dateRanges: [{startDate: `${days}daysAgo`, endDate: 'today'}],
    dimensions: [{name: 'pagePath'}],
    metrics: [{name: 'screenPageViews'}, {name: 'averageSessionDuration'}, {name: 'bounceRate'}],
    orderBys: [{metric: {metricName: 'screenPageViews'}, desc: true}],
    limit
  });
  return (response.rows || []).map(row => ({
    page: row.dimensionValues[0].value,
    views: parseInt(row.metricValues[0].value),
    avgDuration: parseFloat(row.metricValues[1].value).toFixed(1) + 's',
    bounceRate: (parseFloat(row.metricValues[2].value) * 100).toFixed(1) + '%'
  }));
}

async function getTopSources(days = 7, limit = 15) {
  const [response] = await analyticsDataClient.runReport({
    property,
    dateRanges: [{startDate: `${days}daysAgo`, endDate: 'today'}],
    dimensions: [{name: 'sessionSource'}],
    metrics: [{name: 'sessions'}, {name: 'activeUsers'}],
    orderBys: [{metric: {metricName: 'sessions'}, desc: true}],
    limit
  });
  return (response.rows || []).map(row => ({
    source: row.dimensionValues[0].value,
    sessions: parseInt(row.metricValues[0].value),
    users: parseInt(row.metricValues[1].value)
  }));
}

async function getDeviceBreakdown(days = 7) {
  const [response] = await analyticsDataClient.runReport({
    property,
    dateRanges: [{startDate: `${days}daysAgo`, endDate: 'today'}],
    dimensions: [{name: 'deviceCategory'}],
    metrics: [{name: 'sessions'}, {name: 'activeUsers'}]
  });
  return (response.rows || []).map(row => ({
    device: row.dimensionValues[0].value,
    sessions: parseInt(row.metricValues[0].value),
    users: parseInt(row.metricValues[1].value)
  }));
}

async function getCountryBreakdown(days = 7, limit = 10) {
  const [response] = await analyticsDataClient.runReport({
    property,
    dateRanges: [{startDate: `${days}daysAgo`, endDate: 'today'}],
    dimensions: [{name: 'country'}],
    metrics: [{name: 'sessions'}, {name: 'activeUsers'}],
    orderBys: [{metric: {metricName: 'sessions'}, desc: true}],
    limit
  });
  return (response.rows || []).map(row => ({
    country: row.dimensionValues[0].value,
    sessions: parseInt(row.metricValues[0].value),
    users: parseInt(row.metricValues[1].value)
  }));
}

async function getEventBreakdown(days = 7) {
  const [response] = await analyticsDataClient.runReport({
    property,
    dateRanges: [{startDate: `${days}daysAgo`, endDate: 'today'}],
    dimensions: [{name: 'eventName'}],
    metrics: [{name: 'eventCount'}],
    orderBys: [{metric: {metricName: 'eventCount'}, desc: true}],
    limit: 15
  });
  return (response.rows || []).map(row => ({
    event: row.dimensionValues[0].value,
    count: parseInt(row.metricValues[0].value)
  }));
}

async function getRealtimeUsers() {
  const [response] = await analyticsDataClient.runRealtimeReport({
    property,
    dimensions: [{name: 'pagePath'}],
    metrics: [{name: 'activeUsers'}],
    limit: 10
  });
  return (response.rows || []).map(row => ({
    page: row.dimensionValues[0].value,
    users: parseInt(row.metricValues[0].value)
  }));
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const cmd = args[0];

  (async () => {
    try {
      switch(cmd) {
        case 'overview':
          const days = parseInt(args[1]) || 7;
          const overview = await getActiveUsers(days);
          console.log('\nGA4 Overview (' + days + ' days):');
          console.log('─'.repeat(40));
          console.log('Active Users: ' + overview.activeUsers);
          console.log('Sessions:     ' + overview.sessions);
          console.log('Pageviews:    ' + overview.pageviews);
          break;

        case 'pages':
          const pages = await getTopPages(parseInt(args[1]) || 7, parseInt(args[2]) || 20);
          console.log('\nTop Pages (' + (args[1] || 7) + ' days):');
          console.log('─'.repeat(80));
          pages.forEach((p, i) => {
            console.log((i+1) + '. ' + p.page);
            console.log('   Views: ' + p.views + ' | Avg Duration: ' + p.avgDuration + ' | Bounce: ' + p.bounceRate);
          });
          break;

        case 'sources':
          const sources = await getTopSources(parseInt(args[1]) || 7);
          console.log('\nTraffic Sources (' + (args[1] || 7) + ' days):');
          console.log('─'.repeat(60));
          sources.forEach((s, i) => {
            console.log((i+1) + '. ' + s.source + ' - Sessions: ' + s.sessions + ', Users: ' + s.users);
          });
          break;

        case 'devices':
          const devices = await getDeviceBreakdown(parseInt(args[1]) || 7);
          console.log('\nDevice Breakdown (' + (args[1] || 7) + ' days):');
          console.log('─'.repeat(40));
          devices.forEach(d => {
            console.log(d.device + ': ' + d.sessions + ' sessions, ' + d.users + ' users');
          });
          break;

        case 'countries':
          const countries = await getCountryBreakdown(parseInt(args[1]) || 7);
          console.log('\nTop Countries (' + (args[1] || 7) + ' days):');
          console.log('─'.repeat(40));
          countries.forEach((c, i) => {
            console.log((i+1) + '. ' + c.country + ': ' + c.sessions + ' sessions');
          });
          break;

        case 'events':
          const events = await getEventBreakdown(parseInt(args[1]) || 7);
          console.log('\nTop Events (' + (args[1] || 7) + ' days):');
          console.log('─'.repeat(40));
          events.forEach((e, i) => {
            console.log((i+1) + '. ' + e.event + ': ' + e.count);
          });
          break;

        case 'realtime':
          const realtime = await getRealtimeUsers();
          console.log('\nRealtime Users (right now):');
          console.log('─'.repeat(40));
          if (realtime.length === 0) console.log('No active users');
          else realtime.forEach(r => console.log(r.page + ': ' + r.users + ' users'));
          break;

        default:
          console.log('\nGA4 Report Tool');
          console.log('Usage:');
          console.log('  node ga4-report.js overview [days]          - Quick overview');
          console.log('  node ga4-report.js pages [days] [limit]     - Top pages');
          console.log('  node ga4-report.js sources [days]           - Traffic sources');
          console.log('  node ga4-report.js devices [days]           - Device breakdown');
          console.log('  node ga4-report.js countries [days]         - Top countries');
          console.log('  node ga4-report.js events [days]            - Event breakdown');
          console.log('  node ga4-report.js realtime                 - Live users');
      }
    } catch(e) {
      console.error('Error:', e.message);
    }
  })();
}

module.exports = { getActiveUsers, getTopPages, getTopSources, getDeviceBreakdown, getCountryBreakdown, getEventBreakdown, getRealtimeUsers };
