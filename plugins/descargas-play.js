import fetch from 'node-fetch';
import yts from 'yt-search';

let handler = async (m, { conn, args }) => {
  if (!args[0]) return m.reply('🌼 *Ingresa el nombre de lo que quieres buscar* :D');

  let query = args.join(' ');
  let searchResults = await yts(query);
  if (!searchResults.videos.length) return m.reply('🌼 *No se encontraron resultados*');

  let video = searchResults.videos[0];
  let message = `*\`TITULO:\`* ${video.title}\n*\`DURACIÓN:\`* ${video.timestamp}\n*\`CANAL\`* ${video.author.name}\n*\`URL:\`* ${video.url}\n\n*Reacciona con:*\n❤ para *AUDIO*\n👍 para *VIDEO*\n\n_O responde con "Audio" o "Video" para descargar._`;

  let msg = await conn.sendMessage(m.chat, { image: { url: video.thumbnail }, caption: message }, { quoted: m });

  msg.messageContextInfo = { url: video.url };

  await m.react('☁');
};

handler.command = ['play'];
export default handler;

handler.before = async (m, { conn }) => {
  if (!m.message) return;

  let quoted = m.quoted ? await conn.loadMessage(m.chat, m.quoted.id) : null;
  let isReaction = !!m.message.reaction;
  let isReply = !!quoted;

  if (!isReaction && !isReply) return;

  let msgData = quoted && quoted.messageContextInfo && quoted.messageContextInfo.url ? quoted : null;
  if (!msgData) return;

  let url = msgData.messageContextInfo.url;
  let isAudio = isReaction ? m.message.reaction.text === '❤' : /^(audio|Audio)$/i.test(m.text);
  let isVideo = isReaction ? ['👍', '👍🏻', '👍🏼', '👍🏽', '👍🏾', '👍🏿'].includes(m.message.reaction.text) : /^(video|Video)$/i.test(m.text);
  if (!isAudio && !isVideo) return;

  let endpoint = isAudio ? 'ytplaymp3' : 'ytplaymp4';
  let apiUrl = `https://api.vreden.web.id/api/${endpoint}?query=${encodeURIComponent(url)}`;

  try {
    let response = await fetch(apiUrl);
    let json = await response.json();

    if (!json.result || !json.result.download) {
      await conn.sendMessage(m.chat, { text: 'Error al realizar la descarga' });
      return;
    }

    let media = isAudio 
      ? { audio: { url: json.result.download.url }, mimetype: 'audio/mpeg' } 
      : { video: { url: json.result.download.url }, mimetype: 'video/mp4' };

    await conn.sendMessage(m.chat, media, { quoted: m });
    await m.react('✅');
  } catch (error) {
    console.error(error);
    await conn.sendMessage(m.chat, { text: 'Error al procesar la descarga' });
    await m.react('❌'); 
  }
};
