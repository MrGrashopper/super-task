"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export const NavBar = () => {
  const pathname = usePathname();
  const showBack = /^\/projects\/[^\/]+$/.test(pathname);

  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {showBack ? (
            <Link
              href="/"
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft size={20} className="mr-2" />
              Projekte
            </Link>
          ) : (
            <div className="w-20" />
          )}
          <Link href="/" className="font-main text-2xl text-gray-800">
            SuperTask
          </Link>
          <div className="w-20" />
        </div>
      </div>
    </nav>
  );
};
