"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserPlus } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import AuthLayout from "../_components/AuthLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
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

export default function CreateAccount() {
  const t = useTranslations("Login");
  const { register } = useAuth();
  const searchParams = useSearchParams();
  const resetToken = searchParams.get("access");

  const formSchema = yup.object({
    password: yup.string().required("Password is required"),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password"), ""], "Passwords must match"),
  });

  type CreateAccountFormFields = yup.InferType<typeof formSchema>;

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const createAccount = async (values: CreateAccountFormFields) => {
    const result = await register({ ...values, resetToken });
    console.log(result);
  };

  return (
    <AuthLayout
      authTitle={t("title")}
      helpText={t("description")}
      displayShowcase={false}
      hasThirdPartyAuth
    >
      <p className="mb-5 text-center border-b border-solid height leading-[.2rem]">
        <span className="px-2 text-gray-600 bg-white"></span>
      </p>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(createAccount)}
            className="space-y-8"
          >
            <div className="flex flex-col space-y-5">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter a password</FormLabel>
                    <FormControl>
                      {/* <Input {...field} /> */}
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm your passord</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-center mb-6">
              <Button className="w-full" loading={form.formState.isSubmitting}>
                <UserPlus className="h-4 w-4 me-2" />{" "}
                {/* {t("form.submission.login")} */}
                Create account
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AuthLayout>
  );
}