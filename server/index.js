// Simple server stub for sending WhatsApp messages
// Usage: set up Node.js, install dependencies: express, cors, body-parser, axios (optional)
// Run: node index.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// POST /send-whatsapp
// Expects JSON { to: '637615786', message: '...', booking: {...} }
// This stub logs the message to server.log and returns success.
// To integrate with WhatsApp Business Cloud API or Twilio, replace the sendMessage implementation below.

app.post('/send-whatsapp', async (req, res) => {
  try {
    const payload = req.body || {};
    const log = {
      time: new Date().toISOString(),
      payload
    };
    const logLine = JSON.stringify(log) + '\n';
    fs.appendFileSync(path.join(__dirname, 'server.log'), logLine);

    // TODO: integrate real WhatsApp API here. Example (pseudo):
    // await sendViaWhatsAppCloud(payload.to, payload.message);

    res.json({ ok: true });
  } catch (err) {
    console.error('Error in /send-whatsapp', err);
    res.status(500).json({ ok: false, error: String(err) });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Send-whatsapp stub listening on port', PORT);
});
