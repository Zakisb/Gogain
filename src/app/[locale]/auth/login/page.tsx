"use client";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EnterIcon } from "@radix-ui/react-icons";

import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import AuthLayout from "../AuthLayout";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useAuth from "@/hooks/useAuth";

export default function Login() {
  const t = useTranslations("Login");
  const { login, loading } = useAuth();

  const loginFormSchema = z.object({
    email: z
      .string({ required_error: t("form.fields.email.required") })
      .email({ message: t("form.fields.email.invalid") }),
    password: z
      .string()
      .min(1, { message: t("form.fields.password.required") }),
  });

  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <AuthLayout
      authTitle={t("title")}
      helpText={t("description")}
      displayShowcase
      hasThirdPartyAuth
    >
      <p className="mb-5 text-center border-b border-solid height leading-[.2rem]">
        <span className="px-2 text-gray-600 bg-white"></span>
      </p>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(login)} className="space-y-8">
            <div className="flex flex-col space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.fields.email.label")}</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>{t("form.fields.password.label")}</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center justify-end my-6">
              <Link
                className="text-sm text-gray-500 border-b border-dashed border-gray-500"
                href="/auth/forgot-password"
              >
                {t("form.forgotPassword")}
              </Link>
            </div>
            <div className="flex justify-center mb-6">
              <button
                type="submit"
                className="relative inline-flex items-center justify-center px-6 py-2 hover:bg-primary-600 rounded-md text-base bg-primary text-white capitalize transition-all w-full"
              >
                <EnterIcon className="h-4 w-4 me-2" />{" "}
                {t("form.submission.login")}
              </button>
            </div>
          </form>
        </Form>
      </div>
    </AuthLayout>
  );
}
