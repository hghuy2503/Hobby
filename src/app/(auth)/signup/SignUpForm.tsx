"use client";

import LoadingButton from "@/components/LoadingButton";
import { PasswordInput } from "@/components/PasswordInput";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUpSchema, SignUpValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { signUp } from "./actions";

export default function SignUpForm() {
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: SignUpValues) {
    setError(undefined);
    startTransition(async () => {
      const { error } = await signUp(values);
      if (error) setError(error);
    });
  }

  return (
    <div className="mx-auto w-full max-w-lg rounded-xl bg-gradient-to-b from-blue-200 to-white p-6 text-gray-800 shadow-md">
      <h2 className="mb-2 text-center text-2xl font-bold">Đăng ký tài khoản</h2>
      <p className="mb-4 text-center text-sm text-gray-600">
        Hãy tham gia cộng đồng của chúng tôi
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {error && <p className="text-center text-red-500">{error}</p>}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">Tên tài khoản</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập tên đăng nhập"
                    {...field}
                    className="rounded-lg border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-blue-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập vào email"
                    type="email"
                    {...field}
                    className="rounded-lg border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-blue-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">Mật khẩu</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Nhập vào mật khẩu"
                    {...field}
                    className="rounded-lg border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-blue-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton
            loading={isPending}
            type="submit"
            className="w-full rounded-lg bg-blue-500 py-2 font-semibold text-white hover:bg-blue-600"
          >
            Đăng ký
          </LoadingButton>
        </form>
      </Form>
      <p className="mt-4 text-center text-sm text-gray-600">
        <a href="/login" className="text-blue-500 hover:underline">
          Đăng nhập{" "}
        </a>
        | Nếu bạn đã có tài khoản
      </p>
    </div>
  );
}
