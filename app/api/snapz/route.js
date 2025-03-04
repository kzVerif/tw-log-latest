import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET() {
  return NextResponse.json({ Messaage: "Bello" });
}


export async function POST(req) {
  const data = await req.json();
  const decode = jwt.decode(data.message);

  if (!decode) {
    return NextResponse.json({ error: "Invalid JWT payload" }, { status: 400 });
  }

  let fee = ((decode.amount / 100)*0.029)

  if (fee >= 10) {
    fee = 10
  }

  const img = 'https://scontent.fphs2-1.fna.fbcdn.net/v/t39.30808-6/462616249_541697328509856_2799699175154810675_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEmTATsblWBNpWoLTUXdxw_oqbuxHEGluKipu7EcQaW4rKlFq-4isjyWUarFaCaJuN4fDE54m4Yas-2kxlbGhzK&_nc_ohc=ybadTNq_hYUQ7kNvgF39iZK&_nc_oc=AdhrKjysUJCOPLmdDJxdv79xgDTvo8TNUs7_KOIYmQTW00Kwq5jz5woo0iVPqfIoHgVZ9Iqu0qs6gNccmYFAeqEB&_nc_zt=23&_nc_ht=scontent.fphs2-1.fna&_nc_gid=AaiNYYwK12n6H1-gHwt9fAR&oh=00_AYCT9sTJs3CscFnqBuGYNYAWjsat6j6AMthCwWmJybEFtA&oe=67CCC9DF'
  const url = 'https://discord.com/api/webhooks/1346462711340466216/pJsD8IPX3uZUlBnIu3F49HHoPhTgzIEJ8oSh5FHU_EDri1ryZQISpX5lXKLwhJdwrLV3'
  const send = {
    username: "Snapz-BOT",
    embeds: [
        {
            avatar_url: img,
            title: "📢 **แจ้งเตือนการรับเงิน True Wallet**",
            color: 0x00ff00,  // สีเขียว
            fields: [
                {
                    name: "__ช่องทางการรับ__",
                    value: `*${decode.event_type}*`,
                    inline: true
                },
                {
                    name: "__จำนวนเงิน__",
                    value: `**฿${((decode.amount / 100)).toLocaleString()}**`,
                    inline: false
                },
                {
                    name: "__เบอร์ผู้โอน__",
                    value: `**${decode.sender_mobile || 'ไม่ระบุ'}**`,
                    inline: false
                },
                {
                    name: "⏱ เวลาที่ได้รับ",
                    value: `<t:${Math.floor(new Date(decode.received_time).getTime() / 1000)}:F>`,
                }
            ],
            footer: {
                text: "Powered by KzVrf.",
                icon_url: "https://i.imgur.com/fKL31aD.jpg"
            }
        }
    ]
  };

  await fetch(
    url,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(send),
    }
  );

  return NextResponse.json({ decode });
}
