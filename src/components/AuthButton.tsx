// "use client";

// import { useSession, signIn, signOut } from "next-auth/react";

// export default function AuthButtons() {
//   const { data: session, status } = useSession();

//   if (status === "loading") {
//     return <p>Loading...</p>;
//   }

//   if (session) {
//     return (
//       <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//         <p>Signed in as {session.user?.email}</p>
//         <button onClick={() => signOut()}>Sign out</button>
//       </div>
//     );
//   }

//   return (
//     <button onClick={() => signIn("google", { callbackUrl: "/course" })}>
//       Sign in with Google
//     </button>
//   );
// }
