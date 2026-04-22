const { cmd } = require("../command");

cmd({
  pattern: "ship",
  alias: ["match"],
  desc: "Randomly pairs the command user with another group member.",
  react: "❤️",
  category: "group",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    // Get group metadata to access participants
    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    
    // Filter out the sender to avoid self-pairing
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to make a pair.");
    }

    // Get random participant (excluding sender)
    const randomPair = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];

    const user1 = sender.split("@")[0];
    const user2 = randomPair.split("@")[0];
    
    const message = `💘 *Match Found!* 💘\n❤️ @${user1} + @${user2}\n💖 Congratulations! 🎉`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [sender, randomPair]
      }
    }, { quoted: m });

  } catch (error) {
    console.error("❌ Error in ship command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

