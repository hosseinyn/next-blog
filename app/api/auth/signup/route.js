import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

const POST = async (req) => {
    const data = await req.json();

    await dbConnect();

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const email = data.email;
    const name = data.name;

    const check_user_exists_by_name = await User.findOne({ name });
    const check_user_exists_by_email = await User.findOne({ email });

    if (check_user_exists_by_name) {
        return new Response(JSON.stringify({message : "This name is already exists."}) , { status: 200 });
    } else if (check_user_exists_by_email) {
        return new Response(JSON.stringify({message : "This email is already exists."}) , { status: 200 });
    }

    try {

        const user = await User.create({
            name : data.name,
            email: data.email,
            password: hashedPassword,
            is_verified: false
        })

        if (user) {
            return new Response(JSON.stringify({message : "User created successfully"}) , { status: 201 })
        }

    } catch (e) {
        return new Response(JSON.stringify({message : `Error : ${e} `}) , { status: 500 });
    }

}

export { POST };