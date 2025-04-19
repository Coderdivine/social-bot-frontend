import React, { useState } from 'react';
import { api } from '../../services/api';
import { useSchedule } from '../../hooks/useSchedule';

export default function ThreadMediaForm() {
  const [entries, setEntries] = useState([{ text: '', file: null }]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const { scheduleTime, setScheduleTime, formatSchedule } = useSchedule();

  const handleEntryChange = (idx, key, value) => {
    const updated = [...entries];
    updated[idx][key] = value;
    setEntries(updated);
  };
  const addEntry = () => setEntries([...entries, { text: '', file: null }]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const mediaIds = [];
      for (const entry of entries) {
        if (entry.file) {
          const formData = new FormData();
          formData.append('image', entry.file);
          const { data } = await api.post('/media/upload', formData);
          mediaIds.push(data.mediaId);
        }
      }
      await api.post('/tweets/thread', { texts: entries.map(en => en.text), mediaIds, scheduledAt: formatSchedule() });
      setMessage('✅ Thread with media scheduled successfully!');
    } catch (err) {
      setMessage('❌ Failed to schedule thread with media.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mt-24 mx-auto bg-white p-8 rounded-xl shadow-lg animate-slide-up">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Schedule a Thread with Media</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {entries.map((entry, idx) => (
          <div key={idx} className="space-y-2">
            <label className="block text-gray-700 font-medium mb-2">Text for Part {idx + 1}</label>
            <textarea
              value={entry.text}
              onChange={(e) => handleEntryChange(idx, 'text', e.target.value)}
              required
              rows={2}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              placeholder={`Tweet part ${idx + 1}...`}
            />
            <label className="block text-gray-700 font-medium mb-2">Image for Part {idx + 1}</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleEntryChange(idx, 'file', e.target.files[0])}
              className="w-full text-gray-600"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addEntry}
          className="text-purple-600 hover:underline"
        >
          + Add another segment
        </button>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Schedule Time</label>
          <input
            type="datetime-local"
            value={scheduleTime}
            onChange={(e) => setScheduleTime(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-purple-400 to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
        >
          {loading ? 'Scheduling...' : 'Schedule Thread with Media'}
        </button>
        {message && <p className="mt-4 text-center text-purple-600">{message}</p>}
      </form>
    </div>
  );
}
