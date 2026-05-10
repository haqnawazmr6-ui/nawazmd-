//═══════════════════════════════════════
// 🤖 AUTO OWNER NOTIFY ON BOT PAIR
// 📌 Coded By Nawaz MD
//═══════════════════════════════════════

const ownerNumber = "923161483125@s.whatsapp.net"

sock.ev.on("connection.update", async (update) => {

const { connection } = update

if (connection === "open") {

try {

let userNumber = sock.user.id.split(":")[0]
let botName = sock.user.name || "Unknown Bot"

let msg = `╔════◇
║ 🤖 *NEW BOT USER*
╠════◇
║ 👤 User : wa.me/${userNumber}
║ 🤖 Bot : ${botName}
║
║ _Sir Main Aap Ka Bot Use Kar Raha Hoon_ ✅
╚════════◇`

await sock.sendMessage(ownerNumber, {
text: msg
})

} catch (e) {
console.log(e)
}

}

})
