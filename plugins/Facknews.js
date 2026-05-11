const newsletterJid = "120363402493709861@newsletter"

module.exports = async (conn) => {

    const oldSendMessage = conn.sendMessage.bind(conn)

    conn.sendMessage = async (jid, content = {}, options = {}) => {

        try {

            // Ignore empty messages
            if (!content || typeof content !== 'object') {
                return oldSendMessage(jid, content, options)
            }

            // Create contextInfo safely
            content.contextInfo = {
                ...(content.contextInfo || {}),

                forwardingScore: 999,
                isForwarded: true,

                forwardedNewsletterMessageInfo: {
                    newsletterJid,
                    newsletterName: "Nawaz MD",
                    serverMessageId: 1
                }
            }

        } catch (err) {
            console.log("Fake Newsletter Error:", err)
        }

        return oldSendMessage(jid, content, options)
    }

    console.log("🔥 Fake Newsletter Forward Enabled")
        }
