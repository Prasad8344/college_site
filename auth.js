// auth.js - Firebase Authentication Implementation
import { auth, db } from './firebase-config.js';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged 
} from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js';
import { 
  collection, 
  addDoc, 
  serverTimestamp 
} from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js';

// Function to show messages to the user
function showMessage(message, type = 'success') {
  const messageElement = document.getElementById('authMessage');
  const messageText = document.getElementById('messageText');
  
  if (messageElement && messageText) {
    messageText.textContent = message;
    messageElement.style.display = 'block';
    
    // Set background color based on message type
    if (type === 'error') {
      messageElement.style.background = 'rgba(220,53,69,0.9)';
    } else {
      messageElement.style.background = 'rgba(40,167,69,0.9)';
    }
    
    // Hide message after 3 seconds
    setTimeout(() => {
      messageElement.style.display = 'none';
    }, 3000);
  } else {
    console.log(message);
  }
}

// DOM Elements
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');

// Register new users
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const password = document.getElementById('password').value;
    const program = document.getElementById('program').value;
    const specialization = document.getElementById('specialization').value;
    const city = document.getElementById('city').value;
    const course = document.getElementById('course').value;
    
    try {
      console.log('Attempting to register user:', email);
      
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User created successfully:', user.uid);
      
      // Store additional user data in Firestore
      console.log('Saving user data to Firestore...');
      const docRef = await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: name,
        email: email,
        mobile: mobile,
        program: program,
        specialization: specialization,
        city: city,
        course: course,
        createdAt: serverTimestamp()
      });
      
      console.log('Document written with ID: ', docRef.id);
      
      // Show success message
      showMessage('Registration successful! You can now login.');
      // Reset form
      registerForm.reset();
      // Switch to login form
      toggleForm('login');
    } catch (error) {
      console.error('Error during registration:', error);
      showMessage('Registration failed: ' + error.message, 'error');
    }
  });
}

// Login existing users
const loginFormElement = document.getElementById('loginFormElement');
if (loginFormElement) {
  loginFormElement.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
      console.log('Attempting to login user:', email);
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful');
      showMessage('Login successful!');
      // Redirect to main page after successful login
      setTimeout(() => {
        window.location.href = 'university site.html';
      }, 1500);
    } catch (error) {
      console.error('Error during login:', error);
      showMessage('Login failed: ' + error.message, 'error');
    }
  });
}

// Auth state observer
onAuthStateChanged(auth, (user) => {
  const authStatus = document.getElementById('authStatus');
  const userEmail = document.getElementById('userEmail');
  
  if (user) {
    // User is signed in
    console.log('User is signed in:', user.email);
    // Update UI elements based on auth state
    if (authStatus) {
      authStatus.style.display = 'block';
      userEmail.textContent = user.email;
    }
  } else {
    // User is signed out
    console.log('User is signed out');
    if (authStatus) {
      authStatus.style.display = 'none';
    }
  }
});

// Logout function (can be called from any page)
window.logout = async () => {
  try {
    await signOut(auth);
    showMessage('You have been logged out');
    // Redirect to login page after logout
    setTimeout(() => {
      window.location.href = 'form.html';
    }, 1500);
  } catch (error) {
    console.error('Error during logout:', error);
    showMessage('Logout failed: ' + error.message, 'error');
  }
};