import { useState } from 'react';
import { Table, Tag, Button, Input, Drawer, Space, Divider } from 'antd';
import { Search, Filter, Eye, Printer, CreditCard, Download, CheckCircle2 } from 'lucide-react';

const BillingAndPayments = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  // Sample Data for Billing
  const dataSource = [
    {
      key: '1',
      invNo: 'INV-2024-001',
      guest: 'John Doe',
      resId: 'RES-1001',
      amount: '65,000',
      date: '2024-03-22',
      status: 'Paid',
    },
    {
      key: '2',
      invNo: 'INV-2024-002',
      guest: 'Jane Smith',
      resId: 'RES-1002',
      amount: '42,500',
      date: '2024-03-25',
      status: 'Pending',
    },
  ];

  const columns = [
    {
      title: 'Invoice No',
      dataIndex: 'invNo',
      key: 'invNo',
      render: (text: string) => <span className="font-bold text-blue-600">{text}</span>,
    },
    { title: 'Guest Name', dataIndex: 'guest', key: 'guest' },
    { title: 'Res ID', dataIndex: 'resId', key: 'resId' },
    {
      title: 'Total Amount (LKR)',
      dataIndex: 'amount',
      key: 'amount',
      render: (val: string) => <span className="font-bold">{val}</span>,
    },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Paid' ? 'green' : 'orange'} className="rounded-full px-3">
          {status}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<Eye size={18} className="text-gray-400 hover:text-blue-500" />}
            onClick={() => {
              setSelectedInvoice(record);
              setIsDrawerOpen(true);
            }}
          />
          <Button
            type="text"
            icon={<Printer size={18} className="text-gray-400 hover:text-gray-600" />}
          />
          <Button
            type="text"
            icon={<Download size={18} className="text-gray-400 hover:text-gray-600" />}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="animate-in fade-in space-y-6 duration-500">
      {/* --- 1. Header & Quick Stats --- */}
      <div className="flex flex-col items-start justify-between gap-4 rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#0F2942]">Billing & Payments</h2>
          <p className="text-sm text-gray-400">
            Generate invoices and track hotel revenue
          </p>
        </div>
        <div className="flex gap-4">
          <div className="rounded-2xl border border-blue-100 bg-blue-50 px-6 py-2">
            <p className="text-[10px] font-bold uppercase text-blue-600">
              Total Revenue (Monthly)
            </p>
            <p className="text-xl font-bold text-blue-900">LKR 1,240,500</p>
          </div>
        </div>
      </div>

      {/* --- 2. Filter Bar --- */}
      <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-white/50 p-2">
        <Input
          prefix={<Search size={18} className="text-gray-400" />}
          placeholder="Search by Invoice or Guest..."
          className="h-11 w-full rounded-xl border-none shadow-sm md:w-80"
        />
        <Button
          icon={<Filter size={18} />}
          className="h-11 rounded-xl border-none shadow-sm"
        >
          Date Range
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

      {/* --- 4. Side Drawer (Invoice Preview & Payment) --- */}
      <Drawer
        title={<span className="text-xl font-bold">Invoice Details</span>}
        placement="right"
        width={600}
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        extra={
          <Space>
            <Button icon={<Printer size={16} />}>Print</Button>
            <Button
              type="primary"
              className="flex items-center gap-2 rounded-lg border-none bg-blue-600"
            >
              <CreditCard size={16} /> Process Payment
            </Button>
          </Space>
        }
        className="rounded-l-[2rem]"
      >
        {/* --- Modern Invoice Preview --- */}
        <div className="rounded-[2rem] border border-gray-100 bg-white p-4 shadow-sm">
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-black italic text-blue-600">OCEAN VIEW</h3>
              <p className="text-[10px] uppercase tracking-widest text-gray-400">
                Resort & Spa Galle
              </p>
            </div>
            <div className="text-right">
              <h4 className="text-lg font-bold uppercase tracking-tighter">Invoice</h4>
              <p className="text-xs text-gray-500">No: {selectedInvoice?.invNo}</p>
              <p className="text-xs text-gray-500">Date: {selectedInvoice?.date}</p>
            </div>
          </div>

          <div className="mb-8">
            <p className="mb-1 text-[10px] font-bold uppercase text-gray-400">Bill To:</p>
            <p className="font-bold text-gray-800">{selectedInvoice?.guest}</p>
            <p className="text-xs text-gray-500">
              Reservation ID: {selectedInvoice?.resId}
            </p>
          </div>

          <table className="mb-8 w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500">
              <tr>
                <th className="rounded-l-xl p-3 font-medium">Description</th>
                <th className="p-3 text-right font-medium">Qty/Nights</th>
                <th className="rounded-r-xl p-3 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-b border-gray-50">
                <td className="p-3">Deluxe Room (King)</td>
                <td className="p-3 text-right">2</td>
                <td className="p-3 text-right">LKR 50,000</td>
              </tr>
              <tr className="border-b border-gray-50">
                <td className="p-3">Full Board Meal Plan</td>
                <td className="p-3 text-right">2</td>
                <td className="p-3 text-right">LKR 15,000</td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Subtotal</span>
                <span>LKR 65,000</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Service Charge (10%)</span>
                <span>LKR 6,500</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Tax (15%)</span>
                <span>LKR 9,750</span>
              </div>
              <Divider className="my-2" />
              <div className="flex items-center justify-between rounded-xl bg-blue-50 p-3">
                <span className="font-bold text-blue-900">Total</span>
                <span className="font-['Outfit'] text-xl font-black text-blue-600">
                  LKR 81,250
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-2 text-xs italic text-gray-400">
          <CheckCircle2 size={14} className="text-green-500" /> This is a
          computer-generated invoice and requires no signature.
        </div>
      </Drawer>
    </div>
  );
};

export default BillingAndPayments;
