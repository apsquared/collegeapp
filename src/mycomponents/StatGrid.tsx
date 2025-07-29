import React from "react";
import StatCard from "./StatCard";
import { Trophy, Users, GraduationCap, CheckCircle } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function StatGrid({ college }: { college: any }) {
  const parseRecord = (record: string | undefined) => {
    if (!record) return { wins: 0, losses: 0, percentage: 0 };
    const [wins, losses] = record.split('-').map(Number);
    const percentage = wins > 0 ? (wins / (wins + losses)) * 100 : 0;
    return { wins, losses, percentage: percentage.toFixed(1) };
  };

  const record = parseRecord(college.baseball_2025_record);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard 
        icon={Trophy}
        title="2025 Record"
        value={college.baseball_2025_record || "N/A"}
        subtitle={record.wins > 0 ? `${record.percentage}% win rate` : ""}
        color="green"
      />
      <StatCard 
        icon={Users}
        title="Roster Size"
        value={`${college.players?.length || 0} players`}
        subtitle=""
        color="blue"
      />
      <StatCard 
        icon={GraduationCap}
        title="Average SAT"
        value={college.avg_sat || "N/A"}
        subtitle="for admitted students"
        color="amber"
      />
      <StatCard 
        icon={CheckCircle}
        title="Acceptance Rate"
        value={college.acceptance_rate ? `${college.acceptance_rate}%` : "N/A"}
        subtitle="for all applicants"
        color="green"
      />
    </div>
  );
}