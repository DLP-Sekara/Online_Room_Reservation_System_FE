import { Col, Row, Tag, Button } from 'antd';
import {
  UserPlus,
  BedDouble,
  LogOut,
  ChevronRight,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MainDashboard = () => {
  const stats = [
    {
      title: "Today's Arrivals",
      value: '45',
      sub: 'Guests arriving',
      icon: <UserPlus className="text-white" />,
      color: 'bg-[#2CB1BC]',
    },
    {
      title: 'Occupied Rooms',
      value: '180 / 250',
      sub: 'Rooms currently occupied',
      icon: <BedDouble className="text-white" />,
      color: 'bg-[#91C788]',
    },
    {
      title: 'Pending Checkouts',
      value: '70',
      sub: "Today's ready for checkout",
      icon: <LogOut className="text-white" />,
      color: 'bg-[#F38181]',
    },
  ];

  const navigate = useNavigate();

  const rooms = Array(10).fill({
    no: '101',
    type: 'Deluxe King',
    status: 'Occupied', // Occupied, Cleaning, Available
  });

  return (
    <div className="animate-in fade-in space-y-8 duration-500">
      {/* 1. Modern Stats Cards */}
      <Row gutter={[24, 24]}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <div
              className={`${stat.color} group relative overflow-hidden rounded-3xl p-6 text-white shadow-lg shadow-gray-200`}
            >
              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-sm font-medium opacity-90">{stat.title}</span>
                  </div>
                  <h2 className="mb-1 text-4xl font-bold">{stat.value}</h2>
                  <p className="text-[12px] opacity-80">{stat.sub}</p>
                </div>
                <div className="rounded-2xl bg-white/20 p-3 backdrop-blur-sm transition-transform group-hover:scale-110">
                  {stat.icon}
                </div>
              </div>
              {/* Decorative Circle */}
              <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-white/10 blur-2xl"></div>
            </div>
          </Col>
        ))}
      </Row>

      {/* 2. Live Room Status Grid */}
      <div className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-bold text-[#0F2942]">Live Room Status</h3>
          <Button
            type="text"
            className="flex items-center gap-1 text-blue-500 hover:text-orange-500"
            onClick={() => navigate('/dashboard/rooms')}
          >
            Show More <ChevronRight size={16} />
          </Button>
        </div>

        <Row gutter={[16, 16]}>
          {rooms.map((room, i) => (
            <Col xs={12} sm={8} md={6} lg={4.8} key={i}>
              <div className="cursor-pointer rounded-2xl border border-gray-50 bg-[#F8FAFC] p-4 shadow-md transition-all hover:bg-white">
                <div
                  className={`mb-3 flex h-8 w-full items-center justify-start rounded-t-xl ${i % 3 === 0 ? 'bg-blue-400' : i % 3 === 1 ? 'bg-teal-400' : 'bg-green-400 opacity-50'}`}
                >
                  <span className="ml-4 text-lg font-bold text-gray-800">{room.no}</span>
                </div>
                <p className="mb-2 text-[11px] text-gray-500">{room.type}</p>
                <Tag
                  color={i % 3 === 0 ? 'blue' : i % 3 === 1 ? 'cyan' : 'green'}
                  className="rounded-full px-3 text-[10px]"
                >
                  {i % 3 === 0 ? 'Occupied' : i % 3 === 1 ? 'Cleaning' : 'Available'}
                </Tag>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default MainDashboard;
