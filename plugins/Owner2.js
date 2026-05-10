const { cmd } = require('../command');

cmd({
    pattern: "owner2",
    alias: ["dev","creator"],
    desc: "Show bot owner info",
    category: "owner",
    react: "👑",
    filename: __filename
},
async (conn, mek, m, { from }) => {

let txt = `
╭━━〔 👑 OWNER INFO 👑 〕━━⬣

┃ 👤 Name : NAWAZ
┃ 🤖 Bot : NAWAZ MD
┃ 🌍 Status : Online
┃ ⚡ Type : WhatsApp Bot Developer
┃ 💻 Skills : NodeJS • Baileys • APIs

╰━━━━━━━━━━━━━━━━━━⬣

> POWERED BY NAWAZ MD ⚡
`;

await conn.sendMessage(from,{
text: txt
},{quoted: mek});

});
