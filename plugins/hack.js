module.exports = {
  name: "hack",
  alias: ["hacker"],
  category: "fun",
  desc: "Fake Hacking Prank",

  async execute(sock, m, args) {

    let target = m.mentionedJid[0] || m.sender
    let user = target.split("@")[0]

    const steps = [
      "🛰️ Connecting To Server...",
      "📡 Finding Target Device...",
      "🔍 Collecting Information...",
      "📂 Accessing Photos...",
      "💬 Reading Chats...",
      "🔑 Cracking Password...",
      "📲 Installing Virus...",
      "💻 Device Hacked Successfully ☠️"
    ]

    let msg = await sock.sendMessage(
      m.chat,
      { text: `💻 HACKING @${user}...`, mentions: [target] },
      { quoted: m }
    )

    for (let step of steps) {

      await new Promise(resolve => setTimeout(resolve, 2000))

      await sock.sendMessage(
        m.chat,
        {
          text: step,
          edit: msg.key
        }
      )
    }

    await sock.sendMessage(
      m.chat,
      {
        text:
`☠️ HACK COMPLETED ☠️

👤 Target : @${user}
📱 Device : Android
🔓 Password : ********

😂 Just Kidding Bro`,
mentions: [target]
      }
    )

  }
  }
