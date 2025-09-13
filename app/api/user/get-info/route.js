import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";


const POST = async (req) => {
    const { name } = await req.json();

    await dbConnect();

    const user_profile = await User.findOne({ name });

    return new Response(JSON.stringify({followers_count: (await user_profile).followers_count , followings_count : user_profile.followings_count}));

}


export { POST };