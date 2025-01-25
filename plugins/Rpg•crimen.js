let cooldowns = {}

let handler = async (m, { conn, text, command, usedPrefix }) => {
let users = global.db.data.users
let senderId = m.sender
let senderName = conn.getName(senderId)

let tiempo = 5 * 60
if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempo * 1000) {
let tiempo2 = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempo * 1000 - Date.now()) / 1000))
m.reply(`Debes esperar *${tiempo2}* para cometer otro crimen`)
return
}
cooldowns[m.sender] = Date.now()
let senderYenes = users[senderId].yenes || 0
let randomUserId = Object.keys(users)[Math.floor(Math.random() * Object.keys(users).length)]
while (randomUserId === senderId) {
randomUserId = Object.keys(users)[Math.floor(Math.random() * Object.keys(users).length)]}
let randomUserYenes = users[randomUserId].yenes || 0
let minAmount = 15
let maxAmount = 50
let amountTaken = Math.floor(Math.random() * (maxAmount - minAmount + 1)) + minAmount
let randomOption = Math.floor(Math.random() * 3)
switch (randomOption) {
case 0:
users[senderId].yenes += amountTaken
users[randomUserId].yenes -= amountTaken
conn.sendMessage(m.chat, {
text: `✦ Lograste cometer tu crimen, acabas de robar *${amountTaken} ${currency}* a @${randomUserId.split("@")[0]}\n\nSe suman *+${amountTaken} ${currency}* a ${senderName}.`,
contextInfo: { 
mentionedJid: [randomUserId],
}}, { quoted: fkontak })
break
case 1:
let amountSubtracted = Math.min(Math.floor(Math.random() * (senderYenes - minAmount + 1)) + minAmount, maxAmount)
users[senderId].yenes -= amountSubtracted
conn.reply(m.chat, `✦ No fuiste cuidadoso y te atraparon mientras cometias tu crimen, se restaron *-${amountSubtracted} ${currency}* a ${senderName}.`, m, )
break
case 2:
let smallAmountTaken = Math.min(Math.floor(Math.random() * (randomUserYenes / 2 - minAmount + 1)) + minAmount, maxAmount)
users[senderId].yenes += smallAmountTaken
users[randomUserId].yenes -= smallAmountTaken
conn.sendMessage(m.chat, {
text: `✦ Lograste cometer tu crimen con exito, pero te descubrieron y solo lograste tomar *${smallAmountTaken} ${currency}* de @${randomUserId.split("@")[0]}\n\nSe suman *+${smallAmountTaken} ${currency}* a ${senderName}.`,
contextInfo: { 
mentionedJid: [randomUserId],
}}, { quoted: fkontak })
break
}
global.db.write()}

handler.tags = ['rpg']
handler.help = ['crimen']
handler.command = ['crimen', 'crime']
handler.register = true
handler.group = true

export default handler

function segundosAHMS(segundos) {
let horas = Math.floor(segundos / 3600)
let minutos = Math.floor((segundos % 3600) / 60)
let segundosRestantes = segundos % 60
return `${minutos} minutos y ${segundosRestantes} segundos`
}
