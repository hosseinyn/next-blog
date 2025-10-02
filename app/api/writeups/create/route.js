import dbConnect from "../../../lib/mongodb";
import Writeup from "../../../models/Writeup";

const POST = async (req) => {
    const data = await req.json();

    await dbConnect();

    const title = data.title;
    const description = data.description;
    const text = data.text;
    const user_name = data.user_name;
    const category = data.category;


    const available_categories = ["Programming" , "Life" , "Science"];

    if (!available_categories.includes(category)) {
        return new Response(JSON.stringify({message : "The category is not valid"}) , { status : 200 });
    }

    const check_writeup_exists_by_title = await Writeup.findOne({ title });

    if (check_writeup_exists_by_title) {
        return new Response(JSON.stringify({message : "This title is already exists."}) , { status: 200 });
    }

    try {

        const writeup = await Writeup.create({
            title : title,
            description : description,
            text : text,
            user_name : user_name,
            category : category,
        })

        if (writeup) {
            return new Response(JSON.stringify({message : "Writeup created successfully"}) , { status: 201 })
        }

    } catch (e) {
        return new Response(JSON.stringify({message : `Error : ${e} `}) , { status: 500 });
    }

}

export { POST };