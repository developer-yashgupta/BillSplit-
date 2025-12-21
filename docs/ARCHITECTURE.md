# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     React Native App                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Screens    │  │  Components  │  │    Store     │      │
│  │              │  │              │  │  (Zustand)   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         │                  │                  │              │
│         └──────────────────┴──────────────────┘              │
│                            │                                 │
│                     ┌──────▼──────┐                         │
│                     │   API Layer  │                         │
│                     └──────┬──────┘                         │
└────────────────────────────┼──────────────────────────────┘
                             │
                ┌────────────┴────────────┐
                │                         │
        ┌───────▼────────┐       ┌───────▼────────┐
        │    Firebase    │       │  Cloud Vision  │
        │                │       │      API       │
        │  - Auth        │       └────────────────┘
        │  - Firestore   │
        │  - Storage     │       ┌────────────────┐
        │  - Functions   │       │   OpenAI API   │
        └────────────────┘       └────────────────┘
```

## Data Flow

### 1. Bill Upload Flow

```
User takes photo
    ↓
Upload to Firebase Storage
    ↓
Get download URL
    ↓
Call Cloud Function (parseBill)
    ↓
Vision API extracts text
    ↓
OpenAI parses structured data
    ↓
Return to app
    ↓
Save bill to Firestore
    ↓
Navigate to split screen
```

### 2. Payment Flow

```
User selects contacts
    ↓
Calculate split amounts
    ↓
Generate UPI links
    ↓
Create bill participants
    ↓
Save to Firestore
    ↓
Display payment screen
    ↓
User clicks "Pay Now"
    ↓
Open UPI app
    ↓
User completes payment
    ↓
Mark as paid (manual/webhook)
    ↓
Update Firestore
```

## Component Structure

```
App.tsx
├── Navigation
│   ├── AuthStack
│   │   └── LoginScreen
│   └── MainStack
│       ├── DashboardScreen
│       ├── UploadBillScreen
│       ├── SplitBillScreen
│       └── PaymentScreen
│
├── Components
│   ├── Button
│   ├── Input
│   ├── Card
│   └── (more reusable components)
│
├── Store (Zustand)
│   ├── authStore
│   └── billStore
│
├── API
│   ├── firebase.ts (CRUD operations)
│   ├── ai.ts (OCR & parsing)
│   └── payments.ts (UPI integration)
│
└── Utils
    └── helpers.ts (utility functions)
```

## State Management

Using **Zustand** for simplicity and performance.

### Auth Store
```typescript
{
  user: User | null,
  loading: boolean,
  setUser: (user) => void,
  logout: () => void
}
```

### Bill Store
```typescript
{
  bills: Bill[],
  currentBill: Bill | null,
  participants: BillParticipant[],
  setBills: (bills) => void,
  setCurrentBill: (bill) => void,
  setParticipants: (participants) => void
}
```

## Security Architecture

### Client-Side
- Firebase Auth handles authentication
- Auth state persisted locally
- Secure token refresh
- No sensitive data in AsyncStorage

### Server-Side (Cloud Functions)
- All functions require authentication
- Firestore rules enforce access control
- Storage rules prevent unauthorized uploads
- Input validation on all endpoints

### Firestore Security Rules

```javascript
// Users can only read/write their own data
match /users/{userId} {
  allow read: if request.auth != null;
  allow write: if request.auth.uid == userId;
}

// Bills can be read by anyone authenticated
// But only created by the owner
match /bills/{billId} {
  allow read: if request.auth != null;
  allow create: if request.auth.uid == request.resource.data.createdBy;
  allow update, delete: if request.auth.uid == resource.data.createdBy;
}
```

## Performance Optimizations

### Image Handling
- Compress images before upload (quality: 0.8)
- Resize to max 1920x1080
- Use Firebase Storage CDN

### Firestore Queries
- Use composite indexes for complex queries
- Limit query results (pagination)
- Cache frequently accessed data

### Cloud Functions
- Use appropriate memory allocation
- Implement timeout handling
- Cache API responses when possible

### App Performance
- Lazy load screens
- Optimize re-renders with React.memo
- Use FlatList for long lists
- Debounce search inputs

## Scalability Considerations

### Current Limits
- Firebase Free Tier: 50K reads/day, 20K writes/day
- Storage: 5GB free
- Functions: 125K invocations/month

### Scaling Strategy
1. **Optimize Firestore usage**
   - Batch writes
   - Use subcollections for large datasets
   - Implement pagination

2. **Cache aggressively**
   - Cache user data locally
   - Cache recent bills
   - Use CDN for images

3. **Upgrade Firebase plan**
   - Blaze plan for production
   - Set budget alerts
   - Monitor usage daily

4. **Optimize Cloud Functions**
   - Use appropriate regions
   - Implement connection pooling
   - Cache API responses

## Error Handling

### Client-Side
```typescript
try {
  await uploadBill();
} catch (error) {
  if (error.code === 'permission-denied') {
    Alert.alert('Permission Error', 'You don\'t have access');
  } else if (error.code === 'network-error') {
    Alert.alert('Network Error', 'Check your connection');
  } else {
    Alert.alert('Error', error.message);
  }
}
```

### Server-Side
```typescript
try {
  const result = await processImage();
  return result;
} catch (error) {
  console.error('Function error:', error);
  throw new functions.https.HttpsError('internal', error.message);
}
```

## Monitoring & Logging

### Firebase Console
- Monitor function executions
- Track error rates
- View performance metrics

### Custom Logging
```typescript
// Log important events
console.log('[BILL_UPLOAD]', { userId, billId, timestamp });
console.error('[OCR_ERROR]', { error, imageUrl });
```

### Analytics Events
```typescript
logEvent('bill_created', {
  amount: bill.totalAmount,
  participants: bill.participants.length,
  splitType: bill.splitType,
});
```

## Testing Strategy

### Unit Tests
- Test utility functions
- Test state management
- Test API functions (mocked)

### Integration Tests
- Test Firebase operations with emulators
- Test Cloud Functions locally
- Test payment flow end-to-end

### E2E Tests
- Test complete user flows
- Test on real devices
- Test with real Firebase (staging)

## Deployment Pipeline

```
Development → Staging → Production

1. Local development with emulators
2. Push to GitHub
3. CI runs tests
4. Deploy to staging Firebase project
5. Manual QA testing
6. Deploy to production
7. Monitor for errors
```
