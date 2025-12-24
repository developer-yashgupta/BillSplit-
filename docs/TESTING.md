# Testing Guide

## Manual Testing Checklist

### Authentication Flow
- [ ] Google Sign-In works
- [ ] User data is saved to Firestore
- [ ] User can logout and login again
- [ ] Profile photo displays correctly

### Bill Upload
- [ ] Camera permission is requested
- [ ] Can take photo with camera
- [ ] Can select photo from gallery
- [ ] Photo preview displays correctly
- [ ] Image uploads to Firebase Storage

### OCR & AI Extraction
- [ ] Bill text is extracted from image
- [ ] Total amount is parsed correctly
- [ ] Items are extracted (if available)
- [ ] Tax and tip are identified
- [ ] Handles bills in different formats

### Split Bill
- [ ] Contacts permission is requested
- [ ] Contacts list loads
- [ ] Can select/deselect contacts
- [ ] Amount per person calculates correctly
- [ ] Split is saved to Firestore

### Payment Flow
- [ ] Payment screen shows all participants
- [ ] UPI link is generated correctly
- [ ] UPI app opens when "Pay Now" is clicked
- [ ] Can mark payment as paid
- [ ] Payment status updates in real-time
- [ ] Can share payment link

### Dashboard
- [ ] Shows correct "You Owe" amount
- [ ] Shows correct "Owed to You" amount
- [ ] Recent bills display
- [ ] Can navigate to bill details

## Test Cases

### Test Case 1: Complete Flow
1. Login with Google
2. Upload a bill photo
3. Verify OCR extracts correct amount
4. Select 2 contacts
5. Verify split calculation (total / 3)
6. Open payment screen
7. Verify all 3 participants are listed
8. Mark one as paid
9. Verify status updates

### Test Case 2: Edge Cases
- Upload bill with no clear total
- Upload non-bill image
- Select 0 contacts (should show error)
- Try to pay without UPI ID set
- Test with very large amounts (₹99,999+)
- Test with decimal amounts (₹123.45)

### Test Case 3: Offline Behavior
- Disable internet
- Try to upload bill (should queue)
- Try to mark payment as paid (should queue)
- Re-enable internet
- Verify queued actions complete

## Automated Testing

### Unit Tests

Create `src/__tests__/helpers.test.ts`:

```typescript
import { splitEqually, formatCurrency, validateUPIId } from '../utils/helpers';

describe('Helper Functions', () => {
  test('splitEqually divides correctly', () => {
    expect(splitEqually(1000, 4)).toBe(250);
    expect(splitEqually(100, 3)).toBe(33.33);
  });

  test('formatCurrency formats correctly', () => {
    expect(formatCurrency(1000)).toBe('₹1000.00');
    expect(formatCurrency(1234.56)).toBe('₹1234.56');
  });

  test('validateUPIId validates correctly', () => {
    expect(validateUPIId('user@paytm')).toBe(true);
    expect(validateUPIId('invalid')).toBe(false);
  });
});
```

Run tests:
```bash
npm test
```

### Integration Tests

Test Firebase functions locally:

```bash
# Start emulators
firebase emulators:start

# Test parseBill function
curl -X POST http://localhost:5001/YOUR_PROJECT/us-central1/parseBill \
  -H "Content-Type: application/json" \
  -d '{"data": {"imageUrl": "https://example.com/bill.jpg"}}'
```

## Performance Testing

### Metrics to Track
- App launch time: < 3 seconds
- Bill upload time: < 5 seconds
- OCR processing time: < 10 seconds
- Navigation transitions: < 300ms

### Tools
- React Native Performance Monitor
- Firebase Performance Monitoring
- Flipper for debugging

## Security Testing

### Checklist
- [ ] Firestore rules prevent unauthorized access
- [ ] Storage rules prevent unauthorized uploads
- [ ] API keys are not exposed in client code
- [ ] User data is properly sanitized
- [ ] UPI IDs are validated before use

### Test Firestore Rules

```bash
# Install emulator
npm install -g @firebase/rules-unit-testing

# Run rule tests
firebase emulators:exec --only firestore "npm test"
```

## Load Testing

Test with multiple concurrent users:

1. Create 10+ test accounts
2. Upload bills simultaneously
3. Monitor Firebase quotas
4. Check for rate limiting issues

## Bug Reporting Template

When reporting bugs, include:

```
**Environment**: iOS/Android, Version
**Steps to Reproduce**:
1. 
2. 
3. 

**Expected Behavior**:

**Actual Behavior**:

**Screenshots**:

**Logs**:
```

## Known Issues

- OCR may struggle with handwritten bills
- UPI deep links may not work on all devices
- Contact sync may be slow with 1000+ contacts
