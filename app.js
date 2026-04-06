import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// 🔹 Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyApq_o_IqlaCvC3z3FpYgfWTcPdXusjeF4",
  authDomain: "globalcontact-e726f.firebaseapp.com",
  projectId: "globalcontact-e726f",
  storageBucket: "globalcontact-e726f.firebasestorage.app",
  messagingSenderId: "599240599791",
  appId: "1:599240599791:web:14c46d9a2482ea861ad31a"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Search contact by country
async function searchContact() {
  const countryInput = document.getElementById("countryInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!countryInput) {
    resultDiv.innerHTML = "<p class='error'>⚠️ Please enter a country name.</p>";
    return;
  }

  const countryName = countryInput.toUpperCase(); // match Firestore document ID

  try {
    const docRef = doc(db, "contacts", countryName);
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      const contact = snap.data();
      resultDiv.innerHTML = `
        <h2>${countryName}</h2>
        <p><strong>Embassy:</strong> ${contact.embassy}</p>
        <p><strong>Emergency:</strong> ${contact.emergency}</p>
        <p><strong>Airline:</strong> ${contact.airline}</p>
      `;
    } else {
      resultDiv.innerHTML = `<p class="error">❌ No contact found for "${countryInput}".</p>`;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    resultDiv.innerHTML = "<p class='error'>⚠️ Error fetching data. Check console.</p>";
  }
}

window.searchContact = searchContact;
