let token = '';
let selectedContactId = null;

function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.accessToken) {
            token = data.accessToken;
            document.getElementById('login-section').style.display = 'none';
            document.getElementById('register-section').style.display = 'none';
            document.getElementById('contact-section').style.display = 'block';
            getContacts();
        } else {
            alert('Login failed');
        }
    });
}

function register() {
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    fetch('/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data._id) {
            alert('Registration successful');
        } else {
            alert('Registration failed');
        }
    });
}

function getContacts() {
    fetch('/api/contacts', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const contactsList = document.getElementById('contacts-list');
        contactsList.innerHTML = '';
        data.forEach(contact => {
            const contactItem = document.createElement('div');
            contactItem.className = 'contact-item';
            contactItem.innerHTML = `
                <h3>${contact.name}</h3>
                <p>Email: ${contact.email}</p>
                <p>Phone: ${contact.phone}</p>
                <button onclick="selectContact('${contact._id}')">Select</button>
            `;
            contactsList.appendChild(contactItem);
        });
    });
}

function selectContact(contactId) {
    selectedContactId = contactId;
    document.getElementById('contact-actions').style.display = 'block';
}

function showCreateForm() {
    document.getElementById('create-update-form').style.display = 'block';
    document.getElementById('save-contact-btn').onclick = createContact;
    document.getElementById('contact-name').value = '';
    document.getElementById('contact-email').value = '';
    document.getElementById('contact-phone').value = '';
}

function createContact() {
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const phone = document.getElementById('contact-phone').value;

    fetch('/api/contacts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, email, phone })
    })
    .then(response => response.json())
    .then(data => {
        if (data) {
            getContacts();
            document.getElementById('create-update-form').style.display = 'none';
        }
    })
    .catch(error => alert(`Failed to add contact: ${error.message}`));
}

function updateContactForm() {
    if (!selectedContactId) return;
    
    fetch(`/api/contacts/${selectedContactId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(contact => {
        document.getElementById('contact-name').value = contact.name;
        document.getElementById('contact-email').value = contact.email;
        document.getElementById('contact-phone').value = contact.phone;

        document.getElementById('create-update-form').style.display = 'block';
        document.getElementById('save-contact-btn').onclick = () => updateContact(selectedContactId);
    })
    .catch(error => alert(error.message));
}

function updateContact(contactId) {
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const phone = document.getElementById('contact-phone').value;

    fetch(`/api/contacts/${contactId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, email, phone })
    })
    .then(response => response.json())
    .then(data => {
        getContacts();
        document.getElementById('create-update-form').style.display = 'none';
    })
    .catch(error => alert(`Failed to update contact: ${error.message}`));
}

function deleteContact() {
    if (!selectedContactId) return;

    if (confirm('Are you sure you want to delete this contact?')) {
        fetch(`/api/contacts/${selectedContactId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Contact removed') {
                getContacts();
                document.getElementById('contact-actions').style.display = 'none';
                selectedContactId = null;
            }
        })
        .catch(error => alert(`Failed to delete contact: ${error.message}`));
    }
}
