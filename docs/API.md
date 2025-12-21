# API Reference

## Firebase Cloud Functions

### 1. parseBill

Extracts bill data from an image using Google Cloud Vision + AI.

**Endpoint**: `parseBill` (Callable Function)

**Request**:
```typescript
{
  imageUrl: string; // Firebase Storage URL
}
```

**Response**:
```typescript
{
  totalAmount: number;
  items?: Array<{
    name: string;
    price: number;
  }>;
  tax?: number;
  tip?: number;
  date?: string;
  rawText: string;
}
```

**Usage**:
```typescript
import { getFunctions, httpsCallable } from 'firebase/functions';

const functions = getFunctions();
const parseBill = httpsCallable(functions, 'parseBill');

const result = await parseBill({ imageUrl: 'https://...' });
console.log(result.data);
```

### 2. sendPaymentReminder

Sends a payment reminder to a participant.

**Endpoint**: `sendPaymentReminder` (Callable Function)

**Request**:
```typescript
{
  participantId: string;
  billId: string;
}
```

**Response**:
```typescript
{
  success: boolean;
}
```

### 3. paymentCallback

Webhook for payment confirmation (Razorpay integration).

**Endpoint**: `paymentCallback` (HTTP Function)

**Method**: POST

**Request Body**:
```typescript
{
  participantId: string;
  status: 'success' | 'failed';
  razorpay_payment_id?: string;
  razorpay_signature?: string;
}
```

## Firestore Collections

### users

```typescript
{
  id: string;
  name: string;
  email: string;
  phone?: string;
  upiId?: string;
  photoURL?: string;
  createdAt: Timestamp;
}
```

### bills

```typescript
{
  id: string;
  groupId?: string;
  createdBy: string;
  imageUrl: string;
  totalAmount: number;
  items?: Array<{
    name: string;
    price: number;
  }>;
  tax?: number;
  tip?: number;
  splitType: 'equal' | 'custom';
  createdAt: Timestamp;
  date?: Timestamp;
}
```

### billParticipants

```typescript
{
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
  paidAt?: Timestamp;
}
```

### groups

```typescript
{
  id: string;
  name: string;
  createdBy: string;
  members: string[];
  createdAt: Timestamp;
}
```

## UPI Payment Integration

### Generate UPI Link

```typescript
import { generateUPILink } from './src/api/payments';

const link = generateUPILink({
  upiId: 'user@upi',
  name: 'John Doe',
  amount: 500,
  note: 'Dinner split',
});

// Result: upi://pay?pa=user@upi&pn=John%20Doe&am=500&cu=INR&tn=Dinner%20split
```

### Open UPI Payment

```typescript
import { openUPIPayment } from './src/api/payments';

const success = await openUPIPayment({
  upiId: 'user@upi',
  name: 'John Doe',
  amount: 500,
  note: 'Dinner split',
});

if (success) {
  console.log('UPI app opened');
}
```

## Helper Functions

### formatCurrency

```typescript
import { formatCurrency } from './src/utils/helpers';

formatCurrency(1250.50); // "₹1250.50"
```

### splitEqually

```typescript
import { splitEqually } from './src/utils/helpers';

splitEqually(1000, 4); // 250
```

### validateUPIId

```typescript
import { validateUPIId } from './src/utils/helpers';

validateUPIId('user@paytm'); // true
validateUPIId('invalid'); // false
```
