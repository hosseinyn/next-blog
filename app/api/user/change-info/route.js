import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";

const POST = async (req) => {
    
  try {
    const { name , email } = await req.json();
    await dbConnect();

    const user = await User.findOne({
      email
    });

    user.email = email;
    user.name = name;
    await user.save();

    return new Response(
      JSON.stringify({ message: "Information changed successfully" }),
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
