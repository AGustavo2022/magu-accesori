
import React from "react";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
      <div className="min-h-screen bg-background flex">
        {/* MAIN CONTENT */}
        <main className="flex-1 pt-6">{children}</main>
      </div>
  );
}
