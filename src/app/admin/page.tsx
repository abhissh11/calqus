import { redirect } from "next/navigation";
import { auth } from "../../../auth";

export default async function AdminPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (!session.user?.isAdmin) {
    redirect("/403");
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">👑 Admin Dashboard</h1>
      <p>Welcome back, {session.user?.name}!</p>
      <p className="mt-2 text-gray-400">Only admins can see this page.</p>
    </main>
  );
}
