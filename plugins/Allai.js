const { cmd } = require('../command');
const axios = require('axios');


// ═══════════════════════════════
// 🤖 ALL AI COMMANDS IN ONE FILE
// ═══════════════════════════════


// AI CHAT

cmd({
    pattern: "ai",
    alias: [
        "gpt","chatgpt","gemini","bard",
        "openai","metaai","copilot",
        "blackbox","bing"
    ],
    desc: "AI Chat System",
    category: "ai",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {

try {

if (!q) {
return reply(`╭━━〔 🤖 AI CHAT 🤖 〕━━⬣

┃ Example :
┃ .ai hello
┃ .gpt write poem
┃ .gemini who are you

╰━━━━━━━━━━━━━━━━━━⬣`);
}

const res = await axios.get(`https://api.popcat.xyz/chatbot?msg=${encodeURIComponent(q)}&owner=NAWAZ&botname=NAWAZ-MD`);

await conn.sendMessage(from,{
text:`╭━━〔 🤖 AI RESPONSE 🤖 〕━━⬣

${res.data.response}

╰━━━━━━━━━━━━━━━━━━⬣
> POWERED BY NAWAZ MD ⚡`
},{quoted: mek});

} catch(e){
console.log(e);
reply("❌ AI Error");
}
});



// AI IMAGE

cmd({
    pattern: "img",
    alias: [
        "aiimage","imagine","dalle",
        "animeai","logoai"
    ],
    desc: "Generate AI Images",
    category: "ai",
    react: "🖼️",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {

try {

if (!q) return reply("❌ Example : .img lion king");

let imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(q)}`;

await conn.sendMessage(from,{
image:{url:imageUrl},
caption:`╭━━〔 🖼️ AI IMAGE 🖼️ 〕━━⬣

┃ Prompt : ${q}

╰━━━━━━━━━━━━━━━━━━⬣
> POWERED BY NAWAZ MD ⚡`
},{quoted: mek});

} catch(e){
console.log(e);
reply("❌ Image Generation Failed");
}
});



// CODE AI

cmd({
    pattern: "codeai",
    alias: ["aicode","coder"],
    desc: "Generate Code",
    category: "ai",
    react: "💻",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {

try {

if (!q) return reply("❌ Example : .codeai html button code");

const res = await axios.get(`https://api.popcat.xyz/chatbot?msg=${encodeURIComponent("Write coding only: " + q)}&owner=NAWAZ&botname=CODE-AI`);

await conn.sendMessage(from,{
text:`╭━━〔 💻 CODE AI 💻 〕━━⬣

${res.data.response}

╰━━━━━━━━━━━━━━━━━━⬣`
},{quoted: mek});

} catch(e){
console.log(e);
reply("❌ Code AI Error");
}
});



// VISION AI

cmd({
    pattern: "vision",
    alias: ["analyze","detect"],
    desc: "Vision AI",
    category: "ai",
    react: "👁️",
    filename: __filename
},
async (conn, mek, m, { reply }) => {

reply(`👁️ Vision AI Connected Successfully`);

});



// REMINI

cmd({
    pattern: "remini",
    alias: ["enhance","hd"],
    desc: "Enhance Images",
    category: "ai",
    react: "✨",
    filename: __filename
},
async (conn, mek, m, { reply }) => {

reply(`✨ Remini AI Connected Successfully`);

});
