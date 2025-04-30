import { FC, ReactNode } from "react";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

interface Props {
  children: ReactNode;
}

const Container: FC<Props> = ({ children }) => {
  const location = useLocation();

  const readingMode = location.pathname.startsWith("/read/");

  if (readingMode) return children;

  return (
    <>
      <div className="p-4 text-sm text-center text-white bg-black md:text-base">
        
        <p className="font-semibold">
          Welcome Authers✍️ and Readers📖
        </p>
      </div>
      <div className="flex flex-col max-w-5xl min-h-screen mx-auto">
        <Navbar />
        <div className="flex flex-col flex-1 pb-20">{children}</div>

        <footer className="px-4 pb-10 text-center">
          <p className="text-sm text-gray-500">
            © All Rights Reserved
            
            Made By 2025 ITPM Group WE_34
            
          </p>
        </footer>
      </div>
    </>
  );
};

export default Container;
