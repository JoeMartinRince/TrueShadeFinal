
import React, { useRef, useEffect, useCallback } from 'react';

interface CameraModalProps {
  onCapture: (imageSrc: string) => void;
  onClose: () => void;
}

const CameraModal: React.FC<CameraModalProps> = ({ onCapture, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera: ", err);
        alert("Could not access camera. Please check permissions.");
        onClose();
      }
    };
    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [onClose]);

  const handleCapture = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUrl = canvas.toDataURL('image/jpeg');
        onCapture(dataUrl);
      }
    }
  }, [onCapture]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-800 p-6 rounded-2xl shadow-2xl border border-slate-700 max-w-lg w-full flex flex-col items-center animate-scale-in" style={{ animationDelay: '100ms' }}>
        <h2 className="text-2xl font-bold mb-4 text-indigo-300">Style Cam</h2>
        <div className="relative w-full aspect-video bg-slate-900 rounded-lg overflow-hidden">
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover"></video>
          <canvas ref={canvasRef} className="hidden"></canvas>
        </div>
        <div className="flex gap-4 mt-6 w-full">
            <button
            onClick={onClose}
            className="w-full bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 px-6 rounded-full transition-all duration-200 transform hover:scale-105"
            >
            Cancel
            </button>
            <button
            onClick={handleCapture}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-full transition-all duration-200 transform hover:scale-105"
            >
            Capture Photo
            </button>
        </div>
      </div>
    </div>
  );
};

export default CameraModal;