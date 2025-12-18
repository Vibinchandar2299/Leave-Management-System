# Frontend Setup Guide

## Quick Start

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Backend** (in separate terminal):
   ```bash
   cd ../../backend
   npm install
   npm run dev
   ```

3. **Start Frontend**:
   ```bash
   npm run dev
   ```

4. **Access Application**:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## Test the Application

### 1. Register Users
- Go to http://localhost:5173/register
- Create accounts for different roles:
  - Student: Use role "STUDENT"
  - Faculty: Use role "FACULTY" 
  - HOD: Use role "HOD"

### 2. Test Student Flow
- Login as Student
- Submit a leave application
- Check browser network tab to see API call to backend

### 3. Test Role-based Access
- Try accessing different dashboard URLs
- Verify proper redirects based on user role

## Available Routes

- `/` - Redirects to appropriate dashboard
- `/login` - Login page
- `/register` - Registration page
- `/student` - Student dashboard (STUDENT role only)
- `/faculty` - Faculty dashboard (FACULTY role only)
- `/hod` - HOD dashboard (HOD role only)
- `/unauthorized` - Access denied page

## Backend Integration Status

✅ **Working**:
- User registration and login
- Student leave application submission
- JWT authentication
- Role-based access control

⏳ **Ready for Backend Extension**:
- Faculty application review
- HOD final approval
- Application status tracking
- User management features

The frontend is fully functional and ready to work with additional backend endpoints as they are implemented.