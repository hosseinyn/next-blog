import nodemailer from "nodemailer";

function stripHtml(input) {
  if (typeof input !== "string") {
    input = String(input || "");
  }
  return input.replace(/<[^>]*>/g, "");
}

const POST = async (req) => {

    const {name,email,message} = await req.json();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: "New Contact | NextBlog",
      html: `<h4>Name : ${stripHtml(name)}</h4><h4>Email : ${stripHtml(email)}</h4><h3>Message : ${stripHtml(message)}</h3>`,
    });



    return new Response(JSON.stringify({message : "submit"}));

}


export { POST };