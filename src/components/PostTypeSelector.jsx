import React from 'react';

export default function PostTypeSelector({ onSelect }) {
  const types = [
    { key: 'text', label: 'Normal Text Tweet' },
    { key: 'media', label: 'Text + Image Tweet' },
    { key: 'thread', label: 'Thread Tweet' },
    { key: 'threadMedia', label: 'Thread with Images' },
  ];

  return (
    <section className=" mb-12 bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-0 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-10 animate-fade-in-up">
          Choose Your Post Type
        </h2>
        <div className="grid mt-24 grid-cols-1 sm:grid-cols-2 gap-10">
          {types.map((t) => (
            <button
              key={t.key}
              onClick={() => onSelect(t.key)}
              className="flex items-center justify-center p-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
