let handler = async (m, { conn }) => {
    const chats = global.db.data.chats;
    
   
    const isROwner = m.fromMe || global.owner?.includes(m.sender);
  
    if (/^\.chat_baneado$/i.test(m.text)) {
     
      let bannedChats = Object.entries(chats)
        .filter(([id, data]) => data.isBanned)
        .map(([id, data]) => `${id} (${data.name || '✦'})`);
      
      if (bannedChats.length === 0) {
        return conn.reply(m.chat, '*✦ No se encontraron chats baneados*', m);
      }
      
      let message = `✦ *Lista de chats baneados:*\n\n${bannedChats.join('\n')}`;
      return conn.reply(m.chat, message, m);
    }
  
    if (/^\.unbanchat_all$/i.test(m.text)) {
  
      for (let id in chats) {
        chats[id].isBanned = false;
      }
      return conn.reply(m.chat, '✦ *Todos los chats han sido desbaneados.*', m);
    }
  };

  handler.command = ['chat_baneado', 'unbanchat_all'];
  handler.rowner = true;
  
  export default handler;
  
