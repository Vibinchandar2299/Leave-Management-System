# Leave Management System - Testing Guide

## Complete Workflow Testing

### Prerequisites
1. **Start Backend**: `cd backend && npm run dev` (Port 5000)
2. **Start Frontend**: `cd frontend/frontend && npm run dev` (Port 5173)

### Test the Complete Leave Application Workflow

#### Step 1: Create Test Users

1. **Register HOD**:
   - Go to http://localhost:5173/register
   - Role: HOD
   - Name: John HOD
   - Email: hod@college.edu
   - Department: Computer Science
   - Faculty ID: HOD001
   - Password: password123

2. **Register Faculty**:
   - Role: FACULTY
   - Name: Jane Faculty
   - Email: faculty@college.edu
   - Department: Computer Science
   - Faculty ID: FAC001
   - Assigned Year: 2
   - Assigned Section: A
   - Password: password123

3. **Register Student**:
   - Role: STUDENT
   - Name: Alice Student
   - Email: student@college.edu
   - Department: Computer Science
   - Roll No: CS2021001
   - Year: 2
   - Degree: B.Tech
   - Section: A
   - Password: password123

#### Step 2: Test Leave Application Flow

1. **Login as Student** (student@college.edu):
   - Submit a leave application
   - Add parent phone: +1234567890
   - Reason: "Medical appointment"
   - Check "My Leave Applications" section to see status: "Pending Faculty Review"

2. **Login as Faculty** (faculty@college.edu):
   - See the pending application in dashboard
   - Click "Review Application"
   - Add optional message: "Approved for medical reasons"
   - Choose either:
     - Click "Approve & Forward to HOD" → Status: "Pending HOD Approval"
     - Click "Reject Application" → Status: "Rejected" (final decision)

3. **Login as HOD** (hod@college.edu) - Only if Faculty Approved:
   - See the application in "Pending Your Approval" section
   - Click "Make Decision"
   - Add optional message: "Final approval granted"
   - Click "Approve" or "Reject"
   - Application status changes to "Approved" or "Rejected"

4. **Verify Final Status**:
   - Login back as Student
   - Check "My Leave Applications" - status shows final decision
   - See timestamps for faculty (and HOD if applicable) actions

#### Alternative Test: Faculty Rejection Flow

1. **Submit another application as Student**
2. **Login as Faculty**:
   - Click "Review Application"
   - Add message: "Insufficient documentation"
   - Click "Reject Application"
3. **Verify as Student**:
   - Application status shows "Rejected"
   - No HOD involvement needed

### Expected Results

✅ **Student Dashboard**:
- Can submit leave applications
- Can view all their applications with real-time status
- See approval timestamps

✅ **Faculty Dashboard**:
- Shows count of pending applications
- Can review and approve applications
- Applications move to HOD after approval

✅ **HOD Dashboard**:
- Shows statistics (pending, approved, total)
- Can make final decisions on applications
- Can see complete department application history

### Troubleshooting

**If applications don't appear**:
1. Check that all users have the same department
2. Verify faculty assigned_year matches student year
3. Verify faculty assigned_section matches student section
4. Check browser console for API errors

**If API calls fail**:
1. Ensure backend is running on port 5000
2. Check backend console for errors
3. Verify MongoDB is running and connected

### Database Verification

You can check MongoDB to see the data:
```bash
# Connect to MongoDB
mongo
use Leave-Management-System

# Check collections
db.users.find()
db.students.find()
db.faculty.find()
db.hod.find()
db.leave_applications.find()
```

The system now provides a complete end-to-end leave management workflow with real-time updates across all user roles!