import dbConnect from "../../../lib/mongodb";
import Writeup from "../../../models/Writeup";
import Like from "../../../models/Like";
import { getToken } from "next-auth/jwt";


const POST = async (req) => {

    try {

        const { title } = await req.json();

        const secret = process.env.NEXTAUTH_SECRET;

        const token = await getToken({ req, secret, raw: false });


        const user_name = token.name;

        await dbConnect();

        const writeup = await Writeup.findOne({ title });

        writeup.likes = writeup.likes + 1;
        await writeup.save();

        const new_like = await Like.create({
            username: user_name,
            post_title: title,
        });

        return new Response(JSON.stringify({message : "done"}));

    } catch (e) {

        return new Response(JSON.stringify({message : "post not found"}))

    }

}


export { POST };