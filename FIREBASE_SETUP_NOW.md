# 🔥 Firebase Setup - Do This Now!

Your app is running but needs Firebase credentials. Follow these steps:

---

## Step 1: Create FREE Firebase Project (3 minutes)

### 1.1 Go to Firebase Console
👉 https://console.firebase.google.com

### 1.2 Create Project
1. Click **"Add project"** or **"Create a project"**
2. **Project name**: `billsplit-plus` (or any name you like)
3. Click **Continue**

### 1.3 Choose FREE Plan
1. **Disable Google Analytics** (optional, keeps it simpler)
2. Click **Create project**
3. Wait 30 seconds for setup
4. Click **Continue**

---

## Step 2: Enable Services (2 minutes)

### 2.1 Enable Authentication
1. In left sidebar, click **"Authentication"**
2. Click **"Get started"**
3. Click **"Google"** sign-in method
4. Toggle **Enable**
5. Add your email in "Test users" (optional)
6. Click **Save**

### 2.2 Enable Firestore
1. In left sidebar, click **"Firestore Database"**
2. Click **"Create database"**
3. Choose **"Start in test mode"** (we'll secure it later)
4. Select location: **asia-south1** (or nearest to you)
5. Click **Enable**

### 2.3 Enable Storage
1. In left sidebar, click **"Storage"**
2. Click **"Get started"**
3. Choose **"Start in test mode"**
4. Click **Next**
5. Select same location as Firestore
6. Click **Done**

---

## Step 3: Get Your Config (2 minutes)

### 3.1 Register Web App
1. Click the **⚙️ gear icon** (Settings) in left sidebar
2. Click **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click the **Web icon** `</>`
5. **App nickname**: `BillSplit+`
6. **Don't** check "Firebase Hosting"
7. Click **"Register app"**

### 3.2 Copy Config
You'll see something like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "billsplit-plus-xxxxx.firebaseapp.com",
  projectId: "billsplit-plus-xxxxx",
  storageBucket: "billsplit-plus-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:xxxxxxxxxxxxx"
};
```

**Copy this entire config!**

---

## Step 4: Update Your App (1 minute)

### 4.1 Open Config File
Open: `src/config/firebase.ts`

### 4.2 Replace Config
Replace the placeholder config with your real config:

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase config (from Step 3.2)
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",  // ← Your real key
  authDomain: "billsplit-plus-xxxxx.firebaseapp.com",  // ← Your domain
  projectId: "billsplit-plus-xxxxx",  // ← Your project ID
  storageBucket: "billsplit-plus-xxxxx.appspot.com",  // ← Your bucket
  messagingSenderId: "123456789012",  // ← Your sender ID
  appId: "1:123456789012:web:xxxxxxxxxxxxx"  // ← Your app ID
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

### 4.3 Save File
Save the file (Ctrl+S or Cmd+S)

---

## Step 5: Restart App (30 seconds)

### 5.1 Stop Current App
In terminal, press **Ctrl+C** to stop

### 5.2 Restart
```bash
npx expo start
```

### 5.3 Reload App
- Press **R** in terminal to reload
- Or shake device and tap "Reload"

---

## ✅ Test It Works

### You Should Now See:
1. ✅ Login screen loads
2. ✅ "Continue with Google" button works
3. ✅ No more "Bad Request" errors

### Try This:
1. Click **"Continue with Google"**
2. Select your Google account
3. You should be logged in!
4. See the Dashboard screen

---

## 🎉 You're Done!

Your app is now connected to Firebase and **100% FREE**!

### What You Have:
- ✅ Firebase project (FREE tier)
- ✅ Authentication enabled
- ✅ Firestore database
- ✅ Storage enabled
- ✅ App connected and working

### Cost:
**₹0/month** - Completely FREE! 🎊

---

## 🆘 Troubleshooting

### Error: "API key not valid"
- Double-check you copied the entire config
- Make sure no extra spaces or quotes
- Restart the app after saving

### Error: "Project not found"
- Make sure you're using the correct project
- Check projectId matches your Firebase project

### Error: "Auth domain not authorized"
- Go to Firebase Console → Authentication → Settings
- Add your domain to authorized domains

### Still Not Working?
1. Clear cache: `npx expo start -c`
2. Reinstall: `rm -rf node_modules && npm install`
3. Check [FAQ.md](FAQ.md) for more help

---

## 📚 Next Steps

Once it's working:

1. **Test Features**
   - Upload a bill
   - Split with contacts
   - Generate UPI links

2. **Customize**
   - Change colors
   - Add your branding
   - Tweak features

3. **Deploy**
   - Build APK
   - Share with friends
   - Launch!

---

## 💡 Pro Tips

### Secure Your Database (Important!)
After testing, update Firestore rules:

1. Go to Firebase Console → Firestore Database
2. Click **"Rules"** tab
3. Replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

4. Click **"Publish"**

### Secure Your Storage
1. Go to Firebase Console → Storage
2. Click **"Rules"** tab
3. Replace with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

4. Click **"Publish"**

---

## 🎯 Quick Reference

### Firebase Console
👉 https://console.firebase.google.com

### Your Project
👉 https://console.firebase.google.com/project/YOUR_PROJECT_ID

### Config File Location
👉 `src/config/firebase.ts`

---

**Need help?** Check [QUICKSTART_FREE.md](QUICKSTART_FREE.md) or [FAQ.md](FAQ.md)

**Happy Building!** 🚀
