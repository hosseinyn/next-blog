import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";
import crypto from "crypto";
import nodemailer from "nodemailer";

const POST = async (req) => {
  try {
    const { email } = await req.json();
    await dbConnect();

    const user = await User.findOne({ email });

    const token = crypto.randomBytes(32).toString("hex");
    user.verifyToken = token;
    user.verifyTokenExpiry = Date.now() + 14400000;
    await user.save();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_URL}/verify/${token}`;

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: user.email,
      subject: "Verify your account | NextBlog",
      html: `<p>Click <a href="${resetUrl}">here</a> to verify your account Token is valid for 4 hours.</p>`,
    });

    return new Response(JSON.stringify({ message: "sent" }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: `Server Error ${error}` }), { status: 500 });
  }
};

export { POST };