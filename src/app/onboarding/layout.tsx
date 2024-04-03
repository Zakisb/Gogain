import { ReactNode } from "react";
import OnboardingSwiper from "./_components/OnboardingSwiper";
import OnboardingHeader from "./_components/OnboardingHeader";
import OnboardingFooter from "./_components/OnboardingFooter";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen flex">
      <div className="w-1/2 flex flex-col h-full">
        <OnboardingHeader />
        <div className="grow overflow-y-auto ">{children}</div>
        <OnboardingFooter />
      </div>

      <div className="w-1/2 h-full">
        <OnboardingSwiper />
      </div>
    </div>
  );
};

export default Layout;
