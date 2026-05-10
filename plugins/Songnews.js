const { cmd } = require('../command');

cmd({
    pattern: "musicnews",
    alias: ["songnews", "trendmusic"],
    desc: "Random music quote",
    category: "music",
    react: "🎧",
    filename: __filename
},
async (conn, mek, m, { from }) => {

const quotes = [
"🎶 Music Is The Medicine Of The Mind",
"🎧 Feel The Beat, Live The Moment",
"🎵 Every Song Has A Memory",
"🔥 Music Never Sleeps",
"💫 Songs Speak What Heart Feels"
];

let msg = quotes[Math.floor(Math.random() * quotes.length)];

await conn.sendMessage(from,{
text: `╭━━〔 🎼 MUSIC WORLD 🎼 〕━━⬣\n┃ ${msg}\n╰━━━━━━━━━━━━━━━━━━⬣`
},{quoted: mek});

});
