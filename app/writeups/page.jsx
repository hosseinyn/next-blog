"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faUsers,
  faBook,
  faBullhorn,
  faThumbsUp,
  faSignOut,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Post from "../components/Post";

const page = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleLogout = () => {
    signOut();
    router.push("/");
  };

  const [writeups, setWriteups] = useState([]);

  useEffect(() => {
    if (!session) {
      router.push("/login");
    } else {
      const handleGetWriteups = async () => {
        try {
          let response = await axios.post("/api/writeups/get", {
            user_name: session.user.name,
          });

          if (response.data.message) {
            setWriteups(response.data.message);
          }
        } catch (e) {
          console.log(e);
        }
      };

      handleGetWriteups();
    }
  }, [session]);

  const handleCreateWriteup = async (e) => {
    e.preventDefault();

    try {
      let response = await axios.post("/api/writeups/create", {
        title: title,
        description: description,
        text: text,
        user_name: session.user.name,
        category: category,
      });

      if (response.data.message == "Writeup created successfully") {
        sleep(1700);
        router.push("/dashboard");
      } else if (response.data.message == "The category is not valid") {
        setError("The category is not valid.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {status != "loading" && status != "unauthenticated" && (
        <>
          <button
            data-drawer-target="default-sidebar"
            data-drawer-toggle="default-sidebar"
            aria-controls="default-sidebar"
            type="button"
            className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-600 dark:focus:ring-gray-600 duration-700"
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              />
            </svg>
          </button>
          <aside
            id="default-sidebar"
            className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
            aria-label="Sidebar"
          >
            <div className="h-full px-3 py-4 overflow-y-auto bg-white dashboard-sidebar">
              <ul className="space-y-2 font-medium">
                <li>
                  <Link
                    href="/dashboard"
                    className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                  >
                    <FontAwesomeIcon
                      icon={faCircleUser}
                      className="text-gray-600"
                    />
                    <span className="ms-3">Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/followers"
                    className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                  >
                    <FontAwesomeIcon icon={faUsers} className="text-gray-600" />
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Followers
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/writeups"
                    className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                  >
                    <FontAwesomeIcon icon={faBook} className="text-gray-600" />

                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Writeups
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/your-ads"
                    className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                  >
                    <FontAwesomeIcon
                      icon={faBullhorn}
                      className="text-gray-600"
                    />

                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Your ads
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/followings"
                    className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                  >
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      className="text-gray-600"
                    />

                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Followings
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    onClick={handleLogout}
                    className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                  >
                    <FontAwesomeIcon
                      icon={faSignOut}
                      className="text-gray-600"
                    />

                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Logout
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/delete-account"
                    className="flex items-center p-2 text-red-700 rounded-lg hover:bg-gray-100 group"
                  >
                    <FontAwesomeIcon icon={faTrash} className="text-red-700" />

                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Delete Account
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </aside>

          <div className="p-4 sm:ml-64">

            <div className="flex flex-row gap-3 mt-6 justify-center flex-wrap">
              {writeups.length > 0 ? (
                writeups.map((item, key) => (
                  <Post
                    title={item.title}
                    username={item.user_name}
                    date={item.createdAt}
                    description={item.description}
                    category={item.category}
                    key={key}
                  />
                ))
              ) : (
                <p className="text-center mt-16 mb-16">No Writeups</p>
              )}
            </div>
            
          </div>
        </>
      )}
    </>
  );
};

export default page;
