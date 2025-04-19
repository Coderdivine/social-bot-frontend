import React, { useState } from 'react';
import { api } from '../../services/api';
import { useSchedule } from '../../hooks/useSchedule';

export default function TextTweetForm() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const { scheduleTime, setScheduleTime, formatSchedule } = useSchedule();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/tweets/text', { text, scheduledAt: formatSchedule() });
      setMessage('✅ Text tweet scheduled successfully!');
    } catch (err) {
      setMessage('❌ Failed to schedule text tweet.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mt-24 mx-auto bg-white p-8 rounded-xl shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Schedule a Text Tweet</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Tweet Text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="What's happening?"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Schedule Time</label>
          <input
            type="datetime-local"
            value={scheduleTime}
            onChange={(e) => setScheduleTime(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
        >
          {loading ? 'Scheduling...' : 'Schedule Text Tweet'}
        </button>
        {message && <p className="mt-4 text-center text-green-600">{message}</p>}
      </form>
    </div>
  );
}
