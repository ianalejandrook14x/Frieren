import { createHash } from 'crypto';

const Reg = /\|?(.*)([.|] *?)([0-9]*)$/i;

const handler = async function (m, { conn, text, usedPrefix, command }) {
    if (!text || typeof text !== 'string') {
        return m.reply('🌼 El formato del texto es inválido. Por favor, inténtelo nuevamente.');
    }

    const match = text.match(Reg);
    if (!match) return m.reply(`🌼 El formato del texto es incorrecto. Use: ${usedPrefix + command} nombre.edad`);
    let [_, name, splitter, age] = match;

    if (!name) return m.reply('🌼 El nombre no puede estar vacío.');
    if (!age) return m.reply('🌼 La edad no puede estar vacía.');
    if (name.length >= 100) return m.reply('🌼 El nombre es demasiado largo.');
    
    age = parseInt(age);
    if (age > 1000) return m.reply('🌼 El abuelo quiere jugar al bot :D');
    if (age < 5) return m.reply('🌼 No se permiten niños.');

    const user = global.db.data.users[m.sender];
    if (user.registered) return m.reply(`🌼 Ya estás registrado. Usa ${usedPrefix}unreg para eliminar tu registro.`);
    
    const bioInfo = await conn.fetchStatus(m.sender).catch(() => null);
    const bio = bioInfo && bioInfo.status ? bioInfo.status : 'Es privada';
    const fechaBio = bioInfo && bioInfo.setAt
        ? new Date(bioInfo.setAt).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })
        : 'Fecha no disponible';

    user.name = name + '✓'.trim();
    user.age = age;
    user.descripcion = bio;
    user.regTime = +new Date();
    user.registered = true;
    global.db.data.users[m.sender].yenes += 40;
    global.db.data.users[m.sender].exp += 300;

    const sn = createHash('md5').update(m.sender).digest('hex').slice(0, 20);
    const botname = global.botname || 'Mi Bot';
    const image = 'https://files.catbox.moe/xr2m6u.jpg';

    const regbot = `
🌼 𝗥 𝗘 𝗚 𝗜 𝗦 𝗧 𝗥 𝗔 𝗗 𝗢 🌼
___________________
𝗡𝗼𝗺𝗯𝗿𝗲 » ${name}
𝗘𝗱𝗮𝗱 » ${age} años
___________________
𝗥𝗲𝗰𝗼𝗺𝗽𝗲𝗻𝘀𝗮𝘀:
> 🌼 *Yenes* » 40
> 🌼 *Experiencia* » 300
___________________
${global.dev || ''}
`;

    await m.react('📩');
    await conn.sendMini(m.chat, '☁ REGISTRADO ☁', botname, image, image, regbot, m);
};

handler.help = ['reg'];
handler.tags = ['rg'];
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar'];

export default handler;
