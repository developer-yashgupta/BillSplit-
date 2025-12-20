# 🚀 Quick Start Guide

Get BillSplit+ running in 15 minutes!

## Prerequisites Check

```bash
# Check Node.js version (need 18+)
node --version

# Check npm
npm --version

# Install Expo CLI globally
npm install -g expo-cli
```

## 1. Clone & Install (2 min)

```bash
# Install dependencies
npm install

# Install function dependencies
cd functions && npm install && cd ..
```

## 2. Firebase Setup (5 min)

### Create Firebase Project
1. Go to https://console.firebase.google.com
2. Click "Add project"
3. Name it "billsplit-plus"
4. Disable Google Analytics (optional)
5. Click "Create project"

### Enable Services
1. **Authentication**
   - Click "Authentication" → "Get started"
   - Enable "Google" sign-in method
   - Add your email as test user

2. **Firestore Database**
   - Click "Firestore Database" → "Create database"
   - Start in "production mode"
   - Choose location (asia-south1 for India)

3. **Storage**
   - Click "Storage" → "Get started"
   - Start in "production mode"

### Get Config
1. Click ⚙️ (Settings) → "Project settings"
2. Scroll to "Your apps" → Click Web icon (</>) 
3. Register app as "BillSplit+"
4. Copy the config object

### Update Config
Open `src/config/firebase.ts` and replace with your config:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## 3. Deploy Firebase (3 min)

```bash
# Login to Firebase
firebase login

# Initialize (select your project)
firebase init

# Select:
# - Firestore
# - Functions
# - Storage

# Deploy rules
firebase deploy --only firestore,storage
```

## 4. Setup Cloud Vision API (3 min)

1. Go to https://console.cloud.google.com
2. Select your Firebase project
3. Click "APIs & Services" → "Enable APIs and Services"
4. Search "Cloud Vision API" → Enable
5. Go to "Credentials" → "Create Credentials" → "Service Account"
6. Download JSON key
7. Set in Firebase Functions:

```bash
firebase functions:config:set vision.key="$(cat path/to/key.json)"
```

## 5. Setup OpenAI (Optional, 2 min)

For better AI parsing:

```bash
# Get API key from https://platform.openai.com
firebase functions:config:set openai.key="YOUR_OPENAI_KEY"
```

## 6. Deploy Functions

```bash
cd functions
npm run build
cd ..
firebase deploy --only functions
```

## 7. Run the App! 🎉

```bash
# Start Expo
npx expo start

# Scan QR code with Expo Go app
# OR press 'a' for Android emulator
# OR press 'i' for iOS simulator
```

## 8. Test the Flow

1. **Login**: Click "Continue with Google"
2. **Add UPI ID**: Go to profile, add your UPI ID (e.g., yourname@paytm)
3. **Upload Bill**: Click "+ New Bill" → Take photo or choose from gallery
4. **Wait for OCR**: App will extract amount automatically
5. **Select Contacts**: Choose people to split with
6. **Create Split**: Click "Split with X people"
7. **Test Payment**: Click "Pay Now" to open UPI app

## Troubleshooting

### "Firebase not configured"
- Check if you updated `src/config/firebase.ts` with your config

### "Permission denied"
- Deploy Firestore rules: `firebase deploy --only firestore`

### "OCR not working"
- Check if Vision API is enabled in Google Cloud Console
- Verify service account key is set: `firebase functions:config:get`

### "UPI app not opening"
- Ensure you have a UPI app installed (Google Pay, PhonePe, etc.)
- Test with a valid UPI ID format: `username@bank`

### "Functions not deploying"
- Upgrade to Blaze plan in Firebase Console
- Check function logs: `firebase functions:log`

## Next Steps

- [ ] Read [SETUP.md](docs/SETUP.md) for detailed setup
- [ ] Check [API.md](docs/API.md) for API reference
- [ ] Review [ARCHITECTURE.md](docs/ARCHITECTURE.md) for system design
- [ ] See [ROADMAP.md](ROADMAP.md) for upcoming features
- [ ] Join our community (link TBD)

## Need Help?

- 📖 Check [docs/](docs/) folder
- 🐛 Report issues on GitHub
- 💬 Join our Discord (link TBD)
- 📧 Email: support@billsplitplus.com (TBD)

## Development Mode

For faster development without deploying functions:

```typescript
// In src/api/ai.ts, use mockExtractBillData instead
import { mockExtractBillData } from '../api/ai';

// This returns mock data instantly
const ocrResult = await mockExtractBillData(imageUrl);
```

## Production Checklist

Before going live:

- [ ] Update Firebase rules for production
- [ ] Enable App Check
- [ ] Set up monitoring & alerts
- [ ] Configure custom domain
- [ ] Add privacy policy & terms
- [ ] Test on real devices
- [ ] Set up CI/CD
- [ ] Configure backup strategy

---

**Estimated Total Time**: 15-20 minutes

Happy coding! 🚀
