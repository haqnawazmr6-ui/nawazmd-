const { cmd } = require('../command');

cmd({
    pattern: "islamic",
    alias: ["hadith","deen","quote"],
    desc: "Get random Islamic quote",
    category: "fun",
    react: "☪️",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {

const quotes = [
"🕌 *Allah sabr karne walon ke sath hai.*\n📖 Surah Baqarah 2:153",

"🤍 *Namaz dil ka sukoon hai.*\n📖 Surah Ankabut 29:45",

"☝️ *Jo Allah par bharosa karta hai, Allah uske liye kaafi hai.*\n📖 Surah Talaq 65:3",

"🌙 *Dua momin ka hathyar hai.*\n📖 Hadith",

"🕋 *Behtareen log woh hain jo dusron ke liye faidemand hon.*\n📖 Hadith",

"✨ *Har mushkil ke baad aasani hai.*\n📖 Surah Ash-Sharh 94:6",

"🤲 *Allah dilon ke haal janta hai.*\n📖 Surah Mulk 67:13",

"💖 *Zikr-e-Allah se dilon ko sukoon milta hai.*\n📖 Surah Raad 13:28"
];

const random = quotes[Math.floor(Math.random() * quotes.length)];

await conn.sendMessage(from, {
    text: `╭━━〔 ☪️ ISLAMIC QUOTE ☪️ 〕━━⬣

${random}

╰━━━━━━━━━━━━━━━━━━⬣`
}, { quoted: mek });

});
