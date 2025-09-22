# Clinical Trial Management System

A full-stack web application for managing clinical trials with user authentication.

## Features

- User registration and login
- Create, read, update, delete clinical trials
- User-specific trial management
- JWT authentication
- Responsive design

## Tech Stack

- **Frontend**: React, React Router
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT, Passport.js

## Setup

1. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm start
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

3. **Database**
   - Ensure MongoDB is running on localhost:27017
   - Database: `clinical-trials`

## Usage

1. Register a new account
2. Login with your credentials
3. Create and manage your clinical trials
4. Each user can only see their own trials

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/trials` - Get user's trials
- `POST /api/trials` - Create trial
- `PUT /api/trials/:id` - Update trial
- `DELETE /api/trials/:id` - Delete trial
