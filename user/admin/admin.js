import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';

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

async function addProduct(name, price, sku, description, image) {
    const docRef = await addDoc(collection(db, 'products'), {
        name: name,
        price: price,
        sku: sku,
        description: description,
        image: image
    });
    console.log("Product added with ID: ", docRef.id);
}

document.getElementById('add-product-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const sku = document.getElementById('sku').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').value;

    try {
        await addProduct(name, price, sku, description, image);
        alert('The product has been successfully added');
        window.location.href = '../products/products.html'; 

    } catch (error) {
        alert('Error adding product: ' + error.message);
    }
});