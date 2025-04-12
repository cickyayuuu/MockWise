// Firebase client SDK se zaruri functions import kar rahe hain
import { getApp, getApps, initializeApp } from "firebase/app";  
// initializeApp() → Firebase app ko start karne ke liye  
// getApps() → check karta hai kitne apps initialized hain  
// getApp() → already initialized app ko return karta hai

// import { getAnalytics } from "firebase/analytics";
// (Ye optional hai, agar tu analytics use karna chahta ho to enable kar sakta hai)

import { getAuth } from "firebase/auth";  
// Firebase Authentication (login/signup) ke functions ke liye

import { getFirestore } from "firebase/firestore";  
// Firestore database (NoSQL) access karne ke liye functions

// 🔗 Firebase ki documentation link diya gaya hai agar aur SDKs chahiye to
// https://firebase.google.com/docs/web/setup#available-libraries

// Ye hai tera Firebase project ka configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCNdbhLFqSo8X5ME_EN_8yg2gWGSoAdtvw",  
  // Ye ek secret key hoti hai, jo browser se Firebase se baat karne ke liye hoti hai

  authDomain: "mockwise-70385.firebaseapp.com",  
  // Authentication related domains (email login/signup etc.)

  projectId: "mockwise-70385",  
  // 🔸era Firebase project ka ID

  storageBucket: "mockwise-70385.firebasestorage.app",  
  // Ye use hota hai jab tu files upload kare (images, PDFs etc.)

  messagingSenderId: "17004298777",  
  // Ye Firebase Cloud Messaging ke liye use hota hai (e.g., push notifications)

  appId: "1:17004298777:web:20d191d37726ec58f0e088",  
  // Ye unique ID hoti hai app ki

  measurementId: "G-6RHPTL88NP"  
  // Analytics ke liye use hoti hai (agar tu use kare to)
};

// Yahan Firebase app ko initialize kar rahe hain safely
const app = !getApps().length 
  ? initializeApp(firebaseConfig) 
  : getApp();  
// Agar koi app abhi tak initialize nahi hua → to initialize karo  
// Agar pehle se app hai → to usi ko use karo  
// Ye pattern "Next.js" ya development me kaafi useful hota hai, kyunki reload se baar baar initialize nahi karte

// const analytics = getAnalytics(app);  
// (Optional) Agar tu analytics chalu kare to use kar sakta hai

// Firebase Authentication ko export kar rahe hain
export const auth = getAuth(app);  
// Ye object se tu login, signup, logout, user session wagairah handle karega

// Firestore database ko export kar rahe hain
export const db = getFirestore(app);  
// Is object se tu database me read/write kar sakta hai

