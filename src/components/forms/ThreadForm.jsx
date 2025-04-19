import React, { useState } from 'react';
import { api } from '../../services/api';
import { useSchedule } from '../../hooks/useSchedule';

export default function ThreadForm() {
  const [parts, setParts] = useState(['']);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const { scheduleTime, setScheduleTime, formatSchedule } = useSchedule();

  const handlePartChange = (idx, value) => {
    const updated = [...parts];
    updated[idx] = value;
    setParts(updated);
  };
  const addPart = () => setParts([...parts, '']);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/tweets/thread', { texts: parts, scheduledAt: formatSchedule() });
      setMessage('✅ Thread scheduled successfully!');
    } catch (err) {
      setMessage('❌ Failed to schedule thread.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mt-24 mx-auto bg-white p-8 rounded-xl shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Schedule a Thread</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {parts.map((part, idx) => (
          <div key={idx} className="space-y-2">
            <label className="block text-gray-700 font-medium mb-2">Part {idx + 1}</label>
            <textarea
              value={part}
              onChange={(e) => handlePartChange(idx, e.target.value)}
              required
              rows={2}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              placeholder={`Tweet part ${idx + 1}...`}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addPart}
          className="text-blue-600 hover:underline"
        >
          + Add another part
        </button>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Schedule Time</label>
          <input
            type="datetime-local"
            value={scheduleTime}
            onChange={(e) => setScheduleTime(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-green-400 to-teal-500 text-white font-semibold rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
        >
          {loading ? 'Scheduling...' : 'Schedule Thread'}
        </button>
        {message && <p className="mt-4 text-center text-green-600">{message}</p>}
      </form>
    </div>
  );
}
