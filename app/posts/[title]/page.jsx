"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import MDEditor from "@uiw/react-md-editor";
import Link from "next/link";

const page = () => {
  const { data: session, status } = useSession();

  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
    }
  }, [session]);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [username, setUsername] = useState("");
  const [date, setDate] = useState("");
  const [likes, setLikes] = useState(0);
  const [category, setCategory] = useState("");

  function formatDateOnly(timestamp) {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    const handleGetWriteupInformation = async () => {
      const decoded_title = decodeURIComponent(params.title);
      try {
        let response = await axios.post("/api/writeups/get/post", {
          title: decoded_title,
        });

        const writeup_data = response.data.message;

        setTitle(writeup_data.title);
        setText(writeup_data.text);
        setUsername(writeup_data.user_name);
        setDate(formatDateOnly(writeup_data.createdAt));
        setLikes(writeup_data.likes);
        setCategory(writeup_data.category);
      } catch (e) {
        console.log(e);
      }
    };

    handleGetWriteupInformation();
  }, []);

  return (
    <div className="flex flex-col gap-3 p-3 mt-10 justify-center items-center">
      <h1 className="text-5xl text-center text-wrap">{title}</h1>

      <span
        className="flex flex-row gap-3 mt-10 items-center rounded-xs p-3"
        style={{
          borderBottom: "1px solid #F2F2F2",
          borderTop: "1px solid #F2F2F2",
          width: "70%",
        }}
      >
        <Link href={`/user/${username}`} className="flex gap-3 items-center">
          <Image src={"/user.png"} width={40} height={40} alt={title} />

          <h3 className="text-xl">{username}</h3>
        </Link>

        <button className="w-20 h-10 border-gray-400 border-solid border hover:bg-gray-400 duration-700 rounded-full cursor-pointer">
          Follow
        </button>

        <span>Published at : {date}</span>

        <span>Category : {category}</span>
      </span>

      <br />

      <div data-color-mode="light" className="flex items-center justify-center">
        <MDEditor.Markdown
          source={text}
          style={{ whiteSpace: "normal", fontSize: "16px", width: "100%" }}
          className="ms-1 text-left"
        />
      </div>

      <br />
      <br />
    </div>
  );
};

export default page;
