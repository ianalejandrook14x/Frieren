import fetch from 'node-fetch';
import yts from 'yt-search';  // Importamos el paquete yt-search

let handler = async (m, { conn, args }) => {
  let username = m.pushName || 'User';
  let pp = 'https://qu.ax/hMOxx.jpg';
  let thumbnail = await (await fetch(pp)).buffer();

  if (!args[0]) {
    let txt = `🌼 *Ingresa el nombre de lo que quieres buscar* :D`;

    const anu = {
      key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        remoteJid: "0@s.whatsapp.net"
      },
      message: {
        groupInviteMessage: {
          groupJid: "6285240750713-1610340626@g.us",
          inviteCode: "mememteeeekkeke",
          groupName: "P",
          caption: "Itsuki",
          jpegThumbnail: thumbnail
        }
      }
    };

    return conn.sendMessage(m.chat, {
      text: txt,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363344288629189@newsletter',
          newsletterName: 'MULTI-BOTS OFC ☁',
          serverMessageId: -1
        }
      }
    }, { quoted: anu });
  }

  await m.react('✅');
  try {
    let query = args.join(" ");

    // Usamos yt-search para obtener resultados
    let searchResults = await yts(query);

    if (!searchResults || !searchResults.videos || searchResults.videos.length === 0) {
      const anu = {
        key: {
          fromMe: false,
          participant: "0@s.whatsapp.net",
          remoteJid: "0@s.whatsapp.net"
        },
        message: {
          groupInviteMessage: {
            groupJid: "6285240750713-1610340626@g.us",
            inviteCode: "mememteeeekkeke",
            groupName: "P",
            caption: "No se encontraron resultados",
            jpegThumbnail: thumbnail
          }
        }
      };

      return conn.sendMessage(m.chat, {
        text: `No se encontraron resultados, ${username}.`,
        quoted: anu
      }, { quoted: anu }).then(_ => m.react('✖️'));
    }

    let video = searchResults.videos[0];  // Tomamos el primer video de los resultados
    let videoImg = await (await fetch(video.thumbnail)).buffer();

    let txt = `*\`Y O U T U B E - P L A Y\`*\n\n`;
    txt += `*\`Título:\`* ${video.title}\n`;
    txt += `*\`Duración:\`* ${parseDuration(video.timestamp)}\n`;
    txt += `*\`Canal:\`* ${video.author.name || 'Desconocido'}\n`;
    txt += `*\`Url:\`* ${video.url}\n\n`;

    await conn.sendMessage(m.chat, {
      image: videoImg,
      caption: txt,
      footer: 'Selecciona una opción',
      buttons: [
        {
          buttonId: `.ytmp3 ${video.title}`,
          buttonText: {
            displayText: '🌼 Audio',
          },
        },
        {
          buttonId: `.ytmp4 ${video.title}`,
          buttonText: {
            displayText: '☁ Video',
          },
        },
      ],
      viewOnce: true,
      headerType: 4,
    }, { quoted: m });

    await m.react('✅');
  } catch (e) {
    console.error('Error en el handler:', e);
    await m.react('✖️');

    const anu = {
      key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        remoteJid: "0@s.whatsapp.net"
      },
      message: {
        groupInviteMessage: {
          groupJid: "6285240750713-1610340626@g.us",
          inviteCode: "mememteeeekkeke",
          groupName: "P",
          caption: "Error al buscar el video",
          jpegThumbnail: thumbnail
        }
      }
    };

    conn.sendMessage(m.chat, {
      text: `Error al buscar el video, ${username}. Verifica la consulta o inténtalo de nuevo.`,
      quoted: anu
    }, { quoted: anu });
  }
};

handler.help = ['play *<texto>*'];
handler.tags = ['dl'];
handler.command = ['play', 'play2'];

export default handler;

function parseDuration(duration) {
  let parts = duration.split(':').reverse();
  return parts.reduce((total, part, index) => total + parseInt(part) * Math.pow(60, index), 0);
}
