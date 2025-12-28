export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  upiId?: string;
  photoURL?: string;
  createdAt: Date;
}

export interface Group {
  id: string;
  name: string;
  createdBy: string;
  members: string[];
  createdAt: Date;
}

export interface Bill {
  id: string;
  groupId?: string;
  createdBy: string;
  imageUrl: string;
  totalAmount: number;
  items?: BillItem[];
  tax?: number;
  tip?: number;
  splitType: 'equal' | 'custom';
  createdAt: Date;
  date?: Date;
}

export interface BillItem {
  name: string;
  price: number;
}

export interface BillParticipant {
  id: string;
  billId: string;
  userId: string;
  userName: string;
  userPhone?: string;
  userUpiId?: string;
  amountToPay: number;
  status: 'paid' | 'unpaid';
  upiPaymentLink?: string;
  reminderSent: boolean;
  paidAt?: Date;
}

export interface Contact {
  id: string;
  name: string;
  phoneNumbers?: Array<{ number?: string; label?: string }>;
}

export interface OCRResult {
  totalAmount: number;
  items?: BillItem[];
  tax?: number;
  tip?: number;
  date?: string;
  rawText: string;
}
