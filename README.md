# Patient Health Dashboard

A simple Patient Health Dashboard application built with React and Node.js. This application allows users to view patient information, search for patients, and submit prior authorization requests.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Frontend Code Structure](#frontend-code-structure)
- [Backend Code Structure](#backend-code-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- View a list of patients with search functionality.
- Display detailed patient information.
- Submit prior authorization requests for treatments.

## Technologies Used

- **Frontend**: React, Tailwind CSS, Axios
- **Backend**: Node.js, Express, MongoDB
- **Database**: MongoDB

## Installation

### Prerequisites

- Node.js (v14 or later)
- MongoDB (local or cloud instance)

### Frontend

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/medax.git
   cd medax/frontend

2. **Install Dependencies**
     npm install
    #### Start the Frontend Application
         npm start

### Backend
Navigate to the Backend Directory
cd backend

**Install Dependencies**
npm install

**Set Up Environment Variables**

Create a .env file in the backend directory and add the following variables:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

**Start the Backend Application**
npm start

### Usage
Access the frontend application at http://localhost:3000.
Use the application to view patient information, search for patients, and submit prior authorization requests.
API Endpoints
Authentication
POST /api/auths/register - Register a new user.
POST /api/auths/login - Login an existing user.
Patients
GET /api/patients - Retrieve a list of patients.
GET /api/patients/:id - Retrieve detailed information about a specific patient.
POST /api/patients/authorization - Submit a prior authorization request.

#### Database Schema

**User**
name: String
email: String (unique)
password: String (hashed)
savedLooks: Array of ObjectId references to SavedLook

**Patient**
name: String
age: Number
medicalHistory: String
authorizationRequests: Array of ObjectId references to AuthorizationRequest

#### Frontend Code Structure


- **public/**: Contains static files like `index.html`.
- **src/**: Contains the main application code.
  - **components/**: Contains React components.
  - **api/**: Contains API service files for making requests.
  - **App.js**: The main application component.
  - **index.js**: The entry point of the React application.
- **package.json**: Contains project metadata and dependencies.

## Backend Code Structure

The structure of the backend code is organized as follows:

#### Backend Code Structure


- **config/**: Contains configuration files, such as database connection settings.
- **controllers/**: Contains controller files that handle business logic for routes.
- **middleware/**: Contains middleware functions for request handling.
- **models/**: Contains Mongoose models for database schemas.
- **routes/**: Contains route definitions for the API.
- **.env**: Contains environment variables for configuration.
- **server.js**: The main entry point for the backend application.
- **package.json**: Contains project metadata and dependencies.

#### Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

#### License
This project is licensed under the MIT License. See the LICENSE file for details.




### Notes:
- Make sure to replace `yourusername` in the clone URL with your actual GitHub username.
- Update the `MONGO_URI` and `JWT_SECRET` in the `.env` section with your actual values.
- Feel free to modify any sections to better fit your project's specifics! If you have any further questions or need additional information, let me know!
