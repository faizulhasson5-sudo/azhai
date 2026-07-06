const {google} = require('googleapis');
const path = require('path');

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, '..', 'google-service-account.json'),
  scopes: ['https://www.googleapis.com/auth/indexing']
});

const indexing = google.indexing({version: 'v3', auth});

const urls = [
  'https://azhai-six.vercel.app/',
  'https://azhai-six.vercel.app/tools/',
  'https://azhai-six.vercel.app/tools/word-counter.html',
  'https://azhai-six.vercel.app/tools/case-converter.html',
  'https://azhai-six.vercel.app/tools/json-formatter.html',
  'https://azhai-six.vercel.app/tools/robots-txt.html',
  'https://azhai-six.vercel.app/tools/meta-gen.html',
  'https://azhai-six.vercel.app/tools/keyword-density.html',
  'https://azhai-six.vercel.app/tools/slug-generator.html',
  'https://azhai-six.vercel.app/tools/sitemap-gen.html',
  'https://azhai-six.vercel.app/tools/duplicate-remover.html',
  'https://azhai-six.vercel.app/tools/url-encoder.html',
  'https://azhai-six.vercel.app/tools/html-decoder.html',
  'https://azhai-six.vercel.app/tools/text-reverser.html',
  'https://azhai-six.vercel.app/tools/char-counter.html',
  'https://azhai-six.vercel.app/tools/canonical-gen.html',
  'https://azhai-six.vercel.app/tools/markdown-editor.html',
  'https://azhai-six.vercel.app/tools/schema-gen.html',
  'https://azhai-six.vercel.app/tools/faq-schema-gen.html',
  'https://azhai-six.vercel.app/tools/keyword-extract.html'
];

async function requestIndexing(url) {
  try {
    const res = await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: 'URL_UPDATED'
      }
    });
    return { url, success: true, notificationType: res.data.type };
  } catch (e) {
    return { url, success: false, error: e.message };
  }
}

async function main() {
  console.log('Requesting indexing for', urls.length, 'URLs...\n');
  
  for (let i = 0; i < urls.length; i++) {
    const result = await requestIndexing(urls[i]);
    if (result.success) {
      console.log((i+1) + '. [OK] ' + result.url);
    } else {
      console.log((i+1) + '. [FAIL] ' + result.url + ' - ' + result.error);
    }
    // Small delay between requests
    if (i < urls.length - 1) {
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  
  console.log('\nDone!');
}

main().catch(e => console.error('Fatal error:', e.message));
