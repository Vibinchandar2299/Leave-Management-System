import React from 'react';

const PendingApplications = ({ applications, loading, error, formatStatus }) => {
  const pending = applications.filter(app => app.status === 'PENDING_FACULTY' || app.status === 'PENDING_HOD');

  if (loading) return <div className="loading">Loading pending applications...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="card">
      <div className="card-header flex items-center justify-between">
        <h4 className="text-md font-semibold">Pending Applications</h4>
        <span className="text-sm text-secondary">{pending.length}</span>
      </div>

      <div className="card-body">
        {pending.length === 0 ? (
          <div className="text-center text-secondary p-4">No pending applications.</div>
        ) : (
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="py-2 px-3">Submitted</th>
                  <th className="py-2 px-3">Leave Type</th>
                  <th className="py-2 px-3">From</th>
                  <th className="py-2 px-3">To</th>
                  <th className="py-2 px-3">Duration</th>
                  <th className="py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {pending.map(app => (
                  <tr key={app._id} className="border-t">
                    <td className="py-2 px-3">{new Date(app.submitted_at).toLocaleDateString()}</td>
                    <td className="py-2 px-3">{app.leave_type}</td>
                    <td className="py-2 px-3">{app.from_date ? new Date(app.from_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}</td>
                    <td className="py-2 px-3">{app.to_date ? new Date(app.to_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}</td>
                    <td className="py-2 px-3">{app.number_of_days ?? '-'}</td>
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

export default PendingApplications;
