const N8N_WEBHOOK = 'https://esencia-paradise-n8n.rh6pum.easypanel.host/webhook/40fcebd1-0668-43b0-a611-cb61023024a8';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch {} }

  let n8nStatus = null;
  let n8nRaw = null;
  let n8nError = null;

  try {
    const response = await fetch(N8N_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Email: body?.Email, Codigo: body?.Codigo }),
    });
    n8nStatus = response.status;
    n8nRaw = await response.text();
  } catch (e) {
    n8nError = String(e);
  }

  res.status(200).json({
    received_body: body,
    n8n_status: n8nStatus,
    n8n_raw: n8nRaw,
    n8n_error: n8nError,
  });
};
