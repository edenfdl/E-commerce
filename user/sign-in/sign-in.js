import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyDzvEx7IGrVI8KOcuaqjclv_bJEZc9hdos",
    authDomain: "e-commerce-application-60e47.firebaseapp.com",
    projectId: "e-commerce-application-60e47",
    storageBucket: "e-commerce-application-60e47.appspot.com",
    messagingSenderId: "397687973430",
    appId: "1:397687973430:web:fbbcb784f01391f494da97",
    measurementId: "G-XXL2QS3848"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const auth = getAuth(app);


let btnLogin = document.querySelector(".login");


window.signInWithEmail = async () => {
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    console.log(`${email} and ${password}`);

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        console.log('Signed in:', userCredential.user);
        window.location.href = '../products/products.html';

    } catch (error) {
        console.log ('Sign-in error:', error);
        document.getElementById('error-message').innerText = 'Error: ' + error.message;
    }
};

btnLogin.addEventListener("click", signInWithEmail);

onAuthStateChanged(auth, user => {
    if (user) {

        window.location.href = '../products/products.html';

    } else {

        console.log("Please log in.");
    }
});
