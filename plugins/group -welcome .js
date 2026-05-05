const { cmd } = require('../command');

cmd({
    on: "group-participants-update"
}, async (conn, update) => {
    try {
        const { id, participants, action } = update;

        if (action === "add") {
            for (let user of participants) {

                let welcomeMsg = 👋 Welcome @${user.split("@")[0]}!

✨ Group mein khush aamdeed!
📌 Rules follow karein
💬 Active rahen aur enjoy karein

❤️ Powered by your bot;𝒩𝒜𝒲𝒜𝒵ℳ𝒟

                await conn.sendMessage(id, {
                    text: welcomeMsg,
                    mentions: [user]
                });
            }
        }
    } catch (e) {
        console.log(e);
    }
});
