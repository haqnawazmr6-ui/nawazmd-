case 'chreact': {
try {

if (!text) {
return reply(`❌ Example:
.chreact 😂 https://whatsapp.com/channel/0029VabcXYZ/123`)
}

let args = text.split(' ')
let emoji = args[0]
let link = args[1]

if (!emoji) return reply('❌ Emoji Required')
if (!link) return reply('❌ Channel Post Link Required')

if (!link.includes('whatsapp.com/channel/')) {
return reply('❌ Invalid WhatsApp Channel Link')
}

// CHANNEL LINK SPLIT
let split = link.split('/')

// CHANNEL ID
let channelId = split[4]

// POST ID
let postId = split[5]

if (!channelId || !postId) {
return reply(`❌ Invalid Channel Post Link

Example:
https://whatsapp.com/channel/0029VabcXYZ/123`)
}

// REACT SEND
await sock.newsletterReactMessage(
channelId + '@newsletter',
postId,
emoji
)

reply(`✅ Successfully Reacted ${emoji} On Channel Post`)

} catch (e) {
console.log(e)
reply(`❌ Error:\n${e}`)
}
}
break
