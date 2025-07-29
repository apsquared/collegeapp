import { getAllColleges } from "@/dbutil/collegedb";
import { College } from "@/models/College";
import DashboardClient from "@/mycomponents/DashboardClient";

export default async function Dashboard() {
  // Load colleges data on the server
  const colleges = await getAllColleges() as College[];
  
  return <DashboardClient initialColleges={colleges} />;
}