"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session]);

  return (
    <>
      {status == "loading" && <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 gap-3 mt-10 mb-10">Loading...</div>}
      {status != "loading" && status != "authenticated" && (
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
            inbox and spams and open the link for verify your account. You can't
            login to your account and use your dashboard until you verify your
            account. Verify link is valid for 4 hours.
          </p>

          <Link href="/login">
            <button className="w-44 h-10 bg-gray-500 hover:bg-gray-600 rounded-xl text-white cursor-pointer duration-700 mt-1">
              Back to login page
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default page;
