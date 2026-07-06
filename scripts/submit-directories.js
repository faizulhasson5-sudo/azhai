const https = require('https');

const tool = {
  name: 'Free AI Text Tools',
  url: 'https://azhai-six.vercel.app',
  description: '43 free browser-based tools for text processing, SEO, and developer utilities. No sign-up, no data collection.',
  email: 'contact@azhai-six.vercel.app'
};

const directories = [
  {
    name: 'MadeWithStack',
    method: 'POST',
    url: 'https://www.madewithstack.com/api/v1/submit',
    body: JSON.stringify({
      name: tool.name,
      url: tool.url,
      description: tool.description,
      email: tool.email,
      custom_tools: ['Word Counter', 'Keyword Density Checker', 'Meta Tag Generator', 'JSON Formatter', 'Schema Generator']
    })
  },
  {
    name: 'Polsia AI Directory',
    method: 'POST',
    url: 'https://humanizeros-2.polsia.app/api/directory/submit',
    body: JSON.stringify({
      name: tool.name,
      url: tool.url,
      contact_email: tool.email,
      description: tool.description,
      category: 'AI Dev Tools',
      owner_referred: true
    })
  },
  {
    name: 'ToolFul.ai',
    method: 'POST',
    url: 'https://toolful.ai/api/submit',
    body: JSON.stringify({
      name: tool.name,
      url: tool.url,
      description: tool.description,
      category: 'SEO'
    })
  },
  {
    name: 'AIDir.dev',
    method: 'POST',
    url: 'https://aidir.dev/api/submit',
    body: JSON.stringify({
      name: tool.name,
      url: tool.url,
      description: tool.description
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
      res.on('end', () => resolve({ name: dir.name, status: res.statusCode, data: data.substring(0, 200) }));
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
    const icon = r.status === 200 || r.status === 201 ? '✓' : '✗';
    console.log(`${icon} ${dir.name} (${r.status})`);
    if (r.status !== 200 && r.status !== 201) console.log(`  ${r.data.substring(0, 100)}`);
  }
})();
