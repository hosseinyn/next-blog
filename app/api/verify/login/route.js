import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";

const POST = async (req) => {
    const { email } = await req.json();

    await dbConnect();

    const user_profile = await User.findOne({ email });
    if (!user_profile) {
        return new Response(JSON.stringify({message : "error"}) , { status: 200 });
    }

    if (user_profile.is_verified) {
        return new Response(JSON.stringify({message : "verified"}) , { status: 200 });
    } else {
        return new Response(JSON.stringify({message : "not verified"}));
    }

} 

export { POST }