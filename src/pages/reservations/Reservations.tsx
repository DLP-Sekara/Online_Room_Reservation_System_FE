import { useState } from 'react';
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
  Row,
  Col,
  Card,
  Steps,
  Badge,
  Tooltip,
  Popconfirm,
} from 'antd';
import {
  Plus,
  Eye,
  Trash2,
  CalendarCheck,
  BedDouble,
  CheckCircle2,
  UserPlus,
  Receipt,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import reservationMutation from '../../mutations/reservation.mutation';
import mealMutation from '../../mutations/meal.mutation';
import roomMutation from '../../mutations/room.mutation';
import type { RoomType } from '../../types/rooms';
import type {
  FoodItem,
  MealPlan,
  Reservation,
  Room,
} from '../../types/services.interfaces';
import { errorToast, successToast } from '../../components/common/Alert';
import userMutation from '../../mutations/user.mutation';
import { ReservationPreview } from './components/ReservationPreview';

const { RangePicker } = DatePicker;
const { Option } = Select;

const Reservations = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState('add');
  const [selectedResId, setSelectedResId] = useState<string | null>(null);
  const [stepOneForm] = Form.useForm();

  const [current, setCurrent] = useState(0); // Stepper index
  const [stepDetails, setStepDetails] = useState({});

  //------------------------------------------------ mutations -----------------------------------------------
  const { getAllMealPlansMutation, getAllFoodItemsMutation } = mealMutation();
  const { getAllRoomTypesMutation, getAllRoomsMutation } = roomMutation();
  const {
    getAllReservationsQuery,
    getReservationByIdQuery,
    createReservationMutation,
    getAvailableRoomsMutation,
    deleteReservationMutation,
    checkOutGuestMutation,
  } = reservationMutation();

  const { getAllUsersMutation } = userMutation();

  const { data: usersData } = getAllUsersMutation();
  const { data: mealPlans } = getAllMealPlansMutation();
  const { data: foodItems } = getAllFoodItemsMutation();
  const { data: rooms } = getAllRoomsMutation();
  const { data: roomTypes } = getAllRoomTypesMutation();

  const { data: reservationsData, isLoading: isReservationsLoading } =
    getAllReservationsQuery();
  const { mutateAsync: createReservation, isPending: createReservationLoading } =
    createReservationMutation();
  const { mutateAsync: getAvailableRooms, isPending: isSearching } =
    getAvailableRoomsMutation();
  const { mutateAsync: deleteReservation, isPending: deleteReservationLoading } =
    deleteReservationMutation();
  const { mutateAsync: checkOutGuest, isPending: isCheckingOut } =
    checkOutGuestMutation();

  // --- API Functions Simulation ---
  const handleCheckOut = async (id: string) => {
    await checkOutGuest(id);
  };

  const checkAvailability = async () => {
    const values = stepOneForm.getFieldsValue();
    const data = {
      roomType: values.roomType,
      startDate: values.dates?.[0]?.format('YYYY-MM-DD'),
      endDate: values.dates?.[1]?.format('YYYY-MM-DD'),
    };

    getAvailableRooms(data, {
      onSuccess: (res) => {
        if (res.success) {
          setCurrent(1);
          setStepDetails({ ...stepDetails, ...values });
        }
      },
    });
  };

  const handleGuestSearch = async (nic: string) => {
    const existingGuest = usersData?.data?.find((u: any) => u.nic === nic);
    if (existingGuest) {
      stepOneForm.setFieldsValue({
        guestId: existingGuest.guestId,
        guestName: existingGuest.name,
        nic: existingGuest.nic,
        phone: existingGuest.phone,
      });
      successToast('Guest found and details populated!');
    } else {
      errorToast('Guest not found. Please enter details manually.');
    }
  };

  const submitReservation = async () => {
    const values = stepOneForm.getFieldsValue();
    const data = {
      guestId: values.guestId,
      roomId: values.roomId,
      planId: values.mealPlan,
      checkIn: values.dates?.[0]?.format('YYYY-MM-DD'),
      checkOut: values.dates?.[1]?.format('YYYY-MM-DD'),
      status: 'PENDING',
      reservationDetails:
        values.selectedFoods?.map((f: any) => ({
          itemId: f.itemId,
          orderedQty: f.ordered_qty,
        })) || [],
    };

    createReservation(data as any, {
      onSuccess: (res) => {
        if (res.success) {
          setIsDrawerOpen(false);
          stepOneForm.resetFields();
          setCurrent(0);
        }
      },
    });
  };

  // --- Stepper UI Components ---
  const steps = [
    { title: 'Availability', icon: <CalendarCheck size={18} /> },
    { title: 'Guest Details', icon: <UserPlus size={18} /> },
    { title: 'Confirm', icon: <Receipt size={18} /> },
  ];

  // Table Columns
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
              setSelectedResId(record.resId || null);
              setDrawerType('view');
              setIsDrawerOpen(true);
            }}
          />

          <Popconfirm
            title="Delete the reservation"
            description="Are you sure to delete this reservation?"
            onConfirm={() => deleteReservation(record?.resId)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="text"
              icon={<Trash2 size={18} className="text-gray-400 hover:text-red-500" />}
              loading={deleteReservationLoading && selectedResId === record.resId}
              onClick={() => setSelectedResId(record.resId)}
            />
          </Popconfirm>

          {record?.status === 'CONFIRMED' && (
            <Tooltip title="Complete Check-out">
              <Button
                type="text"
                icon={
                  <CheckCircle2
                    size={18}
                    className="h-6 w-6 rounded-full bg-yellow-400 p-1 text-white"
                  />
                }
                onClick={() => handleCheckOut(record.resId)}
                loading={isCheckingOut && selectedResId === record.resId}
                onMouseEnter={() => setSelectedResId(record.resId)}
              />
            </Tooltip>
          )}
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

      {/* --- 2. Availability & Quick Check Section (NEW MODERN UI) --- */}
      <Card className="overflow-hidden rounded-[2rem] border-none bg-gradient-to-r from-blue-50/50 to-indigo-50/50 shadow-sm">
        <div className="flex flex-col gap-6 p-2 md:flex-row md:items-end">
          <div className="flex-1 space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
              <CalendarCheck size={16} /> Stay Duration
            </label>
            <RangePicker className="h-12 w-full rounded-xl border-none shadow-sm" />
          </div>

          <div className="w-full space-y-2 md:w-64">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
              <BedDouble size={16} /> Room Type
            </label>
            <Select
              placeholder="Select Type"
              className="h-12 w-full rounded-xl border-none bg-white shadow-sm"
            >
              {roomTypes?.data?.map((item: RoomType) => (
                <Option key={item.typeId} value={item.typeId}>
                  {item.typeName}
                </Option>
              ))}
            </Select>
          </div>

          <Button
            type="primary"
            loading={isSearching}
            onClick={checkAvailability}
            className="h-12 rounded-xl border-none bg-[#0F2942] px-8 font-bold shadow-lg shadow-blue-100"
          >
            Check Availability
          </Button>

          {/* Availability Status Badge */}
          {/* {availabilityResult && (
            <div className="animate-in zoom-in flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
              {availabilityResult === 'available' ? (
                <>
                  <CheckCircle2 className="text-green-500" size={20} />
                  <span className="text-sm font-bold text-green-700">
                    Rooms Available
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle className="text-red-500" size={20} />
                  <span className="text-sm font-bold text-red-700">Fully Booked</span>
                </>
              )}
            </div>
          )} */}
        </div>
      </Card>

      {/* --- 3. Main Data Table --- */}
      <div className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm">
        <Table
          dataSource={reservationsData?.data || []}
          columns={columns}
          loading={isReservationsLoading}
          pagination={{ pageSize: 8 }}
          className="custom-table"
        />
      </div>

      {/* --- 4. Side Drawer (Add/View/Edit) --- */}
      <Drawer
        title={
          <span className="text-xl font-black">
            {drawerType === 'view' ? 'Reservation Details' : 'Book a Stay'}
          </span>
        }
        width={600}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedResId(null);
        }}
        open={isDrawerOpen}
        className="custom-scrollbar rounded-l-[2.5rem]"
        footer={
          drawerType !== 'view' && (
            <div className="flex justify-between p-4">
              <Button
                disabled={current === 0}
                onClick={() => setCurrent(current - 1)}
                icon={<ArrowLeft size={16} />}
                className="flex items-center gap-2 rounded-xl"
              >
                Back
              </Button>

              {current < steps.length - 1 ? (
                <Button
                  type="primary"
                  onClick={() => {
                    if (current === 0) {
                      stepOneForm.submit();
                    } else {
                      setCurrent(current + 1);
                    }
                  }}
                  className="flex h-10 items-center gap-2 rounded-xl bg-blue-600"
                >
                  Next <ArrowRight size={16} />
                </Button>
              ) : (
                <Button
                  type="primary"
                  onClick={submitReservation}
                  className="h-10 rounded-xl border-none bg-green-600 shadow-lg shadow-green-100"
                >
                  Confirm & Complete Booking
                </Button>
              )}
            </div>
          )
        }
      >
        {drawerType === 'view' ? (
          <ReservationPreview id={selectedResId!} />
        ) : (
          <>
            {/* 1. Progress Tracker */}
            <div className="mb-10 px-4">
              <Steps
                current={current}
                items={steps}
                size="small"
                className="custom-booking-steps"
              />
            </div>

            <Form
              form={stepOneForm}
              layout="vertical"
              className="px-2 pb-20"
              onFinish={checkAvailability}
            >
              {/* STEP 1: AVAILABILITY CHECK */}
              {current === 0 && (
                <div className="animate-in slide-in-from-right duration-500">
                  <Form.Item
                    label="Select Stay Dates"
                    name="dates"
                    rules={[{ required: true }]}
                  >
                    <RangePicker className="h-12 w-full shadow-sm" />
                  </Form.Item>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        label="Room Type"
                        name="roomType"
                        rules={[{ required: true }]}
                      >
                        <Select
                          size="large"
                          className="rounded-xl"
                          placeholder="Select Type"
                        >
                          {roomTypes?.data?.map((item: RoomType) => (
                            <Option key={item.typeId} value={item.typeId}>
                              {item.typeName}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Available Rooms"
                        name="roomId"
                        rules={[
                          { required: true, message: 'Please select a specific room!' },
                        ]}
                      >
                        <Select
                          size="large"
                          placeholder="Select Room No"
                          disabled={!stepOneForm.getFieldValue('roomType')}
                        >
                          {rooms?.data?.map((room: Room) => (
                            <Option key={room.roomId} value={room.roomId}>
                              Room {room.roomNumber}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    label="Meal Plan"
                    name="mealPlan"
                    rules={[{ required: true }]}
                  >
                    <Select
                      size="large"
                      className="rounded-xl"
                      placeholder="Select Meal Plan"
                    >
                      {mealPlans?.data?.map((item: MealPlan) => (
                        <Option key={item.planId} value={item.planId}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Food Items" name="foodItems">
                    <Select
                      showSearch
                      className="h-11 flex-1 rounded-xl"
                      placeholder="Search & Add Food Item"
                      optionFilterProp="children"
                      value={null}
                      onChange={(value) => {
                        const selectedItem = foodItems?.data?.find(
                          (item: { itemId: any }) => item.itemId === value,
                        );
                        if (selectedItem) {
                          const currentFoods =
                            stepOneForm.getFieldValue('selectedFoods') || [];

                          if (
                            !currentFoods.find((f: { itemId: any }) => f.itemId === value)
                          ) {
                            stepOneForm.setFieldsValue({
                              selectedFoods: [
                                ...currentFoods,
                                { ...selectedItem, ordered_qty: 1 },
                              ],
                            });
                          } else {
                            errorToast('Item already added!');
                          }
                        }
                      }}
                    >
                      {foodItems?.data?.map((item: FoodItem) => (
                        <Option key={item.itemId} value={item.itemId}>
                          {item.name} -{' '}
                          <span className="text-xs text-gray-400">
                            LKR {item.unitPrice}
                          </span>
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  {/* Selected Food Items List Area */}
                  <Form.List name="selectedFoods">
                    {(fields, { remove }) => (
                      <div className="custom-scrollbar max-h-60 space-y-3 overflow-y-auto pr-2">
                        {fields.length === 0 && (
                          <div className="rounded-3xl border border-dashed border-gray-200 bg-gray-50/50 p-6 text-center">
                            <p className="text-xs text-gray-400">
                              No additional food items selected
                            </p>
                          </div>
                        )}

                        {fields.map(({ key, name, ...restField }) => (
                          <div
                            key={key}
                            className="animate-in zoom-in flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:border-blue-200"
                          >
                            <div className="flex-1">
                              <p className="text-sm font-bold text-gray-700">
                                {stepOneForm.getFieldValue([
                                  'selectedFoods',
                                  name,
                                  'name',
                                ])}
                              </p>
                              <p className="text-xs font-semibold text-blue-500">
                                LKR{' '}
                                {stepOneForm.getFieldValue([
                                  'selectedFoods',
                                  name,
                                  'unitPrice',
                                ])}
                              </p>
                            </div>

                            <div className="flex items-center gap-4">
                              {/* Quantity adjustment */}
                              <Form.Item
                                {...restField}
                                name={[name, 'ordered_qty']}
                                noStyle
                              >
                                <Input
                                  type="number"
                                  min={1}
                                  className="h-9 w-20 rounded-lg border-gray-200 text-center"
                                  prefix={
                                    <span className="text-[10px] text-gray-400">Qty</span>
                                  }
                                />
                              </Form.Item>

                              <Button
                                type="text"
                                danger
                                icon={<Trash2 size={16} />}
                                onClick={() => remove(name)}
                                className="rounded-lg hover:bg-red-50"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </Form.List>
                </div>
              )}

              {/* STEP 2: GUEST IDENTIFICATION */}
              {current === 1 && (
                <div className="animate-in slide-in-from-right duration-500">
                  <div className="mb-8 rounded-[2rem] border border-gray-200 bg-gray-50 p-6">
                    <p className="mb-3 text-center text-xs font-bold uppercase tracking-widest text-gray-400">
                      Identity Check
                    </p>
                    <Input.Search
                      placeholder="Search by nic"
                      size="large"
                      enterButton="Find Guest"
                      onSearch={handleGuestSearch}
                      className="overflow-hidden shadow-sm"
                    />
                  </div>

                  <Form.Item
                    label="Full Name"
                    name="guestName"
                    rules={[{ required: true }]}
                  >
                    <Input
                      placeholder="Enter guest full name"
                      className="h-11 rounded-xl"
                    />
                  </Form.Item>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="NIC " name="nic" rules={[{ required: true }]}>
                        <Input className="h-11 rounded-xl" placeholder="Enter NIC " />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Contact No"
                        name="phone"
                        rules={[{ required: true }]}
                      >
                        <Input
                          className="h-11 rounded-xl"
                          placeholder="Enter Contact Number"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              )}

              {/* STEP 3: BILLING & CONFIRMATION */}
              {current === 2 && (
                <div className="animate-in slide-in-from-right duration-500">
                  <Card className="mb-6 rounded-[2.5rem] border-none bg-gradient-to-br from-blue-600 to-indigo-700 shadow-xl">
                    <div className="p-2">
                      <div className="mb-6 flex items-center justify-between">
                        <Badge
                          status="processing"
                          color="green"
                          text={
                            <span className="text-xs font-bold text-white">
                              AVAILABILITY CONFIRMED
                            </span>
                          }
                        />
                        <Receipt className="text-white/50" size={24} />
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm text-blue-100">
                          <span>2 Nights x Deluxe Room</span>
                          <span>Rs. 50,000.00</span>
                        </div>
                        <div className="flex justify-between text-sm text-blue-100">
                          <span>Full Board Meal Plan</span>
                          <span>Rs. 15,000.00</span>
                        </div>
                        <Divider className="my-2 border-blue-400/30" />
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">Amount Due</span>
                          <span className="text-3xl font-black tracking-tighter text-white">
                            Rs. 65,000.00
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <div className="flex gap-4 rounded-3xl border border-orange-100 bg-orange-50 p-6">
                    <CheckCircle2 className="shrink-0 text-orange-500" size={24} />
                    <p className="text-xs leading-relaxed text-orange-800">
                      By clicking "Confirm", the room status will be changed to{' '}
                      <b>Occupied</b> and a reservation ID will be generated.
                    </p>
                  </div>
                </div>
              )}
            </Form>
          </>
        )}
      </Drawer>
    </div>
  );
};

export default Reservations;
