### Expense Tracker Application Documentation

#### Overview

The Expense Tracker application is a simple web app designed to help users track their expenses and income. It is built using Express.js for the backend, with pure HTML, CSS, and vanilla JavaScript for the frontend. The application ensures that only authenticated users can access the root page by managing user sessions with cookies and local storage for persistent login.

#### Features

- **User Authentication and authorisation**: Users must log in to access the application. Authentication is managed using JSON Web Tokens (JWT) and cookies.
- users can only have access of their own expense and incomes.
- **Expense Tracking**: Users can add, view, and delete transactions (both expenses and incomes).
- **Persistent Login**: User information is stored in local storage for persistent login, and cookies are used to manage sessions.

#### Dependencies

The following npm packages are used in this project:

- **bcryptjs**: `^2.4.3` - Used for hashing passwords.
- **colors**: `^1.4.0` - Provides color output for the terminal.
- **cookie-parser**: `^1.4.6` - Middleware for handling cookies.
- **cors**: `^2.8.5` - Provides Cross-Origin Resource Sharing (CORS) support.
- **dotenv**: `^16.4.5` - Loads environment variables from a `.env` file.
- **express**: `^4.19.2` - Web framework for Node.js.
- **express-async-handler**: `^1.2.0` - Simplifies error handling in asynchronous Express route handlers.
- **jsonwebtoken**: `^9.0.2` - Implements JSON Web Tokens for authentication.
- **mysql2**: `^3.10.3` - MySQL client for Node.js.
- **node-cron**: `^3.0.3` - Provides cron-like job scheduling for Node.js.
- **nodemailer**: `^6.9.14` - Module for sending emails.
- **nodemon**: `^3.1.4` - Automatically restarts the server on code changes.

#### Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Powerlearnproject/week-5-assignment-Marcocholla01
   cd week-5-assignment-Marcocholla01
   ```

2. **Install Dependencies**

   ```bash
   npm install  or yarn add or pnpm install
   ```

3. **Create Database and Tables**

- Create a new MySQL database and run the SQL commands in `database.sql` file to create the necessary tables:

4. **Create Environment File**

- To create a `.env` file based on your `.env.example` file, follow these steps:

- **Locate the `.env.example` File**: Open the `.env.example` file to see the list of environment variables needed.

- **Create the `.env` File**:

  - In your project directory, navigate to the `config` directory (or create it if it doesn’t exist).
  - Create a new file named `.env` in the `config` directory.

- **Add Environment Variables**:

  - Open the `.env` file in a text editor.
  - Copy the contents from the `.env.example` file into the `.env` file.
  - Replace placeholder values with your actual configuration settings.

5. **Run the Application**

   ```bash
   npm start
   ```

   To run the application with automatic restarts on code changes, use:

   ```bash
   npm run dev
   ```

#### Application Structure

- **`/public`**: Contains static files like HTML, CSS, and JavaScript.
- **`/routes`**: Contains route handlers for various endpoints.
- **`/controllers`**: Contains functions for handling business logic.
- **`/config`**: Contains database configurations .env files.
- **`/middleware`**: Contains middleware functions for authentication, error handling, etc.
- **`/utils`**: Contains utility functions and email configurations.
- **`app.js`**: Main application file where the Express app is set up and middleware/routes are configured.
- **`server.js`**: Is the entry point of the application.

#### How It Works

1. **Login**: Users access the login page and authenticate using their credentials. Upon successful login, a JWT is issued and stored in a cookie, while user information is stored in local storage.

2. **Accessing the Root Page**: When a user tries to access the root page, the application checks for the presence of the JWT cookie and verifies its validity. If valid, the user is allowed to access the page; otherwise, they are redirected to the login page.

3. **Managing Transactions**: Users can add, view, and delete transactions. The frontend interacts with the backend API to fetch and manage transaction data.

4. **Persistent Login**: The JWT cookie and local storage ensure that users remain logged in between sessions.

#### Frontend Components

- **HTML**: Provides the structure of the web pages.
- **CSS**: Styles the pages and components.
- **JavaScript**: Handles client-side logic, including form submissions, displaying transaction data, and managing UI interactions.

#### Security Considerations

- **Password Hashing**: Passwords are hashed using bcryptjs before being stored in the database.
- **JWT Authentication**: JSON Web Tokens are used to authenticate users and manage sessions securely.
- **Secure Cookies**: Ensure that cookies are marked as `HttpOnly` and `Secure` to enhance security.

#### Troubleshooting

- **"Failed to fetch expenses"**: Ensure the database is running and the connection details in the `.env` file are correct.
- **"Error removing transaction"**: Verify that the transaction ID is correct and that the transaction exists in the database.

For further assistance or to report issues, please contact the project maintainer or refer to the project's issue tracker.

---
