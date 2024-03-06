"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useTranslations } from "next-intl";
import misc from "/public/assets/images/misc/pattern.png";

// styles
import "swiper/css";
import "swiper/css/pagination";
import "@/styles/custom.css";

const OnboardingSwiper = () => {
  const t = useTranslations("Onboarding.Swiper");
  return (
    <div className="h-full relative">
      <Image
        src={misc}
        alt="misc"
        className="absolute bottom-10 -left-14 z-50"
      />
      <Swiper
        modules={[Autoplay, Pagination]}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop
        className="h-full relative"
      >
        <SwiperSlide className="onboarding-swiper-1">
          <div className="flex flex-col justify-end h-full">
            <div className="bg-black w-full  text-white h-44 px-40 py-10">
              <h3 className="mx-auto">{t("slideOne")}</h3>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="onboarding-swiper-2">
          <div className="flex flex-col justify-end h-full">
            <div className="bg-black w-full  text-white h-44 px-40 py-10">
              <h3 className="mx-auto">{t("slideTwo")}</h3>
            </div>
          </div>
        </SwiperSlide>
        <div className="swiper-pagination" />
      </Swiper>
    </div>
  );
};

export default OnboardingSwiper;
