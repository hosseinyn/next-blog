import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "../styles/category.css";

const Category = (props) => {
  return (
    <Link href={`/categories/${props.name}`}>
      <div className="flex flex-col gap-4 w-3xl rounded-xl p-10 category-box cursor-default">
        <a href={props.img_link}>
          <Image
            src={props.image}
            width={400}
            height={600}
            className="ms-3 rounded-xl h-96 w-full hover:opacity-90 duration-700"
            alt={props.name}
          />
        </a>

        <h3 className="text-left ms-3 text-4xl mt-1">{props.name}</h3>

        <p className="text-left ms-3 w-2xl">{props.description}</p>

        <button className="w-44 h-10 rounded-xl bg-gray-600 text-white hover:bg-gray-800 ms-3 cursor-pointer duration-700">
          See More <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </Link>
  );
};

export default Category;
