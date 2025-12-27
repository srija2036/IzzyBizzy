// 1. Initialize Firebase App (Compat Version)
// These are globally available because of the scripts we will add to your HTML
const firebaseConfig = {
  apiKey: "AIzaSyB6wWo24uw4jQi3rqBE6CsWBoXFbnePu20",
  authDomain: "izzybizzy-6764a.firebaseapp.com",
  projectId: "izzybizzy-6764a",
  storageBucket: "izzybizzy-6764a.firebasestorage.app",
  messagingSenderId: "338324518980",
  appId: "1:338324518980:web:085f64f51d6067d0466411"
};

// 2. Initialize Firebase
firebase.initializeApp(firebaseConfig);

// 3. Initialize Firestore (Database)
const db = firebase.firestore();

console.log("Izzy Bizzy Firebase is connected! ✨");

/**
 * Global function to log mood clicks to the database
 * @param {string} moodName - The name of the mood clicked
 */
window.logMood = function(moodName) {
  db.collection("mood_logs").add({
    mood: moodName,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    platform: "web"
  })
  .then(() => {
    console.log(`Successfully logged: ${moodName}`);
  })
  .catch((error) => {
    console.error("Error logging mood to Firebase:", error);
  });
};