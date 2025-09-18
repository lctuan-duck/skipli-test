'use client';

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FiBell } from "react-icons/fi";

const sidebarItems = [
  { name: "Manage Students", href: "/dashboard/students" },
  { name: "Manage Lessons", href: "/dashboard/lessons" },
  { name: "Message", href: "/dashboard/message" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r p-6 flex flex-col gap-6">
          <div className="mb-8">
            <div className="h-12 w-32 bg-gray-200 rounded" />
          </div>
          <nav className="flex flex-col gap-2">
            {sidebarItems.map(item => (
              <Link key={item.href} href={item.href} passHref>
                <Button
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={`justify-start w-full text-left font-medium ${pathname === item.href ? "text-blue-600" : "text-gray-600"}`}
                  asChild
                >
                  <span>{item.name}</span>
                </Button>
              </Link>
            ))}
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex flex-col flex-1 relative">
          <div className="flex justify-end items-center gap-4 p-4 px-6">
            <Button variant="outline" size="icon" aria-label="Notifications" onClick={() => alert('You have no notifications!')}>
              <FiBell size={22} />
            </Button>
            <Avatar>
              <AvatarImage src="https://ui-avatars.com/api/?name=User" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
          <div className='flex-1'>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
