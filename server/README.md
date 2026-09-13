Local server for sending WhatsApp Cloud API messages

This project includes an Express server at `server/index.js` that accepts booking messages at `/send-whatsapp` and sends them through the WhatsApp Cloud API. The browser never receives the access token.

Install and run (Node.js required):

```bash
cd server
npm init -y
npm install express cors body-parser
node index.js
```

By default the server listens on port 3000. If your static site is served from XAMPP on port 80, you'll need to run the server and ensure requests from your page reach `http://localhost:3000/send-whatsapp`. You may need to adjust the `fetch` URL in `pages/contact.html` to `http://localhost:3000/send-whatsapp` when testing.

For Vercel, the project includes `api/send-whatsapp.js`. The contact form calls `/api/send-whatsapp`, so it uses the same production domain and does not call localhost. Add `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_ID`, and optionally `WHATSAPP_API_VERSION` under Vercel Project Settings > Environment Variables, then redeploy.

Before starting the server, set these environment variables in the server process:

```text
WHATSAPP_TOKEN=your_rotated_access_token
WHATSAPP_PHONE_ID=your_phone_number_id
WHATSAPP_API_VERSION=v23.0
```

The current implementation sends a text message to the phone number submitted in the form. For a business-initiated message outside WhatsApp's 24-hour customer service window, Meta requires an approved message template instead of free-form text. Never commit the real token; `.env` is already ignored by this project.
