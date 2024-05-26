import { fetchUser } from "@/lib/authUtil";
export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome to the main dashboard page.</p>
      <p>Your user id is: {fetchUser().id}</p>
    </div>
  );
}
