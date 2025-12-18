import { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import PendingApplications from '../components/faculty/PendingApplications';
import { facultyAPI } from '../services/api';

const FacultyDashboard = () => {
  const [stats, setStats] = useState({ pending: 0, approved: 0, total: 0 });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await facultyAPI.getPendingApplications();
      setStats(prev => ({ ...prev, pending: response.data.length }));
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
            <h2 className="page-title">Faculty Dashboard</h2>
            <p className="page-subtitle">Review and manage student leave applications</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 mb-8">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="text-lg font-semibold mb-2">Pending Applications</h3>
              <p className="text-2xl font-bold mb-2" style={{color: 'var(--color-info)'}}>{stats.pending}</p>
              <p className="text-secondary text-sm">Applications awaiting your review</p>
            </div>
          </div>
          
          <div className="card text-center">
            <div className="card-body">
              <h3 className="text-lg font-semibold mb-2">Approved Today</h3>
              <p className="text-2xl font-bold mb-2" style={{color: 'var(--color-success)'}}>0</p>
              <p className="text-secondary text-sm">Applications approved today</p>
            </div>
          </div>
          
          <div className="card text-center">
            <div className="card-body">
              <h3 className="text-lg font-semibold mb-2">Total Students</h3>
              <p className="text-2xl font-bold mb-2" style={{color: 'var(--color-primary-600)'}}>0</p>
              <p className="text-secondary text-sm">Students under your supervision</p>
            </div>
          </div>
        </div>

        <PendingApplications />

        <div className="card mt-6">
          <div className="card-header">
            <h3 className="text-lg font-semibold">Faculty Responsibilities</h3>
          </div>
          <div className="card-body">
            <ul className="text-secondary" style={{paddingLeft: '1.5rem', lineHeight: '1.8'}}>
              <li>Review leave applications from assigned students</li>
              <li>Approve or reject applications with optional comments</li>
              <li>Forward approved applications to HOD for final approval</li>
              <li>Monitor student attendance and leave patterns</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;