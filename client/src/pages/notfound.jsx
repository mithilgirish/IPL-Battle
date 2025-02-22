import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0c1629] relative overflow-hidden p-4">
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-600 to-orange-600 rounded-full 
          mix-blend-screen filter blur-[100px] opacity-20 animate-pulse"
        ></div>
        <div 
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-orange-500 to-pink-500 
          rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse delay-700"
        ></div>
        <div className="absolute inset-0 opacity-10"></div>
      </div>

      {/* Main content */}
      <div className="relative flex flex-col items-center justify-center text-white z-10">
        <h1 className="text-5xl md:text-9xl font-bold text-center mb-4">404</h1>
        <p className="text-xl md:text-2xl text-center mb-8">Page Not Found</p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg 
          transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 
          focus:ring-blue-400 focus:ring-opacity-50"
        >
          Go back to home
        </button>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${10 + Math.random() * 20}s`,
              animationDelay: `${Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default NotFound;