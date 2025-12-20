# ✅ Setup Checklist

Use this checklist to ensure everything is configured correctly.

## Pre-Development Setup

### Local Environment
- [ ] Node.js 18+ installed
- [ ] npm or yarn installed
- [ ] Git installed
- [ ] Code editor (VS Code recommended)
- [ ] Expo CLI installed globally (`npm install -g expo-cli`)
- [ ] Firebase CLI installed (`npm install -g firebase-tools`)

### Accounts Created
- [ ] Firebase account (https://firebase.google.com)
- [ ] Google Cloud account (same as Firebase)
- [ ] OpenAI account (https://platform.openai.com) - Optional
- [ ] Expo account (https://expo.dev)
- [ ] GitHub account (for version control)

## Firebase Configuration

### Project Setup
- [ ] Firebase project created
- [ ] Project name: billsplit-plus (or your choice)
- [ ] Billing plan: Blaze (pay-as-you-go) for Cloud Functions
- [ ] Region selected: asia-south1 (for India) or nearest

### Authentication
- [ ] Firebase Authentication enabled
- [ ] Google Sign-In provider enabled
- [ ] Test email added to authorized users
- [ ] OAuth consent screen configured (if needed)

### Firestore Database
- [ ] Firestore Database created
- [ ] Started in production mode
- [ ] Region: same as project
- [ ] Security rules deployed
- [ ] Indexes deployed

### Storage
- [ ] Firebase Storage enabled
- [ ] Started in production mode
- [ ] Security rules deployed
- [ ] CORS configured (if needed)

### Cloud Functions
- [ ] Functions enabled
- [ ] Billing account linked
- [ ] Environment variables set:
  - [ ] `vision.key` (service account JSON)
  - [ ] `openai.key` (optional)
- [ ] Functions deployed successfully

### Firebase Config
- [ ] Web app registered in Firebase
- [ ] Config copied to `src/config/firebase.ts`
- [ ] All keys present:
  - [ ] apiKey
  - [ ] authDomain
  - [ ] projectId
  - [ ] storageBucket
  - [ ] messagingSenderId
  - [ ] appId

## Google Cloud Setup

### APIs Enabled
- [ ] Cloud Vision API enabled
- [ ] Cloud Functions API enabled (auto-enabled)
- [ ] Cloud Storage API enabled (auto-enabled)

### Service Account
- [ ] Service account created
- [ ] Role: Cloud Vision API User
- [ ] JSON key downloaded
- [ ] Key uploaded to Firebase Functions config

## Project Setup

### Repository
- [ ] Repository cloned/created
- [ ] `.gitignore` configured
- [ ] `.env.example` copied to `.env`
- [ ] Environment variables set

### Dependencies
- [ ] Root dependencies installed (`npm install`)
- [ ] Function dependencies installed (`cd functions && npm install`)
- [ ] No installation errors

### Configuration Files
- [ ] `firebase.json` configured
- [ ] `firestore.rules` reviewed
- [ ] `firestore.indexes.json` reviewed
- [ ] `storage.rules` reviewed
- [ ] `app.json` configured with correct package names

## Development Environment

### Firebase Emulators (Optional)
- [ ] Emulators installed (`firebase init emulators`)
- [ ] Emulators configured:
  - [ ] Authentication
  - [ ] Firestore
  - [ ] Storage
  - [ ] Functions
- [ ] Emulators start successfully (`firebase emulators:start`)

### Mobile Development
- [ ] Android Studio installed (for Android)
- [ ] Xcode installed (for iOS, Mac only)
- [ ] Android emulator configured
- [ ] iOS simulator configured (Mac only)
- [ ] Physical device connected (optional)
- [ ] Expo Go app installed on device

## Testing

### Manual Testing
- [ ] App starts without errors (`npx expo start`)
- [ ] Can scan QR code with Expo Go
- [ ] Login screen appears
- [ ] Google Sign-In works
- [ ] User data saved to Firestore
- [ ] Can navigate to dashboard

### Feature Testing
- [ ] Camera permission requested
- [ ] Can take photo
- [ ] Can select from gallery
- [ ] Image uploads to Storage
- [ ] OCR extracts text (check function logs)
- [ ] Bill data parsed correctly
- [ ] Can select contacts
- [ ] Split calculation correct
- [ ] UPI link generated
- [ ] UPI app opens
- [ ] Payment status updates

### Error Handling
- [ ] Network errors handled gracefully
- [ ] Permission denials handled
- [ ] Invalid inputs validated
- [ ] Loading states shown
- [ ] Error messages clear

## Security

### Firebase Security
- [ ] Firestore rules prevent unauthorized access
- [ ] Storage rules prevent unauthorized uploads
- [ ] Functions require authentication
- [ ] API keys not exposed in code
- [ ] `.env` file in `.gitignore`

### App Security
- [ ] No sensitive data in AsyncStorage
- [ ] UPI IDs validated before use
- [ ] User inputs sanitized
- [ ] HTTPS only communication

## Performance

### Optimization
- [ ] Images compressed before upload
- [ ] Firestore queries optimized
- [ ] Indexes created for common queries
- [ ] Loading states implemented
- [ ] Error boundaries added

### Monitoring
- [ ] Firebase Console accessible
- [ ] Function logs viewable
- [ ] Error tracking configured
- [ ] Performance monitoring enabled (optional)

## Documentation

### Code Documentation
- [ ] README.md complete
- [ ] API.md complete
- [ ] SETUP.md complete
- [ ] Code comments added
- [ ] TypeScript types defined

### User Documentation
- [ ] Onboarding flow planned
- [ ] Help/FAQ section planned
- [ ] Privacy policy drafted
- [ ] Terms of service drafted

## Pre-Launch

### Testing
- [ ] Tested on Android device
- [ ] Tested on iOS device (if applicable)
- [ ] Tested with real bills
- [ ] Tested with multiple users
- [ ] Beta testing completed

### App Store Preparation
- [ ] App icon created (1024x1024)
- [ ] Splash screen created
- [ ] Screenshots prepared
- [ ] App description written
- [ ] Keywords researched
- [ ] Privacy policy URL ready
- [ ] Support email configured

### Production Build
- [ ] EAS Build configured
- [ ] Android build successful
- [ ] iOS build successful (if applicable)
- [ ] APK/AAB tested
- [ ] IPA tested (if applicable)

## Post-Launch

### Monitoring
- [ ] Firebase usage monitored
- [ ] Billing alerts configured
- [ ] Error tracking active
- [ ] User feedback collected

### Marketing
- [ ] Landing page live
- [ ] Social media accounts created
- [ ] Product Hunt launch planned
- [ ] Blog post written

## Troubleshooting Checklist

If something doesn't work:

1. **Check Firebase Console**
   - [ ] All services enabled?
   - [ ] Billing account active?
   - [ ] Quota limits not exceeded?

2. **Check Function Logs**
   ```bash
   firebase functions:log
   ```
   - [ ] Any errors?
   - [ ] Functions executing?

3. **Check App Logs**
   - [ ] Console errors?
   - [ ] Network requests failing?
   - [ ] Authentication working?

4. **Check Configuration**
   - [ ] Firebase config correct?
   - [ ] Environment variables set?
   - [ ] Rules deployed?

5. **Check Permissions**
   - [ ] Camera permission granted?
   - [ ] Contacts permission granted?
   - [ ] Storage permission granted?

## Support Resources

- 📖 [README.md](README.md) - Project overview
- 🚀 [QUICKSTART.md](QUICKSTART.md) - Quick setup guide
- 📚 [docs/SETUP.md](docs/SETUP.md) - Detailed setup
- 🏗️ [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) - System design
- 🔧 [docs/API.md](docs/API.md) - API reference
- 🧪 [docs/TESTING.md](docs/TESTING.md) - Testing guide
- 🚢 [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) - Deployment guide

---

**Status**: [ ] Setup Complete  
**Date**: ___________  
**Notes**: ___________
