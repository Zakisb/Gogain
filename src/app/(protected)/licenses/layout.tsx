import type { ReactNode, FC } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      {children}
      {/* {newLicense} */}
    </>
  );
};

export default Layout;
