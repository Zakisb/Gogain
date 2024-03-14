import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
const AuthSwiper = dynamic(() => import("./AuthSwiper"));

//images
import logoDark from "@/assets/images/logo/logo-dark.png";

type AccountLayoutProps = {
  authTitle?: string;
  helpText?: string;
  bottomLinks?: ReactNode;
  children?: ReactNode;
  displayShowcase?: boolean;
  hasThirdPartyAuth?: boolean;
  pageImage?: boolean;
};

const AuthLayout = ({
  authTitle,
  helpText,
  bottomLinks,
  children,
  displayShowcase,
  pageImage,
  hasThirdPartyAuth,
}: AccountLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 tracking-wide">
      <div className="container">
        <div>
          <div
            className={cn(
              displayShowcase
                ? "grid md:grid-cols-12 bg-white shadow rounded mb-6"
                : "lg:w-1/2 mx-auto mb-6"
            )}
          >
            <div
              className={cn(
                "bg-white shadow-[1px_0px_15px_0px_rgba(0,0,0,0.1)] p-12 rounded-s",
                displayShowcase ? "xl:col-span-5 md:col-span-6" : "col-span-6",
                pageImage && "text-center"
              )}
            >
              <div className="mb-12">
                <Link href="/">
                  <Image
                    src={logoDark}
                    // width={127}
                    height={44}
                    unoptimized
                    alt="logo-img"
                    className={cn("h-8", pageImage ? "mx-auto" : "")}
                  />
                </Link>
              </div>
              <h6 className="text-base/[1.6] font-semibold text-gray-600 mb-0 mt-4">
                {authTitle}
              </h6>
              <p className="text-gray-500 text-sm/[1.6] mt-1 mb-6">
                {helpText}
              </p>
              {pageImage && (
                <div className="text-sky-500 py-5">
                  <svg
                    className="w-20 h-20 mx-auto text-primary"
                    viewBox="0 0 24 24"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <g
                      stroke="none"
                      strokeWidth={1}
                      fill="none"
                      fillRule="evenodd"
                    >
                      <rect id="bound" x={0} y={0} width={24} height={24} />
                      <path
                        d="M6,2 L18,2 C18.5522847,2 19,2.44771525 19,3 L19,12 C19,12.5522847 18.5522847,13 18,13 L6,13 C5.44771525,13 5,12.5522847 5,12 L5,3 C5,2.44771525 5.44771525,2 6,2 Z M7.5,5 C7.22385763,5 7,5.22385763 7,5.5 C7,5.77614237 7.22385763,6 7.5,6 L13.5,6 C13.7761424,6 14,5.77614237 14,5.5 C14,5.22385763 13.7761424,5 13.5,5 L7.5,5 Z M7.5,7 C7.22385763,7 7,7.22385763 7,7.5 C7,7.77614237 7.22385763,8 7.5,8 L10.5,8 C10.7761424,8 11,7.77614237 11,7.5 C11,7.22385763 10.7761424,7 10.5,7 L7.5,7 Z"
                        id="Combined-Shape"
                        fill="currentColor"
                        opacity="0.3"
                      />
                      <path
                        d="M3.79274528,6.57253826 L12,12.5 L20.2072547,6.57253826 C20.4311176,6.4108595 20.7436609,6.46126971 20.9053396,6.68513259 C20.9668779,6.77033951 21,6.87277228 21,6.97787787 L21,17 C21,18.1045695 20.1045695,19 19,19 L5,19 C3.8954305,19 3,18.1045695 3,17 L3,6.97787787 C3,6.70173549 3.22385763,6.47787787 3.5,6.47787787 C3.60510559,6.47787787 3.70753836,6.51099993 3.79274528,6.57253826 Z"
                        id="Combined-Shape"
                        fill="currentColor"
                      />
                    </g>
                  </svg>
                </div>
              )}
              {children}
            </div>

            {displayShowcase && (
              <div className="hidden md:block xl:col-span-7 md:col-span-6">
                <div className="max-w-[80%] mx-auto">
                  <div className="my-12 py-12">
                    <div className="flex items-center justify-center h-full">
                      <AuthSwiper />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {bottomLinks}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
