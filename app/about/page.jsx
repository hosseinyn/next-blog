import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiagramProject, faPerson, faProjectDiagram, faWarning } from "@fortawesome/free-solid-svg-icons";

const page = () => {
  return (
    <div className="flex flex-col gap-6 items-center justify-center mt-10 mb-10">
        <h1 className="text-4xl">
            About the project <FontAwesomeIcon icon={faProjectDiagram} />
        </h1>

        <hr className="w-4xl" />

        <h3 className="text-orange-400">
            <FontAwesomeIcon icon={faWarning} /> Warning : This project is just an open source project for resume and this is not a real platform or company.
        </h3>

        <p className="mt-1 text-center w-3xl">
            This project is a full-stack blog application with nextjs. This project is using built-in nextjs backend and mongodb database. Application ui powered by Tailwind css ui framework and flowbite (tailwindcss component library) and some custom css. In this application people can create accounts , write and publish , read and like , comment , share and get followers and follow people. They can customize their profile and change their personal information in their panel. This project is using smtp email services for sending email with forgot password tokens , account verification tokens , contact system and etc. Also this application is using next-auth library for jwt system and secure authentication with built-in nextjs backend.
        </p>

        <div className="flex flex-row gap-3 items-center text-blue-400 justify-center">
            <a href="https://github.com/hosseinyn" className="hover:text-blue-700 duration-700">
                <FontAwesomeIcon icon={faPerson} /> Developer
            </a>
            <a href="https://github.com/hosseinyn" className="hover:text-blue-700 duration-700">
                <FontAwesomeIcon icon={faDiagramProject} /> GitHub Repository
            </a>
        </div>

        <img alt="My Skills" src="https://skillicons.dev/icons?i=html,css,js,react,nextjs,tailwindcss,mongodb" className="mt-1"></img>


        <Link href="/">
            <button className="w-44 h-10 rounded-xl bg-gray-600 text-white hover:bg-gray-700 cursor-pointer duration-700 mt-3">
                Back to home page
            </button>
        </Link>

    </div>
  )
}

export default page