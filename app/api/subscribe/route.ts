export async function POST(request: Request) {
  const { email } = await request.json();
  console.log(`Received subscription request for email: ${email}`);
  // Here you would typically add the email to your database or a service like Mailchimp
  return new Response(JSON.stringify({ message: "Subscription successful!" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}