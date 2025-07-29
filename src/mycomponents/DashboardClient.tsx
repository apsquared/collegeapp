"use client";

import React, { useState, useEffect, useCallback } from "react";
import { College } from "@/models/College";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, TrendingUp, Users, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

import SchoolCard from "@/mycomponents/SchoolCard";
import FilterPanel from "@/mycomponents/FilterPanel";
import StatsOverview from "@/mycomponents/StatsOverview";

interface DashboardClientProps {
  initialColleges: College[];
}

export default function DashboardClient({ initialColleges }: DashboardClientProps) {
  const [colleges] = useState<College[]>(initialColleges);
  const [filteredColleges, setFilteredColleges] = useState<College[]>(initialColleges);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [minSAT, setMinSAT] = useState("");
  const [maxAcceptanceRate, setMaxAcceptanceRate] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filterColleges = useCallback(() => {
    let filtered = [...colleges];

    if (searchTerm) {
      filtered = filtered.filter(college => 
        college.college_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.baseball_conference?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedDivision !== "all") {
      filtered = filtered.filter(college => 
        college.baseball_division?.includes(selectedDivision)
      );
    }

    if (selectedLocation !== "all") {
      filtered = filtered.filter(college => 
        college.location?.includes(selectedLocation)
      );
    }

    if (minSAT) {
      filtered = filtered.filter(college => 
        college.avg_sat >= parseInt(minSAT)
      );
    }

    if (maxAcceptanceRate) {
      filtered = filtered.filter(college => 
        college.acceptance_rate <= parseInt(maxAcceptanceRate)
      );
    }

    setFilteredColleges(filtered);
  }, [colleges, searchTerm, selectedDivision, selectedLocation, minSAT, maxAcceptanceRate]);

  useEffect(() => {
    filterColleges();
  }, [filterColleges]);

  const getUniqueStates = () => {
    const states = colleges.map(college => {
      const parts = college.location?.split(', ');
      return parts && parts.length > 1 ? parts[1] : null;
    }).filter(Boolean);
    return [...new Set(states)].sort();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                Discover Your Perfect School
              </h1>
              <p className="text-slate-600 text-lg">
                Find college baseball programs that match your athletic and academic goals
              </p>
            </div>
            <Link href="/compare-schools">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg">
                <TrendingUp className="w-4 h-4 mr-2" />
                Compare Schools
              </Button>
            </Link>
          </div>

          <StatsOverview colleges={colleges} />
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  placeholder="Search schools, locations, or conferences..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="h-12 px-6 border-slate-200 hover:bg-slate-50"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6"
                >
                  <FilterPanel
                    selectedDivision={selectedDivision}
                    setSelectedDivision={setSelectedDivision}
                    selectedLocation={selectedLocation}
                    setSelectedLocation={setSelectedLocation}
                    minSAT={minSAT}
                    setMinSAT={setMinSAT}
                    maxAcceptanceRate={maxAcceptanceRate}
                    setMaxAcceptanceRate={setMaxAcceptanceRate}
                    availableStates={getUniqueStates()}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            {filteredColleges.length} Schools Found
          </h2>
          {filteredColleges.length > 0 && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 px-3 py-1">
              <Users className="w-4 h-4 mr-1" />
              {filteredColleges.reduce((sum, college) => sum + (college.players?.length || 0), 0)} Total Players
            </Badge>
          )}
        </div>

        {/* School Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {filteredColleges.map((college, index) => (
              <motion.div
                key={college._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <SchoolCard college={college} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredColleges.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No schools found</h3>
            <p className="text-slate-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
} 