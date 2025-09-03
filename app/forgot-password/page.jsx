"use client";

import { useState } from "react";
import axios from "axios";

const page = () => {
  const [email, setEmail] = useState("");
  const [alert , setAlert] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    let response = await axios.post("/api/reset-password/generate" , {
        email: email
    })

    if (response.data.message == "Email will send if user exists") {
        setAlert("Email will send if user exists. Check your email inbox and check spams.")
    }

  }

  return (
    <form className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 gap-4" onSubmit={handleForgotPassword}>
      <h1 className="text-3xl">Forgot your password</h1>

      <label htmlFor="email" className="mt-7">Your email : </label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Enter your email..."
        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 outline-none"
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {alert != "" && <p className="text-green-600 mt-1">{alert}</p>}

      <button type="submit" className="text-white bg-gray-600 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 hover:bg-gray-800 focus:outline-none focus:ring-primary-800 duration-700 w-48 cursor-pointer">Submit</button>


    </form>
  );
};

export default page;
