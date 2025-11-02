import dbConnect from "../../../../lib/mongodb";
import Writeup from "../../../../models/Writeup";

const GET = async (req) => {
  try {

    await dbConnect();

    const writeups = await Writeup.find();

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

export { GET };
