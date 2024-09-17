document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();  // Prevent form from reloading the page
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const acceptedTerms = document.getElementById('terms').checked;

    if (!name || !email || !password || !dob || !acceptedTerms) {
        alert('Please fill in all fields and accept the terms.');
        return;
    }

    // Create user data object
    let userData = {
        name: name,
        email: email,
        password: password,
        dob: dob,
        acceptedTerms: acceptedTerms
    };

    // Save data to localStorage
    localStorage.setItem('userData', JSON.stringify(userData));

    // Add data to table
    populateTable(userData);
    alert('User registered successfully!');
});

function loadData() {
    let storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
        let userData = JSON.parse(storedUserData);
        populateTable(userData);
    }
}

function populateTable(userData) {
    const tableBody = document.getElementById('userTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';  // Clear previous table rows

    const newRow = tableBody.insertRow();
    newRow.insertCell(0).textContent = userData.name;
    newRow.insertCell(1).textContent = userData.email;
    newRow.insertCell(2).textContent = userData.password;
    newRow.insertCell(3).textContent = userData.dob;
    newRow.insertCell(4).textContent = userData.acceptedTerms ? 'Yes' : 'No';
}

// Add validation for age (18-55 years old)
document.getElementById('dob').addEventListener('input', function() {
    const dob = new Date(this.value);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    if (age < 18 || age > 55) {
        alert('Age must be between 18 and 55 years old.');
        this.value = '';  // Clear the invalid date
    }
});

// Load saved data on page load
window.onload = loadData;
