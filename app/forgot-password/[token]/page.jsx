"use client";

import { useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const page = () => {
  const [newPassword, setNewPassword] = useState("");
  const [error , setError] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const router = useRouter();

  const params = useParams();

  const handleChangePassword = async (e) => {
    e.preventDefault();

    

    if (newPassword != confirmNewPassword) {
      setError("Passwords don't match.");
      return;
    }



    let response = await axios.post("/api/reset-password/check" , {
      token: params.token,
      password: newPassword
    })

    if (response.data.message == "Password reset successfully") {
      router.push("/login");

    } else {
      setError("Invalid or expired token");
    }

  }

  return (
    <form className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 gap-3 mt-10 mb-10" onSubmit={handleChangePassword}>
      <h1 className="text-3xl">Change your password</h1>

      <label htmlFor="new_password" className="mt-7">
        Your new password :{" "}
      </label>
      <input
        type="password"
        name="new_password"
        id="new_password"
        placeholder="Enter your new password..."
        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 outline-none"
        onChange={(e) => setNewPassword(e.target.value)}
        required
        minLength={"4"}
      />

      <label htmlFor="confirm_new_password" className="mt-7">
        Confirm your new password :{" "}
      </label>
      <input
        type="password"
        name="confirm_new_password"
        id="confirm_new_password"
        placeholder="Repeat your new password..."
        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 outline-none"
        onChange={(e) => setConfirmNewPassword(e.target.value)}
        required
        minLength={"4"}
      />

      {error != "" && <p className="text-red-600 mt-1">{error}</p>}

      <button
        type="submit"
        className="text-white bg-gray-600 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 hover:bg-gray-800 focus:outline-none focus:ring-primary-800 duration-700 w-48 cursor-pointer mt-3"
      >
        Change your password
      </button>
    </form>
  );
};

export default page;
