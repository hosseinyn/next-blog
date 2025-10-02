import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "../styles/category.css";

function formatDateOnly(timestamp) {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const Post = (props) => {
  return (
    <div
      className="flex flex-col gap-4 rounded-xl p-10 category-box cursor-default items-center"
      style={{ minWidth: "36%", maxWidth: "43%" }}
    >
      <h3 className="text-center ms-3 text-5xl mt-1 mb-3">{props.title}</h3>

      <Link href={`/user/${props.username}`}>
        <span className="flex flex-row gap-3 items-center">
          {" "}
          <Image
            src={"/user.png"}
            alt={props.title}
            className="bg-gray-400 rounded-full p-1"
            width={30}
            height={30}
          />{" "}
          {props.username} | {formatDateOnly(props.date)}
        </span>
      </Link>

      <p className="text-center mt-3 ms-3" style={{ width: "99%" }}>
        {props.description}
      </p>

      <Link href={`/categories/${props.category}`}>
        <span>From : {props.category}</span>
      </Link>

      <Link href={`/posts/${props.title}`}>
        <button className="w-44 mt-3 h-10 rounded-xl bg-gray-600 text-white hover:bg-gray-800 ms-3 cursor-pointer duration-700">
          Read More <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </Link>
    </div>
  );
};

export default Post;
