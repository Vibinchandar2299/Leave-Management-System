import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Card from '../common/Card';
import AnimatedText from '../common/AnimatedText';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    college_email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const role = user.role;
      switch (role) {
        case 'STUDENT':
          navigate('/student', { replace: true });
          break;
        case 'FACULTY':
          navigate('/faculty', { replace: true });
          break;
        case 'HOD':
          navigate('/hod', { replace: true });
          break;
        default:
          break;
      }
    }
  }, [user, navigate]);

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

    const result = await login(formData);
    
    if (result.success) {
      const role = localStorage.getItem('role');
      switch (role) {
        case 'STUDENT':
          navigate('/student', { replace: true });
          break;
        case 'FACULTY':
          navigate('/faculty', { replace: true });
          break;
        case 'HOD':
          navigate('/hod', { replace: true });
          break;
        default:
          navigate('/login', { replace: true });
      }
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center animate-fade-up" style={{minHeight: '100vh', padding: 'var(--space-12)'}}>
      <Card className="card-elevated" animated header={(
        <div className="text-center">
          <h2 className="text-2xl font-bold" style={{color: 'var(--color-primary-700)'}}>
            <AnimatedText text={'Sri Eshwar Leave Management System'} />
          </h2>
          <p className="text-secondary text-sm mt-2">Sign in to your account</p>
        </div>
      )} footer={(
        <div className="text-center">
          <p className="text-secondary">Don't have an account? <Link to="/register" style={{color: 'var(--color-primary-600)'}}>Register here</Link></p>
        </div>
      )}>

        {error && <div className="error-message mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label className="form-label">College Email</label>
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
            <label className="form-label">Password</label>
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
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

      </Card>
    </div>
  );
};



export default LoginForm;