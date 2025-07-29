import React from "react";
import ReactMarkdown from "react-markdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList } from "lucide-react";

export default function RosterAnalysis({ summary }:{summary:string}) {
  return (
    <Card className="h-full shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-blue-600" />
          Roster Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        {summary ? (
          <div className="prose prose-sm max-w-none text-slate-700">
            <ReactMarkdown>{summary}</ReactMarkdown>
          </div>
        ) : (
          <p className="text-slate-500">No roster summary available.</p>
        )}
      </CardContent>
    </Card>
  );
}