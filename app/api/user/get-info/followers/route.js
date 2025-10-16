import dbConnect from "../../../../lib/mongodb";
import Follow from "../../../../models/Follow";


const POST = async (req) => {
    const { name } = await req.json();

    await dbConnect();

    const followers = await Follow.find({ target: name });

    return new Response(JSON.stringify({followers : followers}));

}


export { POST };