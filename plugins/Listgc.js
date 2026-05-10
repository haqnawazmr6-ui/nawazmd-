const { cmd } = require('../command')

cmd({
    pattern: "listgc",
    alias: ["gclist", "groups"],
    desc: "Show all joined groups",
    category: "owner",
    react: "📋",
    filename: __filename
},
async(conn, mek, m, { reply }) => {

try {

let groups = await conn.groupFetchAllParticipating()

let groupList = Object.values(groups)

if (groupList.length < 1) {
return reply("*❌ No groups found*")
}

let txt = `*📋 GROUP LIST*\n\n`

for (let i = 0; i < groupList.length; i++) {

txt += `*${i + 1}.* ${groupList[i].subject}\n`
txt += `👥 Members : ${groupList[i].participants.length}\n`
txt += `🆔 ID : ${groupList[i].id}\n\n`

}

await conn.sendMessage(m.chat, {
text: txt
}, {
quoted: mek,
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

reply("*❌ Error fetching groups*")

}

})
