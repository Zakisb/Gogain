import { ReactNode } from "react";
import OnboardingSwiper from "./_components/OnboardingSwiper";
import OnboardingHeader from "./_components/OnboardingHeader";
import OnboardingFooter from "./_components/OnboardingFooter";

// import 'react-toastify/dist/ReactToastify.min.css'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen flex  bg-slate-100 ">
      <div className="w-1/2 flex flex-col h-screen">
        <OnboardingHeader />
        <div className="grow">{children}</div>
        <OnboardingFooter />
      </div>

      <div className="w-1/2 h-full">
        <OnboardingSwiper />
      </div>
    </div>
  );
};

export default Layout;
