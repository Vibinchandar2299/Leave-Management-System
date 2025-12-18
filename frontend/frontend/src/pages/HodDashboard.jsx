import { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import AllApplications from '../components/hod/AllApplications';
import { hodAPI } from '../services/api';

const HodDashboard = () => {
  const [stats, setStats] = useState({ pendingHod: 0, approved: 0, total: 0 });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await hodAPI.getAllApplications();
      const applications = response.data;
      setStats({
        pendingHod: applications.filter(app => app.status === 'PENDING_HOD').length,
        approved: applications.filter(app => app.status === 'APPROVED').length,
        total: applications.length
      });
    } catch (error) {
      console.error('Failed to fetch stats');
    }
  };

  return (
    <div className="page-container">
      <Header />
      <div className="content-container" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' }}>
        <div className="page-header">
          <div>
            <h2 className="page-title">HOD Dashboard</h2>
            <p className="page-subtitle">Final approval and department oversight</p>
          </div>
        </div>
        
        <div className="grid grid-cols-4 mb-8">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="text-lg font-semibold mb-2">Pending Final Approval</h3>
              <p className="text-2xl font-bold mb-2" style={{color: 'var(--color-error)'}}>{stats.pendingHod}</p>
              <p className="text-secondary text-sm">Applications awaiting your decision</p>
            </div>
          </div>
          
          <div className="card text-center">
            <div className="card-body">
              <h3 className="text-lg font-semibold mb-2">Approved Applications</h3>
              <p className="text-2xl font-bold mb-2" style={{color: 'var(--color-success)'}}>{stats.approved}</p>
              <p className="text-secondary text-sm">Applications approved by you</p>
            </div>
          </div>
          
          <div className="card text-center">
            <div className="card-body">
              <h3 className="text-lg font-semibold mb-2">Total Applications</h3>
              <p className="text-2xl font-bold mb-2" style={{color: 'var(--color-primary-600)'}}>{stats.total}</p>
              <p className="text-secondary text-sm">All applications in department</p>
            </div>
          </div>
          
          <div className="card text-center">
            <div className="card-body">
              <h3 className="text-lg font-semibold mb-2">Faculty Members</h3>
              <p className="text-2xl font-bold mb-2" style={{color: 'var(--color-info)'}}>0</p>
              <p className="text-secondary text-sm">Faculty in your department</p>
            </div>
          </div>
        </div>

        <AllApplications />

        <div className="card mt-6">
          <div className="card-header">
            <h3 className="text-lg font-semibold">HOD Responsibilities</h3>
          </div>
          <div className="card-body">
            <ul className="text-secondary" style={{paddingLeft: '1.5rem', lineHeight: '1.8'}}>
              <li>Final approval/rejection of leave applications</li>
              <li>Monitor department-wide leave patterns</li>
              <li>Manage student and faculty profiles</li>
              <li>Generate reports and analytics</li>
              <li>Oversee the entire leave approval process</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HodDashboard;