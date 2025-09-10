"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import "../styles/contact.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faPhone,
  faMessage,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";

const page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState("");

  const { data: session, status } = useSession();



  useEffect(() => {
    if (session && status != "loading") {
      setName(session.user.name);
      setEmail(session.user.email);
    } else if (status == "loading") {
      setName("Loading...");
      setEmail("Loading...");
    } else if (!session && status != "loading") {
      setName("");
      setEmail("");
    }
  } , [session]);


  const handleContact = async (e) => {
    e.preventDefault();

    try {

        let response = await axios.post("/api/contact/" , {
            name: name ,
            email: email,
            message: message,
        })

        if (response.data.message == "submit") {
            setAlert("Message sent successfully.")
        }

    } catch (e) {
        console.log(e)
    }

  }


  return (
    <>
      <h1 className="mt-10 text-center mb-10 text-5xl">Contact with us</h1>

      <div className="flex flex-row gap-14 mb-10 justify-center">
        <form className="flex flex-col gap-3 w-96 p-10 rounded-xl justify-center contact-form" onSubmit={handleContact}>


          <h1 className="mb-3 text-3xl text-center">Contact Form</h1>

          <label htmlFor="name">Your name : </label>
          <input
            type="text"
            id="name"
            name="name"
            onInput={(e) => e.target.value=e.target.value.replace(/[^a-zA-Z0-9آ-ی\s@#._\-!?,]/g,'')}
            placeholder="Enter your name..."
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 outline-none"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="name">Your email : </label>
          <input
            type="email"
            name="email"
            onInput={(e) => e.target.value=e.target.value.replace(/[^a-zA-Z0-9آ-ی\s@#._\-!?,]/g,'')}
            id="email"
            placeholder="Enter your email..."
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 outline-none"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="message">Your message : </label>
          <textarea
            placeholder="Enter your name..."
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 outline-none"
            defaultValue={message}
            onChange={(e) => setMessage(e.target.value)}
            onInput={(e) => e.target.value=e.target.value.replace(/[^a-zA-Z0-9آ-ی\s@#._\-!?,]/g,'')}
            required
            minLength={"10"}
            maxLength={"1000"}
          />

          {alert != "" && <p className="text-green-600 ms-1 mt-1">{alert}</p>}

          <button
            type="submit"
            className="w-44 h-10 rounded-xl bg-gray-600 hover:bg-gray-800 text-white ms-1 duration-700 cursor-pointer"
          >
            Send
          </button>
        </form>

        <div className="flex flex-col gap-3 items-end contact-information-box w-fit p-10 rounded-xl h-80">
          <h4 className="text-4xl text-right mb-3">Contact Information</h4>

          <a href="https://github.com/hosseinyn">
            <span>
              hosseinyn{" "}
              <FontAwesomeIcon icon={faBuilding} className="text-gray-600" />{" "}
            </span>
          </a>
          <hr className="w-full" />
          <span>
            Company phone number{" "}
            <FontAwesomeIcon icon={faPhone} className="text-gray-600" />
          </span>
          <hr className="w-full" />
          <span>
            Company email address{" "}
            <FontAwesomeIcon icon={faMessage} className="text-gray-600" />
          </span>
          <hr className="w-full" />
          <span>
            Company address{" "}
            <FontAwesomeIcon icon={faAddressCard} className="text-gray-600" />
          </span>
          <hr className="w-full" />
        </div>
      </div>
    </>
  );
};

export default page;
