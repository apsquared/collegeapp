import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, ExternalLink, Award } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DetailHeader({ college }: { college: any }) {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            {college.college_name}
          </h1>
          <div className="flex items-center gap-4 text-slate-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>{college.location}</span>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
              <Award className="w-3 h-3 mr-1" />
              {college.baseball_division?.replace("NCAA ", "") || "N/A"}
            </Badge>
          </div>
        </div>
        <div className="flex gap-3">
          {college.baseball_roster_url && (
            <Button asChild variant="outline" className="bg-white/80 backdrop-blur-sm">
              <a href={college.baseball_roster_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Roster Link
              </a>
            </Button>
          )}
          {college.school_url && (
            <Button asChild className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg">
              <a href={college.school_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                School Website
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}