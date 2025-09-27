
import React from 'react';

interface LoadingSpinnerProps {
    capturedImage: string | null;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ capturedImage }) => {
  const messages = [
    "Analyzing facial geometry...",
    "Calibrating color palettes...",
    "Consulting style algorithms...",
    "Generating personalized advice...",
    "Curating your unique look..."
  ];
  
  const [message, setMessage] = React.useState(messages[0]);

  React.useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % messages.length;
      setMessage(messages[index]);
    }, 2000);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 bg-slate-800/50 rounded-2xl border border-slate-700 shadow-2xl backdrop-blur-sm animate-scale-in">
        {capturedImage && (
            <div className="relative">
                <img src={capturedImage} alt="Analyzing" className="rounded-full w-32 h-32 object-cover border-4 border-slate-700 opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 border-4 border-t-indigo-400 border-r-indigo-400 border-b-slate-600 border-l-slate-600 rounded-full animate-spin"></div>
                </div>
            </div>
        )}
        {!capturedImage && (
            <div className="w-24 h-24 border-4 border-t-indigo-400 border-r-indigo-400 border-b-slate-600 border-l-slate-600 rounded-full animate-spin"></div>
        )}
      <p className="text-xl font-semibold text-slate-200 transition-opacity duration-500">{message}</p>
    </div>
  );
};

export default LoadingSpinner;