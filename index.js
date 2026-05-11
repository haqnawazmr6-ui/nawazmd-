const express = require("express");
const fs = require("fs");
const path = require("path");
const pino = require("pino");

const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason
} = require("@whiskeysockets/baileys");

// ================= SERVER =================

const app = express();

app.get("/", (req, res) => {
  res.send("Bot Running Successfully ✅");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🌐 Server running on port ${PORT}`);
});

// ================= START BOT =================

async function startBot() {

  const { state, saveCreds } =
    await useMultiFileAuthState("./session");

  const sock = makeWASocket({
    logger: pino({ level: "silent" }),
    printQRInTerminal: false,
    auth: state,
    browser: ["Nawaz-MD", "Chrome", "1.0.0"]
  });

  // ================= LOAD PLUGINS =================

  const pluginsPath = path.join(__dirname, "./plugins");

  if (fs.existsSync(pluginsPath)) {

    fs.readdirSync(pluginsPath).forEach((file) => {

      if (file.endsWith(".js")) {

        require(path.join(pluginsPath, file));

        console.log(`✅ Plugin Loaded: ${file}`);

      }

    });

  }

  console.log("🔄 MINI BOT CONNECTING...");

  // ================= CONNECTION EVENTS =================

  sock.ev.on("connection.update", async (update) => {

    const { connection, lastDisconnect } = update;

    if (connection === "open") {

      console.log("✅ WhatsApp Connected Successfully");

    }

    if (connection === "close") {

      const reason =
        lastDisconnect?.error?.output?.statusCode;

      console.log("❌ Connection Closed:", reason);

      if (reason !== DisconnectReason.loggedOut) {

        startBot();

      }

    }

  });

  // ================= SAVE SESSION =================

  sock.ev.on("creds.update", saveCreds);

}

// ================= RUN BOT =================

startBot();
