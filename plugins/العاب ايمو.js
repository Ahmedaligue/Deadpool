import axios from 'axios';

let timeout = 60000;
let poin = 500;

let handler = async (m, { conn, usedPrefix }) => {
    conn.tekateki = conn.tekateki ? conn.tekateki : {};
    let id = m.chat;
    if (id in conn.tekateki) {
        conn.reply(m.chat, '❐┃لم يتم الاجابة علي السؤال بعد┃❌ ❯', conn.tekateki[id][0]);
        throw false;
    }

    // URL لملف Gist الذي يحتوي على الأسئلة
    let gistUrl = 'https://gist.githubusercontent.com/SHIKA7777/738b20636cfbe0590157b08a668249be/raw/c212c2c0e59be0288ac0fc2508e8781a4b50af4a/gistfile1.txt';

    try {
        let response = await axios.get(gistUrl);
        let tekateki = response.data;
        let json = tekateki[Math.floor(Math.random() * tekateki.length)];
        let _clue = json.response;
        let clue = _clue.replace(/[A-Za-z]/g, '_');
        let caption = ` *~⊹‏⊱≼━━━⌬〔📜〕⌬━━━≽⊰⊹~*
*${command.toUpperCase()}*
*☬↫╎السـؤال ✍🏻⇜『احـزر الشخصيه』*
  *☬↫╎الـوقـت⏱️↫ ${(timeout / 1000).toFixed(2)} ┇*
  *استخدم .انسحب للأنسحاب*
  *☬↫╎الـجـائزة🪙↫ ${poin} نقاط┇*
*~⊹‏⊱≼━━━⌬〔📜〕⌬━━━≽⊰⊹~*
> ©𝐷𝐸𝐴𝐷𝑃𝑂𝑂𝐿 ↯
`.trim();
        let image = 'https://telegra.ph/file/f5c021416da60ccd37f00.jpg'; // رابط الصورة الجديدة
        conn.tekateki[id] = [
            await conn.sendFile(m.chat, image, 'image.jpg', caption, m),
            json, poin,
            setTimeout(async () => {
                if (conn.tekateki[id]) await conn.reply(m.chat, `*⌛انتهي الوقت⌛*\n *الاجـابـة✅ ${json.response}*`, conn.tekateki[id][0]);
                delete conn.tekateki[id];
            }, timeout)
        ];
    } catch (error) {
        console.error('Error fetching Gist data:', error);
        conn.reply(m.chat, '❐┃حدث خطأ أثناء جلب الأسئلة من الملف┃❌', m);
    }
};

handler.help = ['acertijo'];
handler.tags = ['game'];
handler.command = /^(ايمو)$/i;

export default handler;
