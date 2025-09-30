import React from "react";
import { signIn } from "../../../auth";
// import AuthButtons from "@/components/AuthButton";

export default function page() {
  return (
    <div className="py-20 h-screen text-center flex justify-center items-center flex-col gap-6">
      <h1 className="text-xl font-semibold">Login to Calqus</h1>
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <button
          type="submit"
          className="text-lg font-semibold px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg cursor-pointer"
        >
          Signin with Google
        </button>
      </form>
    </div>
  );
}
