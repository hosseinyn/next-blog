import dbConnect from "../../../../lib/mongodb";
import Follow from "../../../../models/Follow";


const POST = async (req) => {
    const { name } = await req.json();

    await dbConnect();

    const followings = await Follow.find({ user: name });

    return new Response(JSON.stringify({followings : followings}));

}


export { POST };