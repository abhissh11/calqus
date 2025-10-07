import React from "react";
import { signIn } from "../../../auth";
import Image from "next/image";
import { FaGoogle } from "react-icons/fa6";
// import AuthButtons from "@/components/AuthButton";

export default function page() {
  return (
    <div className="py-20 h-screen text-center flex justify-center items-center flex-col gap-6">
      <div className="flex flex-col bg-violet-500 p-10 gap-4 justify-center items-center shadow-md rounded-lg border border-violet-500">
        <h1 className="text-neutral-100 text-xl font-semibold flex flex-col gap-1 items-start">
          <Image
            src="/images/calqus-logo.png"
            alt="logo"
            width={36}
            height={36}
            className="rounded-sm"
          />{" "}
          Login to Calqus
        </h1>

        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <button
            type="submit"
            className="text-lg font-semibold px-6 py-2 text-violet-500 bg-gray-50 hover:bg-gray-200 rounded-lg cursor-pointer flex items-center gap-2"
          >
            <span><FaGoogle /></span>  Signin with Google
          </button>
        </form>
      </div>
    </div>
  );
}
