import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";

const POST = async (req) => {
  try {
    const { token } = await req.json();
    await dbConnect();

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ message: "Invalid or expired token" }),
        { status: 400 }
      );
    }

    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    user.is_verified = true;
    await user.save();

    return new Response(
      JSON.stringify({ message: "Account verified successfully" }),
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
