import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";
import Follow from "../../../models/Follow";
import { getToken } from "next-auth/jwt";

const POST = async (req) => {
  const { username } = await req.json();

  const secret = process.env.NEXTAUTH_SECRET;

  const token = await getToken({ req, secret, raw: false });


  const user_name = token.name;


  await dbConnect();

  const user_profile = await User.findOne({ name: user_name });
  const target_profile = await User.findOne({ name : username });

  user_profile.followings_count = user_profile.followings_count - 1;
  await user_profile.save();

  target_profile.followers_count = target_profile.followers_count - 1;
  await target_profile.save();

  await Follow.findOneAndDelete({ user: user_name , target: username });

  return new Response(JSON.stringify({ message: "Unfollowed" }));
};

export { POST };
