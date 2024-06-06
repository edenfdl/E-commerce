import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

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
const db = getFirestore(app);
const auth = getAuth(app);

const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
let btnRegister = document.getElementById("Register");


const signUp = async () => {
    const signUpEmail = email.value;
    const signUpPassword = password.value;
    createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
    .then(userCredential => {
        console.log("User created with ID: ", userCredential.user.uid);
        return addValue(userCredential.user.uid, name.value, email.value, password.value);
    })
    .then(() => {
        alert("user successfully created");
        name.value = '';
        email.value = '';
        password.value = '';
        window.location.href = '../products/products.html';
    })
    .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert(errorMessage);
    });
};

async function addValue(userId, userName, userEmail, userPassword) {
    const docRef = await addDoc(collection(db, "users"), {
        name: userName,
        email: userEmail,
        id: userId,
        password: userPassword
    });
    console.log("Document written with ID: ", docRef.id);
}




btnRegister.addEventListener("click", signUp);