const N8N_WEBHOOK = 'https://esencia-paradise-n8n.rh6pum.easypanel.host/webhook/40fcebd1-0668-43b0-a611-cb61023024a8';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { Email, Codigo } = req.body;
    const response = await fetch(N8N_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Email, Codigo }),
    });
    const text = await response.text();
    if (!text || text.trim() === '') return res.status(404).json([]);
    try {
      res.status(response.status).json(JSON.parse(text));
    } catch {
      res.status(404).json([]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error de conexión con el backend' });
  }
};
