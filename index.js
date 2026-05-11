const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys")

const P = require("pino")
const express = require("express")

const app = express()

const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
  res.send("Jawad MD Bot Running Successfully")
})

app.listen(PORT, () => {
  console.log("Server Started On Port " + PORT)
})

async function startBot() {

  const { state, saveCreds } =
    await useMultiFileAuthState("./session")

  const { version } =
    await fetchLatestBaileysVersion()

  const sock = makeWASocket({
    version,
    logger: P({ level: "silent" }),
    printQRInTerminal: true,
    auth: state,
    browser: ["Jawad-MD", "Chrome", "5.0"]
  })

  sock.ev.on("creds.update", saveCreds)

  sock.ev.on("connection.update", async (update) => {

    const { connection, lastDisconnect } = update

    if (connection === "close") {

      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut

      console.log("Connection Closed")

      if (shouldReconnect) {
        startBot()
      }

    } else if (connection === "open") {

      console.log("Bot Connected Successfully")

    }

  })

  sock.ev.on("messages.upsert", async ({ messages }) => {

    try {

      const msg = messages[0]

      if (!msg.message) return
      if (msg.key.fromMe) return

      const from = msg.key.remoteJid

      const text =
        msg.message.conversation ||
        msg.message.extendedTextMessage?.text ||
        ""

      const command = text.toLowerCase()

      // PING

      if (command === ".ping") {

        await sock.sendMessage(from, {
          text: "Pong 🏓"
        })

      }

      // MENU

      if (command === ".menu") {

        const menuText = `
╭━━〔 JAWAD MD MENU 〕━━⬣
┃
┃➤ .ping
┃➤ .alive
┃➤ .owner
┃➤ .hi
┃
╰━━━━━━━━━━━━━━⬣
`

        await sock.sendMessage(from, {
          text: menuText
        })

      }

      // ALIVE

      if (command === ".alive") {

        await sock.sendMessage(from, {
          text: "I am alive now ✅"
        })

      }

      // OWNER

      if (command === ".owner") {

        await sock.sendMessage(from, {
          text: "Owner : Jawad MD 👑"
        })

      }

      // HI

      if (command === ".hi") {

        await sock.sendMessage(from, {
          text: "Hello 👋"
        })

      }

    } catch (err) {

      console.log(err)

    }

  })

}

startBot()
