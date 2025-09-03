import bcrypt from "bcryptjs"
import dbConnect from "../lib/mongodb.js";
import User from "../models/User.js"

async function main() {
  await dbConnect()
  const hashedPassword = await bcrypt.hash("1234", 10)
  const user = await User.create({
    name: "Admin",
    email: "admin@example.com",
    password: hashedPassword,
  })
  console.log("✅ User created:", user)
  process.exit()
}

main()
