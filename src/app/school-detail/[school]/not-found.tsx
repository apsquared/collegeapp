import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-800">School not found</h2>
        <p className="text-slate-600 mt-2">Could not find the requested school. Please try again.</p>
        <Link href="/" className="mt-6 inline-block">
          <Button>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Discover
          </Button>
        </Link>
      </div>
    </div>
  );
} 