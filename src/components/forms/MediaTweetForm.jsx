import React, { useState } from 'react';
import { api } from '../../services/api';
import { useSchedule } from '../../hooks/useSchedule';

export default function MediaTweetForm() {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const { scheduleTime, setScheduleTime, formatSchedule } = useSchedule();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select an image.');
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const { data } = await api.post('/media/upload', formData);
      await api.post('/tweets/media', { text, mediaId: data.mediaId, scheduledAt: formatSchedule() });
      setMessage('✅ Media tweet scheduled successfully!');
    } catch (err) {
      setMessage('❌ Failed to schedule media tweet.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mt-24 mx-auto bg-white p-8 rounded-xl shadow-lg animate-slide-up">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Schedule a Media Tweet</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Tweet Text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            placeholder="Say something with an image..."
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Select Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            required
            className="w-full text-gray-600"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Schedule Time</label>
          <input
            type="datetime-local"
            value={scheduleTime}
            onChange={(e) => setScheduleTime(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-teal-400 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
        >
          {loading ? 'Scheduling...' : 'Schedule Media Tweet'}
        </button>
        {message && <p className="mt-4 text-center text-green-600">{message}</p>}
      </form>
    </div>
  );
}
