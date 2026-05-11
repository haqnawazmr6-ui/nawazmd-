const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys")

const pino = require("pino")
const fs = require("fs")
const path = require("path")
const os = require("os")
const http = require("http")

// ============================
// HEROKU WEB SERVER
// ============================

http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" })
    res.end("MINI BOT RUNNING")
}).listen(process.env.PORT || 8000)

// ============================
// RAM CLEANER
// ============================

setInterval(() => {
    try {
        if (global.gc) global.gc()
    } catch (err) {
        console.log(err)
    }
}, 60000)

// ============================
// ANTI CRASH
// ============================

process.on("uncaughtException", err => {
    console.log("Uncaught Exception:", err)
})

process.on("unhandledRejection", err => {
    console.log("Unhandled Rejection:", err)
})

require("events").EventEmitter.defaultMaxListeners = 50

// ============================
// SYSTEM STATUS
// ============================

setInterval(() => {
    try {

        const memory = process.memoryUsage()

        console.log(`
╭━━〔 MINI BOT STATUS 〕━━⬣
┃ RAM Used : ${(memory.heapUsed / 1024 / 1024).toFixed(2)} MB
┃ RAM Total: ${(memory.heapTotal / 1024 / 1024).toFixed(2)} MB
┃ CPU Load : ${os.loadavg()[0].toFixed(2)}
╰━━━━━━━━━━━━━━━━━━⬣
`)

    } catch (e) {
        console.log(e)
    }
}, 120000)

// ============================
// START BOT
// ============================

async function startBot() {

    const { state, saveCreds } = await useMultiFileAuthState("./session")

    const { version } = await fetchLatestBaileysVersion()

    const sock = makeWASocket({
        version,
        logger: pino({ level: "silent" }),
        printQRInTerminal: true,
        auth: state,
        browser: ["MINI BOT", "Chrome", "1.0.0"]
    })

    // SAVE SESSION

    sock.ev.on("creds.update", saveCreds)

    // CONNECTION UPDATE

    sock.ev.on("connection.update", async ({ connection, lastDisconnect }) => {

        if (connection === "connecting") {
            console.log("🔄 MINI BOT CONNECTING...")
        }

        if (connection === "open") {
            console.log("✅ MINI BOT CONNECTED")
        }

        if (connection === "close") {

            const reason = lastDisconnect?.error?.output?.statusCode

            console.log("❌ Connection Closed:", reason)

            if (reason !== DisconnectReason.loggedOut) {
                startBot()
            }
        }
    })

    // ============================
    // MESSAGE LISTENER
    // ============================

    sock.ev.on("messages.upsert", async ({ messages }) => {

        const msg = messages[0]

        if (!msg.message) return

        const from = msg.key.remoteJid

        const body =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text ||
            ""

        console.log(`Message From: ${from}`)
        console.log(`Message Text: ${body}`)

    })

    // ============================
    // LOAD PLUGINS
    // ============================

    const pluginsPath = path.join(__dirname, "./plugins")

    if (fs.existsSync(pluginsPath)) {

        fs.readdirSync(pluginsPath).forEach(file => {

            if (file.endsWith(".js")) {

                try {

                    require(path.join(pluginsPath, file))

                    console.log(`✅ Plugin Loaded: ${file}`)

                } catch (err) {

                    console.log(`❌ Plugin Error: ${file}`)
                    console.log(err)

                }
            }
        })
    }
}

// ============================
// START
// ============================

startBot()
