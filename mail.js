// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7gCYSgUTGqKrdOhVG_7KG6Fs8EAI14so",
  authDomain: "interact-cff6c.firebaseapp.com",
  databaseURL: "https://interact-cff6c-default-rtdb.firebaseio.com",
  projectId: "interact-cff6c",
  storageBucket: "interact-cff6c.appspot.com",
  messagingSenderId: "506210237677",
  appId: "1:506210237677:web:e857f7c6fb02cb518d60e4",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference for database
var interactDB = firebase.database().ref("interact");

// Add an event listener to the form for submission
document.getElementById("signup-form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default form submission

  // Get the input values
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  // Check if passwords match
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // Create a new user with Firebase Authentication
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User successfully created
      const userId = userCredential.user.uid;

      // Save user information to the database
      interactDB
        .child(userId)
        .set({
          email: email,
          createdAt: new Date().toISOString(),
        })
        .then(() => {
          alert("Account created successfully!");
          // Optionally redirect or clear the form
          document.getElementById("signup-form").reset();
        })
        .catch((error) => {
          console.error("Error saving to database:", error);
        });
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error creating user:", errorCode, errorMessage);
      alert(errorMessage);
    });
});
