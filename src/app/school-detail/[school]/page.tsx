import { getCollegeByID } from "@/dbutil/collegedb";
import { College } from "@/models/College";
import { notFound } from "next/navigation";
import SchoolDetailClient from "@/mycomponents/SchoolDetailClient";

interface SchoolDetailPageProps {
  params: Promise<{
    school: string;
  }>;
}

export default async function SchoolDetailPage({ params }: SchoolDetailPageProps) {
  const { school } = await params;
  const college = await getCollegeByID(school) as College | null;

  if (!college) {
    notFound();
  }

  return <SchoolDetailClient college={college} />;
}