const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

async function redis(command, ...args) {
  const body = [command, ...args];
  const res = await fetch(UPSTASH_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.result;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  let body = '';
  for await (const chunk of req) body += chunk;

  let email;
  try { email = JSON.parse(body).email; } catch (e) { return res.status(400).json({ error: 'Invalid JSON' }); }

  if (!email || typeof email !== 'string') return res.status(400).json({ error: 'Email required' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Invalid email' });

  const normalized = email.toLowerCase().trim();
  try {
    const exists = await redis('SISMEMBER', 'getstarted:emails', normalized);
    if (exists === 1) return res.status(200).json({ message: 'Already registered!' });
    await redis('SADD', 'getstarted:emails', normalized);
    console.log('[GET STARTED]', normalized, new Date().toISOString());
    return res.status(200).json({ message: 'Done!' });
  } catch (e) {
    console.error('[REDIS ERROR]', e.message);
    return res.status(500).json({ error: 'Server error' });
  }
};
