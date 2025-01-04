# Backend API Documentation

## Endpoints

### POST /users/register

#### Description
This endpoint registers a new user.

#### Request Body
The request body should be a JSON object with the following fields:
- `fullname`: An object containing:
  - `firstname` (string, required, minimum 3 characters)
  - `lastname` (string, optional, minimum 3 characters)
- `email` (string, required, must be a valid email)
- `password` (string, required, minimum 6 characters)

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Response Body
The response body will be a JSON object with the following fields:
- `token` (string): The authentication token.
- `user`: An object containing:
  - `_id` (string): The user's unique identifier.
  - `fullname`: An object containing:
    - `firstname` (string): The user's first name.
    - `lastname` (string): The user's last name.
  - `email` (string): The user's email.

Example:
```json 
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d0fe4f5311236168a109ca",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```