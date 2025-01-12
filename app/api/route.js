import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { revalidatePath } from "next/cache";

let trans = []

export async function GET() {
    return NextResponse.json({
        trans
    })
}

export async function DELETE() {
    trans = []
    return NextResponse.json({
        status: "success"
    })
}

// {
//     "event_type": "PROMPTPAY_IN",
//     "received_time": "2022-01-31T13:02:23+0700",
//     "amount": 10000,
//     "sender_mobile": "0123456789",
//     "message": "",
//     "channel": ""
// }
export async function POST(req) {
    const data = await req.json()
    const decode = jwt.decode(data.message)
    trans.unshift({
       event_type: decode.event_type,
       received_time: decode.received_time,
       amount: decode.amount,
       sender_mobile: decode.sender_mobile
    })
    revalidatePath('/')
    return NextResponse.json({
        decode
    })
}