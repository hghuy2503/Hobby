import signupImage from "@/assets/signup.jpg";
import { Metadata } from "next";
import Image from "next/image";
import SignUpForm from "./SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 p-6">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-xl bg-white shadow-lg">
        {/* Left Side Content */}
        <div className="flex w-full flex-col justify-center space-y-6 p-8 md:w-1/2">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-blue-700">
              Welcome to Hobby
            </h1>
            <p className="mt-2 text-gray-600"></p>
          </div>
          <SignUpForm />
        </div>
        <div className="hidden w-1/2 md:flex">
          <Image
            src={signupImage}
            alt="Signup Illustration"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </main>
  );
}
