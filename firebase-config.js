const firebaseConfig = {
  apiKey: "AIzaSyB6wWo24uw4jQi3rqBE6CsWBoXFbnePu20",
  authDomain: "izzybizzy-6764a.firebaseapp.com",
  projectId: "izzybizzy-6764a",
  storageBucket: "izzybizzy-6764a.firebasestorage.app",
  messagingSenderId: "338324518980",
  appId: "1:338324518980:web:085f64f51d6067d0466411"
};

// Initialize
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// 1. Observer to update UI
auth.onAuthStateChanged((user) => {
    const loginBtn = document.getElementById('login-status-btn');
    const userDisplay = document.getElementById('user-name-display');
    
    if (user) {
        if(loginBtn) loginBtn.innerHTML = "logout";
        if(userDisplay) userDisplay.innerHTML = `hi, ${user.email.split('@')[0]}`;
    } else {
        if(loginBtn) loginBtn.innerHTML = "login";
        if(userDisplay) userDisplay.innerHTML = "";
    }
});

// 2. Protected Redirect Function
window.protectedRedirect = function(pageUrl, moodName) {
    const user = auth.currentUser;

    if (user) {
        // User is logged in! Log the mood and go to page
        db.collection("mood_logs").add({
            mood: moodName,
            user: user.email,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            window.location.href = pageUrl;
        });
    } else {
        // User is NOT logged in. Block them.
        alert("🔒 Please login to enter the sanctuary.");
        window.location.href = "login.html";
    }
};

// 3. Handle Login/Logout Button
window.handleAuth = function() {
    if (auth.currentUser) {
        auth.signOut().then(() => {
            alert("Signed out!");
            window.location.reload();
        });
    } else {
        window.location.href = "login.html";
    }
};