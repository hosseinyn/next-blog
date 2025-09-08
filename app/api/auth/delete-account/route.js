import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";

const POST = async (req) => {

    await dbConnect();

    const { email } = await req.json();

    const user_profile = await User.findOneAndDelete({ email });

    return new Response(JSON.stringify({message : "account deleted successfully"}) , { status: 200 });
}

export { POST };