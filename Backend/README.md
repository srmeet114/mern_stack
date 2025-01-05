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

### GET /users/profile

#### Description
This endpoint retrieves the profile of the authenticated user.

#### Response Body
The response body will be a JSON object with the following fields:
- `_id` (string): The user's unique identifier.
- `fullname`: An object containing:
  - `firstname` (string): The user's first name.
  - `lastname` (string): The user's last name.
- `email` (string): The user's email.

Example:
```json
{
  "_id": "60d0fe4f5311236168a109ca",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}
```

### POST /users/logout

#### Description
This endpoint logs out the authenticated user.

#### Response Body
The response body will be a JSON object with the following field:
- `message` (string): A message indicating the user has been logged out successfully.

Example:
```json
{
  "message": "User logged out successfully"
}
```

### POST /captains/register

#### Description
This endpoint registers a new captain.

#### Request Body
The request body should be a JSON object with the following fields:
- `fullname`: An object containing:
  - `firstname` (string, required, minimum 3 characters)
  - `lastname` (string, optional, minimum 3 characters)
- `email` (string, required, must be a valid email)
- `password` (string, required, minimum 6 characters)
- `vehicle`: An object containing:
  - `color` (string, required, minimum 3 characters)
  - `plate` (string, required, minimum 3 characters)
  - `capacity` (number, required)
  - `vehicleType` (string, required, must be one of 'car', 'motorcycle', 'auto')

Example:
```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "red",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```