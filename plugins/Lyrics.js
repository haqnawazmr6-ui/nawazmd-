const { cmd } = require('../command');

cmd({
    pattern: "lyrics",
    alias: ["lirics", "songtext"],
    desc: "Get song lyrics",
    category: "music",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {

try {

if (!q) return reply("❌ Example : .lyrics pasoori");

const axios = require('axios');

const res = await axios.get(`https://api.popcat.xyz/lyrics?song=${q}`);

let txt = `
╭━━〔 🎶 SONG LYRICS 🎶 〕━━⬣

┃ 🎵 Song : ${res.data.title}
┃ 👤 Artist : ${res.data.artist}

╰━━━━━━━━━━━━━━━━━━⬣

${res.data.lyrics}

> POWERED BY NAWAZ MD ⚡
`;

await conn.sendMessage(from,{
text: txt
},{quoted: mek});

} catch(e){
console.log(e);
reply("❌ Lyrics Not Found");
}
});
