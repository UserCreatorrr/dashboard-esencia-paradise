const N8N_WEBHOOK = 'https://esencia-paradise-n8n.rh6pum.easypanel.host/webhook-test/a0b1ee9c-2f74-49bf-b203-3df04ab3aeda';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    let data = req.body;
    if (typeof data === 'string') { try { data = JSON.parse(data); } catch {} }
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(data || {})) params.append(key, String(value));
    const response = await fetch(`${N8N_WEBHOOK}?${params}`);
    const text = await response.text();
    if (!text || text.trim() === '') return res.status(200).json({ ok: true });
    try {
      res.status(response.status).json(JSON.parse(text));
    } catch {
      res.status(200).json({ ok: true });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error de conexión con el backend' });
  }
};
