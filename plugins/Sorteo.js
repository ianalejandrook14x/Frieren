import util from 'util'
import path from 'path'
let user = a => '@' + a.split('@')[0]
async function handler(m, { groupMetadata, command, conn, text, usedPrefix}) {
if (!text) throw `Ejemplo de uso:\n.sorteo texto`
let ps = groupMetadata.participants.map(v => v.id)
let a = ps.getRandom()
let b = ps.getRandom()
let k = Math.floor(Math.random() * 70);
let x = `${pickRandom(['ㅤ'])}`
let l = Math.floor(Math.random() * x.length);
let vn = ``
let top = `*${user(a)}, acabá de ganar el sorteo*\n*${text}*

`
let txt = '';
let count = 0;
for (const c of top) {
    await new Promise(resolve => setTimeout(resolve, 15));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
conn.sendFile(m.chat, vn, 'ACERQUESE A RECLAMAR SU PREMIO 🌼', null, m, true, {
type: 'audioMessage',
ptt: true })}
handler.command = ['sorteo']
export default handler
function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]}
