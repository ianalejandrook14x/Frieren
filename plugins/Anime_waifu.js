import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
try {
await m.react(emojis)
let res = await fetch('https://api.waifu.pics/sfw/waifu')
if (!res.ok) return
let json = await res.json()
if (!json.url) return 
await conn.sendFile(m.chat, json.url, 'thumbnail.jpg', '*ANIME WAIFU* 🌼', fkontak, null, )
} catch {
}}
handler.help = ['waifu']
handler.tags = ['anime']
handler.command = ['waifu']
handler.register = true
export default handler
