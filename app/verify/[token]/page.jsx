"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

const page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();

  const [userEmail, setUserEmail] = useState("");
  const [verifyResult, setVerifyResult] = useState("");
  const [alert , setAlert] = useState("");

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session]);

  useEffect(() => {
    const handleCheckToken = async () => {
      let response = await axios.post("/api/verify/check", {
        token: params.token,
      });

      if (response.data.message == "Account verified successfully") {
        setVerifyResult("success");
      } else if (response.data.message == "Invalid or expired token") {
        setVerifyResult("fail");
      }
    };

    handleCheckToken();
  }, []);

  const handleSendEmail = async (e) => {
    e.preventDefault();

    let send_verify_link = await axios.post("/api/verify/signup", {
      email: userEmail,
    });

    setAlert("Email will send if user exists");

  };

  return (
    <>
      {status == "loading" && (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 gap-3 mt-10 mb-10">
          Loading...
        </div>
      )}
      {status != "loading" && status != "authenticated" && (
        <>
          {verifyResult == "success" && (
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 gap-3 mt-1 mb-10">
              <a
                href="https://www.flaticon.com/free-icons/success"
                title="success icons"
              >
                <Image
                  src="/check.png"
                  width={100}
                  height={100}
                  alt="success"
                />
              </a>

              <h2 className="text-4xl text-center">
                Account verified successfully!
              </h2>

              <p className="text-center w-2xl">
                Now , you can login to your account and start using next blog !
              </p>

              <Link href="/login">
                <button className="w-44 h-10 bg-gray-500 hover:bg-gray-600 rounded-xl text-white cursor-pointer duration-700 mt-1">
                  Back to login page
                </button>
              </Link>
            </div>
          )}

          {verifyResult == "fail" && (
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 gap-3 mt-1 mb-10">
              <a
                href="https://www.flaticon.com/free-icons/delete"
                title="delete icons"
              >
                <Image
                  src="/check.png"
                  width={100}
                  height={100}
                  alt="success"
                />
              </a>

              <h2 className="text-4xl text-center">
                Token is not valid or expired!
              </h2>

              <p className="text-center w-2xl">
                We can send another verify email.
              </p>

              <form onSubmit={handleSendEmail}>
                <label htmlFor="email">Your email : </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email..."
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 outline-none"
                  onChange={(e) => setUserEmail(e.target.value)}
                />

                {alert != "" && <p className="text-green-600 mt-1">{alert}</p>}

                <button
                  type="submit"
                  className="w-44 h-10 bg-gray-500 hover:bg-gray-600 rounded-xl text-white cursor-pointer duration-700 mt-1"
                >
                  Send
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default page;
