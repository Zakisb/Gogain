import type { ReactNode, FC } from "react";

interface LayoutProps {
  children: ReactNode;
  newLicense: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children, newLicense }) => {
  return (
    <>
      {children}
      {newLicense}
    </>
  );
};

export default Layout;
