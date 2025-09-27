import React from 'react';
import { AnalysisResult, RecommendationResult, Gender } from '../types';

interface ResultsDisplayProps {
  image: string | null;
  analysis: AnalysisResult;
  recommendations: RecommendationResult;
  gender: Gender;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ image, analysis, recommendations, gender }) => {
    
    const { clothing, makeup, beard } = recommendations;

    return (
    <div className="w-full">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col gap-4 animate-fade-in-left">
          {image && (
            <img src={image} alt="Captured for analysis" className="rounded-2xl shadow-2xl border-2 border-slate-700 w-full" />
          )}
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 text-left" style={{ animationDelay: '200ms' }}>
            <h3 className="text-lg font-bold text-indigo-300 mb-2">Your Analysis</h3>
            <div className="flex justify-around">
                <p className="text-slate-300"><span className="font-semibold text-white">Skin Tone:</span> {analysis.skinTone}</p>
                <p className="text-slate-300"><span className="font-semibold text-white">Face Shape:</span> {analysis.faceShape}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 text-left animate-fade-in-right" style={{ animationDelay: '200ms' }}>
            <h2 className="text-3xl font-bold text-center md:text-left text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400 mb-2">Your AI-Powered Recommendations</h2>
            
            {/* Clothing Recommendations */}
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-bold text-indigo-300">Clothing Style</h3>
                    <a
                        href="https://alwinjosegeorge.github.io/Color-picker-mobile-demo/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full hover:bg-indigo-500/40 transition-colors duration-200"
                    >
                        Color Picker
                    </a>
                </div>
                <div className="mb-4">
                    <p className="font-semibold text-slate-300 mb-2">Flattering Colors:</p>
                    <div className="flex flex-wrap gap-3">
                        {clothing.colors.map((color) => (
                            <div key={color} className="w-8 h-8 rounded-full border-2 border-slate-600 shadow-md transition-transform duration-200 hover:scale-125" style={{ backgroundColor: color }} title={color}></div>
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <p className="font-semibold text-slate-300 mb-2">Suggested Styles:</p>
                    <ul className="list-disc list-inside text-slate-300 space-y-1">
                        {clothing.styles.map((style) => <li key={style}>{style}</li>)}
                    </ul>
                </div>
                <p className="text-slate-400 italic text-sm">{clothing.notes}</p>
            </div>

            {/* Makeup Recommendations */}
            {makeup && (
                 <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 animate-fade-in-up" style={{ animationDelay: '550ms' }}>
                    <h3 className="text-xl font-bold text-indigo-300 mb-3">Makeup Guide</h3>
                    <ul className="space-y-3 text-slate-300">
                        <li><span className="font-semibold text-white mr-2">💄 Foundation:</span> {makeup.foundation}</li>
                        <li><span className="font-semibold text-white mr-2">😊 Blush:</span> {makeup.blush}</li>
                        <li><span className="font-semibold text-white mr-2">👁️ Eyes:</span> {makeup.eyes}</li>
                        <li><span className="font-semibold text-white mr-2">👄 Lips:</span> {makeup.lips}</li>
                    </ul>
                    <p className="text-slate-400 italic text-sm mt-4">{makeup.notes}</p>
                </div>
            )}

             {/* Beard Recommendations */}
            {beard && (
                 <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 animate-fade-in-up" style={{ animationDelay: makeup ? '700ms' : '550ms' }}>
                    <h3 className="text-xl font-bold text-indigo-300 mb-3">Beard Style</h3>
                    <div className="mb-4">
                         <p className="font-semibold text-slate-300 mb-2">Suggested Styles:</p>
                        <ul className="list-disc list-inside text-slate-300 space-y-1">
                            {beard.styles.map((style) => <li key={style}>{style}</li>)}
                        </ul>
                    </div>
                    <p className="text-slate-400 italic text-sm">{beard.notes}</p>
                </div>
            )}

        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;