import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { School, Users, Trophy, MapPin } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function StatsOverview({ colleges }: { colleges: any[] }) {
  const totalPlayers = colleges.reduce((sum, college) => sum + (college.players?.length || 0), 0);
  const totalSchools = colleges.length;
  const uniqueStates = [...new Set(colleges.map(c => c.location?.split(', ')[1]).filter(Boolean))].length;
  
  const divisionCounts = colleges.reduce((acc, college) => {
    const division = college.baseball_division?.replace("NCAA ", "") || "Unknown";
    acc[division] = (acc[division] || 0) + 1;
    return acc;
  }, {});

  const topDivision = Object.entries(divisionCounts).sort(([,a], [,b]) => (b as number) - (a as number))[0];

  const stats = [
    {
      title: "Total Schools",
      value: totalSchools.toLocaleString(),
      icon: School,
      color: "text-blue-600",
      bg: "bg-blue-100"
    },
    {
      title: "Total Players",
      value: totalPlayers.toLocaleString(),
      icon: Users,
      color: "text-green-600",
      bg: "bg-green-100"
    }
    
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index} className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                <p className="text-xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}