import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { SignupForm } from '~/components/SignupForm';

export default function SignupPage  () {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[url('https://res.cloudinary.com/dvvbxrs55/image/upload/v1729267627/FrontView1_alaabu.jpg')] bg-cover bg-center px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-600 shadow-xl transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl opacity-80 transition duration-700 ease-in-out hover:rotate-0 hover:skew-y-0 hover:scale-105"></div>
        <div className="relative bg-white/80 backdrop-blur-lg shadow-lg rounded-3xl p-6 sm:p-10 animate-fade-in-up">
          <div className="flex flex-col items-center">
            <Image
              src="https://res.cloudinary.com/dvvbxrs55/image/upload/v1729267533/Official_LOGO_grn_ic9ldd.png"
              alt="logo"
              width={200}
              height={200}
              className="animate-pulse"
            />
            <h1 className="text-4xl font-serif font-semibold text-amber-600 mt-6 transition duration-300 transform hover:scale-105">
              MSNS-LMS
            </h1>
            <h5 className="text-2xl font-serif font-medium text-emerald-600 mt-3 transition duration-300 transform hover:scale-105">
              Enroll Now / Sign Up
            </h5>
          </div>
          <SignupForm />
          <div className="flex justify-between items-center mt-8 gap-4">
            <Link href="/login">
              <Button className="bg-green-500 w-full py-2 rounded-lg text-white font-semibold hover:bg-green-600 transition duration-300 transform hover:scale-105">
                Back to Login
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button className="bg-blue-500 w-full py-2 rounded-lg text-white font-semibold hover:bg-blue-600 transition duration-300 transform hover:scale-105">
                Admin Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
