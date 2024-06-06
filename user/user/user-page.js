import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';
import { getFirestore, getDocs, collection, deleteDoc, doc } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

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



let signOutBtn = document.getElementById("signOut");

onAuthStateChanged(auth, user => {
  if (user) {

    displayUserTable();
  } else {

    window.location.href = '../sign-in/sign-in.html';
  }
});


async function deleteUser(userId) {
  try {

    const userDoc = doc(db, "users", userId);
    await deleteDoc(userDoc);
    console.log("Document deleted with ID: ", userId);


    displayUserTable();
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
}

const userSignOut = () => {
  signOut(auth)
    .then(() => {
      console.log("user signed out");
      alert("user signed out successfully");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      alert(errorMessage);
    });
};



export async function displayUserTable() {
  console.log("Refreshing user table");

  const tableBody = document.getElementById("table-data");
  tableBody.innerHTML = "";

  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      const row = document.createElement("tr");


      const usernameCell = document.createElement("td");
      usernameCell.textContent = data.name;
      row.appendChild(usernameCell);

      const emailCell = document.createElement("td");
      emailCell.textContent = data.email;
      row.appendChild(emailCell);

      const actionCell = document.createElement("td");
      const deleteButton = document.createElement("button")
      deleteButton.textContent = "delete";
      deleteButton.classList.add("delete");
      deleteButton.addEventListener('click', () => deleteUser(doc.id));
      actionCell.appendChild(deleteButton);
      row.appendChild(actionCell);


      tableBody.appendChild(row);

    });

  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}



signOutBtn.addEventListener("click", userSignOut);