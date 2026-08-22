Local server stub for sending WhatsApp messages

This project includes a simple Express server stub at `server/index.js` that accepts POST requests at `/send-whatsapp` and logs the booking payload to `server/server.log`.

Install and run (Node.js required):

```bash
cd server
npm init -y
npm install express cors body-parser
node index.js
```

By default the server listens on port 3000. If your static site is served from XAMPP on port 80, you'll need to run the server and ensure requests from your page reach `http://localhost:3000/send-whatsapp`. You may need to adjust the `fetch` URL in `pages/contact.html` to `http://localhost:3000/send-whatsapp` when testing.

To integrate with WhatsApp Business Cloud API or Twilio, replace the TODO in `index.js` with real API calls and provide the required credentials as environment variables. If you want, I can add an example for WhatsApp Cloud API (requires `WHATSAPP_TOKEN` and `WHATSAPP_PHONE_ID`).
