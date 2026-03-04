import { useState } from 'react';
import {
  Table,
  Tag,
  Button,
  Input,
  Drawer,
  Space,
  Form,
  message,
  InputNumber,
} from 'antd';
import { Plus, Edit, Trash2, Utensils, Info } from 'lucide-react';

const MealManagement = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState('add');
  const [form] = Form.useForm();

  interface MealPlan {
    key: string;
    planName: string;
    code: string;
    price: string;
    status: string;
  }

  // Sample Data for Meal Plans
  const dataSource: MealPlan[] = [
    {
      key: '1',
      planName: 'Bed & Breakfast (BB)',
      code: 'BB',
      price: '2,500',
      status: 'Active',
    },
    {
      key: '2',
      planName: 'Half Board (HB)',
      code: 'HB',
      price: '5,000',
      status: 'Active',
    },
    {
      key: '3',
      planName: 'Full Board (FB)',
      code: 'FB',
      price: '7,500',
      status: 'Active',
    },
    {
      key: '4',
      planName: 'All Inclusive (AI)',
      code: 'AI',
      price: '12,000',
      status: 'Inactive',
    },
  ];

  // Table Columns
  const columns = [
    {
      title: 'Plan Name',
      dataIndex: 'planName',
      key: 'planName',
      render: (text: string) => <span className="font-bold text-blue-600">{text}</span>,
    },
    { title: 'Code', dataIndex: 'code', key: 'code' },
    {
      title: 'Price Per Person (LKR)',
      dataIndex: 'price',
      key: 'price',
      render: (val: string) => <span className="font-semibold text-gray-700">{val}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: 'Active' | 'Inactive') => (
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
          <h2 className="text-2xl font-bold text-[#0F2942]">Meal Management</h2>
          <p className="text-sm text-gray-400">
            Configure meal plans and restaurant pricing
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
          Add New Plan
        </Button>
      </div>

      {/* --- 2. Filter & Search Bar --- */}
      {/* <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-white/50 p-2">
        <Input
          prefix={<Search size={18} className="text-gray-400" />}
          placeholder="Search meal plan..."
          className="h-11 w-full rounded-xl border-none shadow-sm md:w-80"
        />
        <Button
          icon={<Filter size={18} />}
          className="h-11 rounded-xl border-none shadow-sm"
        >
          Advanced Filter
        </Button>
      </div> */}

      {/* --- 3. Main Data Table --- */}
      <div className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm">
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 5 }}
          className="custom-table"
        />
      </div>

      {/* --- 4. Side Drawer (Add/Edit Meal Plan) --- */}
      <Drawer
        title={
          <span className="text-xl font-bold">
            {drawerType === 'add' ? 'Add New Meal Plan' : 'Update Pricing'}
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
              onClick={() => message.success('Meal Plan Updated!')}
            >
              Confirm
            </Button>
          </Space>
        }
        className="rounded-l-[2rem]"
      >
        <Form form={form} layout="vertical" className="space-y-4">
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <Utensils className="text-blue-500" size={24} />
            <div>
              <p className="text-xs font-bold uppercase text-blue-600">
                Pricing Strategy
              </p>
              <p className="text-sm font-medium text-blue-900">
                Rates are calculated per person per night.
              </p>
            </div>
          </div>

          <Form.Item label="Meal Plan Name" name="planName" rules={[{ required: true }]}>
            <Input placeholder="e.g. Full Board" className="h-10 rounded-lg" />
          </Form.Item>

          <Form.Item label="Plan Code" name="code" rules={[{ required: true }]}>
            <Input placeholder="e.g. FB" className="h-10 rounded-lg" />
          </Form.Item>

          <Form.Item
            label="Price Per Person (LKR)"
            name="price"
            rules={[{ required: true }]}
          >
            <InputNumber
              className="flex h-10 w-full items-center rounded-lg"
              formatter={(value) => `LKR ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            />
          </Form.Item>

          <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-5">
            <h4 className="mb-2 flex items-center gap-2 font-bold text-gray-700">
              <Info size={16} /> Important Note
            </h4>
            <p className="text-xs leading-relaxed text-gray-500">
              Please note that after changing the prices here, the new prices will
              automatically apply to all new reservations.
            </p>
          </div>
        </Form>
      </Drawer>
    </div>
  );
};

export default MealManagement;
