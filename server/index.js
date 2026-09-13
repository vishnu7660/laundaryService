// WhatsApp Cloud API server
// Run with WHATSAPP_TOKEN and WHATSAPP_PHONE_ID environment variables.

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());

function normalizePhoneNumber(value) {
  return String(value || '').replace(/[^\d]/g, '');
}

async function sendViaWhatsAppCloud(to, message) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_ID;
  const apiVersion = process.env.WHATSAPP_API_VERSION || 'v23.0';

  if (!token || !phoneId) {
    throw new Error('WhatsApp credentials are not configured on the server.');
  }

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
    throw new Error(apiError || 'WhatsApp Cloud API rejected the message.');
  }

  return result;
}

app.post('/send-whatsapp', async (req, res) => {
  try {
    const payload = req.body || {};
    const to = normalizePhoneNumber(payload.to);
    const message = String(payload.message || '').trim();

    if (!/^\d{10,15}$/.test(to) || !message) {
      return res.status(400).json({ ok: false, error: 'A valid phone number and message are required.' });
    }

    const result = await sendViaWhatsAppCloud(to, message);
    res.json({ ok: true, messageId: result.messages && result.messages[0] && result.messages[0].id });
  } catch (err) {
    console.error('Error in /send-whatsapp', err);
    res.status(502).json({ ok: false, error: err.message || 'Unable to send the WhatsApp message.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('WhatsApp Cloud API server listening on port', PORT);
});
