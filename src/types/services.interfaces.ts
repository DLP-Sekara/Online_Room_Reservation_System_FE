
// 1. Dashboard Interfaces
export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: string;
  isRead: boolean;
}

export interface DashboardDetails {
  totalReservations: number;
  availableRooms: number;
  totalRevenue: number;
  recentActivity: any[];
}

// 2. Reservation Interfaces
export interface Reservation {
  id?: string;
  guestId?: string;
  guestName: string;
  roomNo: string;
  roomType: string;
  mealPlanId: string;
  checkIn: string;
  checkOut: string;
  contactNo: string;
  email?: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'CheckedIn' | 'CheckedOut';
  totalAmount: number;
}

export interface AvailabilityCheck {
  roomId?: string;
  roomType?: string;
  startDate: string;
  endDate: string;
}

// 3. Room Interfaces
export interface Room {
  id?: string;
  roomNo: string;
  roomType: string;
  price: number;
  status: 'Available' | 'Occupied' | 'Out of Order';
  cleaningStatus: 'Ready' | 'Dirty' | 'Maintenance';
}

// 4. Meal & Food Interfaces
export interface MealPlan {
  id?: string;
  planName: string;
  planCode: string; // e.g., BB, HB, FB
  pricePerPerson: number;
  status: 'Active' | 'Inactive';
}

export interface FoodItem {
  id?: string;
  name: string;
  category: string;
  price: number;
  status: 'Available' | 'Unavailable';
}

// 5. Payment & Billing Interfaces
export interface Invoice {
  id?: string;
  invoiceNo: string;
  guestName: string;
  reservationId: string;
  totalAmount: number;
  billingDate: string;
  status: 'Paid' | 'Pending' | 'Partial';
}

export interface IncomeReport {
  date: string;
  totalIncome: number;
  reservationCount: number;
}

// 6. User & Session Interfaces
export interface UserAccount {
  id?: string;
  fullName: string;
  username: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Receptionist';
  status: 'Active' | 'Inactive';
  password?: string;
}

export interface UserSession {
  id: string;
  device: string;
  location: string;
  ip: string;
  lastActive: string;
}

// Shared Request Type
export interface ServiceRequestArgs {
  url: string;
  data?: any;
  method?: 'get' | 'post' | 'put' | 'delete';
}
