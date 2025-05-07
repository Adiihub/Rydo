# User Registration API Documentation

## Endpoint

`POST /user/register`

## Description

Registers a new user in the system. The endpoint expects user details in the request body, validates the input, hashes the password, creates the user, and returns an authentication token along with the user data.

## Request Body
 

```json
{
  "fullname": {
    "firstname": "John",    // Required, minimum 3 characters
    "lastname": "Doe"       // Optional, minimum 3 characters if provided
  },
  "email": "john@example.com",   // Required, must be a valid email
  "password": "yourpassword"     // Required, minimum 6 characters
}
```

## Validation Rules

- `fullname.firstname`: Required, string, minimum 3 characters.
- `fullname.lastname`: Optional, string, minimum 3 characters if provided.
- `email`: Required, must be a valid email format.
- `password`: Required, minimum 6 characters.

## Responses

| Status Code | Description                                                                                   |
|-------------|----------------------------------------------------------------------------------------------|
| 201         | User registered successfully. Returns `{ token, user }`.                                      |
| 422         | Validation failed. Returns `{ errors: [...] }` with details about which fields are invalid.   |
| 500         | Internal server error.                                                                        |

## Example Success Response

```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "socketId": null,
    "createdAt": "2024-06-01T00:00:00.000Z",
    "updatedAt": "2024-06-01T00:00:00.000Z"
  }
}
```

---

For implementation details, see [`routes/user.routes.js`](routes/user.routes.js), [`controllers/user.controller.js`](controllers/user.controller.js), and [`models/user.model.js`](models/user.model.js).

# User Login API Documentation

## Endpoint

`POST /user/login`

## Description

Authenticates a user with email and password. If the credentials are valid, returns a JWT token and user data.

## Request Body

Send a JSON object with the following structure:

```json
{
  "email": "john@example.com",    // Required, must be a valid email
  "password": "yourpassword"      // Required, minimum 6 characters
}
```

## Validation Rules

- `email`: Required, must be a valid email format.
- `password`: Required, minimum 6 characters.

## Responses

| Status Code | Description                                                                                   |
|-------------|----------------------------------------------------------------------------------------------|
| 200         | Login successful. Returns `{ token, user }`.                                                  |
| 401         | Invalid email or password. Returns `{ message: "Invalid email or password" }`.  


## Success Response

```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "socketId": null,
    "createdAt": "2024-06-01T00:00:00.000Z",
    "updatedAt": "2024-06-01T00:00:00.000Z"
  }
}
```
---

For implementation details, see [`routes/user.routes.js`](routes/user.routes.js), [`controllers/user.controller.js`](controllers/user.controller.js), and [`models/user.model.js`](models/user.model.js).

# User Profile API Documentation

## Endpoint

`GET /user/profile`

## Description

Returns the authenticated user's profile information. Requires a valid JWT token in the Authorization header or cookie.

## Authentication

- Requires Bearer token in the `Authorization` header or a `token` cookie.

## Responses

| Status Code | Description                                                                                   |
|-------------|----------------------------------------------------------------------------------------------|
| 200         | Returns the authenticated user's profile as JSON.                                             |
| 401         | Unauthorized. Token missing, invalid, or blacklisted.                                         |

## Example Success Response

```json
{
  "_id": "user_id_here",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "socketId": null,
  "createdAt": "2024-06-01T00:00:00.000Z",
  "updatedAt": "2024-06-01T00:00:00.000Z"
}
```

---

# User Logout API Documentation

## Endpoint

`GET /user/logout`

## Description

Logs out the authenticated user by blacklisting the current JWT token and clearing the authentication cookie.

## Authentication

- Requires Bearer token in the `Authorization` header or a `token` cookie.

## Responses

| Status Code | Description                                                                                   |
|-------------|----------------------------------------------------------------------------------------------|
| 200         | Logout successful. Returns `{ message: "Logged out successfully" }`.                          |
| 401         | Unauthorized. Token missing, invalid, or blacklisted.                                         |

## Example Success Response

```json
{
  "message": "Logged out successfully"
}
```

---

For implementation details, see [`routes/user.routes.js`](routes/user.routes.js), [`controllers/user.controller.js`](controllers/user.controller.js), and [`middlewares/auth.middlewares.js`](middlewares/auth.middlewares.js).



# Captain Registration API Documentation

## Endpoint

`POST /captains/register`

## Description

Registers a new captain in the system. The endpoint expects captain details in the request body, validates the input, hashes the password, creates the captain, and returns an authentication token along with the captain data.

## Request Body

```json
{
  "fullname": {
    "firstname": "Jane",    // Required, minimum 3 characters
    "lastname": "Smith"     // Required, minimum 3 characters
  },
  "email": "jane@example.com",   // Required, must be a valid email
  "password": "yourpassword",    // Required, minimum 6 characters
  "vehicle": {
    "color": "Red",              // Required, minimum 3 characters
    "plate": "ABC123",           // Required, minimum 3 characters
    "capacity": 4,               // Required, number
    "vehicleType": "car"         // Required, one of: "car", "motorcycle", "auto"
  }
}
```
 
## Responses

| Status Code | Description                                                                                   |
|-------------|----------------------------------------------------------------------------------------------|
| 201         | Captain registered successfully. Returns `{ token, captain }`.                                |
| 409         | Captain already exists. Returns `{ message: "Captain already exists" }`.                      |
| 422         | Validation failed. Returns `{ errors: [...] }` with details about which fields are invalid.   |
| 500         | Internal server error.                                                                        |

## Example Success Response

```json
{
  "token": "jwt_token_here",
  "captain": {
    "_id": "captain_id_here",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "socketId": null,
    "status": "inactive",
    "createdAt": "2024-06-01T00:00:00.000Z",
    "updatedAt": "2024-06-01T00:00:00.000Z"
  }
}
```

---

For implementation details, see [`routes/captain.routes.js`](routes/captain.routes.js), [`controllers/captain.controller.js`](controllers/captain.controller.js), and [`models/captain.model.js`](models/captain.model.js).
