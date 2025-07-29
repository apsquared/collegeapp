"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { College } from "@/models/College";

import DetailHeader from "@/mycomponents/DetailHeader";
import StatGrid from "@/mycomponents/StatGrid";
import RosterAnalysis from "@/mycomponents/RosterAnalysis";
import PlayerTable from "@/mycomponents/PlayerTable";

interface SchoolDetailClientProps {
  college: College;
}

export default function SchoolDetailClient({ college }: SchoolDetailClientProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Link href="/" className="inline-block mb-6">
          <Button variant="outline" className="bg-white/80 backdrop-blur-sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Discover
          </Button>
        </Link>
        
        <DetailHeader college={college} />
        <StatGrid college={college} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2">
            <PlayerTable players={college.players || []} />
          </div>
          <div className="lg:col-span-1">
            <RosterAnalysis summary={college.roster_summary} />
          </div>
        </div>
      </div>
    </div>
  );
} 