import loginImage from "@/assets/login-img.jpg";
import { Metadata } from "next";
import Image from "next/image";
import GoogleSignInButton from "./google/GoogleSignInButton";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <h1 className="text-center text-3xl font-bold">Login to Hobby</h1>
          <div className="space-y-5">
            <GoogleSignInButton />
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-muted" />
              <span>Hoặc</span>
              <div className="h-px flex-1 bg-muted" />
            </div>
            <LoginForm />
            <p className="mt-4 text-center text-sm text-gray-600">
              <a href="/signup" className="text-blue-500 hover:underline">
                Đăng ký{" "}
              </a>
              | Nếu bạn là thành viên mới
            </p>
          </div>
        </div>
        <Image
          src={loginImage}
          alt=""
          className="hidden w-1/2 object-cover md:block"
        />
      </div>
    </main>
  );
}
