'use client'

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import SignoutBtn from "./SignoutBtn";
import SigninBtn from "./SigninBtn";

const Navbar: React.FC = () => {
  const { status } = useSession();
  const isSignedIn = status === 'authenticated';
  return (
    <nav className="bg-[#333333] p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-[#A3E635] text-2xl font-bold">
          <Link href="/">Auctionary</Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="/profile" className="text-[#4B9CD3] hover:text-[#A3E635] transition">
            Profile
          </Link>
        </div>

        {/* Login/Signup Button */}
        <div className="flex items-center space-x-2">
          { 
            isSignedIn ? 
            <SignoutBtn /> : 
            <SigninBtn />
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
