import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users, TrendingUp, GraduationCap, ExternalLink, Award, Ruler } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { College } from "@/models/College";

export default function SchoolCard({ college }: { college: College }) {
  const parseRecord = (record: string | undefined) => {
    if (!record) return { wins: 0, losses: 0, percentage: 0 };
    const [wins, losses] = record.split('-').map(Number);
    const percentage = wins / (wins + losses) * 100;
    return { wins, losses, percentage };
  };

  const record = parseRecord(college.baseball_2025_record);
  
  const getPositionCounts = () => {
    if (!college.players) return {};
    const counts: Record<string, number> = {};
    college.players.forEach(player => {
      const pos = player.position || "Unknown";
      counts[pos] = (counts[pos] || 0) + 1;
    });
    return counts;
  };

  const positionCounts = getPositionCounts();
  const topPositions = Object.entries(positionCounts)
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, 3);

  // Helper function to parse height string to inches
  const parseHeightToInches = (height: string): number => {
    if (!height) return 0;
    const match = height.match(/(\d+)'(\d+)"/);
    if (match) {
      const feet = parseInt(match[1]);
      const inches = parseInt(match[2]);
      return feet * 12 + inches;
    }
    return 0;
  };

  // Find shortest and tallest players
  const getHeightStats = () => {
    if (!college.players || college.players.length === 0) {
      return {
        shortestPlayer: null,
        tallestPlayer: null,
        shortestPitcher: null,
        tallestPitcher: null
      };
    }

    const playersWithHeight = college.players
      .filter(player => player.height && parseHeightToInches(player.height) > 0)
      .map(player => ({
        ...player,
        heightInches: parseHeightToInches(player.height)
      }));

    if (playersWithHeight.length === 0) {
      return {
        shortestPlayer: null,
        tallestPlayer: null,
        shortestPitcher: null,
        tallestPitcher: null
      };
    }

    const pitchers = playersWithHeight.filter(player => 
      player.position.toLowerCase().includes('pitcher') || 
      player.position.toLowerCase().includes('p')
    );

    const shortestPlayer = playersWithHeight.reduce((min, player) => 
      player.heightInches < min.heightInches ? player : min
    );

    const tallestPlayer = playersWithHeight.reduce((max, player) => 
      player.heightInches > max.heightInches ? player : max
    );

    const shortestPitcher = pitchers.length > 0 ? 
      pitchers.reduce((min, player) => 
        player.heightInches < min.heightInches ? player : min
      ) : null;

    const tallestPitcher = pitchers.length > 0 ? 
      pitchers.reduce((max, player) => 
        player.heightInches > max.heightInches ? player : max
      ) : null;

    return {
      shortestPlayer,
      tallestPlayer,
      shortestPitcher,
      tallestPitcher
    };
  };

  const heightStats = getHeightStats();

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start gap-2">
            <CardTitle className="text-lg font-bold text-slate-900 leading-tight group-hover:text-blue-700 transition-colors">
              {college.college_name}
            </CardTitle>
            {college.school_url && (
              <Button
                size="icon"
                variant="ghost"
                className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                asChild
              >
                <a href={college.school_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            )}
          </div>
          <div className="flex items-center gap-1 text-slate-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{college.location}</span>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Division and Conference */}
          <div className="space-y-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
              <Award className="w-3 h-3 mr-1" />
              {college.baseball_division?.replace("NCAA ", "") || "N/A"}
            </Badge>
            {college.baseball_conference && (
              <div className="text-xs text-slate-600 font-medium">
                {college.baseball_conference}
              </div>
            )}
          </div>

          {/* Performance Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-xs font-medium text-slate-600">2025 Record</span>
              </div>
              <div className="font-bold text-slate-900">
                {college.baseball_2025_record || "N/A"}
              </div>
              {record.wins > 0 && (
                <div className="text-xs text-slate-500">
                  {record.percentage.toFixed(1)}% win rate
                </div>
              )}
            </div>

            <div className="bg-slate-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-medium text-slate-600">Roster Size</span>
              </div>
              <div className="font-bold text-slate-900">
                {college.players?.length || 0}
              </div>
              <div className="text-xs text-slate-500">players</div>
            </div>
          </div>

          {/* Academic Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg p-3 border border-amber-100">
              <div className="flex items-center gap-2 mb-1">
                <GraduationCap className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-medium text-amber-700">Avg SAT</span>
              </div>
              <div className="font-bold text-amber-900">
                {college.avg_sat || "N/A"}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 border border-green-100">
              <div className="text-xs font-medium text-green-700 mb-1">Acceptance</div>
              <div className="font-bold text-green-900">
                {college.acceptance_rate ? `${college.acceptance_rate}%` : "N/A"}
              </div>
            </div>
          </div>

          {/* Height Statistics */}
          {(heightStats.shortestPlayer || heightStats.tallestPlayer || heightStats.shortestPitcher || heightStats.tallestPitcher) && (
            <div className="space-y-3">
              <div className="text-xs font-medium text-slate-600 flex items-center gap-1">
                <Ruler className="w-3 h-3" />
                Height Statistics
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {/* Shortest Player */}
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-3 border border-purple-100">
                  <div className="text-xs font-medium text-purple-700 mb-1">Shortest Player</div>
                  <div className="font-bold text-purple-900">
                    {heightStats.shortestPlayer ? heightStats.shortestPlayer.height : "N/A"}
                  </div>
                  {heightStats.shortestPlayer && (
                    <div className="text-xs text-purple-600">
                      {heightStats.shortestPlayer.name}
                    </div>
                  )}
                </div>

                {/* Tallest Player */}
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-3 border border-orange-100">
                  <div className="text-xs font-medium text-orange-700 mb-1">Tallest Player</div>
                  <div className="font-bold text-orange-900">
                    {heightStats.tallestPlayer ? heightStats.tallestPlayer.height : "N/A"}
                  </div>
                  {heightStats.tallestPlayer && (
                    <div className="text-xs text-orange-600">
                      {heightStats.tallestPlayer.name}
                    </div>
                  )}
                </div>
              </div>

              {/* Pitcher Heights */}
              {(heightStats.shortestPitcher || heightStats.tallestPitcher) && (
                <div className="grid grid-cols-2 gap-3">
                  {/* Shortest Pitcher */}
                  <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-3 border border-teal-100">
                    <div className="text-xs font-medium text-teal-700 mb-1">Shortest Pitcher</div>
                    <div className="font-bold text-teal-900">
                      {heightStats.shortestPitcher ? heightStats.shortestPitcher.height : "N/A"}
                    </div>
                    {heightStats.shortestPitcher && (
                      <div className="text-xs text-teal-600">
                        {heightStats.shortestPitcher.name}
                      </div>
                    )}
                  </div>

                  {/* Tallest Pitcher */}
                  <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg p-3 border border-pink-100">
                    <div className="text-xs font-medium text-pink-700 mb-1">Tallest Pitcher</div>
                    <div className="font-bold text-pink-900">
                      {heightStats.tallestPitcher ? heightStats.tallestPitcher.height : "N/A"}
                    </div>
                    {heightStats.tallestPitcher && (
                      <div className="text-xs text-pink-600">
                        {heightStats.tallestPitcher.name}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Top Positions */}
          {topPositions.length > 0 && (
            <div className="pt-2">
              <div className="text-xs font-medium text-slate-600 mb-2">Top Positions</div>
              <div className="flex flex-wrap gap-1">
                {topPositions.map(([position, count]) => (
                  <Badge
                    key={position}
                    variant="outline"
                    className="text-xs bg-white border-slate-200"
                  >
                    {position} ({count as number})
                  </Badge>
                ))}
              </div>
            </div>
          )}
    
          {/* Action Button */}
          <div className="pt-2">
            <Link href={`/school-detail/${college._id}`}>
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-sm"
                size="sm"
              >
                View Details
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}