# 💰 Expense Management System
Managing personal finances can become difficult without keeping track of daily income and expenses. This project is a simple web-based Expense Management System that allows users to record, update, and manage their financial transactions in one place.
The application includes secure user authentication, an interactive dashboard with financial summaries, transaction management, and charts for visualizing spending. I built this project to improve my understanding of full-stack web development using Node.js, Express.js, MySQL, and JavaScript while working with REST APIs, authentication, and database operations.

## Features

### Authentication
- Register a new account
- Secure login using JWT authentication
- Passwords encrypted with bcrypt
- Logout functionality

### Transaction Management
- Add income and expense transactions
- Edit existing transactions
- Delete transactions
- View all transactions
- Filter transactions by Income or Expense

### Dashboard
- Total Income
- Total Expense
- Current Balance
- Monthly Income and Expense Summary
- Charts to visualize financial data
- Clean and responsive user interface

## Tech Stack

**Frontend**
- HTML
- CSS
- JavaScript

**Backend**
- Node.js
- Express.js

**Database**
- MySQL

**Authentication**
- JWT (JSON Web Token)
- bcrypt

**Charts**
- Chart.js

## Project Structure

```
Expense-Management-System
│
├── config
├── controllers
├── middleware
├── public
│   ├── css
│   ├── js
│
├── routes
├── views
├── app.js
├── package.json
└── README.md
```

## Getting Started

### Clone the repository

```bash
git clone https://github.com/<your-username>/Expense-Management-System.git
```

### Move into the project directory

```bash
cd Expense-Management-System
```

### Install the required packages

```bash
npm install
```

### Create a `.env` file

```env
PORT=5000

DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=expense_management

JWT_SECRET=your_secret_key
```

### Start the application

```bash
npm start
```

Open your browser and visit:

```
http://localhost:5000
```

---

## Screenshots

I'll be adding screenshots of the application here soon.

- Home Page
- Login Page
- Registration Page
- Dashboard
- Add Transaction Page

## What I Learned

Building this project helped me understand how different parts of a full-stack application work together. Some of the concepts I explored while developing this project include:

- Designing REST APIs using Express.js
- Connecting a Node.js application with MySQL
- Implementing JWT-based authentication
- Encrypting passwords using bcrypt
- Performing CRUD operations
- Building responsive web pages with HTML, CSS, and JavaScript
- Managing project structure for a full-stack application
- Visualizing data using Chart.js

This project also gave me hands-on experience with debugging backend issues, working with databases, and improving the overall user interface.

## Future Improvements

Some features I would like to add in the future are:

- Search transactions
- Export reports as PDF or Excel
- Budget planning
- Email verification
- Password reset
- Dark mode
- Recurring transactions
- Category-wise spending analysis

## Author

**Tushar Singh**

B.E. in Computer Engineering
Army Institute of Technology, Pune
## License

This project is created for learning purposes and is open to anyone who wants to explore or build upon it.
