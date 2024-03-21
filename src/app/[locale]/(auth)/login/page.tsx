"use client";
import Image from "next/image";
import Link from "next/link";
import { useSignIn } from "@clerk/nextjs";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EnterIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import AuthLayout from "../_components/AuthLayout";
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
import { useClerk } from "@clerk/clerk-react";

export default function Login() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const { signOut } = useClerk();

  const t = useTranslations("Login");
  const { login } = useAuth();

  const loginFormSchema = yup.object({
    email: yup
      .string()
      .required(t("form.fields.email.required"))
      .email(t("form.fields.email.invalid")),
    password: yup
      .string()
      .min(1, { message: t("form.fields.password.required") }),
  });

  const form = useForm({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  type LoginFormFields = yup.InferType<typeof loginFormSchema>;

  const onSubmit = async (values: LoginFormFields) => {
    if (!isLoaded) {
      return;
    }
    // signOut();
    try {
      const result = await signIn.create({
        identifier: values.email,
        password: values.password,
      });

      if (result.status === "complete") {
        console.log(result);
        await setActive({ session: result.createdSessionId });

        // router.push("/");
      } else {
        /*Investigate why the sign-in hasn't completed */
        console.log(result);
      }
    } catch (err: any) {
      console.log(err.errors[0]);
    }
  };

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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            {/* <div className="flex items-center justify-end my-6">
              <Link
                className="text-sm text-gray-500 border-b border-dashed border-gray-500"
                href="/auth/forgot-password"
              >
                {t("form.forgotPassword")}
              </Link>
            </div> */}
            <div className="flex justify-center mb-6 ">
              <Button
                type="submit"
                className="w-full"
                loading={form.formState.isSubmitting}
              >
                <EnterIcon className="h-4 w-4 me-2" />{" "}
                {t("form.submission.login")}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AuthLayout>
  );
}
