import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function FilterPanel({
  selectedDivision,
  setSelectedDivision,
  selectedLocation,
  setSelectedLocation,
  minSAT,
  setMinSAT,
  maxAcceptanceRate,
  setMaxAcceptanceRate,
  availableStates
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}:any) {
  const clearFilters = () => {
    setSelectedDivision("all");
    setSelectedLocation("all");
    setMinSAT("");
    setMaxAcceptanceRate("");
  };

  const hasActiveFilters = selectedDivision !== "all" || selectedLocation !== "all" || minSAT || maxAcceptanceRate;

  return (
    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-900">Filter Schools</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-slate-600 hover:text-slate-900"
          >
            <X className="w-4 h-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="division" className="text-sm font-medium text-slate-700">
            Division
          </Label>
          <Select value={selectedDivision} onValueChange={setSelectedDivision}>
            <SelectTrigger id="division" className="bg-white border-slate-200">
              <SelectValue placeholder="All Divisions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Divisions</SelectItem>
              <SelectItem value="Division I">Division I</SelectItem>
              <SelectItem value="Division II">Division II</SelectItem>
              <SelectItem value="Division III">Division III</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="text-sm font-medium text-slate-700">
            State
          </Label>
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger id="location" className="bg-white border-slate-200">
              <SelectValue placeholder="All States" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              {availableStates.map((state: string) => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="minSAT" className="text-sm font-medium text-slate-700">
            Min SAT Score
          </Label>
          <Input
            id="minSAT"
            type="number"
            placeholder="e.g. 1200"
            value={minSAT}
            onChange={(e) => setMinSAT(e.target.value)}
            className="bg-white border-slate-200"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxAcceptance" className="text-sm font-medium text-slate-700">
            Max Acceptance Rate (%)
          </Label>
          <Input
            id="maxAcceptance"
            type="number"
            placeholder="e.g. 50"
            value={maxAcceptanceRate}
            onChange={(e) => setMaxAcceptanceRate(e.target.value)}
            className="bg-white border-slate-200"
          />
        </div>
      </div>
    </div>
  );
}