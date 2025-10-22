"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import MDEditor from "@uiw/react-md-editor";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp , faComment , faShare } from "@fortawesome/free-solid-svg-icons";

const page = () => {
  const { data: session, status } = useSession();

  const params = useParams();
  const router = useRouter();

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    if (!session) {
    } else {

      const handleGetFollowings = async () => {
          try {
            const response = await axios.post("/api/user/get-info/followings", {
              name: session.user.name,
            });
      
            if (response.data.followings) {
              const followings = response.data.followings;

              if(followings.some(item => item.user === session.user.name)) {
                setIsFollowed(true);

              } else {

                setIsFollowed(false);

              }

            }
          } catch (e) {
            console.log(e);
          }
        };

        handleGetFollowings();

    }
  }, [session]);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [username, setUsername] = useState("");
  const [date, setDate] = useState("");
  const [likes, setLikes] = useState(0);
  const [category, setCategory] = useState("");
  const [isFollowed , setIsFollowed] = useState(false);
  const [isLiked , setIsLiked] = useState(false);

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

  useEffect(() => {

    const handleCheckLike = async () => {
      try {

        const response = await axios.post("/api/writeups/check-like" , {
          title: title
        } , {
          withCredentials: true
        })

        if (response.data.message == "liked") {
          setIsLiked(true);

        } else {

          setIsLiked(false);
          
        }

      } catch (e) {

        console.log(e);

      }
    }

    handleCheckLike();

  } , [title])

  const handleFollow = async () => {
    try {
      const response = await axios.post(
        "/api/user/follow",
        {
          username: username,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.message == "Followed") {
        setIsFollowed(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleUnfollow = async (name) => {
      try {
        const response = await axios.post("/api/user/unfollow", {
          username: name,
        });
  
        if ((response.data.message = "Unfollow")) {
          setIsFollowed(false);
        }
      } catch (e) {
        console.log(e);
      }
    };

  
  const handleLike = async () => {
    try{

      const response = await axios.post("/api/writeups/add-like" , {
        title: title
      } , {
        withCredentials: true,
      });

      if (response.data.message == "done") {
        setLikes(likes + 1)
        setIsLiked(true)
      }

    } catch (e) {

      console.log(e);

    }
  }

  const handleDisLike = async () => {
    try{

      const response = await axios.post("/api/writeups/dislike" , {
        title: title
      } , {
        withCredentials: true,
      });

      if (response.data.message == "done") {
        setLikes(likes - 1)
        setIsLiked(false)
      }

    } catch (e) {

      console.log(e);

    }
  }

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

        
        {session && session.user.name != username && !isFollowed && (
          <button
            onClick={handleFollow}
            className="w-20 h-10 border-gray-400 border-solid border hover:bg-gray-400 duration-700 rounded-full cursor-pointer"
          >
            Follow
          </button>
        )}

        {session && session.user.name != username && isFollowed && (
          <button
            onClick={() => handleUnfollow(username)}
            className="w-20 h-10 border-gray-400 border-solid border hover:bg-gray-400 duration-700 rounded-full cursor-pointer"
          >
            Unfollow
          </button>
        )}

        {!session && (
          <Link href={"/login"}>
            <button className="w-20 h-10 border-gray-400 border-solid border hover:bg-gray-400 duration-700 rounded-full cursor-pointer">
              Follow
            </button>
          </Link>
        )}

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

      <div className="flex flex-row mt-7 gap-6 items-center justify-center">
        
        {!isLiked && <div className="flex flex-col gap-2 items-center justify-center">
          {session && username != session.user.name && <FontAwesomeIcon onClick={handleLike} className="cursor-pointer" icon={faThumbsUp} />}
          {session && username == session.user.name && <FontAwesomeIcon icon={faThumbsUp} />}
          {!session && <FontAwesomeIcon icon={faThumbsUp} />}
          <span>Like {likes | 0}</span>
        </div>}

        {isLiked && session && username != session.user.name && <div className="flex flex-col gap-2 items-center justify-center">
          <FontAwesomeIcon style={{color : "red"}} onClick={handleDisLike} className="cursor-pointer" icon={faThumbsUp} />
          <span>Likes {likes | 0}</span>
        </div>}
        
        <div className="flex flex-col gap-2 items-center justify-center">
          <FontAwesomeIcon className="cursor-pointer" icon={faComment} />
          <span>Comment</span>
        </div>

        <div className="flex flex-col gap-2 items-center justify-center">
          <FontAwesomeIcon className="cursor-pointer" icon={faShare} />
          <span>Share</span>
        </div>

      </div>

      <br />
      <br />
    </div>
  );
};

export default page;
