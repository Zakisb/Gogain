"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import sass1 from "/public/assets/images/hero/saas1.jpg";
import sass2 from "/public/assets/images/hero/saas2.jpg";
import sass3 from "/public/assets/images/hero/saas3.jpg";

// styles
import "swiper/css";
import "swiper/css/pagination";
import "@/styles/custom.css";

const AuthSwiper = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 9500,
        disableOnInteraction: false,
      }}
      loop={false}
      className="auth-swiper"
    >
      <SwiperSlide>
        <div className="swiper-slide-content">
          <div className="text-center w-3/5 mx-auto">
            <Image
              src={sass1}
              width={305}
              height={202}
              alt="saas alt"
              className="w-full"
            />
          </div>
          <div className="text-center my-6 pb-12">
            <h5 className="font-medium text-base/[1.6] text-gray-600 my-2.5">
              Élevez Votre Entraînement avec le Suivi de Performance Personnel
            </h5>
            <p className="text-sm/[1.6] text-gray-500 mb-4">
              Prenez le contrôle de votre parcours de fitness avec nos
              fonctionnalités avancées de suivi de performance.
            </p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiper-slide-content">
          <div className="text-center w-3/5 mx-auto">
            <Image
              src={sass2}
              width={305}
              height={202}
              alt="saas alt2"
              className="w-full"
            />
          </div>
          <div className="text-center my-6 pb-12">
            <h5 className="font-medium text-base/[1.6] text-gray-600 my-2.5">
              Entraînements Personnalisés pour Vos Objectifs Uniques
            </h5>
            <p className="text-sm/[1.6] text-gray-500">
              Découvrez la puissance de l&apos;entraînement personnalisé avec
              des plans d&apos;entraînement modulables.
            </p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiper-slide-content">
          <div className="text-center w-3/5 mx-auto">
            <Image
              src={sass3}
              width={305}
              height={202}
              alt="saas alt3"
              className="w-full"
            />
          </div>
          <div className="text-center my-6 pb-12">
            <h5 className="font-medium text-base/[1.6] text-gray-600 my-2.5">
              Rejoignez une Communauté Engagée pour la Réussite
            </h5>
            <p className="text-sm/[1.6] text-gray-500">
              Vous n&apos;êtes pas seul dans votre parcours de fitness.
              Connectez-vous avec une communauté de soutien de formateurs et de
              pairs qui partagent vos objectifs et défis.
            </p>
          </div>
        </div>
      </SwiperSlide>
      <div className="swiper-pagination-auth bg-red-500" />
    </Swiper>
  );
};

export default AuthSwiper;
