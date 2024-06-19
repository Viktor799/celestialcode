# Kryptonite-API Documentation


This is the backend API documentation for the Kryptonite App, designed to handle user registration, authentication, and image management functionalities.

## Prerequisites

- Node.js
- MongoDB
- Redis
- ElasticEmail account

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Viktor799/celestialcode.git
   cd celestialcode
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and add the following:
   ```plaintext
   PORT=3000
   MONGO_URI=mongo_connection_string
   SECRET_KEY=super_secret_key
   EMAIL_USER=elasticemail_username
   EMAIL_PASS=elasticemail_password
   REDIS_URL=redis_url
   ```

## Running the Application

Start the application:
```bash
npm start
```

## API Endpoints

### 1. User Registration and Authentication

- **Register a Kryptonian**
  - **Endpoint**: `POST /api/v1/register`
  


- **Confirm Email**
  - **Endpoint**: `GET /api/v1/confirm/:token`
  - Replace `:token` with the token received in the confirmation email.

- **Login and Request OTP**
  - **Endpoint**: `POST /api/v1/login`
 

- **Verify OTP**
  - **Endpoint**: `POST /api/v1/verify-otp`
  

- **Generate API Key**
  - **Endpoint**: `POST /api/v1/generate-api-key`
  

### 2. File Upload Service

- **Upload an Image**
  - **Endpoint**: `POST /api/v1/upload-image`
  - **Headers**:
    ```plaintext
    x-api-key: your_api_key
    ```
  - **Body**: Use `form-data` to upload an image file.

- **Get All Images**
  - **Endpoint**: `GET /api/v1/images`
  - **No Authentication Required**

- **Get a Single Image**
  - **Endpoint**: `GET /api/v1/images/:imageId`
  - Replace `:imageId` with the actual image ID.
  - **No Authentication Required**

## Testing

You can use tools like **Postman** to test the API endpoints. Here's an example flow:

1. **Register**: Use the registration endpoint to register a new user.
2. **Confirm Email**: Confirm the email using the token received via ElasticEmail.
3. **Login**: Login using the registered email to receive an OTP.
4. **Verify OTP**: Verify the OTP.
5. **Generate API Key**: Generate an API key for the Kryptonian.
6. **Upload Image**: Use the API key to authenticate and upload an image file.
7. **Access Images**: Access all or single images using their respective endpoints.

## License

This project is licensed under the MIT License.

---


