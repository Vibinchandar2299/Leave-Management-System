import { Link } from 'react-router-dom';
import AnimatedText from './AnimatedText';

const LandingPage = () => {
  return (
    <div className="flex justify-center items-center animate-fade-up" style={{minHeight: '100vh', backgroundColor: 'var(--bg-primary)', padding: 'var(--space-8)'}}>
      <div className="card text-center" style={{maxWidth: '720px'}}>
        <div className="card-header">
          <h1 className="text-2xl font-bold mb-2"><AnimatedText text={'Leave Management System'} /></h1>
          <p className="text-secondary">Streamline your leave application process</p>
        </div>
        
        <div className="card-body">
          <div className="flex gap-4 justify-center mb-6">
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
            <Link to="/register" className="btn btn-outline">
              Register
            </Link>
          </div>
          
          <div className="card" style={{backgroundColor: 'var(--bg-tertiary)'}}>
            <div className="card-body text-left">
              <h3 className="font-semibold mb-4">System Features:</h3>
              <ul className="text-secondary" style={{paddingLeft: '1.5rem'}}>
                <li>Student leave applications</li>
                <li>Faculty approval workflow</li>
                <li>HOD final approval</li>
                <li>Role-based access control</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default LandingPage;