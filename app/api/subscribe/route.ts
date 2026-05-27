import  { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json();
  console.log(`Received subscription request for email: ${email}`);

  const resend = new Resend(process.env.RESEND_API_KEY!);



  // 1. create an account on Resend and get your API key
  const {error:CreateError} = await resend.contacts.create({
    email: email,
  });

  if (CreateError) {
    console.error("Error creating contact:", CreateError);
    return new NextResponse("Error creating contact", { status: 500 });
  }

  // 2. add account to contact list
  const {error:AddError} = await resend.contacts.segments.add({
    email:email,
    segmentId: process.env.SEGMENT_ID!,
  })

  if (AddError) {
    console.error("Error adding contact to segment:", AddError);
    return new NextResponse("Error adding contact to segment", { status: 500 });
  }



  // Here you would typically add the email to your database or a service like Mailchimp
  return new NextResponse(JSON.stringify({ message: "Subscription successful!" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

