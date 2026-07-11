const https = require('https');

const tool = {
  name: 'KwordSEO',
  url: 'https://azhai-six.vercel.app',
  description: '43 free browser-based tools for text processing, SEO, and developer utilities. No sign-up, no data collection.',
  email: 'contact@azhai-six.vercel.app'
};

const directories = [
  {
    name: 'Directory Index',
    method: 'POST',
    url: 'https://directory-index.com/api/submit',
    body: JSON.stringify({
      url: tool.url,
      name: tool.name,
      description: tool.description,
      email: tool.email,
      category: 'Technology & Software'
    })
  },
  {
    name: 'Zearches',
    method: 'POST',
    url: 'https://zearches.com/api/submit',
    body: JSON.stringify({
      url: tool.url,
      title: tool.name,
      description: tool.description,
      category: 'software-saas'
    })
  }
];

async function submit(dir) {
  return new Promise((resolve) => {
    const urlObj = new URL(dir.url);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname,
      method: dir.method,
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(dir.body) }
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (c) => data += c);
      res.on('end', () => resolve({ name: dir.name, status: res.statusCode, data: data.substring(0, 300) }));
    });
    req.on('error', (e) => resolve({ name: dir.name, status: 'error', data: e.message }));
    req.write(dir.body);
    req.end();
  });
}

(async () => {
  console.log('Submitting to', directories.length, 'directories...\n');
  for (const dir of directories) {
    const r = await submit(dir);
    const icon = r.status >= 200 && r.status < 300 ? '✓' : '✗';
    console.log(`${icon} ${dir.name} (${r.status})`);
    console.log(`  ${r.data.substring(0, 150)}\n`);
  }
})();
