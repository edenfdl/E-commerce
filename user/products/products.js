import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';
import { getFirestore, getDocs, collection, deleteDoc, doc } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';
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
const db = getFirestore(app);
const auth = getAuth(app);

let signOutBtn = document.getElementById("signOut");
async function fetchProducts() {
    const querySnapshot = await getDocs(collection(db, "products"));
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';
    querySnapshot.forEach((doc) => {
        const product = doc.data();
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <img src="${product.image}" alt="${product.name}">
            <p>Price: ₪${product.price}</p>
            <p>SKU: ${product.sku}</p>
            <p>Description: ${product.description}</p>
            <button class="delete-button" data-id="${doc.id}">Delete</button>
        `;
        productsContainer.appendChild(productDiv);
    });

    const signOutBtn = () => {
        signOutBtn(auth)
            .then(() => {
                console.log("user signed out");
                alert("user signed out successfully");
                window.location.href = '../sign-in/sign-in.html';
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                alert(errorMessage);
            });
    };
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const docId = event.target.getAttribute('data-id');
            await deleteProduct(docId);
        });
    });
}

async function deleteProduct(docId) {
    try {
        await deleteDoc(doc(db, "products", docId));
        console.log(`Product with ID ${docId} deleted successfully.`);
        fetchProducts();
    } catch (error) {
        console.error('Error deleting product:', error);
    }
}


fetchProducts();