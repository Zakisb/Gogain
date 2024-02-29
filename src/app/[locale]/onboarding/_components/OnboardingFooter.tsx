"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import misc from "/public/assets/images/misc/pattern.png";

// styles
import "swiper/css";
import "swiper/css/pagination";
import "@/styles/custom.css";

const OnboardingFooter = () => {
  return (
    <div className="px-16 py-8 borde ">
      <p className="text-gray-400">© 2024 GoGain. Tous droits réservés</p>
    </div>
  );
};

export default OnboardingFooter;
