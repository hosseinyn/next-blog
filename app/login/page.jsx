"use client";

import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const page = () => {
  const [loginError, setLoginError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { data: session, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (session && status != "loading") {
      router.push("/dashboard");
    }
  }, [session]);

  const handleLogin = async (e) => {
    e.preventDefault();

    let is_verified_response = await axios.post("/api/verify/login", {
      email: email,
    });

    if (is_verified_response.data.message == "not verified") {
      setLoginError(
        "Your account does not verified. Verify your account before login."
      );
      return;
    } else if (is_verified_response.data.message == "error") {
      setLoginError("Email or password is not correct.");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res.error === null) {
      router.push("/dashboard");
    } else {
      setLoginError("Email or password is not correct.");
    }
  };

  return (
    <>
      {status == "loading" && 
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          Loading...
        </div>
      }
      {!session && status == "unauthenticated" && <section className="bg-white">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-600 md:text-2xl text-center">
                Log in to Next Blog !
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
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
                    minLength={"4"}
                    placeholder="Enter your password..."
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 outline-none"
                    required
                  />

                  {loginError != "" && (
                    <p className="text-red-600 mt-1">{loginError}</p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 ms-1"
                  >
                    Forgot password?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="text-white bg-gray-600 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 hover:bg-gray-800 focus:outline-none focus:ring-primary-800 duration-700 w-full cursor-pointer"
                >
                  Log in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account? {""}
                  <Link
                    href="/signup"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>}
    </>
  );
};

export default page;
