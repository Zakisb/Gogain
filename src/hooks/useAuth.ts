"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { SignInCredential } from "@/types/auth";
// import { toast } from "react-toastify";

export default function useAuth() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async (values: SignInCredential) => {
    router.push("/onboarding/registration");
    // setLoading(true);
    // signIn("credentials", {
    //   redirect: false,
    //   email: values?.email,
    //   password: values?.password,
    // }).then((res) => {
    //   if (res?.ok) {
    //     console.log(res);
    //     // router.push("/");
    //     // toast("Success");
    //   } else {
    //     console.log(res);
    //     // toast(res?.error, { type: "error" });
    //   }
    // });
    // setLoading(false);
  };

  return { loading, login };
}
