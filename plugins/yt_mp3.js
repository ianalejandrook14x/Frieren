import fetch from "node-fetch";
import yts from "yt-search";

let handler = async (m, { conn, text }) => {
  if (!text) {
    return m.reply("*✨ Ingresa el texto de lo que quieres buscar*");
  }

  let ytres = await yts(text);
  let video = ytres.videos[0];

  if (!video) {
    return m.reply("*🌼 Video no encontrado*");
  }

  let { title, duration, url, thumbnail } = video;

  await m.reply(
    `*Título:* ${title}\n*Duración:* ${duration}\n*URL:* ${url}\n\n*✨ Espere un momento...*`
  );

  await conn.sendMessage(m.chat, {
    image: { url: thumbnail },
    caption: `Miniatura de: ${title}`,
  });

  await m.react('🕓');

  try {
    let api = await fetch(`https://api.vreden.web.id/api/ytplaymp3?query=${url}`);
    let json = await api.json();
    let { download } = json.result;

    await conn.sendMessage(m.chat, { audio: { url: download.url }, mimetype: "audio/mpeg" }, { quoted: m });
    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('✖️');
  }
};

handler.command = /^(play)$/i;

export default handler;
