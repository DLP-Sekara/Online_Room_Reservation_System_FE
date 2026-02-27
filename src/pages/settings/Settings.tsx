import { Form, Input, Button, Tabs, Table, Tag, Divider, message, Card } from 'antd';
import {
  ShieldCheck,
  KeyRound,
  MonitorDot,
  UserPlus,
  Trash2,
  LogOut,
} from 'lucide-react';

const Settings = () => {
  const [passwordForm] = Form.useForm();

  // 1. Sample Data for Active Sessions
  const sessionData = [
    {
      key: '1',
      device: 'Chrome / Windows',
      location: 'Colombo, SL',
      date: 'Active Now',
      ip: '192.168.1.1',
    },
    {
      key: '2',
      device: 'Safari / iPhone 13',
      location: 'Galle, SL',
      date: '2 hours ago',
      ip: '112.134.5.10',
    },
  ];

  const sessionColumns = [
    {
      title: 'Device & OS',
      dataIndex: 'device',
      key: 'device',
      render: (text: string) => (
        <div className="flex items-center gap-3">
          <MonitorDot size={18} className="text-blue-500" />
          <span className="font-medium">{text}</span>
        </div>
      ),
    },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    { title: 'IP Address', dataIndex: 'ip', key: 'ip' },
    {
      title: 'Last Activity',
      dataIndex: 'date',
      key: 'date',
      render: (text: string) => (
        <Tag color={text === 'Active Now' ? 'green' : 'default'}>{text}</Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Button type="text" danger icon={<LogOut size={16} />}>
          Logout
        </Button>
      ),
    },
  ];

  const tabItems = [
    {
      key: '1',
      label: (
        <span className="flex items-center gap-2">
          <UserPlus size={16} /> System Admins
        </span>
      ),
      children: (
        <div className="animate-in fade-in space-y-6 duration-500">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-bold text-gray-700">Privileged Administrators</h4>
            <Button
              type="primary"
              icon={<UserPlus size={16} />}
              className="rounded-lg bg-blue-600"
            >
              Add Admin
            </Button>
          </div>
          <Card className="rounded-2xl border-gray-100 shadow-sm">
            <Table
              pagination={false}
              dataSource={[
                {
                  key: '1',
                  name: 'Super Admin',
                  email: 'admin@oceanview.com',
                  role: 'Full Access',
                },
                {
                  key: '2',
                  name: 'System Manager',
                  email: 'manager@oceanview.com',
                  role: 'Config Only',
                },
              ]}
              columns={[
                {
                  title: 'Admin Name',
                  dataIndex: 'name',
                  key: 'name',
                  render: (t) => <b>{t}</b>,
                },
                { title: 'Email', dataIndex: 'email', key: 'email' },
                {
                  title: 'Access Level',
                  dataIndex: 'role',
                  key: 'role',
                  render: (r) => <Tag color="purple">{r}</Tag>,
                },
                {
                  title: '',
                  key: 'action',
                  render: () => <Button type="text" danger icon={<Trash2 size={16} />} />,
                },
              ]}
            />
          </Card>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <span className="flex items-center gap-2">
          <KeyRound size={16} /> Change Password
        </span>
      ),
      children: (
        <div className="animate-in fade-in max-w-md rounded-3xl border border-gray-100 bg-white p-6 duration-500">
          <h4 className="mb-6 text-lg font-bold text-gray-700">
            Update Security Credentials
          </h4>
          <Form
            form={passwordForm}
            layout="vertical"
            onFinish={() => message.success('Password changed successfully!')}
          >
            <Form.Item
              label="Current Password"
              name="current"
              rules={[{ required: true }]}
            >
              <Input.Password placeholder="••••••••" className="h-11 rounded-xl" />
            </Form.Item>
            <Divider />
            <Form.Item label="New Password" name="new" rules={[{ required: true }]}>
              <Input.Password placeholder="••••••••" className="h-11 rounded-xl" />
            </Form.Item>
            <Form.Item
              label="Confirm New Password"
              name="confirm"
              rules={[{ required: true }]}
            >
              <Input.Password placeholder="••••••••" className="h-11 rounded-xl" />
            </Form.Item>
            <Button
              type="primary"
              block
              size="large"
              className="mt-4 h-12 rounded-xl border-none bg-orange-500 hover:bg-blue-600"
              htmlType="submit"
            >
              Update Password
            </Button>
          </Form>
        </div>
      ),
    },
    {
      key: '3',
      label: (
        <span className="flex items-center gap-2">
          <MonitorDot size={16} /> Current Sessions
        </span>
      ),
      children: (
        <div className="animate-in fade-in space-y-6 duration-500">
          <div className="flex items-center justify-between rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-blue-600" size={24} />
              <p className="text-sm font-medium text-blue-900">
                If you see any suspicious activity, logout from all other devices
                immediately.
              </p>
            </div>
            <Button danger className="rounded-xl font-bold">
              Logout All Devices
            </Button>
          </div>
          <Table
            dataSource={sessionData}
            columns={sessionColumns}
            pagination={false}
            className="overflow-hidden rounded-2xl border border-gray-100"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-[#0F2942]">Settings & Security</h2>
        <p className="text-sm text-gray-400">
          Manage administrator access and track your account security
        </p>
      </div>

      <div className="min-h-[500px] rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm">
        <Tabs
          defaultActiveKey="1"
          items={tabItems}
          tabPosition="left"
          className="security-tabs"
        />
      </div>
    </div>
  );
};

export default Settings;
