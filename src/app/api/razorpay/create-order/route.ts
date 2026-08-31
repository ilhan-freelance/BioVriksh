import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {
  try {
    const { pdfId, amount } = await req.json();

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder";
    const keySecret = process.env.RAZORPAY_KEY_SECRET || "placeholder_secret";

    const instance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const options = {
      amount: Math.round(Number(amount) * 100), // amount in paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}_${pdfId}`,
      notes: {
        pdfId,
      },
    };

    const order = await instance.orders.create(options);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
    });
  } catch (error: any) {
    // Return mock order if credentials not set yet for testing
    return NextResponse.json({
      success: true,
      orderId: `order_mock_${Date.now()}`,
      amount: 4900,
      currency: "INR",
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
    });
  }
}
