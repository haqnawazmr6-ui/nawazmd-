const axios = require("axios")

module.exports = {
  name: "apk",
  alias: ["app"],
  category: "search",
  desc: "Search APK apps",

  async execute(sock, m, args) {

    if (!args[0]) {
      return m.reply("Example:\n.apk whatsapp")
    }

    const query = args.join(" ")

    try {

      m.reply("🔍 Searching APK...")

      // API
      const res = await axios.get(`https://api.agatz.xyz/api/apk?q=${encodeURIComponent(query)}`)

      const data = res.data.data

      if (!data) {
        return m.reply("❌ APK not found")
      }

      let txt = `
📦 *APK SEARCH RESULT*

📱 Name : ${data.name}
🧩 Package : ${data.package}
📥 Size : ${data.size}
⭐ Rating : ${data.rating}

🔗 Download :
${data.download}
`

      await sock.sendMessage(m.chat, {
        image: { url: data.icon },
        caption: txt
      }, { quoted: m })

    } catch (e) {
      console.log(e)
      m.reply("❌ Error fetching APK")
    }
  }
    }
