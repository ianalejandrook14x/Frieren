const handler = async (m, { conn, text }) => {
    const numberPattern = /\d+/g;
    let user = '';
    const numberMatches = text.match(numberPattern);
    if (numberMatches) {
        const number = numberMatches.join('');
        user = number + '@s.whatsapp.net';
    } else if (m.quoted && m.quoted.sender) {
        const quotedNumberMatches = m.quoted.sender.match(numberPattern);
        if (quotedNumberMatches) {
            const number = quotedNumberMatches.join('');
            user = number + '@s.whatsapp.net';
        } else {
        return conn.sendMessage(m.chat, {text: `*✦ Formato de usuario no reconocido. Responda a un mensaje, etiquete a un usuario o escriba su número de usuario.*`}, {quoted: fkontak});
    }
    } else {
        return conn.sendMessage(m.chat, {text: `✦ *Formato de usuario no reconocido. Responda a un mensaje, etiquete a un usuario o escriba su número de usuario.*`}, {quoted: fkontak});
    }        
        const groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : {};
        const participants = m.isGroup ? groupMetadata.participants : [];
        const users = m.isGroup ? participants.find(u => u.jid == user) : {};
        const userNumber = user.split('@')[0];
        if (!global.global.db.data.users[user] || global.global.db.data.users[user] == '') {
         }
        delete global.global.db.data.users[user];
        conn.sendMessage(m.chat, {text: `✦ *Se eliminaron todos los datos del usuario: @${userNumber}*`, mentions: [user]}, {quoted: fkontak});
};
handler.tags = ['owner'];
handler.command = ['restablecerdatos','deletedatauser','resetuser','borrardatos'];
handler.mods = true;
export default handler;
