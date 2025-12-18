import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/clg_logo[1].png';
import AnimatedText from './AnimatedText';
import Navigation from '../nav/Navigation';

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
    <header className="card" style={{ margin: 0, borderRadius: 0, borderLeft: 0, borderRight: 0, borderTop: 0 }}>
      <div className="content-container">
        <div className="page-header" style={{ marginBottom: 0, paddingBottom: 0 }}>
          <div className="flex items-center gap-4" style={{ cursor: 'pointer' }} onClick={() => navigate(getDashboardPath())}>
            <img
              src={logo}
              alt="Sri Eshwar College Logo"
              style={{
                height: '50px',
                width: 'auto'
              }}
            />
            <h1 className="page-title" style={{ margin: 0 }}>
              <AnimatedText text={'Sri Eshwar Leave Management System'} />
            </h1>
          </div>

          <div style={{marginLeft: 'auto'}}>
            <Navigation items={[
              { to: '/', label: 'Home' },
              { to: '/student', label: 'Student' },
              { to: '/faculty', label: 'Faculty' },
              { to: '/hod', label: 'HOD' }
            ]} />
          </div>
          {user && (
            <div className="header-actions">
              <span className="badge badge-info" aria-hidden>{user.role}</span>
              <button className="btn btn-outline" onClick={handleLogout} aria-label="Logout">
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
