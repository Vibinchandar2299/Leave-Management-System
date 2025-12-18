import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    role: 'STUDENT',
    college_email: '',
    password: '',
    name: '',
    // Student fields
    roll_no: '',
    department: '',
    year: '',
    degree: '',
    section: '',
    // Faculty/HOD fields
    faculty_id: '',
    assigned_year: '',
    assigned_section: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const result = await register(formData);
    
    if (result.success) {
      setSuccess('Registration successful! Please login.');
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const renderRoleSpecificFields = () => {
    switch (formData.role) {
      case 'STUDENT':
        return (
          <>
            <div className="form-group">
              <label className="form-label">Roll Number:</label>
              <input
                type="text"
                name="roll_no"
                value={formData.roll_no}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Year:</label>
              <select name="year" value={formData.year} onChange={handleChange} className="form-select">
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Degree:</label>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., B.Tech, B.Sc"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Section:</label>
              <input
                type="text"
                name="section"
                value={formData.section}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., A, B, C"
              />
            </div>
          </>
        );
      case 'FACULTY':
        return (
          <>
            <div className="form-group">
              <label className="form-label">Faculty ID:</label>
              <input
                type="text"
                name="faculty_id"
                value={formData.faculty_id}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Assigned Year:</label>
              <select name="assigned_year" value={formData.assigned_year} onChange={handleChange} className="form-select">
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Assigned Section:</label>
              <input
                type="text"
                name="assigned_section"
                value={formData.assigned_section}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., A, B, C"
              />
            </div>
          </>
        );
      case 'HOD':
        return (
          <div className="form-group">
            <label className="form-label">Faculty ID:</label>
            <input
              type="text"
              name="faculty_id"
              value={formData.faculty_id}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center items-center" style={{minHeight: '100vh', backgroundColor: 'var(--bg-primary)', padding: 'var(--space-4)'}}>
      <div className="card" style={{width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto'}}>
        <div className="card-header text-center">
          <h2 className="text-2xl font-bold">Create Account</h2>
          <p className="text-secondary text-sm mt-2">Register for Leave Management System</p>
        </div>
        
        <div className="card-body">
          {error && <div className="error-message mb-4">{error}</div>}
          {success && <div className="success-message mb-4">{success}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Role:</label>
              <select name="role" value={formData.role} onChange={handleChange} className="form-select">
                <option value="STUDENT">Student</option>
                <option value="FACULTY">Faculty</option>
                <option value="HOD">HOD</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">College Email:</label>
              <input
                type="email"
                name="college_email"
                value={formData.college_email}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Department:</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., Computer Science, Mechanical"
              />
            </div>

            {renderRoleSpecificFields()}

            <div className="form-group">
              <label className="form-label">Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              style={{width: '100%'}}
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
        
        <div className="card-footer text-center">
          <p className="text-secondary">
            Already have an account? <Link to="/login" style={{color: 'var(--color-primary-600)', fontWeight: 500}}>Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;