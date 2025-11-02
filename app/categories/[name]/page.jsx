"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import Post from "../../components/Post";

export default function Home() {
  const [writeups, setWriteups] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const params = useParams();

  useEffect(() => {
    const handleGetWriteups = async () => {
    const decoded_category = decodeURIComponent(params.name);
      try {
        const response = await axios.post("/api/writeups/get/category" , {
            category : decoded_category
        });

        setWriteups(response.data.message);
      } catch (e) {
        console.log(e);
      }
    };

    handleGetWriteups();
  }, []);

  useEffect(() => {
    const handleGetWriteups = async () => {
      try {
        const response = await axios.post("/api/writeups/search" , {
          query : searchQuery
        });

        setWriteups(response.data.message);
      } catch (e) {
        console.log(e);
      }
    };

    handleGetWriteups();

  }, [searchQuery]);

  return (
    <>

      <div className="flex flex-row items-center justify-center gap-3 mt-10">

        <input type="text" className="rounded-lg w-96 pl-3 h-10 ring-gray-600 border-gray-600 border" id="searchQuery" name="searchQuery" onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search what you need ..." />

        <button className="w-36 h-10 rounded-xl text-black ms-3 cursor-pointer duration-700">
          <Link href={"/categories"}>
            Categories
          </Link>
        </button>


      </div>

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

      <br />
    </>
  );
}
