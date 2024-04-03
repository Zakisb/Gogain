"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import congratsAnimationData from "@/assets/animations/congratulations-animation.json";
import dotsAnimationData from "@/assets/animations/dots-animations.json";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Congratulations() {
  const router = useRouter();

  const redirectToAnotherPage = () => {
    setTimeout(() => {
      router.push("/licenses");
    }, 5000); // Redirects after 5 seconds
  };

  redirectToAnotherPage();

  return (
    <div className="flex flex-col container max-w-[760px] mx-auto mt-16">
      <h3>Félicitations !</h3>
      <p className="text-gray-500 text-md mt-3">
        Notre IA analyse vos données pour personnaliser votre programme de
        santé. Votre parcours personnalisé est sur le point de débuter....
      </p>
      <div className="flex flex-col items-center mt-7">
        <Lottie animationData={congratsAnimationData} loop={true} />
        <Lottie
          animationData={dotsAnimationData}
          style={{
            height: "80px",
            width: "80px",
          }}
          loop={true}
        />
      </div>
    </div>
  );
}
