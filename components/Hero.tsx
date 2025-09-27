
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="mb-8">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400 mb-4 tracking-tight animate-fade-in-up"
          style={{ animationDelay: '100ms' }}>
        Discover Your Perfect Style
      </h1>
      <p className="max-w-2xl mx-auto text-lg text-slate-300 animate-fade-in-up"
         style={{ animationDelay: '250ms' }}>
        Our AI analyzes your unique features to provide personalized recommendations for makeup, grooming, and clothing. Start by selecting your profile.
      </p>
    </div>
  );
};

export default Hero;