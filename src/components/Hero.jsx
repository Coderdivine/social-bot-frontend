import React from 'react';
import { Link } from 'react-router-dom';
import heroBg from '../assets/media/hero-bg.png';

export default function Hero() {
  return (
    <section
      className="relative flex items-center justify-center text-center text-white h-[100vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 animate-fade-in-up">
          Effortless Scheduling for X Posts
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-200 animate-fade-in-up delay-200">
          Craft and schedule your tweets, threads, and media posts—all from one intuitive dashboard.
        </p>
        <Link
          to="/x"
          className="inline-block bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          Schedule on X Now
        </Link>
      </div>
    </section>
  );
}