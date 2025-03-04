import Link from "next/link";
import Image from 'next/image';
import { Button } from '~/components/ui/button';
import { LoginForm } from "./LoginForm";

export default function LoginPage () {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[url('https://res.cloudinary.com/dvvbxrs55/image/upload/v1729267627/FrontView1_alaabu.jpg')] bg-cover bg-center px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-800 shadow-xl transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl opacity-80 transition duration-700 ease-in-out hover:rotate-0 hover:skew-y-0 hover:scale-105"></div>
        <div className="relative bg-white/80 backdrop-blur-lg shadow-lg rounded-3xl p-6 sm:p-10 animate-fade-in-up">
          <div className="flex flex-col items-center">
            <Image
              src="https://res.cloudinary.com/dvvbxrs55/image/upload/v1729267533/Official_LOGO_grn_ic9ldd.png"
              alt="logo"
              width={200}
              height={200}
              className="animate-bounce"
            />
            <h1 className="text-5xl font-serif font-semibold text-amber-600 mt-4 transition duration-300 transform hover:scale-105">
              MSNS-LMS
            </h1>
            <h5 className="text-2xl font-serif font-medium text-emerald-600 mt-3 transition duration-300 transform hover:scale-105">
              Welcome Back Chief!
            </h5>
          </div>
          <LoginForm />
          <div className="flex justify-between items-center mt-8 gap-4">
            <Link href="/signup">
              <Button className="bg-yellow-500 w-full py-2 rounded-lg text-white font-semibold hover:bg-yellow-600 transition duration-300 transform hover:scale-105">
                Register
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
  );
};
