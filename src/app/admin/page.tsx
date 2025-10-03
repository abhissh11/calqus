import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import TopicUploader from "@/components/TopicUploader";

export default async function AdminPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (!session.user?.isAdmin) {
    redirect("/403");
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4"> Admin Dashboard</h1>
      <p>Welcome back, {session.user?.name}!</p>

      {session?.user?.isAdmin && (
        <div className="mt-6">
          <TopicUploader />
        </div>
      )}
    </main>
  );
}
