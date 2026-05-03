const { cmd } = require('../command');

cmd({
    pattern: "love",
    desc: "Funny Love Calculator",
    category: "fun",
    filename: __filename
},
async (conn, mek, m, { from, participants, mentionedJid }) => {

    let users = mentionedJid;

    // اگر user tag نہ کرے تو random اٹھاؤ
    if (!users || users.length < 2) {
        let user1 = participants[Math.floor(Math.random() * participants.length)].id;
        let user2 = participants[Math.floor(Math.random() * participants.length)].id;
        users = [user1, user2];
    }

    let percent = Math.floor(Math.random() * 100);

    let results = [
        "💔 بھائی یہ تو صرف time pass ہے 😭",
        "😂 Friendzone میں سیدھا entry!",
        "😐 ایک serious ہے دوسرا game کھیل رہا ہے",
        "🔥 Hidden love چل رہا ہے!",
        "😏 کچھ تو scene ہے boss",
        "❤️ سچی محبت لگ رہی ہے",
        "💍 شادی پکی سمجھو!",
        "🤡 ایک
