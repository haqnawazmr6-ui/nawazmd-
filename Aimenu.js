const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "aimenu",
    alias: ["ai", "aicmd"],
    desc: "Show AI menu",
    category: "ai",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { from, pushname, reply }) => {

try {

let menu = `
╭━━━〔 🤖 AI MENU 🤖 〕━━━⬣

┃ 👤 User : ${pushname}
┃ ⚡ Bot : NAWAZ MD
┃ 📦 Total Cmd : ${commands.length}

╰━━━━━━━━━━━━━━━━━━⬣

╭━━〔 🧠 AI COMMANDS 🧠 〕━━⬣
┃➤ .gpt
┃➤ .ai
┃➤ .chatgpt
┃➤ .img
┃➤ .imagine
┃➤ .animeai
┃➤ .bard
┃➤ .gemini
┃➤ .copilot
┃➤ .dalle
┃➤ .metaai
┃➤ .openai
┃➤ .blackbox
┃➤ .bing
┃➤ .aiimage
┃➤ .codeai
┃➤ .logoai
┃➤ .remini
┃➤ .vision
╰━━━━━━━━━━━━━━━━━━⬣

> POWERED BY NAWAZ MD ⚡
`;

await conn.sendMessage(from,{
image:{url:"https://files.catbox.moe/9f5j2w.jpg"},
caption: menu
},{quoted:mek});

} catch(e){
console.log(e);
reply(`${e}`);
}
});
