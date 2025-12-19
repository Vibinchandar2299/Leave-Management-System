import { Link, useLocation } from 'react-router-dom';

const Navigation = ({ items = [] }) => {
  const location = useLocation();

  return (
    <nav className="navigation">
      <ul className="nav-list">
        {items.map((item, index) => (
          <li key={index} className="nav-item">
            <Link 
              to={item.to} 
              className={`nav-link ${location.pathname === item.to ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;