# Leave Management System - Frontend

A React-based frontend for the Leave Management System that connects to the Node.js backend.

## Features

- **Role-based Authentication**: Login/Register for Students, Faculty, and HOD
- **Student Dashboard**: Submit leave applications with parent phone and reason
- **Faculty Dashboard**: Review and approve/reject student applications (UI ready)
- **HOD Dashboard**: Final approval and department management (UI ready)
- **Responsive Design**: Works on desktop and mobile devices

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Make sure Backend is Running**:
   - Backend should be running on `http://localhost:5000`
   - Update API_BASE_URL in `src/services/api.js` if different

## User Roles & Access

### Student
- Submit leave applications
- View application status (when backend endpoints are added)
- Access: `/student`

### Faculty
- Review pending applications (UI ready, needs backend endpoints)
- Approve/reject with comments
- Access: `/faculty`

### HOD
- Final approval of applications (UI ready, needs backend endpoints)
- Department management
- Delete students
- Access: `/hod`

## Current Implementation Status

✅ **Completed**:
- Authentication (Login/Register)
- Role-based routing and access control
- Student leave application submission
- Responsive UI for all dashboards
- API service structure

⏳ **Pending Backend Endpoints**:
- Faculty application review endpoints
- HOD application management endpoints
- Application listing and status tracking
- User profile management

## API Integration

The frontend is configured to work with your existing backend:
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration  
- `POST /api/student/apply` - Submit leave application
- `DELETE /api/student/:id` - Delete student (HOD only)

## File Structure

```
src/
├── components/
│   ├── auth/           # Login/Register forms
│   ├── common/         # Shared components (Header, ProtectedRoute)
│   └── student/        # Student-specific components
├── pages/              # Page components
├── services/           # API services
├── context/            # React context (Auth)
└── App.jsx            # Main app with routing
```

## Usage

1. **Register**: Create account with role (Student/Faculty/HOD)
2. **Login**: Access role-specific dashboard
3. **Students**: Submit leave applications
4. **Faculty/HOD**: Review applications (when backend is extended)

The frontend is fully functional for student operations and ready for faculty/HOD features once the corresponding backend endpoints are implemented.