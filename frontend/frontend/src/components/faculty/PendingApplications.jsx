import { useState, useEffect } from 'react';
import { facultyAPI } from '../../services/api';

const PendingApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reviewingId, setReviewingId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await facultyAPI.getPendingApplications();
      setApplications(response.data);
    } catch (error) {
      setError('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (applicationId, action) => {
    try {
      await facultyAPI.reviewApplication(applicationId, action, message);
      setMessage('');
      setReviewingId(null);
      fetchApplications(); // Refresh the list
      const actionText = action === 'approve' ? 'approved and forwarded to HOD' : 'rejected';
      alert(`Application ${actionText} successfully`);
    } catch (error) {
      alert('Failed to review application');
    }
  };

  if (loading) return <div className="loading">Loading applications...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="card mb-6">
      <div className="card-header">
        <h3 className="text-lg font-semibold">Pending Applications ({applications.length})</h3>
      </div>
      <div className="card-body">
        {applications.length === 0 ? (
          <div className="text-center p-6 text-secondary">
            <p>No pending applications for review.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {applications.map((app) => (
              <div key={app._id} className="card-body" style={{padding: 'var(--space-4)', borderBottom: '1px solid var(--color-neutral-200)'}}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold text-primary mb-1">{app.student_snapshot.name}</h4>
                    <p className="text-sm text-secondary">
                      {app.student_snapshot.roll_no} | {app.student_snapshot.department} | 
                      Year {app.student_snapshot.year}
                    </p>
                  </div>
                  <span className="text-sm text-tertiary">
                    {new Date(app.submitted_at).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="text-secondary mb-4" style={{lineHeight: '1.6'}}>
                  {app.leave_type && <p className="mb-2"><strong>Leave Type:</strong> {app.leave_type}</p>}
                  {app.from_date && app.to_date && (
                    <div className="grid grid-cols-2 gap-4 mb-2">
                      <p><strong>From:</strong> {new Date(app.from_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                      <p><strong>To:</strong> {new Date(app.to_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                    </div>
                  )}
                  {app.number_of_days && <p className="mb-2"><strong>Duration:</strong> {app.number_of_days} {app.number_of_days === 1 ? 'Day' : 'Days'}</p>}
                  <p className="mb-2"><strong>Reason:</strong> {app.leave_reason}</p>
                  <p><strong>Parent Phone:</strong> {app.parent_phone}</p>
                </div>

                {reviewingId === app._id ? (
                  <div style={{borderTop: '1px solid var(--color-neutral-200)', paddingTop: 'var(--space-4)'}}>
                    <textarea
                      placeholder="Add optional message for HOD..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="form-textarea mb-4"
                      rows="3"
                    />
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleReview(app._id, 'approve')}
                        className="btn btn-success"
                      >
                        Approve & Forward to HOD
                      </button>
                      <button 
                        onClick={() => handleReview(app._id, 'reject')}
                        className="btn btn-error"
                      >
                        Reject Application
                      </button>
                      <button 
                        onClick={() => setReviewingId(null)}
                        className="btn btn-outline"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{borderTop: '1px solid var(--color-neutral-200)', paddingTop: 'var(--space-4)'}}>
                    <button 
                      onClick={() => setReviewingId(app._id)}
                      className="btn btn-primary"
                    >
                      Review Application
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingApplications;