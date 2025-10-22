import dbConnect from "../../../lib/mongodb";
import Writeup from "../../../models/Writeup";
import Like from "../../../models/Like";
import { getToken } from "next-auth/jwt";


const POST = async (req) => {

    const { title } = await req.json();

    const secret = process.env.NEXTAUTH_SECRET;

    const token = await getToken({ req, secret, raw: false });


    const user_name = token.name;

    await dbConnect();

    const find_like = await Like.findOne({ post_title: title , username: user_name })

    if (find_like) {

        return new Response(JSON.stringify({message : "liked"}));

    } else {

        return new Response(JSON.stringify({message : "did not like"}));

    }

}


export { POST };