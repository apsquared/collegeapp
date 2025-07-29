import { getCollegeByID } from "@/dbutil/collegedb";
import { College } from "@/models/College";
import { notFound } from "next/navigation";
import SchoolDetailClient from "@/mycomponents/SchoolDetailClient";

interface SchoolDetailPageProps {
  params: {
    school: string;
  };
}

export default async function SchoolDetailPage({ params }: SchoolDetailPageProps) {
  const college = await getCollegeByID(params.school) as College | null;

  if (!college) {
    notFound();
  }

  return <SchoolDetailClient college={college} />;
}