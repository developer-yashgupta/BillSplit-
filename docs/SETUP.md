# Setup Guide

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Firebase account
- Google Cloud account (for Vision API)

## Step 1: Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable the following services:
   - **Authentication**: Enable Google Sign-In and Phone Authentication
   - **Firestore Database**: Create in production mode
   - **Storage**: Enable with default rules
   - **Functions**: Upgrade to Blaze plan (pay-as-you-go)

4. Get your Firebase config:
   - Go to Project Settings > General
   - Scroll to "Your apps" section
   - Click "Add app" > Web
   - Copy the config object

5. Update `src/config/firebase.ts` with your config

## Step 2: Google Cloud Vision API

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your Firebase project
3. Enable **Cloud Vision API**
4. Create a service account:
   - IAM & Admin > Service Accounts
   - Create Service Account
   - Grant "Cloud Vision API User" role
   - Create and download JSON key
5. Set environment variable in Firebase Functions:
   ```bash
   firebase functions:config:set vision.key="$(cat path/to/service-account.json)"
   ```

## Step 3: OpenAI API (Optional)

For better AI parsing:

1. Get API key from [OpenAI Platform](https://platform.openai.com)
2. Set in Firebase Functions:
   ```bash
   firebase functions:config:set openai.key="YOUR_API_KEY"
   ```

## Step 4: Install Dependencies

```bash
# Install app dependencies
npm install

# Install function dependencies
cd functions
npm install
cd ..
```

## Step 5: Deploy Firebase

```bash
# Login to Firebase
firebase login

# Initialize Firebase (if not done)
firebase init

# Deploy Firestore rules and indexes
firebase deploy --only firestore

# Deploy Storage rules
firebase deploy --only storage

# Deploy Functions
firebase deploy --only functions
```

## Step 6: Run the App

```bash
# Start Expo
npx expo start

# Run on Android
npx expo start --android

# Run on iOS
npx expo start --ios
```

## Step 7: Test

1. Login with Google
2. Add your UPI ID in profile (for testing)
3. Upload a bill photo
4. Select contacts to split with
5. Test UPI payment flow

## Troubleshooting

### Firebase Auth not working
- Check if Google Sign-In is enabled in Firebase Console
- Verify SHA-1 fingerprint is added for Android

### OCR not extracting data
- Check if Vision API is enabled
- Verify service account has correct permissions
- Check Cloud Function logs: `firebase functions:log`

### UPI payment not opening
- Ensure a UPI app is installed (Google Pay, PhonePe, Paytm)
- Test with a valid UPI ID format: `username@bank`

## Environment Variables

Create `.env` file in root:

```
FIREBASE_API_KEY=your_key
FIREBASE_AUTH_DOMAIN=your_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```
