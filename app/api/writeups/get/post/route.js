import dbConnect from "../../../../lib/mongodb";
import Writeup from "../../../../models/Writeup";

const POST = async (req) => {
  try {
    const { title } = await req.json();
    await dbConnect();

    const writeup = await Writeup.findOne({
      title
    });

    if (!writeup) {
      return new Response(
        JSON.stringify({ message: "No writeup" }),
        { status: 400 }
      );
    }



    return new Response(
      JSON.stringify({ message: writeup }),
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
