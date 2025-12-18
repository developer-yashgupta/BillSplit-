# Frequently Asked Questions (FAQ)

## General Questions

### What is BillSplit+?
BillSplit+ is an AI-powered mobile app that helps you split bills with friends. Just snap a photo of any bill, and the app automatically extracts the amount, splits it among your contacts, and generates UPI payment links.

### How is it different from other bill splitting apps?
- **AI-Powered**: Automatic bill scanning with 95%+ accuracy
- **UPI Integration**: Direct payment links, no app switching
- **Speed**: Complete flow in under 1 minute
- **Indian UX**: Built specifically for Indian users

### Is it free?
Yes! The MVP version is completely free. Premium features will be available in future versions.

### Which platforms are supported?
Currently Android and iOS via React Native. Web version planned for Phase 4.

## Technical Questions

### What technologies are used?
- **Frontend**: React Native, TypeScript, Expo
- **Backend**: Firebase (Auth, Firestore, Storage, Functions)
- **AI**: Google Cloud Vision API, OpenAI GPT-4
- **Payments**: UPI Deep Links, Razorpay (Phase 2)

### Why Firebase?
- Fast development with managed services
- Real-time database updates
- Scalable infrastructure
- Built-in authentication
- Generous free tier

### Why React Native?
- Cross-platform (iOS + Android)
- Large community and ecosystem
- Fast development with hot reload
- Native performance
- Easy to maintain

### Can I use a different OCR service?
Yes! The OCR logic is abstracted in `src/api/ai.ts`. You can replace Google Cloud Vision with:
- Tesseract.js (free, offline)
- AWS Textract
- Azure Computer Vision
- Any other OCR service

### Can I use a different payment gateway?
Yes! The payment logic is in `src/api/payments.ts`. Currently supports:
- UPI Deep Links (free)
- Razorpay (Phase 2)
- Can add: Stripe, PayPal, etc.

## Setup Questions

### Do I need a paid Firebase plan?
For development: No, free tier is sufficient.
For production: Yes, Blaze (pay-as-you-go) plan required for Cloud Functions.

### How much does Firebase cost?
Typical costs for 1000 active users:
- Firestore: ~₹500/month
- Storage: ~₹200/month
- Functions: ~₹300/month
- Total: ~₹1000/month

### Do I need Google Cloud credits?
No, but they help! Google offers $300 free credits for new users.

### How do I get OpenAI API key?
1. Go to https://platform.openai.com
2. Sign up for an account
3. Go to API Keys section
4. Create new key
5. Add to Firebase Functions config

Note: OpenAI is optional. The app works without it (using regex fallback).

### Can I run this without Cloud Functions?
Not recommended, but possible. You'd need to:
1. Move OCR logic to client-side
2. Use Tesseract.js for OCR
3. Parse data on device
4. Lose serverless benefits

## Development Questions

### How do I test without deploying functions?
Use the mock function in `src/api/ai.ts`:

```typescript
import { mockExtractBillData } from '../api/ai';
const ocrResult = await mockExtractBillData(imageUrl);
```

### How do I test UPI payments?
1. Add your real UPI ID in profile
2. Use small amounts (₹1-10)
3. Test with Google Pay/PhonePe
4. Mark as paid manually

### How do I debug Firebase issues?
```bash
# View function logs
firebase functions:log

# View specific function
firebase functions:log --only parseBill

# Real-time logs
firebase functions:log --follow
```

### How do I reset Firestore data?
```bash
# Delete all data (careful!)
firebase firestore:delete --all-collections

# Or manually in Firebase Console
```

### How do I test on real device?
1. Install Expo Go app
2. Run `npx expo start`
3. Scan QR code with Expo Go
4. App loads on your device

## Feature Questions

### Can I split bills unevenly?
Not in MVP. Custom splits coming in Phase 2.

### Can I create groups?
Not in MVP. Groups feature coming in Phase 2.

### Can I export bills to PDF?
Not in MVP. PDF export coming in Phase 3.

### Can I use this offline?
Partial support. You can:
- View cached bills
- Take photos (queued for upload)

You cannot:
- Process new bills (needs OCR)
- Sync data
- Make payments

### Does it support multiple currencies?
Not yet. Currently only INR (₹). Multi-currency support planned for Phase 4.

### Can I edit the extracted amount?
Not in MVP. Manual editing coming in Phase 2.

## Privacy & Security Questions

### Is my data secure?
Yes! We use:
- Firebase Authentication (industry standard)
- Firestore security rules
- HTTPS encryption
- No sensitive data stored locally

### What data do you collect?
- Name, email (from Google Sign-In)
- Phone number (optional)
- UPI ID (optional)
- Bill images (stored in Firebase Storage)
- Bill amounts and participants

### Do you store my contacts?
No! We only read contact names for selection. Phone numbers are not uploaded to our servers.

### Can others see my bills?
No. Bills are private by default. Only you and participants can see them.

### How do I delete my data?
Contact support or use the "Delete Account" option (coming in Phase 2).

## Payment Questions

### How does UPI payment work?
1. App generates UPI deep link
2. Link opens your UPI app (Google Pay, PhonePe, etc.)
3. You complete payment in UPI app
4. Return to BillSplit+ and mark as paid

### Is payment automatic?
Not in MVP. You manually mark payments as paid. Automatic verification coming with Razorpay integration (Phase 2).

### What if someone doesn't pay?
You can:
- Send payment reminder (Phase 2)
- Share payment link via WhatsApp
- Track pending payments in dashboard

### Can I refund a payment?
Payments are direct UPI transfers. Refunds must be done manually through your UPI app.

### What if UPI link doesn't open?
Ensure:
- You have a UPI app installed
- UPI ID format is correct (username@bank)
- App has permission to open URLs

## Troubleshooting

### "Firebase not configured" error
Update `src/config/firebase.ts` with your Firebase config.

### "Permission denied" error
Deploy Firestore rules:
```bash
firebase deploy --only firestore
```

### "OCR not working"
1. Check if Vision API is enabled
2. Verify service account key is set
3. Check function logs for errors

### "UPI app not opening"
1. Install a UPI app (Google Pay, PhonePe)
2. Check UPI ID format
3. Test with a different UPI app

### "Functions not deploying"
1. Upgrade to Blaze plan
2. Check billing account is active
3. Verify function code has no errors

### App crashes on startup
1. Clear cache: `npx expo start -c`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Check for console errors

## Contributing

### How can I contribute?
See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### What features are needed?
Check [ROADMAP.md](ROADMAP.md) for planned features and priorities.

### How do I report bugs?
Open an issue on GitHub with:
- Steps to reproduce
- Expected vs actual behavior
- Screenshots/logs
- Device/OS info

### Can I suggest features?
Yes! Open a feature request issue on GitHub.

## Business Questions

### Is this open source?
Yes! Licensed under MIT. See [LICENSE](LICENSE).

### Can I use this for my business?
Yes! MIT license allows commercial use.

### Can I white-label this?
Yes! You can customize branding and deploy your own version.

### How do you make money?
Planned monetization:
- Premium subscriptions (₹99/month)
- Business tier (₹499/month)
- Transaction fees (future)

## Support

### Where can I get help?
- 📖 Read [documentation](docs/)
- 🐛 Report issues on GitHub
- 💬 Join Discord (link TBD)
- 📧 Email: support@billsplitplus.com (TBD)

### How do I contact the team?
- GitHub: github.com/billsplitplus
- Email: team@billsplitplus.com (TBD)
- Twitter: @billsplitplus (TBD)

### Is there a community?
Coming soon! We'll have:
- Discord server
- Reddit community
- Twitter updates
- Blog posts

---

**Didn't find your answer?**  
Open an issue on GitHub or contact support.
