const axios = require("axios");
const yts = require("yt-search");

module.exports = {
  name: "play",
  description: "Download song",
  async execute(sock, msg, args) {
    try {
      const query = args.join(" ");
      if (!query) return sock.sendMessage(msg.key.remoteJid, { text: "❌ Song name likho" });

      // 🔍 Search YouTube
      const search = await yts(query);
      const video = search.videos[0];

      if (!video) return sock.sendMessage(msg.key.remoteJid, { text: "❌ Song nahi mila" });

      // 📩 Send Buttons
      await sock.sendMessage(msg.key.remoteJid, {
        text: `🎵 *${video.title}*\n\nSelect option:`,
        footer: "Song Downloader",
        buttons: [
          { buttonId: `.audio ${video.url}`, buttonText: { displayText: "🎧 Audio" }, type: 1 },
          { buttonId: `.video ${video.url}`, buttonText: { displayText: "🎬 Video" }, type: 2 }
        ],
        headerType: 1
      }, { quoted: msg });

    } catch (e) {
      console.log(e);
    }
  }
};
