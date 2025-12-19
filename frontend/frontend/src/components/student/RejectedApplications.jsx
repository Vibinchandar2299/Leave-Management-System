import React from 'react';

const RejectedApplications = ({ applications, loading, error, formatStatus }) => {
  const rejected = applications.filter(app => app.status === 'REJECTED');

  if (loading) return <div className="loading">Loading rejected applications...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="card">
      <div className="card-header flex items-center justify-between">
        <h4 className="text-md font-semibold">Rejected Applications</h4>
        <span className="text-sm text-secondary">{rejected.length}</span>
      </div>

      <div className="card-body">
        {rejected.length === 0 ? (
          <div className="text-center text-secondary p-4">No rejected applications.</div>
        ) : (
          <div className="flex flex-col gap-4">
            {rejected.map(app => (
              <div key={app._id} className="border rounded p-4 bg-white shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-sm font-semibold">{formatStatus(app.status)}</div>
                  <div className="text-sm text-tertiary">{new Date(app.faculty_action_at || app.hod_action_at || app.submitted_at).toLocaleDateString()}</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-secondary text-sm">
                  <div><strong>Leave Type:</strong> {app.leave_type ?? '-'}</div>
                  <div><strong>Duration:</strong> {app.number_of_days ?? '-'} {app.number_of_days === 1 ? 'Day' : 'Days'}</div>

                  <div><strong>From:</strong> {app.from_date ? new Date(app.from_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}</div>
                  <div><strong>To:</strong> {app.to_date ? new Date(app.to_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}</div>

                  <div className="md:col-span-2"><strong>Reason:</strong> {app.leave_reason ?? '-'}</div>

                  <div className="md:col-span-2 flex gap-4 text-sm mt-1">
                    {app.faculty_action_at && <div><strong>Faculty Action:</strong> {new Date(app.faculty_action_at).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>}
                    {app.hod_action_at && <div><strong>HOD Action:</strong> {new Date(app.hod_action_at).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>}
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

export default RejectedApplications;
