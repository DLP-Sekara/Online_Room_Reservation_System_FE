import { useState } from 'react';
import { Table, Tag, Button, Input, Drawer, Space, Divider } from 'antd';
import {
  Search,
  Filter,
  Eye,
  Printer,
  CreditCard,
  Download,
  CheckCircle2,
} from 'lucide-react';
import reservationMutation from '../../mutations/reservation.mutation';
import type { Reservation, Room } from '../../types/services.interfaces';
import mealMutation from '../../mutations/meal.mutation';
import roomMutation from '../../mutations/room.mutation';
import userMutation from '../../mutations/user.mutation';

const BillingAndPayments = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  //------------------------------------------------ mutations -----------------------------------------------
  const { getAllMealPlansMutation, getAllFoodItemsMutation } = mealMutation();
  const { getAllRoomTypesMutation, getAllRoomsMutation } = roomMutation();
  const { getAllReservationsQuery } = reservationMutation();

  const { getAllUsersMutation } = userMutation();

  const { data: usersData } = getAllUsersMutation();
  const { data: mealPlans } = getAllMealPlansMutation();
  const { data: foodItems } = getAllFoodItemsMutation();
  const { data: rooms } = getAllRoomsMutation();
  const { data: roomTypes } = getAllRoomTypesMutation();
  const { data: reservationsData, isLoading: isReservationsLoading } =
    getAllReservationsQuery();

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
      title: 'Guest Name',
      dataIndex: 'guestId',
      key: 'guestId',
      render: (text: string) => (
        <span className="font-bold text-blue-600">
          {usersData?.data?.find((r: any) => r.guestId === text)?.name}
        </span>
      ),
    },
    {
      title: 'Room No',
      dataIndex: 'roomId',
      key: 'roomId',
      render: (text: string) => (
        <span className="font-bold text-blue-600">
          {rooms?.data?.find((r: Room) => r.roomId === text)?.roomNumber}
        </span>
      ),
    },
    {
      title: 'Duration',
      key: 'duration',
      render: (_: any, r: Reservation) => (
        <span className="text-md font-semibold">
          {r.checkIn} - {r.checkOut}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag
          color={
            status === 'CONFIRMED'
              ? 'green'
              : status === 'PENDING'
                ? 'gold'
                : status === 'COMPLETED'
                  ? 'blue'
                  : 'red'
          }
          className="rounded-full px-3"
        >
          {status}
        </Tag>
      ),
    },
    {
      title: 'Total (LKR)',
      dataIndex: 'totalBill',
      key: 'totalBill',
      render: (val: number) => (
        <span className="truncate font-semibold">Rs. {val?.toLocaleString()}</span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Reservation) => (
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

      {/* --- 3. Main Data Table --- */}
      <div className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm">
        <Table
          dataSource={
            reservationsData?.data.filter((r: Reservation) => r.status === 'COMPLETED') ||
            []
          }
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
