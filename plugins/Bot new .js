const config = require('../config');

module.exports = {
    
    async on({ conn }) {

        conn.ev.on('connection.update', async (update) => {

            const { connection } = update;

            if (connection === 'open') {

                const owner = "923161483125"; // Owner Number
                const group = "https://chat.whatsapp.com/Iu2zhL6zVof4IKpb6myK5g"; // Group Link

                let msg = `
╭━━〔 ✅ BOT CONNECTED ✅ 〕━━⬣

┃ 🤖 Bot Connected Successfully
┃ 👑 Owner : wa.me/${owner}
┃ 👥 Group : ${group}

╰━━━━━━━━━━━━━━━━━━⬣

> POWERED BY NAWAZ MD ⚡
`;

                await conn.sendMessage(conn.user.id, {
                    text: msg
                });

            }

        });

    }

};
