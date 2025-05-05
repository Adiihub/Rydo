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

## Example Error Response

```json
{
  "errors": [
    {
      "msg": "Invalid email format",
      "param": "email",
      "location": "body"
    }
  ]
}
```

---

For implementation details, see [`routes/user.routes.js`](routes/user.routes.js), [`controllers/user.controller.js`](controllers/user.controller.js), and [`models/user.model.js`](models/user.model.js).