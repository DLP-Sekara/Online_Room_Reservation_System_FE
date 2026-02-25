import { Outlet } from 'react-router-dom';
import MainHeader from './components/MainHeader';
import MainSidebar from './components/MainSidebar';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F8FAFC]">
      <aside className="hidden h-full flex-shrink-0 md:flex">
        <MainSidebar />
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="z-10 h-16 border-b bg-white shadow-sm">
          <MainHeader />
        </header>

        {/* Dynamic Content */}
        <main className="custom-scrollbar flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
