"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import misc from "/public/assets/images/misc/pattern.png";

import logo from "@/assets/images/logo/logo-dark.png";

// styles
import "swiper/css";
import "swiper/css/pagination";
import "@/styles/custom.css";

const OnboardingFooter = () => {
  return (
    <div className="px-16 py-6 borde flex flex-row justify-between items-center">
      <Image src={logo} alt="GoGain - logo" width={90} className="" />
      <p className="text-gray-400">© 2024 GoGain. Tous droits réservés</p>
    </div>
  );
};

export default OnboardingFooter;
