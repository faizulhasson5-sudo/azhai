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

  try {
    const raw = await redis('HGETALL', 'getstarted:users');
    const entries = [];
    if (raw && typeof raw === 'object') {
      const keys = Object.keys(raw);
      for (let i = 0; i < keys.length; i++) {
        entries.push({ email: keys[i], username: raw[keys[i]] || '' });
      }
    }
    return res.status(200).json({ total: entries.length, emails: entries });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
