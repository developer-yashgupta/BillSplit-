# 📦 Installation Instructions

## Quick Installation (5 minutes)

### Step 1: Install Dependencies

```bash
# Install all dependencies
npm install

# Install Firebase Functions dependencies
cd functions
npm install
cd ..
```

### Step 2: Verify Installation

```bash
# Check for any issues
npm list

# Type check (should have no errors now)
npx tsc --noEmit
```

## What Gets Installed

### Main Dependencies

**Frontend Framework**
- `react` (18.2.0) - UI library
- `react-native` (0.74.0) - Mobile framework
- `expo` (~51.0.0) - Development platform

**Firebase Services**
- `firebase` (^10.7.1) - Backend services

**Navigation**
- `@react-navigation/native` (^6.1.9)
- `@react-navigation/stack` (^6.3.20)
- `react-native-screens` (~3.31.1)
- `react-native-safe-area-context` (4.10.1)
- `react-native-gesture-handler` (~2.16.1)

**State Management**
- `zustand` (^4.4.7) - Lightweight state management

**Expo Modules**
- `expo-image-picker` (~15.0.5) - Camera & gallery
- `expo-contacts` (~13.0.3) - Contact access
- `expo-linking` (~6.3.1) - Deep linking
- `expo-status-bar` (~1.12.1) - Status bar

**Dev Dependencies**
- `typescript` (^5.3.3)
- `@types/react` (~18.2.45)
- `@types/node` (^20.10.5)
- `eslint` (^8.56.0)

### Firebase Functions Dependencies

**Runtime**
- `firebase-admin` (^11.11.0)
- `firebase-functions` (^4.5.0)

**AI/ML**
- `@google-cloud/vision` (^4.0.2) - OCR
- `openai` (^4.20.0) - AI parsing

## Troubleshooting Installation

### Issue: npm install fails

```bash
# Clear cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Issue: Expo modules not found

```bash
# Install Expo CLI globally
npm install -g expo-cli

# Reinstall expo
npm install expo
```

### Issue: TypeScript errors

```bash
# Ensure @types/node is installed
npm install --save-dev @types/node

# Check tsconfig.json is correct
cat tsconfig.json
```

### Issue: Firebase modules not found

```bash
# Reinstall Firebase
npm uninstall firebase
npm install firebase@^10.7.1
```

## Platform-Specific Setup

### Android

```bash
# Install Android Studio
# Download from: https://developer.android.com/studio

# Set up Android SDK
# Open Android Studio > SDK Manager
# Install Android SDK Platform 33+

# Set environment variables (add to ~/.bashrc or ~/.zshrc)
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### iOS (Mac only)

```bash
# Install Xcode from App Store
# Install Xcode Command Line Tools
xcode-select --install

# Install CocoaPods
sudo gem install cocoapods

# Install pods (if needed)
cd ios && pod install && cd ..
```

## Verify Installation

### Check Node & npm

```bash
node --version  # Should be 18+
npm --version   # Should be 9+
```

### Check Expo

```bash
npx expo --version  # Should be 51+
```

### Check TypeScript

```bash
npx tsc --version  # Should be 5.3+
```

### Run Type Check

```bash
# Should complete with no errors
npx tsc --noEmit
```

### Test Run

```bash
# Start Expo (should open without errors)
npx expo start
```

## Post-Installation

### 1. Configure Firebase

Update `src/config/firebase.ts` with your Firebase credentials.

### 2. Install Expo Go

- **Android**: https://play.google.com/store/apps/details?id=host.exp.exponent
- **iOS**: https://apps.apple.com/app/expo-go/id982107779

### 3. Test the App

```bash
# Start development server
npx expo start

# Scan QR code with Expo Go app
# OR press 'a' for Android emulator
# OR press 'i' for iOS simulator
```

## Development Tools (Optional)

### VS Code Extensions

```bash
# Install recommended extensions
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension ms-vscode.vscode-typescript-next
```

### React Native Debugger

```bash
# macOS
brew install --cask react-native-debugger

# Windows
# Download from: https://github.com/jhen0409/react-native-debugger/releases
```

### Flipper (Advanced Debugging)

```bash
# Download from: https://fbflipper.com/
```

## Next Steps

After successful installation:

1. ✅ Read [QUICKSTART.md](QUICKSTART.md) for setup
2. ✅ Configure Firebase credentials
3. ✅ Deploy Firebase Functions
4. ✅ Run the app with `npx expo start`

## Getting Help

If you encounter issues:

1. Check [FAQ.md](FAQ.md)
2. Search GitHub issues
3. Open a new issue with:
   - Error message
   - Node/npm versions
   - Operating system
   - Steps to reproduce

---

**Installation Complete!** 🎉

Ready to proceed with [QUICKSTART.md](QUICKSTART.md)
