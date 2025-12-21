# Deployment Guide

## Production Deployment

### 1. Prepare for Production

Update `app.json`:
```json
{
  "expo": {
    "version": "1.0.0",
    "android": {
      "versionCode": 1
    },
    "ios": {
      "buildNumber": "1.0.0"
    }
  }
}
```

### 2. Build Android APK/AAB

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure build
eas build:configure

# Build for Android
eas build --platform android --profile production

# Download APK
eas build:download
```

### 3. Build iOS App

```bash
# Build for iOS
eas build --platform ios --profile production

# Submit to App Store
eas submit --platform ios
```

### 4. Deploy Firebase Functions

```bash
# Set production environment variables
firebase functions:config:set \
  openai.key="YOUR_OPENAI_KEY" \
  vision.key="$(cat service-account.json)"

# Deploy all functions
firebase deploy --only functions

# Deploy specific function
firebase deploy --only functions:parseBill
```

### 5. Update Firestore Security Rules

Review and deploy production rules:

```bash
firebase deploy --only firestore:rules
```

### 6. Configure Firebase App Check (Recommended)

Protect your backend from abuse:

1. Enable App Check in Firebase Console
2. Register your app
3. Add App Check SDK to your app

```typescript
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('YOUR_RECAPTCHA_SITE_KEY'),
  isTokenAutoRefreshEnabled: true,
});
```

## Environment-Specific Configs

### Development

```bash
# Use Firebase emulators
firebase emulators:start

# Update app to use emulators
# In src/config/firebase.ts:
if (__DEV__) {
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectStorageEmulator(storage, 'localhost', 9199);
}
```

### Staging

Create separate Firebase project for staging:

```bash
# Add staging project
firebase use --add

# Deploy to staging
firebase use staging
firebase deploy
```

### Production

```bash
# Switch to production
firebase use production

# Deploy with caution
firebase deploy
```

## Monitoring & Analytics

### 1. Firebase Analytics

Already included in Firebase SDK. View in Firebase Console.

### 2. Crashlytics

```bash
# Install
npx expo install expo-firebase-crashlytics

# Configure in app.json
```

### 3. Performance Monitoring

Enable in Firebase Console and add SDK:

```bash
npm install firebase/performance
```

## CI/CD with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - name: Install dependencies
        run: npm ci
      
      - name: Deploy Functions
        run: |
          npm install -g firebase-tools
          firebase deploy --only functions --token ${{ secrets.FIREBASE_TOKEN }}
```

## Post-Deployment Checklist

- [ ] Test login flow
- [ ] Test bill upload and OCR
- [ ] Test UPI payment links
- [ ] Verify Firebase rules are secure
- [ ] Check Cloud Function logs for errors
- [ ] Monitor Firebase usage and costs
- [ ] Set up billing alerts
- [ ] Enable backup for Firestore
- [ ] Configure custom domain (if needed)
- [ ] Submit app to Play Store / App Store

## Rollback Strategy

If issues occur:

```bash
# Rollback functions
firebase functions:delete FUNCTION_NAME
firebase deploy --only functions

# Rollback Firestore rules
# Restore previous version from Firebase Console
```

## Cost Optimization

1. **Firestore**: Use composite indexes efficiently
2. **Storage**: Set lifecycle rules to delete old images
3. **Functions**: Optimize cold starts, use appropriate memory allocation
4. **Vision API**: Cache results, use batch processing

## Support & Monitoring

- Monitor Firebase Console daily
- Set up alerts for errors
- Review Cloud Function logs regularly
- Track user feedback and crashes
