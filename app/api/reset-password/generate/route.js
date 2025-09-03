import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";
import crypto from "crypto";
import nodemailer from "nodemailer";

const POST = async (req) => {
  try {
    const { email } = await req.json();
    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) return new Response(JSON.stringify({ message: "Email will send if user exists" }), { status: 200 }); // hahahaha

    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 1800000;
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

    const resetUrl = `${process.env.NEXT_PUBLIC_URL}/forgot-password/${token}`;

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: user.email,
      subject: "Reset your password | NextBlog",
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. Token is valid for 30 minutes.</p>`,
    });

    return new Response(JSON.stringify({ message: "Email will send if user exists" }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Server Error" }), { status: 500 });
  }
};

export { POST };