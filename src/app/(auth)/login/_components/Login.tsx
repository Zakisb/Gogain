"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useSignIn } from "@clerk/nextjs";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EnterIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import AuthLayout from "../../_components/AuthLayout";
import { Input } from "@/components/ui/input";
import useTimeOutMessage from "@/hooks/useTimeOutMessage";
import { ErrorMessage } from "@/components/ui/error-message";
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
import { useRouter, useSearchParams } from "next/navigation";
import { getUsers } from "@/services/UserServices";

export default function Login() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const searchParams = useSearchParams();

  const redirectUrl = searchParams.get("redirect_url");
  const [error, setError] = useTimeOutMessage();

  const { signOut } = useClerk();
  const router = useRouter();
  const { login } = useAuth();

  const loginFormSchema = yup.object({
    email: yup
      .string()
      .required("L'adresse email est requise")
      .email("Addresse mail invalide"),
    password: yup.string().min(1, { message: "Le mot de passe est requis" }),
  });

  const form = useForm({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      email: "zakaria.obusiness@gmail.com",
      password: "V}Mi^hvH",
    },
  });

  type LoginFormFields = yup.InferType<typeof loginFormSchema>;

  const onSubmit = async (values: LoginFormFields) => {
    if (!isLoaded) {
      return;
    }

    try {
      await signOut();
      const result = await signIn.create({
        identifier: values.email,
        password: values.password,
      });
      console.log(result);
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        const user = await fetch("/api/users/me");

        if (redirectUrl) {
          router.push(redirectUrl);
        } else {
          router.push("/onboarding/registration");
        }
      } else {
        setError("Une erreur s'est produite");
      }
    } catch (err: any) {
      console.log(err);
      // console.log(err.errors[0]);
      if (err.errors[0].code === "form_password_incorrect")
        setError("Mot de passe incorrect");
      else if (err.errors[0].code === "form_identifier_not_found")
        setError("Address email incorrecte ou inexistante");
    }
  };

  return (
    <AuthLayout
      authTitle="Soyez les bienvenus"
      helpText="Veuillez vous connecter pour accéder à votre compte."
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
                    <FormLabel>Email</FormLabel>
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
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {error && <ErrorMessage description={error} />}

            <div className="flex justify-center mb-6 ">
              <Button
                type="submit"
                className="w-full"
                loading={form.formState.isSubmitting}
              >
                <EnterIcon className="h-4 w-4 me-2" /> S&apos;indentifer
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AuthLayout>
  );
}
