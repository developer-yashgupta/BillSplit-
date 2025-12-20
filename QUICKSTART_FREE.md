# 🆓 Quick Start Guide (100% FREE Version)

Get BillSplit+ running in **10 minutes** using **ONLY FREE resources**!

---

## ✅ What's FREE

- ✅ Firebase Spark Plan (FREE forever)
- ✅ Mock OCR (no API needed)
- ✅ UPI payments (FREE)
- ✅ No credit card required
- ✅ **Total Cost: ₹0/month**

---

## 🚀 Quick Setup (10 minutes)

### Step 1: Install Dependencies (2 min)

```bash
npm install
```

### Step 2: Create FREE Firebase Project (3 min)

1. Go to https://console.firebase.google.com
2. Click "Add project"
3. Name it "billsplit-plus"
4. **IMPORTANT**: Choose **Spark Plan (FREE)**
5. Click "Create project"

### Step 3: Enable FREE Services (3 min)

#### Authentication (FREE)
1. Click "Authentication" → "Get started"
2. Enable "Google" sign-in
3. Add your email

#### Firestore (FREE)
1. Click "Firestore Database" → "Create database"
2. Start in "test mode"
3. Choose nearest location

#### Storage (FREE)
1. Click "Storage" → "Get started"
2. Start in "test mode"

### Step 4: Get Firebase Config (1 min)

1. Click ⚙️ → "Project settings"
2. Scroll to "Your apps" → Click Web (</>)
3. Register app as "BillSplit+"
4. Copy the config

### Step 5: Update Config (1 min)

Edit `src/config/firebase.ts`:

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

### Step 6: Run the App! 🎉

```bash
npx expo start
```

Scan QR code with Expo Go app!

---

## 🎯 How It Works (FREE)

### Bill Scanning
- Uses **mock OCR** (instant, free)
- No API calls needed
- Works offline
- Perfect for testing

### Data Storage
- Firebase Firestore (50K reads/day FREE)
- Firebase Storage (5GB FREE)

### Authentication
- Google Sign-In (10K/month FREE)

### Payments
- UPI deep links (100% FREE)
- No payment gateway fees

---

## 📊 FREE Tier Limits

### What You Get FREE
- **500 daily active users**
- **1,000 bills per day**
- **5GB image storage**
- **Unlimited UPI payments**

### When to Upgrade
- More than 500 daily users
- Need Cloud Functions
- Need real OCR API

---

## 🔧 Optional: Add FREE Real OCR

Want real OCR without paying? Add Tesseract.js:

```bash
npm install tesseract.js
```

Update `src/api/ai.ts` to use Tesseract (still 100% FREE!).

See [docs/FREE_SETUP.md](docs/FREE_SETUP.md) for details.

---

## ✅ Test the App

1. **Login** with Google
2. **Upload** a bill photo
3. **See** mock OCR extract amount
4. **Select** contacts to split with
5. **Generate** UPI payment links
6. **Track** payments

---

## 💡 Tips to Stay FREE

1. ✅ Use mock OCR (current setup)
2. ✅ Use UPI deep links (no gateway)
3. ✅ Stay under 500 daily users
4. ✅ Optimize Firestore queries
5. ✅ Compress images before upload

---

## 🆘 Troubleshooting

### "Firebase not configured"
- Update `src/config/firebase.ts` with your config

### "Permission denied"
- Check Firebase rules in console

### "App not starting"
- Run: `npm cache clean --force && npm install`

---

## 📚 Next Steps

- [ ] Test all features
- [ ] Customize branding
- [ ] Add your UPI ID
- [ ] Invite friends to test
- [ ] Read [docs/FREE_SETUP.md](docs/FREE_SETUP.md)

---

## 🎉 You're Done!

You now have a **fully functional app** using:
- ✅ 100% FREE resources
- ✅ No credit card needed
- ✅ No monthly costs
- ✅ **Total: ₹0/month**

---

**Happy Building!** 🚀

**Need help?** Check [docs/FREE_SETUP.md](docs/FREE_SETUP.md)
