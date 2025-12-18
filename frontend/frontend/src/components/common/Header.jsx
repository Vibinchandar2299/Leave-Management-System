import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDashboardPath = () => {
    switch (user?.role) {
      case 'STUDENT': return '/student';
      case 'FACULTY': return '/faculty';
      case 'HOD': return '/hod';
      default: return '/';
    }
  };

  return (
    <header style={{ 
      backgroundColor: 'var(--bg-secondary)', 
      borderBottom: '1px solid var(--color-neutral-200)',
      boxShadow: 'var(--shadow-sm)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div className="content-container">
        <div className="flex justify-between items-center" style={{ padding: 'var(--space-4) 0' }}>
          <h1 
            className="text-xl font-bold" 
            style={{ 
              cursor: 'pointer', 
              color: 'var(--color-primary-700)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)'
            }} 
            onClick={() => navigate(getDashboardPath())}
          >
            <span style={{ 
              width: '32px', 
              height: '32px', 
              backgroundColor: 'var(--color-primary-600)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.125rem',
              fontWeight: 700
            }}>
              LMS
            </span>
            Leave Management System
          </h1>
          {user && (
            <div className="flex items-center gap-4">
              <span className="status-badge status-info">{user.role}</span>
              <button className="btn btn-outline" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};



export default Header;