'use client'

import React from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Welcome to Auctionary</h1>

        {/* Login Form */}
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
            Login
          </button>
        </form>

        {/* Separator */}
        <div className="my-6 flex items-center justify-center">
          <span className="bg-gray-300 h-px w-full"></span>
          <span className="text-gray-500 mx-4">OR</span>
          <span className="bg-gray-300 h-px w-full"></span>
        </div>

        {/* Google Login Button */}
        <button
          onClick={() => {
            signIn('google', { callbackUrl: '/'}); // Redirect to login if not logged in
          }}
          className="w-full flex items-center justify-center bg-white text-gray-800 border border-gray-300 py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 transition"
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="h-5 w-5 mr-3"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.5 1.45 8.7 3.7l6.5-6.5C34.9 2.5 29.8 0 24 0 14.5 0 6.6 5.9 3.1 14.2l7.7 6c1.2-5.1 5.8-10.7 13.2-10.7z"
            />
            <path
              fill="#4285F4"
              d="M46.5 24c0-1.8-.2-3.5-.6-5H24v9.5h12.7c-.5 2.8-2 5.1-4.2 6.7l7.7 6c4.5-4.1 7.3-10.2 7.3-17.2z"
            />
            <path
              fill="#FBBC05"
              d="M10.8 28.2c-.7-2-1.1-4.1-1.1-6.2s.4-4.2 1.1-6.2L3.1 9.8C1.1 13.6 0 18 0 22.5s1.1 8.9 3.1 12.7l7.7-6c-.8-2-1.1-4.1-1.1-6.2z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.5 0 11.9-2.1 15.8-5.7l-7.7-6c-2.1 1.4-4.9 2.2-8.1 2.2-7.4 0-12-5.6-13.2-10.7l-7.7 6C6.6 42.1 14.5 48 24 48z"
            />
            <path fill="none" d="M0 0h48v48H0z" />
          </svg>
          Login with Google
        </button>

        {/* Signup Link */}
        <p className="text-gray-600 text-center mt-6">
          Don’t have an account? {" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
