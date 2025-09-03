import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

const POST = async (req) => {
    const data = await req.json();

    await dbConnect();

    const hashedPassword = await bcrypt.hash(data.password, 10)

    try {

        const user = await User.create({
            name : data.name,
            email: data.email,
            password: hashedPassword
        })

        if (user) {
            return new Response(JSON.stringify({message : "User created successfully"}) , { status: 201 })
        }

    } catch (e) {
        return new Response(JSON.stringify({message : `Error : ${e} `}) , { status: 500 });
    }

}

export { POST };