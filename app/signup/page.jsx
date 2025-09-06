"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
// import { useRouter } from "next/navigation";
import axios from "axios";

const page = () => {
  const [registerError, setRegisterError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showVerify, setShowVerify] = useState(false);

  // const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password != confirmPassword) {
      setRegisterError("Passwords don't match.");
      return;
    }

    let response = await axios.post("/api/auth/signup", {
      name: name,
      email: email,
      password: password,
    });

    if (response.data.message == "User created successfully") {
      let send_verify_link = await axios.post("/api/verify/signup", {
        email: email,
      });

      if (send_verify_link.data.message == "sent") {
        setShowVerify(true);
      }
    } else {
      setRegisterError(response.data.message);
    }
  };

  return (
    <>
      {!showVerify && (
        <section className="bg-white mt-14 mb-14">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-600 md:text-2xl text-center">
                  Sign up to Next Blog !
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSignUp}
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Name :
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 outline-none"
                      placeholder="Enter the name..."
                      onChange={(e) => setName(e.target.value)}
                      minLength={"4"}
                      maxLength={"10"}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Email :
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 outline-none"
                      placeholder="youremail@email.com"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Password :
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter your password..."
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 outline-none"
                      onChange={(e) => setPassword(e.target.value)}
                      minLength={"4"}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="confirm_password"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Confirm Password :
                    </label>
                    <input
                      type="password"
                      name="confirm_password"
                      id="confirm_password"
                      placeholder="Repeat your password..."
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 outline-none"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  {registerError != "" && (
                    <p className="text-red-600 mt-1">{registerError}</p>
                  )}

                  <button
                    type="submit"
                    className="text-white bg-gray-600 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 hover:bg-gray-800 focus:outline-none focus:ring-primary-800 duration-700 w-full cursor-pointer"
                  >
                    Sign up
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Do you have an account? {""}
                    <Link
                      href="/login"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Log in
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}

      {showVerify && (
        <>
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 gap-3 mt-1 mb-10">
            <a
              href="https://www.flaticon.com/free-icons/success"
              title="success icons"
            >
              <Image src="/check.png" width={100} height={100} alt="success" />
            </a>

            <h2 className="text-4xl text-center">Signed up successfully!</h2>

            <p className="text-center w-2xl">
              A verification link has been sent for your email. Check your email
              inbox and spams and open the link for verify your account. You
              can't login to your account and use your dashboard until you
              verify your account. Verify link is valid for 4 hours.
            </p>

            <Link href="/login">
              <button className="w-44 h-10 bg-gray-500 hover:bg-gray-600 rounded-xl text-white cursor-pointer duration-700 mt-1">
                Back to login page
              </button>
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default page;
