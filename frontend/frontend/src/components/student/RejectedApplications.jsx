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
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="py-2 px-3">Decision Date</th>
                  <th className="py-2 px-3">Leave Type</th>
                  <th className="py-2 px-3">From</th>
                  <th className="py-2 px-3">To</th>
                  <th className="py-2 px-3">Reason</th>
                  <th className="py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {rejected.map(app => (
                  <tr key={app._id} className="border-t">
                    <td className="py-2 px-3">{new Date(app.faculty_action_at || app.hod_action_at || app.submitted_at).toLocaleDateString()}</td>
                    <td className="py-2 px-3">{app.leave_type}</td>
                    <td className="py-2 px-3">{app.from_date ? new Date(app.from_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}</td>
                    <td className="py-2 px-3">{app.to_date ? new Date(app.to_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}</td>
                    <td className="py-2 px-3">{app.leave_reason ?? '-'}</td>
                    <td className="py-2 px-3">{formatStatus(app.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RejectedApplications;
