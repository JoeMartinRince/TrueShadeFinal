import React from 'react';

interface HeaderProps {
    onReset: () => void;
}

const Header: React.FC<HeaderProps> = ({ onReset }) => {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50 animate-fade-in-down">
      <div className="container mx-auto flex justify-between items-center">
        <div onClick={onReset} className="cursor-pointer group">
            <h1 className="text-2xl font-bold text-white tracking-tight transition-colors group-hover:text-indigo-300">
            True<span className="text-indigo-400 group-hover:text-white transition-colors">Shade</span>
            </h1>
            <p className="text-xs text-slate-400 -mt-1">AI Style Assistant</p>
        </div>
        <a 
          href="https://alwinjosegeorge.github.io/Color-picker-mobile-demo/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Color Picker
        </a>
      </div>
    </header>
  );
};

export default Header;