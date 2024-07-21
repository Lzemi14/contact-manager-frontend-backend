# Contact Manager
This is a Contact Manager web application that allows users to manage their contacts by creating, reading, updating, and deleting them. The application features user authentication (login and registration) and ensures secure data management with backend support using Express.js, Node.js, and MongoDB.
## Features
- User registration and login
- Create, read, update, and delete contacts
- Secure authentication using JWT
## Technologies Used
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens)

## User Authentication
- Register: Create a new user account.
- Login: Authenticate with an existing account.
## Contact Management
- Create Contact: Add a new contact with a name, email, and phone number.
- View Contacts: See a list of all contacts.
- Update Contact: Edit details of an existing contact.
- Delete Contact: Remove a contact from the list.
## API Endpoints
- ## User Routes
- POST /api/users/register: Register a new user.
- POST /api/users/login: Login an existing user.
- ## Contact Routes
- GET /api/contacts: Get all contacts (requires authentication).
- POST /api/contacts: Create a new contact (requires authentication).
- PUT /api/contacts/:id: Update a contact by ID (requires authentication).
- DELETE /api/contacts/:id: Delete a contact by ID (requires authentication).
