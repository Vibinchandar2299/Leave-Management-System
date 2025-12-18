import { useState, useEffect } from 'react';
import { studentAPI } from '../../services/api';
import Card from '../common/Card';
import AnimatedText from '../common/AnimatedText';

const LeaveApplicationForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    leave_type: 'Medical Leave',
    from_date: '',
    to_date: '',
    leave_reason: '',
    parent_phone: ''
  });
  const [leaveDays, setLeaveDays] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Calculate number of leave days
  useEffect(() => {
    if (formData.from_date && formData.to_date) {
      const fromDate = new Date(formData.from_date);
      const toDate = new Date(formData.to_date);
      
      if (toDate >= fromDate) {
        const diffTime = Math.abs(toDate - fromDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end dates
        setLeaveDays(diffDays);
      } else {
        setLeaveDays(0);
      }
    } else {
      setLeaveDays(0);
    }
  }, [formData.from_date, formData.to_date]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate dates
    if (formData.to_date < formData.from_date) {
      setError('End date cannot be before start date');
      setLoading(false);
      return;
    }

    try {
      const submitData = {
        leave_type: formData.leave_type,
        from_date: formData.from_date,
        to_date: formData.to_date,
        number_of_days: leaveDays,
        leave_reason: formData.leave_reason,
        parent_phone: formData.parent_phone
      };
      
      console.log('Submitting leave application:', submitData);
      
      const response = await studentAPI.applyLeave(submitData);
      console.log('Leave application response:', response.data);
      
      setFormData({ 
        leave_type: 'Medical Leave',
        from_date: '',
        to_date: '',
        leave_reason: '',
        parent_phone: ''
      });
      setLeaveDays(0);
      alert('Leave application submitted successfully!');
      onSuccess && onSuccess();
    } catch (error) {
      console.error('Leave application error:', error);
      setError(error.response?.data?.message || 'Failed to submit application');
    }
    
    setLoading(false);
  };

  return (
    <Card className="mb-6 animated animate-fade-up" header={(
      <div>
        <h3 className="text-lg font-semibold">Apply for Leave</h3>
        <p className="text-sm text-secondary mt-1">Fill in all the details to submit your leave application</p>
      </div>
    )}>

      {error && <div className="error-message mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label className="form-label">Leave Type</label>
          <select
            name="leave_type"
            value={formData.leave_type}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="Medical Leave">Medical Leave</option>
            <option value="Personal Leave">Personal Leave</option>
            <option value="On Duty (OD)">On Duty (OD)</option>
            <option value="Emergency Leave">Emergency Leave</option>
            <option value="Casual Leave">Casual Leave</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label className="form-label">From Date</label>
            <input
              type="date"
              name="from_date"
              value={formData.from_date}
              onChange={handleChange}
              className="form-input"
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="form-group">
            <label className="form-label">To Date</label>
            <input
              type="date"
              name="to_date"
              value={formData.to_date}
              onChange={handleChange}
              className="form-input"
              required
              min={formData.from_date || new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Number of Leave Days</label>
          <div className="form-input" style={{
            backgroundColor: 'var(--color-neutral-100)',
            color: 'var(--text-secondary)',
            fontWeight: 600,
            fontSize: '1.125rem'
          }}>
            {leaveDays > 0 ? `${leaveDays} ${leaveDays === 1 ? 'Day' : 'Days'}` : 'Select dates to calculate'}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Parent Phone Number</label>
          <input
            type="tel"
            name="parent_phone"
            value={formData.parent_phone}
            onChange={handleChange}
            className="form-input"
            required
            placeholder="Enter parent's phone number"
            pattern="[0-9]{10}"
            title="Please enter a valid 10-digit phone number"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Reason for Leave</label>
          <textarea
            name="leave_reason"
            value={formData.leave_reason}
            onChange={handleChange}
            className="form-textarea"
            required
            placeholder="Explain the reason for your leave request in detail"
            rows="4"
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          style={{width: '100%'}}
          disabled={loading || leaveDays === 0}
        >
          {loading ? 'Submitting...' : 'Submit Leave Application'}
        </button>
      </form>

    </Card>
  );
};



export default LeaveApplicationForm;