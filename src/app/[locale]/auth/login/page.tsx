import Image from "next/image";
import Link from "next/link";

import { useTranslations } from "next-intl";
import AuthLayout from "../AuthLayout";

export default function Login() {
  return (
    <AuthLayout
      authTitle="Soyez les bienvenus"
      helpText="Enter your email address and password to access admin panel."
      displayShowcase
      hasThirdPartyAuth
    >
      <p className="mb-5 text-center border-b border-solid height leading-[.2rem]">
        <span className="px-2 text-gray-600 bg-white"></span>
      </p>
    </AuthLayout>
  );
}
