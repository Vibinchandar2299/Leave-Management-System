import { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import LeaveApplicationForm from '../components/student/LeaveApplicationForm';
import ApplicationsList from '../components/student/ApplicationsList';
import { studentAPI } from '../services/api';

const StudentDashboard = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0 });

  useEffect(() => {
    fetchStats();
  }, [refreshKey]);

  const fetchStats = async () => {
    try {
      const response = await studentAPI.getMyApplications();
      const applications = response.data;
      setStats({
        total: applications.length,
        pending: applications.filter(app => app.status === 'PENDING_FACULTY' || app.status === 'PENDING_HOD').length,
        approved: applications.filter(app => app.status === 'APPROVED').length
      });
    } catch (error) {
      console.error('Failed to fetch stats');
    }
  };

  const handleApplicationSuccess = () => {
    alert('Leave application submitted successfully!');
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="page-container">
      <Header />
      <div className="content-container">
        <div className="page-header">
          <div>
            <h2 className="page-title">Student Dashboard</h2>
            <p className="page-subtitle">Manage your leave applications</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 mb-8">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="text-lg font-semibold mb-2">Total Applications</h3>
              <p className="text-2xl font-bold mb-2" style={{color: 'var(--color-primary-600)'}}>{stats.total}</p>
              <p className="text-secondary text-sm">Applications submitted by you</p>
            </div>
          </div>
          
          <div className="card text-center">
            <div className="card-body">
              <h3 className="text-lg font-semibold mb-2">Pending Review</h3>
              <p className="text-2xl font-bold mb-2" style={{color: 'var(--color-accent-600)'}}>{stats.pending}</p>
              <p className="text-secondary text-sm">Applications under review</p>
            </div>
          </div>
          
          <div className="card text-center">
            <div className="card-body">
              <h3 className="text-lg font-semibold mb-2">Approved</h3>
              <p className="text-2xl font-bold mb-2" style={{color: 'var(--color-success)'}}>{stats.approved}</p>
              <p className="text-secondary text-sm">Successfully approved applications</p>
            </div>
          </div>
        </div>

        <LeaveApplicationForm onSuccess={handleApplicationSuccess} />
        
        <ApplicationsList key={refreshKey} />
        
        <div className="card mt-6">
          <div className="card-header">
            <h3 className="text-lg font-semibold">Application Process</h3>
          </div>
          <div className="card-body">
            <ol className="text-secondary" style={{paddingLeft: '1.5rem'}}>
              <li>Submit your leave application with parent's phone number and reason</li>
              <li>Your application will be sent to your faculty for approval</li>
              <li>If approved by faculty, it will be forwarded to HOD</li>
              <li>Final approval/rejection will be decided by HOD</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};



export default StudentDashboard;