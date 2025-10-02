import dbConnect from "../../../lib/mongodb";
import Writeup from "../../../models/Writeup";

const POST = async (req) => {
  try {
    const { user_name } = await req.json();
    await dbConnect();

    const writeups = await Writeup.find({
      user_name : user_name
    });

    if (!writeups) {
      return new Response(
        JSON.stringify({ message: "No writeups" }),
        { status: 400 }
      );
    }



    return new Response(
      JSON.stringify({ message: writeups }),
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
