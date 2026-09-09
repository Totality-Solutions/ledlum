import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, product, message } = body;

    if (!name || !email) {
      return Response.json({ error: "Name and email are required" }, { status: 400 });
    }

    await resend.emails.send({
      from: "LEDLUM Website <noreply@ledlumlighting.com>",
      to: "projects@ledlumlighting.com",
      subject: `New Quote Request: ${name}${product ? ` — ${product}` : ""}`,
      html: `
        <h2 style="font-family:sans-serif;color:#1a1a1a;">New Request Quote Submission</h2>
        <table style="font-family:sans-serif;font-size:15px;border-collapse:collapse;width:100%;max-width:560px;">
          <tr><td style="padding:10px 16px;background:#f8f9fa;font-weight:600;width:160px;">Name</td><td style="padding:10px 16px;">${name}</td></tr>
          <tr><td style="padding:10px 16px;background:#f8f9fa;font-weight:600;">Email</td><td style="padding:10px 16px;">${email}</td></tr>
          <tr><td style="padding:10px 16px;background:#f8f9fa;font-weight:600;">Phone</td><td style="padding:10px 16px;">${phone || "—"}</td></tr>
          <tr><td style="padding:10px 16px;background:#f8f9fa;font-weight:600;">Product</td><td style="padding:10px 16px;">${product || "—"}</td></tr>
          <tr><td style="padding:10px 16px;background:#f8f9fa;font-weight:600;">Message</td><td style="padding:10px 16px;">${message || "—"}</td></tr>
        </table>
      `,
    });

    return Response.json({ success: true });
  } catch (error: any) {
    console.error("Quote API error:", error);
    return Response.json({ error: "Server error", message: error.message }, { status: 500 });
  }
}
