import fetch from 'node-fetch';
import yts from 'yt-search';

let handler = async (m, { conn, args }) => {
  if (!args[0]) return m.reply('🌼 *Ingresa el nombre de lo que quieres buscar* :D');

  let query = args.join(' ');
  let searchResults = await yts(query);
  if (!searchResults.videos.length) return m.reply('🌼 *No se encontraron resultados*');

  let video = searchResults.videos[0];
  let message = `*\`TITULO:\`* ${video.title}\n*\`DURACIÓN:\`* ${video.timestamp}\n*\`CANAL\`* ${video.author.name}\n*\`URL:\`* ${video.url}\n\n*Reacciona con:*\n❤ para *AUDIO*\n👍 para *VIDEO*`;
  let msg = await conn.sendMessage(m.chat, { image: { url: video.thumbnail }, caption: message }, { quoted: m });

  global.youtubeDownloads = global.youtubeDownloads || {};
  global.youtubeDownloads[msg.key.id] = { url: video.url, chat: m.chat };

  await m.react('☁');
};

handler.command = ['play'];
export default handler;

async function reactionHandler(m, conn) {
  if (!m.message || !m.message.key || !m.message.reaction) return;
  
  let data = global.youtubeDownloads?.[m.message.key.id];
  if (!data) return;

  let isAudio = m.message.reaction.text === '❤';
  let isVideo = ['👍', '👍🏻', '👍🏼', '👍🏽', '👍🏾', '👍🏿'].includes(m.message.reaction.text);
  if (!isAudio && !isVideo) return;

  let endpoint = isAudio ? 'ytplaymp3' : 'ytplaymp4';
  let apiUrl = `https://api.vreden.web.id/api/${endpoint}?query=${encodeURIComponent(data.url)}`;

  try {
    let response = await fetch(apiUrl);
    let json = await response.json();
    
    if (!json.result || !json.result.download) {
      await conn.sendMessage(data.chat, { text: 'Error al realizar la descarga' });
      return;
    }

    let media = isAudio 
      ? { audio: { url: json.result.download.url }, mimetype: 'audio/mpeg' } 
      : { video: { url: json.result.download.url }, mimetype: 'video/mp4' };

    await conn.sendMessage(data.chat, media, { quoted: m });
    await m.react('✅');
  } catch (error) {
    console.error(error);
    await conn.sendMessage(data.chat, { text: 'Error al realizar la descarga' });
    await m.react('❌');
  }
}
