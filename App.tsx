
import React, { useState, useCallback, useEffect } from 'react';
import { Gender, AnalysisResult, RecommendationResult } from './types';
import { getFallbackRecommendations } from './constants';
import { getStyleRecommendations } from './services/geminiService';
import Header from './components/Header';
import Hero from './components/Hero';
import GenderSelector from './components/GenderSelector';
import CameraModal from './components/CameraModal';
import ResultsDisplay from './components/ResultsDisplay';
import LoadingSpinner from './components/LoadingSpinner';

// Helper function defined outside the component to avoid re-creation
const analyzeImage = async (imageDataUrl: string): Promise<AnalysisResult> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return resolve({ skinTone: 'Medium', faceShape: 'Oval' });

      ctx.drawImage(img, 0, 0);
      
      // Placeholder logic for skin tone: average color of the center pixel
      const pixel = ctx.getImageData(img.width / 2, img.height / 2, 1, 1).data;
      const brightness = (pixel[0] * 299 + pixel[1] * 587 + pixel[2] * 114) / 1000;
      let skinTone = 'Medium';
      if (brightness > 155) skinTone = 'Light';
      if (brightness < 85) skinTone = 'Dark';
      
      // Placeholder logic for face shape: random selection
      const shapes = ['Oval', 'Round', 'Square', 'Heart', 'Long'];
      const faceShape = shapes[Math.floor(Math.random() * shapes.length)];
      
      resolve({ skinTone, faceShape });
    };
    img.src = imageDataUrl;
  });
};


export default function App() {
  const [gender, setGender] = useState<Gender | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenderSelect = (selectedGender: Gender) => {
    setGender(selectedGender);
    resetState();
  };

  const handleCapture = useCallback((image: string) => {
    setCapturedImage(image);
    setIsCameraOpen(false);
  }, []);

  const resetState = () => {
    setCapturedImage(null);
    setAnalysisResult(null);
    setRecommendations(null);
    setError(null);
    setIsLoading(false);
  }

  const handleReset = () => {
    setGender(null);
    resetState();
  }

  const fetchRecommendations = useCallback(async (currentGender: Gender, currentAnalysis: AnalysisResult) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getStyleRecommendations(currentGender, currentAnalysis);
      setRecommendations(result);
    } catch (e) {
      console.error("Gemini API call failed, using fallback.", e);
      setError("AI analysis failed. Showing style guides for your selection.");
      const fallback = getFallbackRecommendations(currentGender);
      setRecommendations(fallback);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!capturedImage) return;

    const processImage = async () => {
        setIsLoading(true);
        const analysis = await analyzeImage(capturedImage);
        setAnalysisResult(analysis);
        setIsLoading(false);
    };

    processImage();
  }, [capturedImage]);


  useEffect(() => {
    if (analysisResult && gender) {
      fetchRecommendations(gender, analysisResult);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [analysisResult, gender]);


  return (
    <div className="relative min-h-screen w-full bg-slate-900 text-slate-100 font-sans overflow-x-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-900/50 opacity-70"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noisy-net.png')] opacity-5"></div>
      <div className="absolute inset-0 bg-black/30 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header onReset={handleReset} />

        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center py-10">
          {!gender ? (
            <>
              <Hero />
              <GenderSelector onSelect={handleGenderSelect} />
            </>
          ) : (
            <div className="w-full max-w-4xl">
              {isLoading && <LoadingSpinner capturedImage={capturedImage} />}
              
              {!isLoading && error && (
                <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg animate-scale-in" role="alert">
                    <p className="font-bold">An Error Occurred</p>
                    <p>{error}</p>
                </div>
              )}

              {!isLoading && recommendations && analysisResult && gender && (
                <ResultsDisplay 
                    image={capturedImage} 
                    analysis={analysisResult} 
                    recommendations={recommendations} 
                    gender={gender}
                />
              )}

              {!capturedImage && !isLoading && (
                 <div className="flex flex-col items-center gap-6 mt-8 p-8 bg-slate-800/50 rounded-2xl border border-slate-700 shadow-2xl backdrop-blur-sm animate-scale-in">
                    <h2 className="text-2xl font-bold text-indigo-300">Ready for your TrueShade analysis?</h2>
                    <p className="text-slate-300 max-w-md">
                        Selected Profile: <span className="font-semibold text-white">{gender}</span>. Now, let's get your photo to generate personalized advice.
                    </p>
                    <button
                        onClick={() => setIsCameraOpen(true)}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg shadow-indigo-600/30"
                    >
                        Activate Style Cam
                    </button>
                 </div>
              )}
               <button
                  onClick={handleReset}
                  className="mt-8 text-slate-400 hover:text-indigo-300 transition-all duration-200 transform hover:scale-110"
                >
                  Start Over
                </button>
            </div>
          )}
        </main>
      </div>

      {isCameraOpen && (
        <CameraModal onCapture={handleCapture} onClose={() => setIsCameraOpen(false)} />
      )}
    </div>
  );
}