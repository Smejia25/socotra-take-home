import { PropsWithChildren } from "react";

interface SideBarProps {
  title: string;
  open: boolean;
}

const SideBar = ({
  title,
  children,
  open,
}: PropsWithChildren<SideBarProps>) => {
  return (
    <>
      <aside
        className={` ${
          !open ? "collapse" : ""
        } absolute h-full top-0 right-0 shadow-2xl w-[25rem] font-roboto-400 py-5 bg-white font-bold flex flex-col`}
      >
        <div className="h-16 border-b-2 text-center py-5 font-roboto font-bold text-xl">
          {title}
        </div>

        {children}
      </aside>
    </>
  );
};

export default SideBar;
