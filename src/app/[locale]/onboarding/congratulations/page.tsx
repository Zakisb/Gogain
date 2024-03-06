"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Lottie from "react-lottie";
import congratsAnimationData from "/public/assets/animations/congratulations-animation.json";
import dotsAnimationData from "/public/assets/animations/dots-animations.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  //   animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid",
  },
};

export default function GeneralHealthHabits() {
  const t = useTranslations("Onboarding.Congratulations");
  const router = useRouter();

  const redirectToAnotherPage = () => {
    setTimeout(() => {
      //   router.push("/another-page");
    }, 5000); // Redirects after 5 seconds
  };

  redirectToAnotherPage();

  return (
    <div className="flex flex-col container max-w-[760px] mx-auto mt-16">
      <h3>{t("title")}</h3>
      <p className="text-gray-500 text-md mt-3">{t("description")}</p>
      <div className="flex flex-col justify-center mt-7">
        <Lottie
          options={{ ...defaultOptions, animationData: congratsAnimationData }}
        />
        <Lottie
          options={{ ...defaultOptions, animationData: dotsAnimationData }}
          height={80}
        />
      </div>
    </div>
  );
}
