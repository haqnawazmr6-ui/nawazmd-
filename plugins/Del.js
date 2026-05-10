const { cmd } = require('../command')

cmd({
    on: "text"
},
async(conn, mek, m, { from, isGroup, isAdmins }) => {

try {

if (!isGroup) return

// Only Admin
if (!isAdmins) return

const text = m.body?.toLowerCase()

// Command Check
if (text !== "del" && text !== "delete") return

// Must Reply Message
if (!m.quoted) return

// Delete Target Message
await conn.sendMessage(from, {
delete: {
remoteJid: from,
fromMe: false,
id: m.quoted.id,
participant: m.quoted.sender
}
})

// Delete Command Message Too
await conn.sendMessage(from, {
delete: mek.key
})

// Newsletter React
await conn.sendMessage(from, {
react: {
text: '🗑️',
key: mek.key
}
}, {
contextInfo: {
forwardingScore: 999,
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: "120363402493709861@newsletter",
newsletterName: "NAWAZ MD",
serverMessageId: 143
}
}
})

} catch (e) {

console.log(e)

}

})
