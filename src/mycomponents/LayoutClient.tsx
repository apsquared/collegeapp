"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, BarChart3, School, Diamond } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Discover Schools",
    url: '/',
    icon: Search,
  },
  {
    title: "Compare Schools",
    url: '/compare-schools',
    icon: BarChart3,
  },
];

interface LayoutClientProps {
  children: React.ReactNode;
}

export default function LayoutClient({ children }: LayoutClientProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-blue-50">
      <Sidebar className="border-r border-slate-200 bg-white/80 backdrop-blur-sm" collapsible="icon">
        <SidebarHeader className="border-b border-slate-200 p-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-lg">
              <Diamond className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0">
              <h2 className="font-bold text-slate-900 text-sm truncate">College Scouter</h2>
              <p className="text-xs text-slate-500 font-medium truncate">College Comparison</p>
            </div>
          </div>
        </SidebarHeader>
        
        <SidebarContent className="p-2">
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2 py-2">
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      tooltip={item.title}
                      className={`hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 rounded-lg mb-1 ${
                        pathname === item.url ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-slate-600'
                      }`}
                    >
                      <Link href={item.url} className="flex items-center gap-2 px-2 py-2">
                        <item.icon className="w-4 h-4" />
                        <span className="font-medium text-sm">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup className="mt-4">
            <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2 py-2">
              For Students
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="px-2 py-2 space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <School className="w-3 h-3 text-blue-500" />
                  <span className="text-slate-600">Find Your Perfect School</span>
                </div>
                <div className="text-xs text-slate-500 leading-relaxed">
                  Compare academics, athletics, and opportunities.
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <main className="flex-1 flex flex-col">
        <header className="bg-white/90 backdrop-blur-sm border-b border-slate-200 px-6 py-4 md:hidden">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="hover:bg-slate-100 p-2 rounded-lg transition-colors duration-200" />
            <h1 className="text-xl font-bold text-slate-900">College Scouter</h1>
          </div>
        </header>

        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
} 