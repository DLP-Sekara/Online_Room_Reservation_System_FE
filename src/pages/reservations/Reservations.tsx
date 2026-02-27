import React, { useState } from 'react';
import {
  Table,
  Tag,
  Button,
  Input,
  Drawer,
  Space,
  DatePicker,
  Select,
  Form,
  Divider,
  message,
  Row,
  Col,
} from 'antd';
import {
  Search,
  Plus,
  Filter,
  Eye,
  Edit,
  Trash2,
  Calculator,
  UserCheck,
} from 'lucide-react';

const { RangePicker } = DatePicker;
const { Option } = Select;

const Reservations = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState('add'); // 'add', 'view', 'edit'
  const [form] = Form.useForm();

  interface Reservation {
    key: string;
    id: string;
    guest: string;
    room: string;
    checkIn: string;
    checkOut: string;
    status: string;
    total: string;
  }

  // Sample Data
  const dataSource: Reservation[] = [
    {
      key: '1',
      id: 'RES-1001',
      guest: 'John Doe',
      room: 'Deluxe-101',
      checkIn: '2024-03-20',
      checkOut: '2024-03-22',
      status: 'Confirmed',
      total: '45,000',
    },
    {
      key: '2',
      id: 'RES-1002',
      guest: 'Jane Smith',
      room: 'Standard-205',
      checkIn: '2024-03-21',
      checkOut: '2024-03-25',
      status: 'Pending',
      total: '32,000',
    },
  ];

  // Table Columns
  const columns = [
    {
      title: 'Res ID',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => <span className="font-bold text-blue-600">{text}</span>,
    },
    { title: 'Guest Name', dataIndex: 'guest', key: 'guest' },
    { title: 'Room', dataIndex: 'room', key: 'room' },
    {
      title: 'Duration',
      key: 'duration',
      render: (_: any, r: Reservation) => (
        <span className="text-xs">
          {r.checkIn} to {r.checkOut}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag
          color={status === 'Confirmed' ? 'green' : 'gold'}
          className="rounded-full px-3"
        >
          {status}
        </Tag>
      ),
    },
    {
      title: 'Total (LKR)',
      dataIndex: 'total',
      key: 'total',
      render: (val: string) => <span className="font-semibold">{val}</span>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space size="middle">
          <Button
            type="text"
            icon={<Eye size={18} className="text-gray-400 hover:text-blue-500" />}
            onClick={() => {
              setDrawerType('view');
              setIsDrawerOpen(true);
            }}
          />
          <Button
            type="text"
            icon={<Edit size={18} className="text-gray-400 hover:text-orange-500" />}
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
          <h2 className="text-2xl font-bold text-[#0F2942]">Reservations</h2>
          <p className="text-sm text-gray-400">Manage and monitor all guest bookings</p>
        </div>
        <Button
          type="primary"
          size="large"
          icon={<Plus size={20} />}
          onClick={() => {
            setDrawerType('add');
            setIsDrawerOpen(true);
          }}
          className="flex h-12 items-center gap-2 rounded-xl border-none bg-blue-600 shadow-lg shadow-blue-200 hover:bg-orange-500"
        >
          New Reservation
        </Button>
      </div>

      {/* --- 2. Filter Bar --- */}
      <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-white/50 p-2">
        <Input
          prefix={<Search size={18} className="text-gray-400" />}
          placeholder="Search guest or ID..."
          className="h-11 w-full rounded-xl border-none shadow-sm md:w-80"
        />
        <Button
          icon={<Filter size={18} />}
          className="h-11 rounded-xl border-none shadow-sm"
        >
          Filters
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

      {/* --- 4. Side Drawer (Add/View/Edit) --- */}
      <Drawer
        title={
          <span className="text-xl font-bold">
            {drawerType === 'add' ? 'Create New Booking' : 'Booking Details'}
          </span>
        }
        placement="right"
        width={550}
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        extra={
          <Space>
            <Button onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
            {drawerType !== 'view' && (
              <Button
                type="primary"
                className="rounded-lg border-none bg-blue-600"
                onClick={() => message.success('Saved Successfully!')}
              >
                Confirm Booking
              </Button>
            )}
          </Space>
        }
        className="rounded-l-[2rem]"
      >
        <Form form={form} layout="vertical" className="space-y-4">
          {/* Guest Check Section */}
          <div className="flex items-center justify-between rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <div className="flex items-center gap-3">
              <UserCheck className="text-blue-600" size={24} />
              <div>
                <p className="text-xs font-bold uppercase text-blue-600">
                  Returning Guest?
                </p>
                <p className="text-sm text-blue-900">
                  Check availability via phone number
                </p>
              </div>
            </div>
            <Input.Search placeholder="Enter Phone" className="w-40" />
          </div>

          <Divider
            orientation="left"
            className="text-xs font-normal uppercase text-gray-400"
          >
            Guest Information
          </Divider>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Full Name" name="name">
                <Input placeholder="Guest Name" className="rounded-lg" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Contact Number" name="contact">
                <Input placeholder="07x xxxxxxx" className="rounded-lg" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Email (Optional)" name="email">
                <Input placeholder="example@mail.com" className="rounded-lg" />
              </Form.Item>
            </Col>
          </Row>

          <Divider
            orientation="left"
            className="text-xs font-normal uppercase text-gray-400"
          >
            Stay Details
          </Divider>
          <Form.Item label="Check-in & Check-out Dates">
            <RangePicker className="h-10 w-full rounded-lg" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Room Type">
                <Select placeholder="Select Type" className="rounded-lg">
                  <Option value="deluxe">Deluxe King (LKR 25,000)</Option>
                  <Option value="standard">Standard (LKR 15,000)</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Meal Plan">
                <Select placeholder="Select Plan">
                  <Option value="bb">Bed & Breakfast</Option>
                  <Option value="fb">Full Board</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Billing Calculation Section */}
          <div className="mt-6 rounded-[2rem] border border-dashed border-gray-200 bg-gray-50 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="flex items-center gap-2 font-bold text-gray-700">
                <Calculator size={18} /> Estimated Bill
              </h4>
              <Button type="link" className="font-bold text-orange-500">
                Recalculate
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Room Charges (2 Nights)</span>
                <span>LKR 50,000</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Meal Plan (FB)</span>
                <span>LKR 15,000</span>
              </div>
              <Divider className="my-2" />
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-800">Total Amount</span>
                <span className="text-2xl font-bold tracking-tight text-blue-600">
                  LKR 65,000
                </span>
              </div>
            </div>
          </div>
        </Form>
      </Drawer>
    </div>
  );
};

export default Reservations;
