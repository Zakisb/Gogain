import type { ReactNode, FC } from "react";

interface LayoutProps {
  children: ReactNode;
  video: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children, video }) => {
  return (
    <>
      {children}
      {/* {video} */}
    </>
  );
};

export default Layout;
