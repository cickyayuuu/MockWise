        // Replace newlines in the private key
// Firebase Admin SDK ke required modules import kar rahe hain
import { initializeApp, getApps, cert } from "firebase-admin/app"; // App initialization ke liye
import { getAuth } from "firebase-admin/auth"; // Firebase Admin Auth service
import { getFirestore } from "firebase-admin/firestore"; // Firebase Firestore (database)

// ✅ Yeh function Firebase Admin SDK ko initialize karta hai
function initFirebaseAdmin() {
  const apps = getApps(); // Check karte hain ki koi Firebase app already initialized hai ya nahi

  // Agar ab tak koi app initialize nahi hua
  if (!apps.length) {
    initializeApp({
      credential: cert({ // Service account credentials ke through initialization
        projectId: process.env.FIREBASE_PROJECT_ID, // Firebase project ID (env variable se liya gaya)
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL, // Service account ka client email
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"), 
        // 🔐 Private key mein jo `\n` string ke form mein hota hai, usko actual new line mein convert kar rahe hain
      }),
    });
  }

  // 🔙 Initialization ke baad `auth` aur `db` (database) return kar rahe hain
  return {
    auth: getAuth(), // Firebase Admin Auth service ka instance
    db: getFirestore(), // Firestore database ka instance
  };
}

// 📤 Ab function ko call karke `auth` aur `db` export kar rahe hain
export const { auth, db } = initFirebaseAdmin();
