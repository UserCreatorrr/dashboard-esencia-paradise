const N8N_WEBHOOK = 'https://esencia-paradise-n8n.rh6pum.easypanel.host/webhook-test/a0b1ee9c-2f74-49bf-b203-3df04ab3aeda';

module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    try {
        const data = req.body;
        const params = new URLSearchParams();
        if (data) {
            for (const [key, value] of Object.entries(data)) {
                params.append(key, String(value));
            }
        }
        const url = `${N8N_WEBHOOK}?${params.toString()}`;
        const response = await fetch(url);
        const json = await response.json();
        res.status(response.status).json(json);
    } catch (error) {
        console.error('Proxy Error:', error);
        res.status(500).json({ error: 'Error de conexión con el backend' });
    }
};
