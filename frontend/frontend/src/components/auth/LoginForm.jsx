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
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden'
    }}>
      {/* Video Background with Brightness Filter */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: -1
      }}>
        <video
          autoPlay
          muted
          loop
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto',
            transform: 'translate(-50%, -50%)',
            filter: 'brightness(0.8) contrast(1.1) saturate(1.2)'
          }}
        >
          <source src="/clg video.mp4" type="video/mp4" />
        </video>
      </div>
      
      {/* Semi-transparent overlay with green tint */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(16, 42, 66, 0.4)',
        zIndex: 0
      }} />
      
      {/* Login Form Container */}
      <div className="flex justify-center items-center" style={{
        position: 'relative',
        zIndex: 1,
        height: '100%',
        padding: '2rem',
      }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        overflow: 'hidden',
        backdropFilter: 'blur(5px)'
      }}>
        {/* Header */}
        <div style={{
          padding: '2rem 2rem 1.5rem',
          borderBottom: '1px solid #e2e8f0',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#2d3748',
            marginBottom: '0.5rem'
          }}>
            Sri Eshwar Leave Management System
          </h2>
          <p style={{
            color: '#718096',
            fontSize: '0.875rem'
          }}>Sign in to your account</p>
        </div>

        {/* Form */}
        <div style={{ padding: '1.5rem 2rem' }}>
          {error && (
            <div style={{
              backgroundColor: '#fff5f5',
              color: '#e53e3e',
              padding: '0.75rem 1rem',
              borderRadius: '0.375rem',
              marginBottom: '1.25rem',
              fontSize: '0.875rem',
              borderLeft: '4px solid #e53e3e'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ marginBottom: '1.5rem' }}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#4a5568',
                marginBottom: '0.5rem'
              }}>
                College Email
              </label>
              <input
                type="email"
                name="college_email"
                value={formData.college_email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.625rem',
                  borderRadius: '0.375rem',
                  border: '1px solid #e2e8f0',
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.5rem'
              }}>
                <label style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#4a5568'
                }}>
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.625rem',
                  borderRadius: '0.375rem',
                  border: '1px solid #e2e8f0',
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#2e7d32',
                color: 'white',
                fontWeight: '500',
                borderRadius: '0.375rem',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.9375rem',
                transition: 'all 0.3s ease',
                opacity: loading ? '0.7' : '1',
                pointerEvents: loading ? 'none' : 'auto',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }}
              onMouseOver={e => !loading && (e.target.style.backgroundColor = '#1b5e20', e.target.style.transform = 'translateY(-1px)')}
              onMouseOut={e => !loading && (e.target.style.backgroundColor = '#2e7d32', e.target.style.transform = 'translateY(0)')}
            >
              {loading ? 'Logging in...' : 'Sign in'}
            </button>
          </form>

          <div style={{
            textAlign: 'center',
            paddingTop: '1.25rem',
            borderTop: '1px solid #e2e8f0',
            marginTop: '1.5rem'
          }}>
            <p style={{
              color: '#718096',
              fontSize: '0.875rem',
              margin: 0
            }}>
              Don't have an account?{' '}
              <Link 
                to="/register" 
                style={{
                  color: '#2e7d32',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  padding: '0 2px'
                }}
                onMouseOver={e => {
                  e.target.style.color = '#1b5e20';
                  e.target.style.textDecoration = 'underline';
                }}
                onMouseOut={e => {
                  e.target.style.color = '#2e7d32';
                  e.target.style.textDecoration = 'none';
                }}
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};



export default LoginForm;