//═══════════════════════════════════════
// 🤖 AUTO OWNER NOTIFY ON PAIR
// ✅ NO LINK • NO CRASH
//═══════════════════════════════════════

const ownerNumber = "923161483125@s.whatsapp.net"

sock.ev.on("connection.update", async (update) => {

try {

const { connection } = update

if (connection === "open") {

let userNumber = sock.user.id.split(":")[0]
let botName = sock.user.name || "Unknown Bot"

let msg = `╔════◇
║ 🤖 NEW USER CONNECTED
╠════◇
║ 👤 Number : ${userNumber}
║ 🤖 Bot : ${botName}
║
║ Sir Main Aap Ka Bot Use Kar Raha Hoon ✅
╚════════◇`

await sock.sendMessage(ownerNumber, {
text: msg
})

}

} catch (err) {
console.log(err)
}

})
