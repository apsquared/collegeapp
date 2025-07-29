import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, ArrowUpDown, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PlayerTable({ players }: { players: any }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showPitchersOnly, setShowPitchersOnly] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });

  const sortedPlayers = useMemo(() => {
    const sortablePlayers = [...players];
    if (sortConfig !== null) {
      sortablePlayers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortablePlayers;
  }, [players, sortConfig]);

  const filteredPlayers = sortedPlayers.filter(player => {
    // First filter by search term
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.year.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Then filter by pitchers checkbox if enabled
    const matchesPitcherFilter = !showPitchersOnly || 
      player.position.toLowerCase().includes('pitcher') || 
      player.position.toLowerCase().includes('p');
    
    return matchesSearch && matchesPitcherFilter;
  });

  const requestSort = (key: string) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const getSortIndicator = (key: string) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? '▲' : '▼';
  };

  const SortableHeader = ({ sortKey, children }: { sortKey: string, children: React.ReactNode }) => (
    <TableHead>
      <Button variant="ghost" onClick={() => requestSort(sortKey)}>
        {children}
        <span className="ml-2">{getSortIndicator(sortKey)}</span>
      </Button>
    </TableHead>
  );

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <CardTitle>Full Roster ({filteredPlayers.length})</CardTitle>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex items-center space-x-2">
              <Button
                variant={showPitchersOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setShowPitchersOnly(!showPitchersOnly)}
                className="flex items-center space-x-2"
              >
                {showPitchersOnly && <Check className="w-4 h-4" />}
                <span>Pitchers Only</span>
              </Button>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search players..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <SortableHeader sortKey="name">Name</SortableHeader>
                <SortableHeader sortKey="position">Position</SortableHeader>
                <SortableHeader sortKey="year">Year</SortableHeader>
                <SortableHeader sortKey="height">Height</SortableHeader>
                <TableHead>B/T</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPlayers.length > 0 ? (
                filteredPlayers.map((player, index) => (
                  <TableRow key={index} className="hover:bg-slate-50/50">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <span>{player.name}</span>
                        <a
                          href={`https://www.google.com/search?q=${encodeURIComponent(player.name)} Perfect Game`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-500 hover:text-slate-700 transition-colors"
                          title={`Search for ${player.name} on Google`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </TableCell>
                    <TableCell>{player.position || "N/A"}</TableCell>
                    <TableCell>{player.year || "N/A"}</TableCell>
                    <TableCell>{player.height || "N/A"}</TableCell>
                    <TableCell>{player.bats_left_right || "N"}/{player.throws_left_right || "A"}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24">
                    No players found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}