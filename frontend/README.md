 # User API Documentation

## User Signup

### Endpoint

`POST /users/register`

### Description

Registers a new user with first name, last name, email, and password. Returns a JWT token and user data on success.

### Request Body

```json
{
  "fullname": {
    "firstname": "John",      // Required, min 3 chars
    "lastname": "Doe"         // Required, min 3 chars
  },
  "email": "john@example.com", // Required, valid email
  "password": "yourpassword"   // Required, min 6 chars
}
```

### Validation Rules

- `fullname.firstname`: Required, minimum 3 characters.
- `fullname.lastname`: Required, minimum 3 characters.
- `email`: Required, valid email.
- `password`: Required, minimum 6 characters.

### Responses

| Status Code | Description                                                                                   |
|-------------|----------------------------------------------------------------------------------------------|
| 201         | Registration successful. Returns `{ token, user }`.                                           |
| 409         | User already exists. Returns `{ message: "User already" }`.                                  |
| 422         | Validation failed. Returns `{ errors: [...] }`.                                               |

### Example Success

```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id_here",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john@example.com",
    // ...other fields
  }
}
```

---

## User Login

### Endpoint

`POST /users/login`

### Description

Authenticates a user using email and password. Returns a JWT token and user data if credentials are valid.

### Request Body

```json
{
  "email": "john@example.com",    // Required, valid email
  "password": "yourpassword"      // Required, min 6 chars
}
```

### Validation Rules

- `email`: Required, valid email.
- `password`: Required, minimum 6 characters.

### Responses

| Status Code | Description                                                                                   |
|-------------|----------------------------------------------------------------------------------------------|
| 200         | Login successful. Returns `{ token, user }`.                                                  |
| 401         | Invalid email or password. Returns `{ message: "Invalid email or password" }`.                |
| 422         | Validation failed. Returns `{ errors: [...] }`.                                               |

### Example Success

```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id_here",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john@example.com",
    // ...other fields
  }
}
```

---

## User Profile

### Endpoint

`GET /users/profile`

### Description

Returns the authenticated user's profile information. Requires a valid JWT token in the Authorization header or cookie.

### Authentication

- Requires Bearer token in the `Authorization` header or a `token` cookie.

### Responses

| Status Code | Description                                                                                   |
|-------------|----------------------------------------------------------------------------------------------|
| 200         | Returns the authenticated user's profile as JSON.                                             |
| 401         | Unauthorized. Token missing, invalid, or blacklisted.                                         |

### Example Success

```json
{
  "_id": "user_id_here",
  "firstname": "John",
  "lastname": "Doe",
  "email": "john@example.com",
  // ...other fields
}
```

---

## User Logout

### Endpoint

`GET /users/logout`

### Description

Logs out the authenticated user by blacklisting the current JWT token and clearing the authentication cookie.

### Authentication

- Requires Bearer token in the `Authorization` header or a `token` cookie.

### Responses

| Status Code | Description                                                                                   |
|-------------|----------------------------------------------------------------------------------------------|
| 200         | Logout successful. Returns `{ message: "Logged out successfully" }`.                          |
| 401         | Unauthorized. Token missing, invalid, or blacklisted.                                         |

### Example Success

```json
{
  "message": "Logged out successfully"
}
```