"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import logo from "/public/assets/images/logo-dark.png";

// styles
import "swiper/css";
import "swiper/css/pagination";
import "@/styles/custom.css";

const OnboardingHeader = () => {
  return (
    <div className="px-16 py-8 border-b border-gray-200">
      <Image src={logo} alt="GoGain - logo" width={120} className="" />
    </div>
  );
};

export default OnboardingHeader;
