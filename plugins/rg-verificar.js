import db from '../lib/database.js'
import fs from 'fs'
import PhoneNumber from 'awesome-phonenumber'
import { createHash } from 'crypto'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async function (m, { conn, text, usedPrefix, command }) {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let mentionedJid = [who]
  let bio = 0, fechaBio
  let sinDefinir = '😿 Es privada'
  let biografia = await conn.fetchStatus(m.sender).catch(() => null)
  if (!biografia || !biografia[0] || biografia[0].status === null) {
    bio = sinDefinir
    fechaBio = "Fecha no disponible"
  } else {
    bio = biografia[0].status || sinDefinir
    fechaBio = biografia[0].setAt ? new Date(biografia[0].setAt).toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" }) : "Fecha no disponible"
  }

  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)
  if (user.registered === true) return m.reply(`🍭 Ya estás registrado.\n\n*¿Quiere volver a registrarse?*\n\nUse este comando para eliminar su registro.\n*${usedPrefix}unreg*`)
  if (!Reg.test(text)) return m.reply(`🍭 Formato incorrecto.\n\nUso del comando: *${usedPrefix + command} nombre.edad*\nEjemplo : *${usedPrefix + command} ${name2}.18*`)
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) return m.reply('🍭 El nombre no puede estar vacío.')
  if (!age) return m.reply('🍭 La edad no puede estar vacía.')
  if (name.length >= 100) return m.reply('🍭 El nombre es demasiado largo.')
  age = parseInt(age)
  if (age > 1000) return m.reply('🍬 Wow el abuelo quiere jugar al bot.')
  if (age < 5) return m.reply('🍬 Hay un abuelo bebé jsjsj.')

  user.name = name + '✓'.trim()
  user.age = age
  user.descripcion = bio
  user.regTime = +new Date
  user.registered = true
  global.db.data.users[m.sender].coin += 40
  global.db.data.users[m.sender].exp += 300
  global.db.data.users[m.sender].joincount += 20

  let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 20)
  let regbot = `✨ 𝗥 𝗘 𝗚 𝗜 𝗦 𝗧 𝗥 𝗔 𝗗 𝗢 ✨\n`
  regbot += `•┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄•\n`
  regbot += `「☁️」𝗡𝗼𝗺𝗯𝗿𝗲 » ${name}\n`
  regbot += `「🪐」𝗘𝗱𝗮𝗱 » ${age} años\n`
  regbot += `•┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄•\n`
  regbot += `「🎁」 𝗥𝗲𝗰𝗼𝗺𝗽𝗲𝗻𝘀𝗮𝘀:\n`
  regbot += `> • 💸 *${moneda}* » 40\n`
  regbot += `> • ✨ *Experiencia* » 300\n`
  regbot += `> • ⚜️ *Tokens* » 20\n`
  regbot += `•┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄•\n`

  await m.react('📩')

  // Envía el mensaje junto con la imagen global
  await conn.sendMessage(m.chat, {
    image: { url: global.banner }, // Asegúrate de que global.image contenga la URL o ruta de la imagen
    caption: regbot
  }, { quoted: m })
}

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar']

export default handler
