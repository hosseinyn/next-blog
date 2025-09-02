import "../styles/Footer.css";

import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white w-full">
      <div className="p-4">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="#"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <Image
              src="/logo.png"
              width={70}
              height={170}
              className="h-8"
              alt="Next Blog"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link href="/about" className="hover:underline me-4 md:me-6">
                About the project
              </Link>
            </li>
            <li>
              <Link href="/ads" className="hover:underline me-4 md:me-6">
                Ads
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline me-4 md:me-6">
                Contact
              </Link>
            </li>
            <li>
              <a href="https://github.com/hosseinyn/next-blog" className="hover:underline me-4 md:me-6">
                Github
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2025{" "}
          <a href="#" className="hover:underline">
            Next blog
          </a>
          . With 💖 by <a href="https://github.com/hosseinyn">hosseinyn</a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
