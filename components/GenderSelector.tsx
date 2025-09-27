
import React from 'react';
import { Gender } from '../types';

interface GenderSelectorProps {
  onSelect: (gender: Gender) => void;
}

const GenderSelector: React.FC<GenderSelectorProps> = ({ onSelect }) => {
  const genders = [Gender.Female, Gender.Male, Gender.NonBinary];

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-8">
      {genders.map((gender, index) => (
        <button
          key={gender}
          onClick={() => onSelect(gender)}
          className="px-8 py-3 bg-slate-800 border border-slate-700 rounded-full text-slate-200 font-semibold transition-all duration-300 ease-in-out hover:bg-indigo-600 hover:border-indigo-500 hover:scale-105 transform focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 animate-fade-in-up"
          style={{ animationDelay: `${400 + index * 150}ms` }}
        >
          {gender}
        </button>
      ))}
    </div>
  );
};

export default GenderSelector;