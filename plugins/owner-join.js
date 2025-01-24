let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})( [0-9]{1,3})?/i

let handler = async (m, { conn, text, isOwner, usedPrefix, command }) => {

try {
let [_, code] = text.match(linkRegex) || []
if (!code) return m.reply('✦ Enlace invalido.')
let res = await conn.groupAcceptInvite(code)
m.reply(`✦ Me uni correctamente al grupo`)
} catch {
return m.reply('✧ Ocurrió un error.')}}

handler.help = ['join <link>']
handler.tags = ['owner']
handler.command = ['join', 'entrar'] 
handler.mods = true

export default handler