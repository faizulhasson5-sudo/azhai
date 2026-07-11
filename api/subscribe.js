module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body = '';
  for await (const chunk of req) body += chunk;

  let email;
  try {
    const parsed = JSON.parse(body);
    email = parsed.email;
  } catch (e) {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email is required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  const normalizedEmail = email.toLowerCase().trim();

  console.log('[NEW SUBSCRIBER]', normalizedEmail, new Date().toISOString());

  return res.status(200).json({ message: 'Subscribed successfully!' });
};
