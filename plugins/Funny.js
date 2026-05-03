const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

// 📁 History file
const DB_FILE = "./history.json";

// اگر file نہ ہو تو create کر دو
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

// 📥 Read History
const readHistory = () => {
    return JSON.parse(fs.readFileSync(DB_FILE));
};

// 📤 Save History
const saveHistory = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};


// 🎥 Random HD Meme API
app.get('/api/meme', (req, res) => {

    const videos = [
        "https://files.catbox.moe/hd1.mp4",
        "https://files.catbox.moe/hd2.mp4",
        "https://files.catbox.moe/hd3.mp4"
    ];

    let random = videos[Math.floor(Math.random() * videos.length)];

    // history میں save کرو
    let history = readHistory();
    history.push({
        type: "meme",
        url: random,
        time: new Date()
    });
    saveHistory(history);

    res.json({
        status: true,
        video: random
    });
});


// 📜 History API
app.get('/api/history', (req, res) => {
    let history = readHistory();
    res.json({
        total: history.length,
        data: history
    });
});


// 🧹 Clear History
app.get('/api/clear', (req, res) => {
    saveHistory([]);
    res.json({
        status: "History Cleared"
    });
});


// 🚀 Start Server
app.listen(PORT, () => {
    console.log(`API Server Running on http://localhost:${PORT}`);
});
