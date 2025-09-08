"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { signOut } from "next-auth/react";

const page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [userSure, setUserSure] = useState(false);

  useEffect(() => {
    if (!session && status != "loading") {
      router.push("/login");
    }
  }, []);

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    

    try {
        let response = await axios.post("/api/auth/delete-account" , {
            email : session.user.email
        })

        if (response.data.message == "account deleted successfully") {
            signOut({ redirect: false });
            router.push("/");
        }

    } catch (e) {
        console.log(e)
    }

  }

  return (
    <>
      {status == "loading" && (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          Loading...
        </div>
      )}
      {status == "authenticated" && (
        <div className="mt-10 mb-10 flex flex-col gap-4 items-center">
          <a
            href="https://www.flaticon.com/free-icons/warning"
            title="warning icons"
          >
            <Image src="/alert.png" width={100} height={100} alt="alert" />
          </a>

          <h3 className="text-5xl">Are you sure?</h3>
          <p className="w-3xl text-center mt-1">
            You can't revert your account. All of your information , activities
            , posts and communications will remove from database and{" "}
            <b>NextBlog Forever</b>. So make sure you wan't to delete your
            account before.
          </p>

          <form className="flex gap-7 items-center mt-3" onSubmit={handleDeleteAccount}>
            <div className="flex flex-row gap-3">
              <label htmlFor="sure">
                I'm sure and I wan't to delete my account{" "}
                <b className="text-red-700">*</b>
              </label>
              <input
                type="checkbox"
                id="sure"
                name="sure"
                onChange={() => setUserSure(!userSure)}
                value="sure"
              />
            </div>

            {userSure && (
              <button className="w-44 h-9 rounded-xl cursor-pointer text-white bg-red-600 hover:bg-red-800 duration-700" type="submit">
                Delete my account
              </button>
            )}

            {!userSure && (
              <button
                className="w-44 h-9 rounded-xl text-white bg-red-950"
                disabled
                title="You must accept"
                type="button"
              >
                Delete my account
              </button>
            )}
          </form>
        </div>
      )}
    </>
  );
};

export default page;
