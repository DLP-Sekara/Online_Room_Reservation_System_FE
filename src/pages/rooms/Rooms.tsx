import React, { useState } from 'react';
import {
  Table,
  Tag,
  Button,
  Input,
  Drawer,
  Space,
  Select,
  Form,
  Divider,
  message,
  Badge,
} from 'antd';
import {
  Search,
  Plus,
  Filter,
  Edit,
  Trash2,
  Bed,
  Info,
  CheckCircle,
  RefreshCcw,
} from 'lucide-react';

const { Option } = Select;

const Rooms = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState('add');
  const [form] = Form.useForm();

  interface Room {
    key: string;
    roomNo: string;
    type: string;
    price: string;
    status: string;
    cleaning: string;
  }

  // Sample Data for Rooms
  const dataSource: Room[] = [
    {
      key: '1',
      roomNo: '101',
      type: 'Deluxe King',
      price: '25,000',
      status: 'Available',
      cleaning: 'Ready',
    },
    {
      key: '2',
      roomNo: '102',
      type: 'Deluxe King',
      price: '25,000',
      status: 'Occupied',
      cleaning: 'Ready',
    },
    {
      key: '3',
      roomNo: '205',
      type: 'Standard',
      price: '15,000',
      status: 'Available',
      cleaning: 'Dirty',
    },
  ];

  // Table Columns
  const columns = [
    {
      title: 'Room No',
      dataIndex: 'roomNo',
      key: 'roomNo',
      render: (text: string) => <span className="font-bold text-blue-600">{text}</span>,
    },
    { title: 'Room Type', dataIndex: 'type', key: 'type' },
    {
      title: 'Price (LKR)',
      dataIndex: 'price',
      key: 'price',
      render: (val: string) => <span className="font-semibold">{val}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: 'Available' | 'Occupied') => (
        <Badge status={status === 'Available' ? 'success' : 'error'} text={status} />
      ),
    },
    {
      title: 'Cleaning',
      dataIndex: 'cleaning',
      key: 'cleaning',
      render: (status: 'Ready' | 'Dirty') => (
        <Tag
          icon={status === 'Ready' ? <CheckCircle size={12} /> : <RefreshCcw size={12} />}
          color={status === 'Ready' ? 'blue' : 'warning'}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space size="middle">
          <Button
            type="text"
            icon={<Edit size={18} className="text-gray-400 hover:text-orange-500" />}
            onClick={() => {
              setDrawerType('edit');
              setIsDrawerOpen(true);
            }}
          />
          <Button
            type="text"
            icon={<Trash2 size={18} className="text-gray-400 hover:text-red-500" />}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="animate-in fade-in space-y-6 duration-500">
      {/* --- 1. Header & Actions --- */}
      <div className="flex flex-col items-start justify-between gap-4 rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#0F2942]">Room Management</h2>
          <p className="text-sm text-gray-400">
            Manage room inventory, pricing and status
          </p>
        </div>
        <Button
          type="primary"
          size="large"
          icon={<Plus size={20} />}
          onClick={() => {
            setDrawerType('add');
            setIsDrawerOpen(true);
          }}
          className="flex h-12 items-center gap-2 rounded-xl border-none bg-blue-600 shadow-lg hover:bg-orange-500"
        >
          Add New Room
        </Button>
      </div>

      {/* --- 2. Filter & Search Bar --- */}
      <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-white/50 p-2">
        <Input
          prefix={<Search size={18} className="text-gray-400" />}
          placeholder="Search room number..."
          className="h-11 w-full rounded-xl border-none shadow-sm md:w-80"
        />
        <Select defaultValue="all" className="h-11 w-44 rounded-xl border-none shadow-sm">
          <Option value="all">All Room Types</Option>
          <Option value="deluxe">Deluxe King</Option>
          <Option value="standard">Standard</Option>
        </Select>
        <Button
          icon={<Filter size={18} />}
          className="h-11 rounded-xl border-none shadow-sm"
        >
          More Filters
        </Button>
      </div>

      {/* --- 3. Main Data Table --- */}
      <div className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm">
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 8 }}
          className="custom-table"
        />
      </div>

      {/* --- 4. Side Drawer (Add/Edit Room) --- */}
      <Drawer
        title={
          <span className="text-xl font-bold">
            {drawerType === 'add' ? 'Add New Room' : 'Edit Room Details'}
          </span>
        }
        placement="right"
        width={450}
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        extra={
          <Space>
            <Button onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
            <Button
              type="primary"
              className="rounded-lg border-none bg-blue-600"
              onClick={() => message.success('Room Updated Successfully!')}
            >
              Save Changes
            </Button>
          </Space>
        }
        className="rounded-l-[2rem]"
      >
        <Form form={form} layout="vertical" className="space-y-4">
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-orange-100 bg-orange-50 p-4">
            <Bed className="text-orange-500" size={24} />
            <div>
              <p className="text-xs font-bold uppercase text-orange-600">
                Room Inventory
              </p>
              <p className="text-sm font-medium text-orange-900">
                Update room status manually for maintenance.
              </p>
            </div>
          </div>

          <Divider
            orientation="left"
            className="text-xs font-normal uppercase text-gray-400"
          >
            Room Configuration
          </Divider>

          <Form.Item label="Room Number" name="roomNo" rules={[{ required: true }]}>
            <Input placeholder="e.g. 101, 205" className="h-10 rounded-lg" />
          </Form.Item>

          <Form.Item label="Room Type" name="type" rules={[{ required: true }]}>
            <Select placeholder="Select Type" className="rounded-lg">
              <Option value="deluxe">Deluxe King (LKR 25,000)</Option>
              <Option value="standard">Standard (LKR 15,000)</Option>
              <Option value="suite">Luxury Suite (LKR 45,000)</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Cleaning Status" name="cleaning">
            <Select defaultValue="Ready">
              <Option value="Ready">Ready (Cleaned)</Option>
              <Option value="Dirty">Dirty (Needs Cleaning)</Option>
              <Option value="Maintenance">Under Maintenance</Option>
            </Select>
          </Form.Item>

          <div className="mt-8 rounded-2xl bg-blue-50 p-5">
            <h4 className="mb-2 flex items-center gap-2 font-bold text-blue-800">
              <Info size={16} /> Admin Note
            </h4>
            <p className="text-xs leading-relaxed text-blue-600">
              Please note that when changing the price or type of a room, it does not
              affect existing active reservations.
            </p>
          </div>
        </Form>
      </Drawer>
    </div>
  );
};

export default Rooms;
