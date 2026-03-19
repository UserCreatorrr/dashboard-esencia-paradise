const N8N_WEBHOOK = 'https://esencia-paradise-n8n.rh6pum.easypanel.host/webhook/40fcebd1-0668-43b0-a611-cb61023024a8';

module.exports = async function handler(req, res) {
    // CORS configuration
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const data = req.body;

        // Best practice: Convert POST data to GET query parameters for n8n compatibility
        const params = new URLSearchParams();
        if (data) {
            for (const [key, value] of Object.entries(data)) {
                params.append(key, String(value));
            }
        }

        const url = `${N8N_WEBHOOK}?${params.toString()}`;

        // Fetch data from n8n
        const response = await fetch(url);
        const result = await response.json();

        // Return the response from n8n to the frontend
        res.status(response.status).json(result);

    } catch (error) {
        console.error('Proxy Error:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};
