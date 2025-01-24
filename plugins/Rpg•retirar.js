import db from '../lib/database.js'

let handler = async (m, { args }) => {
let user = global.db.data.users[m.sender]
if (!args[0]) return m.reply('✦ Ingresa la cantidad de *${currency}* que deseas Retirar.')
if (args[0] == 'all') {
let count = parseInt(user.bank)
user.bank -= count * 1
user.yenes += count * 1
await m.reply(`✦ Retiraste *${count} ✨ ${currency}* del Banco.`)
return !0
}
if (!Number(args[0])) return m.reply('✨ La cantidad debe ser un Numero.')
let count = parseInt(args[0])
if (!user.bank) return m.reply('No tienes *${currency}* en el Banco.')
if (user.bank < count) return m.reply(`Solo tienes *${user.bank} ${currency}* en el Banco.`)
user.bank -= count * 1
user.yenes += count * 1
await m.reply(`🌼 Retiraste *${count} ${currency}* del Banco.`)}

handler.help = ['retirar']
handler.tags = ['rpg']
handler.command = ['withdraw', 'retirar', 'wd']
handler.register = false 
export default handler
