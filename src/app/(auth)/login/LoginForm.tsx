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
import { loginSchema, LoginValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { login } from "./actions";

export default function LoginForm() {
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginValues) {
    setError(undefined);
    startTransition(async () => {
      const { error } = await login(values);
      if (error) setError(error);
    });
  }

  return (
    <div className="rounded-lg bg-gradient-to-r from-blue-400 via-teal-300 to-green-400 p-8 shadow-md">
      <h2 className="mb-6 text-center text-2xl font-bold text-white">
        Chào mừng đến với Hobby
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {error && <p className="text-center text-red-500">{error}</p>}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Tên đăng nhập</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập tên đăng nhập"
                    {...field}
                    className="rounded-lg"
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
                <FormLabel className="text-white">Mật khẩu</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Nhập vào mật khẩu"
                    {...field}
                    className="rounded-lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton
            loading={isPending}
            type="submit"
            className="w-full bg-white text-purple-700 hover:bg-gray-100"
          >
            Đăng nhập
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
}
