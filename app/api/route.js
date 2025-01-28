import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { revalidatePath } from "next/cache";

let trans = [];

export async function GET() {
  return NextResponse.json({ trans });
}

export async function DELETE() {
  trans = [];
  return NextResponse.json({ status: "success" });
}

export async function POST(req) {
  const data = await req.json();
  const decode = jwt.decode(data.message);

  if (!decode) {
    return NextResponse.json({ error: "Invalid JWT payload" }, { status: 400 });
  }

  trans.unshift({
    event_type: decode.event_type,
    received_time: decode.received_time,
    amount: decode.amount,
    sender_mobile: decode.sender_mobile,
  });

  revalidatePath("/");

  const send = {
    username: "MDGP-BOT",
    embeds: [
        {
            avatar_url: "https://cdn.discordapp.com/attachments/1183055670677864559/1333707287646441593/16c9118e7f0d4766.jpg?ex=6799df34&is=67988db4&hm=ae6f0a998bca06dcef3eb84d300ff2cb773469fa478a81f015d0a61d85464660&",
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
                    value: `**฿${(decode.amount / 100).toLocaleString()}**`,
                    inline: true
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
    "https://discord.com/api/webhooks/1333696110283198464/VUMcfFmBfDZJCWg_jJOllZ6kJs5d-qulTqzSqOKOtEAddnPvONxj3-GP5MlJHNhEC8M_",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(send),
    }
  );

  return NextResponse.json({ decode });
}
