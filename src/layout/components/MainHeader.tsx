import { Input } from 'antd';
import { Search, Bell, User, Calendar } from 'lucide-react';

const MainHeader = () => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex h-full items-center justify-between bg-white px-8">
      <div className="group relative hidden w-96 lg:flex">
        <Input
          prefix={<Search size={18} />}
          type="text"
          placeholder="Search for reservations, guests..."
          className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pr-4 text-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      <div className="flex w-full items-center justify-end gap-6">
        {/* Date Display (Hidden on small screens) */}
        <div className="hidden items-center gap-2 border-r border-gray-100 pr-6 text-sm text-gray-500 lg:flex">
          <Calendar size={16} className="text-blue-500" />
          <span>{today}</span>
        </div>

        {/* Notifications */}
        <button className="relative rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100">
          <Bell size={20} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-red-500"></span>
        </button>

        {/* User Profile Info */}
        <div className="group flex cursor-pointer items-center gap-3 pl-2">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800 transition-colors group-hover:text-blue-600">
              Super Admin
            </p>
            <p className="text-[11px] text-gray-400">Ocean View Resort</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-200">
            <User size={22} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
