// navbarData.js 
document.addEventListener('DOMContentLoaded', async () => {
    // Your Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyBPmfwH5An-Aav1HHHm2HI9mr0UtNqVtmY",
        authDomain: "propassist-e0123.firebaseapp.com",
        projectId: "propassist-e0123",
        storageBucket: "propassist-e0123.appspot.com",
        messagingSenderId: "940657393912",
        appId: "1:940657393912:web:0ee9771ead5a3bc2fd7b0d",
        measurementId: "G-Q4HDNFFV85"
    };

    // Initialize Firebase using the CDN methods
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    console.log("Firebase initialized and Firestore connected.");

    // Function to fetch property list from Firebase and populate the dropdown
    async function populatePropertyDropdown() {
        try {
            console.log("Fetching data from Firestore...");

            const propertyCollection = db.collection("propertylist");
            const propertySnapshot = await propertyCollection.get();

            console.log("Documents fetched: ", propertySnapshot.size);

            const propertyList = propertySnapshot.docs.map(doc => doc.data());
            console.log("Property List:", propertyList); // Debug log to see the data structure

            const dropdownList = document.getElementById("propertyDropdown");
            if (!dropdownList) {
                console.error("Dropdown list element not found.");
                return;
            }

            dropdownList.innerHTML = ""; // Clear any existing dropdown items

            if (propertyList.length === 0) {
                console.warn("No properties found in the database.");
                return;
            }

            // Loop through the property list and add each item to the dropdown
            propertyList.forEach((property, index) => {
                console.log(`Processing property #${index + 1}: `, property);

                const { filenum, streetnum, streetname, city, unitnum } = property;
                const displayText = `${filenum} - ${streetnum} ${streetname} ${city} ${unitnum || ""}`.trim();

                console.log("Dropdown item text: ", displayText);

                const dropdownItem = document.createElement("li");
                const dropdownLink = document.createElement("a");
                dropdownLink.className = "dropdown-item";
                dropdownLink.href = "#";
                dropdownLink.textContent = displayText;
                dropdownItem.appendChild(dropdownLink);

                dropdownList.appendChild(dropdownItem);
                console.log("Dropdown item added: ", dropdownLink);
            });

            console.log("Dropdown list populated successfully.");
        } catch (error) {
            console.error("Error fetching property list:", error);
        }
    }

    // Run the function to populate the dropdown on page load
    populatePropertyDropdown();
});
