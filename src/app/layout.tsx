
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import LayoutClient from "@/mycomponents/LayoutClient";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider defaultOpen={true}>
          <LayoutClient>{children}</LayoutClient>
        </SidebarProvider>
      </body>
    </html>
  );
}
