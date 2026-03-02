import { useState } from 'react';
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
  Avatar,
} from 'antd';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  ShieldCheck,
  Key,
  UserCircle,
  Mail,
} from 'lucide-react';

const { Option } = Select;

const Users = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState('add');
  const [form] = Form.useForm();

  // Sample Data for Users
  const dataSource = [
    {
      key: '1',
      name: 'Amara Perera',
      username: 'amara_reception',
      email: 'amara@oceanview.com',
      role: 'Receptionist',
      status: 'Active',
    },
    {
      key: '2',
      name: 'Kasun Jayawardena',
      username: 'kasun_admin',
      email: 'kasun@oceanview.com',
      role: 'Admin',
      status: 'Active',
    },
    {
      key: '3',
      name: 'Nimali Silva',
      username: 'nimali_manager',
      email: 'nimali@oceanview.com',
      role: 'Manager',
      status: 'Inactive',
    },
  ];

  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <div className="flex items-center gap-3">
          <Avatar className="bg-blue-100 font-bold text-blue-600">
            {text.charAt(0)}
          </Avatar>
          <span className="font-bold text-gray-700">{text}</span>
        </div>
      ),
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (text: string) => <Tag className="rounded-md">@{text}</Tag>,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <span
          className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
            role === 'Admin'
              ? 'bg-purple-100 text-purple-600'
              : 'bg-blue-100 text-blue-600'
          }`}
        >
          {role}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Active' ? 'green' : 'red'} className="rounded-full px-3">
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
            icon={<Key size={18} className="text-gray-400 hover:text-orange-500" />}
            title="Reset Password"
          />
          <Button
            type="text"
            icon={<Edit size={18} className="text-gray-400 hover:text-blue-500" />}
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
          <h2 className="text-2xl font-bold text-[#0F2942]">User Management</h2>
          <p className="text-sm text-gray-400">
            Manage system access levels and staff accounts
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
          Add New User
        </Button>
      </div>

      {/* --- 2. Filter Bar --- */}
      <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-white/50 p-2">
        <Input
          prefix={<Search size={18} className="text-gray-400" />}
          placeholder="Search by name or username..."
          className="h-11 w-full rounded-xl border-none shadow-sm md:w-80"
        />
        <Select defaultValue="all" className="h-11 w-40 rounded-xl border-none shadow-sm">
          <Option value="all">All Roles</Option>
          <Option value="Admin">Admin</Option>
          <Option value="Receptionist">Receptionist</Option>
        </Select>
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

      {/* --- 4. Side Drawer (Add/Edit User) --- */}
      <Drawer
        title={
          <span className="text-xl font-bold">
            {drawerType === 'add' ? 'Create User Account' : 'Edit User Profile'}
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
              onClick={() => message.success('User updated successfully!')}
            >
              Save User
            </Button>
          </Space>
        }
        className="rounded-l-[2rem]"
      >
        <Form form={form} layout="vertical" className="space-y-4">
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-purple-100 bg-purple-50 p-4">
            <ShieldCheck className="text-purple-600" size={24} />
            <div>
              <p className="text-xs font-bold uppercase text-purple-600">
                Access Control
              </p>
              <p className="text-sm font-medium text-purple-900">
                Assign roles carefully to maintain security.
              </p>
            </div>
          </div>

          <Divider
            orientation="left"
            className="text-xs font-normal uppercase text-gray-400"
          >
            Personal Details
          </Divider>
          <Form.Item label="Full Name" name="name" rules={[{ required: true }]}>
            <Input
              prefix={<UserCircle size={16} className="text-gray-400" />}
              placeholder="e.g. John Doe"
              className="h-10 rounded-lg"
            />
          </Form.Item>

          <Form.Item
            label="Email Address"
            name="email"
            rules={[{ required: true, type: 'email' }]}
          >
            <Input
              prefix={<Mail size={16} className="text-gray-400" />}
              placeholder="john@oceanview.com"
              className="h-10 rounded-lg"
            />
          </Form.Item>

          <Divider
            orientation="left"
            className="text-xs font-normal uppercase text-gray-400"
          >
            Account Settings
          </Divider>

          <Form.Item label="Username" name="username" rules={[{ required: true }]}>
            <Input placeholder="e.g. john_admin" className="h-10 rounded-lg" />
          </Form.Item>

          {drawerType === 'add' && (
            <Form.Item
              label="Initial Password"
              name="password"
              rules={[{ required: true }]}
            >
              <Input.Password
                prefix={<Key size={16} className="text-gray-400" />}
                placeholder="••••••••"
                className="h-10 rounded-lg"
              />
            </Form.Item>
          )}

          <Form.Item label="System Role" name="role" rules={[{ required: true }]}>
            <Select placeholder="Select a role">
              <Option value="Admin">Admin (Full Access)</Option>
              <Option value="Manager">Manager (Reports & Rooms)</Option>
              <Option value="Receptionist">Receptionist (Reservations & Billing)</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Account Status" name="status">
            <Select defaultValue="Active">
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive / Suspended</Option>
            </Select>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default Users;
