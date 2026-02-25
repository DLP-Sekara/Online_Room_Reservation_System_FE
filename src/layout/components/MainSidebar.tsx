import {
  LayoutDashboard,
  ClipboardList,
  Bed,
  Utensils,
  Receipt,
  Users,
  Settings,
  LogOut,
} from 'lucide-react';

const MainSidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'Reservations', icon: <ClipboardList size={20} />, path: '/reservations' },
    { name: 'Rooms', icon: <Bed size={20} />, path: '/rooms' },
    { name: 'Meal Management', icon: <Utensils size={20} />, path: '/meals' },
    { name: 'Billing & Reports', icon: <Receipt size={20} />, path: '/billing' },
    { name: 'Users', icon: <Users size={20} />, path: '/users' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  ];

  return (
    <div className="flex h-screen w-64 flex-col bg-[#0F2942] text-white shadow-xl">
      {/* Logo Section */}
      <div className="flex flex-col items-center border-b border-blue-900/50 p-6">
        <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 bg-gradient-to-br from-blue-400 to-blue-700 shadow-lg">
          <span className="text-2xl font-bold">OV</span>
        </div>
        <h1 className="text-lg font-bold uppercase tracking-wider">Ocean View</h1>
        <p className="text-[10px] tracking-[0.2em] text-blue-300">Resort Management</p>
      </div>

      {/* Navigation Items */}
      <nav className="mt-6 flex-1 space-y-2 px-4">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="group flex cursor-pointer items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 hover:bg-blue-600/20 hover:text-blue-300"
          >
            <div className="text-blue-400 group-hover:text-blue-300">{item.icon}</div>
            <span className="text-sm font-medium">{item.name}</span>
          </div>
        ))}
      </nav>

      {/* 🚪 Logout Section */}
      <div className="border-t border-blue-900/50 p-4">
        <button className="flex w-full items-center gap-4 rounded-xl bg-red-500/10 px-4 py-3 text-red-400 transition-all duration-300 hover:bg-red-500 hover:text-white">
          <LogOut size={20} />
          <span className="text-sm font-medium">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default MainSidebar;
