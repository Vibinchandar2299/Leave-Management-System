import { useState, useEffect } from 'react';
import { studentAPI } from '../../services/api';
import PendingApplications from './PendingApplications';
import ApprovedApplications from './ApprovedApplications';
import RejectedApplications from './RejectedApplications';

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

        {/* Render three separate components for Pending / Approved / Rejected */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <PendingApplications
              applications={applications}
              loading={loading}
              error={error}
              formatStatus={formatStatus}
            />
          </div>

          <div>
            <ApprovedApplications
              applications={applications}
              loading={loading}
              error={error}
              formatStatus={formatStatus}
            />
          </div>

          <div>
            <RejectedApplications
              applications={applications}
              loading={loading}
              error={error}
              formatStatus={formatStatus}
            />
          </div>
        </div>
      </div>
    </div>
  );
};



export default ApplicationsList;