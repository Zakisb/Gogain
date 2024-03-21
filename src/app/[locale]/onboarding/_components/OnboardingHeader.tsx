"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Carrot, Pencil, HandHeart, Goal } from "lucide-react";

// styles
import "swiper/css";
import "swiper/css/pagination";
import "@/styles/custom.css";
import { Separator } from "@/components/ui/separator";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const steps = [
  {
    name: "Inscription",
    path: "/registration",
    href: "/onboarding/registration",
    icon: Pencil,
  },
  { name: "Objectif", path: "/goal", href: "/onboarding/goal", icon: Goal },
  {
    name: "Nutrition",
    path: "/nutrition",
    href: "/onboarding/nutrition",
    icon: Carrot,
  },
  {
    name: "Mode de vie",
    path: "/lifestyle-habits",
    href: "/onboarding/lifestyle-habits",
    icon: HandHeart,
  },
];

const OnboardingHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
    <div className="flex flex-row gap-x-5 justify-between px-16 py-4 border-b border-gray-200 ">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-row gap-6 items-center mt-2">
          <div
            key={index}
            className="relative cursor-pointer"
            onClick={() => handleNavigation(step.href)}
          >
            <div className="flex flex-row gap-2 items-center">
              <step.icon
                className={cn(
                  lastSegment === step.path.split("/").pop()
                    ? "text-primary"
                    : "text-gray-400",
                  "h-5 w-5"
                )}
              />

              <span
                className={cn(
                  lastSegment === step.path.split("/").pop()
                    ? "text-primary font-semibold "
                    : "text-gray-400 font-medium",
                  "text-sm relative"
                )}
              >
                {step.name}
              </span>
            </div>
            {lastSegment === step.path.split("/").pop() && (
              <Separator className="bg-primary absolute -bottom-5 h-[3px] rounded-sm ml-1" />
            )}
          </div>

          {index === steps.length - 1 ? null : (
            <span
              className={cn(
                lastSegment === step.path.split("/").pop()
                  ? "text-primary"
                  : "text-gray-500"
              )}
            >
              &#8594;
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default OnboardingHeader;
