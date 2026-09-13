function normalizePhoneNumber(value) {
  return String(value || '').replace(/[^\d]/g, '');
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed.' });
  }

  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_ID;
  const apiVersion = process.env.WHATSAPP_API_VERSION || 'v23.0';
  const payload = req.body || {};
  const to = normalizePhoneNumber(payload.to);
  const message = String(payload.message || '').trim();

  if (!token || !phoneId) {
    return res.status(500).json({ ok: false, error: 'WhatsApp credentials are not configured on Vercel.' });
  }

  if (!/^\d{10,15}$/.test(to) || !message) {
    return res.status(400).json({ ok: false, error: 'A valid phone number and message are required.' });
  }

  try {
    const response = await fetch(`https://graph.facebook.com/${apiVersion}/${phoneId}/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to,
        type: 'text',
        text: { preview_url: false, body: message }
      })
    });

    const result = await response.json();
    if (!response.ok) {
      const apiError = result.error && result.error.message;
      return res.status(502).json({ ok: false, error: apiError || 'WhatsApp Cloud API rejected the message.' });
    }

    return res.status(200).json({
      ok: true,
      messageId: result.messages && result.messages[0] && result.messages[0].id
    });
  } catch (error) {
    console.error('WhatsApp Cloud API error:', error);
    return res.status(502).json({ ok: false, error: 'Unable to reach WhatsApp Cloud API.' });
  }
};