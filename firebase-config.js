// 1. Your Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6wWo24uw4jQi3rqBE6CsWBoXFbnePu20",
  authDomain: "izzybizzy-6764a.firebaseapp.com",
  projectId: "izzybizzy-6764a",
  storageBucket: "izzybizzy-6764a.firebasestorage.app",
  messagingSenderId: "338324518980",
  appId: "1:338324518980:web:085f64f51d6067d0466411"
};

// 2. Initialize Firebase Services
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

console.log("Izzy Bizzy Firebase is connected! ✨");

// 3. The Observer: Updates the UI automatically when login status changes
auth.onAuthStateChanged((user) => {
  const loginBtn = document.getElementById('login-status-btn');
  const userDisplay = document.getElementById('user-name-display'); // Optional: for a welcome message
  
  if (user) {
    console.log("User logged in:", user.email);
    if(loginBtn) loginBtn.innerHTML = "logout";
    if(userDisplay) userDisplay.innerHTML = `hi, ${user.email.split('@')[0]}`;
  } else {
    console.log("No user logged in.");
    if(loginBtn) loginBtn.innerHTML = "login";
    if(userDisplay) userDisplay.innerHTML = "";
  }
});

// 4. Global Function: Log Moods to Database
window.logMood = function(moodName) {
  db.collection("mood_logs").add({
    mood: moodName,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    platform: "web",
    userId: auth.currentUser ? auth.currentUser.uid : "anonymous" // Ties mood to user if logged in
  })
  .then(() => {
    console.log(`Successfully logged: ${moodName}`);
  })
  .catch((error) => {
    console.error("Error logging mood:", error);
  });
};

// 5. Global Function: Handle Login/Logout Toggle
window.handleAuth = function() {
  const user = auth.currentUser;
  if (user) {
    auth.signOut().then(() => {
        alert("Signed out!");
        window.location.reload(); // Refresh to update UI
    });
  } else {
    window.location.href = "login.html"; 
  }
};