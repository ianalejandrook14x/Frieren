let handler = async (m, { conn, usedPrefix, command }) => {
if (!m.quoted) return conn.reply(m.chat, `🌼 Responde a un *Video.*`, m, )
conn.reply(m.chat, global.wait, m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, showAdAttribution: true,
title: botname,
body: dev,
previewType: 0, thumbnail: icons,
sourceUrl: channel }}})
const q = m.quoted || m
let mime = (q.msg || q).mimetype || ''
if (!/(mp4)/.test(mime)) return conn.reply(m.chat, `🌼 Responde a un *Video.*`, m, )
await m.react(rwait)
let media = await q.download()
let listo = '*Aquí Tienes* ✧'
conn.sendMessage(m.chat, { video: media, gifPlayback: true, caption: listo }, { quoted: fkontak })
await m.react(done)
}
handler.help = ['togifaud']
handler.tags = ['transformador']
handler.command = ['togifaud']
export default handler
