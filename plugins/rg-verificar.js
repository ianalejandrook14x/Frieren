import db from '../lib/database.js'
import { createHash } from 'crypto'
import fs from 'fs'
import fetch from 'node-fetch'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)
  if (user.registered === true) return m.reply(`Ya estás registrado.\n\n*¿Quiere volver a registrarse?*\n\nUse este comando para eliminar su registro.\n*${usedPrefix}unreg*`)
  if (!Reg.test(text)) return m.reply(`Formato incorrecto.\n\nUso del comamdo: *${usedPrefix + command} nombre.edad*\nEjemplo : *${usedPrefix + command} ${name2}.20*`)
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) return m.reply('🌼 *El nombre no puede estar vacío.*')
  if (!age) return m.reply('🌼 *La edad no puede estar vacía.*')
  if (name.length >= 100) return m.reply('🌼 *El nombre es demasiado largo.*' )
  age = parseInt(age)
  if (age > 100) return m.reply('🌼 *El abuelo quiere jugar al bot*')
  if (age < 5) return m.reply('🌼  *No se permiten niños*')
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  global.db.data.users[m.sender].yenes += 50
  global.db.data.users[m.sender].exp += 245
  let sn = createHash('md5').update(m.sender).digest('hex')
let regbot = `🌼 𝗥 𝗘 𝗚 𝗜 𝗦 𝗧 𝗥 𝗢 🌼\n`
regbot += `_____________________\n`
regbot += `🌼 𝗡𝗼𝗺𝗯𝗿𝗲: ${name}\n`
regbot += `🌼 𝗘𝗱𝗮𝗱: ${age} años\n`
regbot += `_____________________\n`
regbot += ` 𝗥𝗲𝗰𝗼𝗺𝗽𝗲𝗻𝘀𝗮𝘀:\n`
regbot += `🌼 ${currency} 50\n`
regbot += `🌼 Experiencia 245\n`
regbot += `_____________________\n`
await m.react('📩')
await conn.sendMini(m.chat, 'Registrado 🌼', botname, regbot, avatar, avatar, channel, m)
}
handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar'] 

export default handler
