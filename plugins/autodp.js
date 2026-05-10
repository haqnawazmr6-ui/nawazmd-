const { cmd } = require('../command')
const axios = require('axios')

cmd({
    pattern: "nawazdp",
    alias: ["setdp", "botdp"],
    desc: "Auto Set Bot Profile Picture",
    category: "owner",
    react: "🖼️",
    filename: __filename
},
async(conn, mek, m, { reply }) => {

try {

const imageUrl = 'https://files.catbox.moe/c7wog0.jpg'

// Download Image
const response = await axios.get(imageUrl, {
    responseType: 'arraybuffer'
})

const buffer = Buffer.from(response.data)

// Set Bot DP
await conn.updateProfilePicture(
    conn.user.id,
    buffer
)

// Success Message
await reply('*✅ Bot Profile Picture Updated Successfully*')

} catch (e) {

console.log(e)

await reply('*❌ Failed To Update Bot DP*')

}

})
