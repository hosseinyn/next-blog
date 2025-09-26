import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

const POST = async (req) => {
    
  try {
    const { current_password , new_password , email } = await req.json();
    await dbConnect();

    const user = await User.findOne({
      email
    });

    bcrypt.compare(current_password, user.password, (err, result) => {
        if (err) {
            return;
        }
   })

    const hashedPassword = await bcrypt.hash(new_password, 10);
    user.password = hashedPassword;
    await user.save();

    return new Response(
      JSON.stringify({ message: "Password changed successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Server error" }),
      { status: 500 }
    );
  }
};

export { POST };
