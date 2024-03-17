"use client";
import { cn } from "@/lib/utils";
import { APP_NAME } from "@/constants/app.constant";
import type { CommonProps } from "@/types/common";
import LightLogo from "@/assets/images/logo/logo-light.png";
import DarkLogo from "@/assets/images/logo/logo-dark.png";
import { useTheme } from "next-themes";

import Image from "next/image";
interface LogoProps extends CommonProps {
  type?: "full" | "streamline";
  mode?: "light" | "dark";
  imgClass?: string;
  logoWidth?: number | string;
  style?: React.CSSProperties;
  className?: string;
}

const Logo = (props: LogoProps) => {
  const { theme } = useTheme();
  const {
    type = "full",
    mode = "light",
    className,
    imgClass,
    style,
    logoWidth = "auto",
  } = props;

  return (
    <div
      className={cn("logo ml-2", className)}
      style={{
        ...style,
        ...{ width: logoWidth },
      }}
    >
      <Image
        // src={theme === "light" ? DarkLogo : LightLogo}
        src={DarkLogo}
        alt={`${APP_NAME} logo`}
        className={imgClass}
        height={40}
      />

      {/* <img
        className={imgClass}
        src={`${LOGO_SRC_PATH}logo-${mode}-${type}.png`}
        alt={`${APP_NAME} logo`}
      /> */}
    </div>
  );
};

export default Logo;
