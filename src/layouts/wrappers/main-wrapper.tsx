import AppHeader from "../app-header";
import AppSidebar from "../app-sidebar";

interface MainWrapperProps {
  children: React.ReactNode;
  pageTitle?: string;
}

const MainWrapper: React.FC<MainWrapperProps> = ({ children, pageTitle="" }) => {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <AppSidebar />
      <div className="flex flex-col flex-grow overflow-hidden">
        <AppHeader />
        <div className="bg-[#F2F2F2] text-lg font-medium tracking-[0.15px] py-[28px] text-[#252133] md:pr-6 md:pl-[170px]">{pageTitle || ""}</div>
        <main className="bg-[#f9f9f9] flex-grow overflow-y-auto py-6 p-6 md:pr-6 md:pl-[170px]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainWrapper;
