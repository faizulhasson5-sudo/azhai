module.exports = {
  // Google Service Account
  serviceAccountKey: require('../google-service-account.json'),
  
  // Site
  siteUrl: 'https://azhai-six.vercel.app/',
  
  // GA4 Property
  ga4PropertyId: '543379329',
  
  // GTM Container
  gtmContainerId: 'GTM-KDTPKT4T',
  
  // GA4 Measurement
  ga4MeasurementId: 'G-XDHMXW7PR2',
  
  // Paths
  sitemapPath: require('path').join(__dirname, '..', 'public', 'sitemap.xml'),
  robotsPath: require('path').join(__dirname, '..', 'public', 'robots.txt'),
  
  // API Scopes
  scopes: {
    searchConsole: 'https://www.googleapis.com/auth/webmasters',
    gtm: 'https://www.googleapis.com/auth/tagmanager.edit.containers',
    ga4: 'https://www.googleapis.com/auth/analytics.readonly'
  }
};
