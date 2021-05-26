# bookstore-app

A bookstore application where store owner can create, search, update and delete books.

### Features
Store owner can:
- Create Books
- Fetch Books
- Update Books
- Delete Books
- Search for books

### Tech Stack

**Server:** Node, Express, Mongoose, MongoDB

### Folder Structure
```bash
├── index.js
├── README.md
└── src
    ├── controllers
    ├── database
    ├── models
    └── routes
```

*TODO*
Adding Authentication

* Register route
    * Create a new user
    * Hash user's password
    * Create a token for user
    * Send token to user 

* Login route
    * Check if user exists
    * Compare user's password with stored hash
    * Create a token
    * Send token to user

* Authenticate book routes (GET)