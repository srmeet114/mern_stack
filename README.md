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
### POST /users/login

#### Description
This endpoint logs in an existing user.

#### Request Body
The request body should be a JSON object with the following fields:
- `email` (string, required, must be a valid email)
- `password` (string, required, minimum 6 characters)

Example:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```