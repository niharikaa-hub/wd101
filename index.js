document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = new Date(document.getElementById('dob').value);
    const termsAccepted = document.getElementById('terms').checked;
    
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    
    if (today.getMonth() < dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
        age--;
    }

    if (age < 18 || age > 55) {
        alert('You must be between 18 and 55 years old.');
        return;
    }

    const table = document.getElementById('usersTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.insertCell(0).textContent = name;
    newRow.insertCell(1).textContent = email;
    newRow.insertCell(2).textContent = password;
    newRow.insertCell(3).textContent = dob.toDateString();
    newRow.insertCell(4).textContent = termsAccepted ? 'Yes' : 'No';

    // Save data to localStorage (optional)
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ name, email, password, dob: dob.toISOString(), termsAccepted });
    localStorage.setItem('users', JSON.stringify(users));
});
