const { cmd } = require('../command');

// ════════════════════════════════
//        NAWAZ MD ISLAMIC
// ════════════════════════════════

// 📖 QURAN AYAHS
const ayahs = [

{
arabic: "لَا تَقْنَطُوا مِنْ رَحْمَةِ اللَّهِ",
urdu: "اللہ کی رحمت سے نا امید نہ ہو۔",
ref: "الزمر : 53"
},

{
arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
urdu: "بیشک اللہ صبر کرنے والوں کے ساتھ ہے۔",
ref: "البقرہ : 153"
},

{
arabic: "وَاللَّهُ خَيْرُ الرَّازِقِينَ",
urdu: "اور اللہ سب سے بہتر رزق دینے والا ہے۔",
ref: "الجمعہ : 11"
},

{
arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ",
urdu: "تم میرا ذکر کرو، میں تمہیں یاد رکھوں گا۔",
ref: "البقرہ : 152"
}

];

// 📚 HADITHS
const hadiths = [

{
text: "تم میں بہترین شخص وہ ہے جو قرآن سیکھے اور سکھائے۔",
ref: "صحیح بخاری"
},

{
text: "مسلمان وہ ہے جس کی زبان اور ہاتھ سے دوسرے مسلمان محفوظ رہیں۔",
ref: "صحیح مسلم"
},

{
text: "اعمال کا دارومدار نیتوں پر ہے۔",
ref: "صحیح بخاری"
},

{
text: "جو لوگوں پر رحم نہیں کرتا، اللہ اس پر رحم نہیں کرتا۔",
ref: "ترمذی"
}

];

// ════════════════════════════════
//           AYAH COMMAND
// ════════════════════════════════

cmd({
pattern: "ayah",
desc: "Random Quran Ayah",
category: "islamic",
react: "📖",
filename: __filename
},

async (conn, mek, m) => {

try {

const randomAyah =
ayahs[Math.floor(Math.random() * ayahs.length)];

await conn.sendMessage(
m.chat,
{
text:
`╭━━━〔 📖 QURAN AYAH 〕━━━⬣

${randomAyah.arabic}

📚 اردو ترجمہ:
${randomAyah.urdu}

📍 ${randomAyah.ref}

╰━━━━━━━━━━━━━━━━⬣`
},
{ quoted: mek }
);

} catch (e) {

console.log(e);

}

});

// ════════════════════════════════
//          HADITH COMMAND
// ════════════════════════════════

cmd({
pattern: "hadith",
desc: "Random Hadith",
category: "islamic",
react: "📚",
filename: __filename
},

async (conn, mek, m) => {

try {

const randomHadith =
hadiths[Math.floor(Math.random() * hadiths.length)];

await conn.sendMessage(
m.chat,
{
text:
`╭━━━〔 📚 HADITH 〕━━━⬣

${randomHadith.text}

📖 ${randomHadith.ref}

╰━━━━━━━━━━━━━━━⬣`
},
{ quoted: mek }
);

} catch (e) {

console.log(e);

}

});
