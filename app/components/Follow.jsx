"use client";

import Image from "next/image";
import Link from "next/link";

const Follow = (props) => {
  return (
    <div className="w-full ">
        <Link href={`/user/${props.name}`} className="flex flex-row gap-10 items-center">
            <Image src={"/user.png"} height={36} width={36} alt={props.name} />

            <h3 className="text-xl">{props.name}</h3>
        </Link>
    </div>
  )
}

export default Follow;