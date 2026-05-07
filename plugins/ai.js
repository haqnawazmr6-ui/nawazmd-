const axios = require("axios")

module.exports = {
  name: "ai",
  alias: ["gpt", "chatgpt"],
  category: "ai",
  desc: "AI Chat Command",

  async execute(sock, m, args) {

    if (!args[0]) {
      return m.reply("Example:\n.ai hello")
    }

    const query = args.join(" ")

    try {

      m.reply("🤖 Thinking...")

      // API Request
      const res = await axios.get(`https://api.agatz.xyz/api/gpt?q=${encodeURIComponent(query)}`)

      const reply =
        res.data.data ||
        res.data.result ||
        "No response"

      await sock.sendMessage(
        m.chat,
        {
          text: `🤖 *AI RESPONSE*\n\n${reply}`
        },
        { quoted: m }
      )

    } catch (e) {
      console.log(e)
      m.reply("❌ AI Error")
    }
  }
          }
