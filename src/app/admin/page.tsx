import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import AdminDashboard from "../../components/AdminDashboard";

export default async function AdminPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (!session.user?.isAdmin) {
    redirect("/403");
  }

    return (
    <main className="max-w-6xl mx-auto my-20 px-4 md:px-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-violet-600">
        Admin Dashboard
      </h1>
      <p className="text-gray-600 text-center mb-10">
        Manage Jobs, Courses, and Interview Topics for Calqus Platform
      </p>
      <AdminDashboard/>
    </main>
  );
}
