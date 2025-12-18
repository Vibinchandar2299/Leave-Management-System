import { useState, useEffect } from 'react';
import { studentAPI } from '../../services/api';

const ApplicationsList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await studentAPI.getMyApplications();
      setApplications(response.data);
    } catch (error) {
      setError('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING_FACULTY': return '#f59e0b';
      case 'PENDING_HOD': return '#3b82f6';
      case 'APPROVED': return '#10b981';
      case 'REJECTED': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const formatStatus = (status) => {
    switch (status) {
      case 'PENDING_FACULTY': return 'Pending Faculty Review';
      case 'PENDING_HOD': return 'Pending HOD Approval';
      case 'APPROVED': return 'Approved';
      case 'REJECTED': return 'Rejected';
      default: return status;
    }
  };



  return (
    <div className="card mb-6">
      <div className="card-header">
        <h3 className="text-lg font-semibold">My Leave Applications</h3>
      </div>
      
      <div className="card-body">
        {loading && <div className="loading">Loading applications...</div>}
        {error && <div className="error-message">{error}</div>}
        
        {!loading && !error && applications.length === 0 && (
          <div className="text-center p-6 text-secondary">
            <p>No applications found. Submit your first leave application above!</p>
          </div>
        )}
        
        {!loading && !error && applications.length > 0 && (
          <div className="flex flex-col gap-4">
            {applications.map((app) => (
              <div key={app._id} className="card">
                <div className="card-body">
                  <div className="flex justify-between items-center mb-4">
                    <span className={`status-badge ${
                      app.status === 'PENDING_FACULTY' || app.status === 'PENDING_HOD' ? 'status-pending' :
                      app.status === 'APPROVED' ? 'status-approved' : 'status-rejected'
                    }`}>
                      {formatStatus(app.status)}
                    </span>
                    <span className="text-sm text-tertiary">
                      {new Date(app.submitted_at).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="text-secondary">
                    {app.leave_type && <p className="mb-2"><strong>Leave Type:</strong> {app.leave_type}</p>}
                    {app.from_date && app.to_date && (
                      <div className="grid grid-cols-2 gap-4 mb-2">
                        <p><strong>From:</strong> {new Date(app.from_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                        <p><strong>To:</strong> {new Date(app.to_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                      </div>
                    )}
                    {app.number_of_days && <p className="mb-2"><strong>Duration:</strong> {app.number_of_days} {app.number_of_days === 1 ? 'Day' : 'Days'}</p>}
                    <p className="mb-2"><strong>Reason:</strong> {app.leave_reason}</p>
                    <p className="mb-2"><strong>Parent Phone:</strong> {app.parent_phone}</p>
                    
                    {app.faculty_action_at && (
                      <p className="text-sm text-tertiary mt-3">
                        <strong>Faculty Action:</strong> {new Date(app.faculty_action_at).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    )}
                    
                    {app.hod_action_at && (
                      <p className="text-sm text-tertiary">
                        <strong>HOD Action:</strong> {new Date(app.hod_action_at).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};



export default ApplicationsList;