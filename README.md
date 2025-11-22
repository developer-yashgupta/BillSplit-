# BillSplit+ 🧾

AI-Powered Smart Group Expense Splitter App

## Quick Start

```bash
# Install dependencies
npm install

# Start Expo
npx expo start

# Run on Android
npx expo start --android

# Run on iOS
npx expo start --ios
```

## Setup Required

1. **Firebase Configuration**
   - Create a Firebase project at https://console.firebase.google.com
   - Enable Authentication (Google & Phone)
   - Enable Firestore Database
   - Enable Storage
   - Copy your config to `src/config/firebase.ts`

2. **Google Cloud Vision API**
   - Enable Vision API in Google Cloud Console
   - Create API key or service account
   - Add to Firebase Functions environment

3. **UPI Configuration**
   - Add your UPI ID in user profile after login

## Tech Stack

- React Native (Expo)
- TypeScript
- Firebase (Auth, Firestore, Storage, Functions)
- Zustand (State Management)
- Google Cloud Vision API (OCR)
- React Navigation

## Project Structure

```
/src
  /components      # Reusable UI components
  /screens         # App screens
  /store           # Zustand state management
  /api             # Firebase & API integrations
  /utils           # Helper functions
  /types           # TypeScript types
  /config          # Configuration files
```

## Features (MVP - Phase 1)

- ✅ Google/Phone OTP Login
- ✅ Capture & upload bill photo
- ✅ AI OCR extraction (total amount)
- ✅ Manual split between contacts
- ✅ Generate UPI payment links
- ✅ Track payment status manually

## Environment Variables

Create `.env` file:
```
FIREBASE_API_KEY=your_key
FIREBASE_AUTH_DOMAIN=your_domain
FIREBASE_PROJECT_ID=your_project_id
```

## Deployment

See `docs/DEPLOYMENT.md` for production deployment guide.
