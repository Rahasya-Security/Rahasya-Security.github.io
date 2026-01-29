import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Server, 
  Lock, 
  Unlock, 
  Key, 
  Cpu, 
  BarChart3, 
  ArrowRight,
  Database,
  FileDigit,
  EyeOff
} from 'lucide-react';

interface Step {
  title: string;
  description: string;
  highlight: string;
}

/**
 * Homomorphic Encryption Workflow Animation
 * Demonstrates: 
 * 1. Local Encryption
 * 2. Data transmission
 * 3. Processing on Encrypted Data
 * 4. Result transmission
 * 5. Local Decryption
 */

const HEAnimation: React.FC = () => {
  const [step, setStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(true);

  const steps: Step[] = [
    {
      title: "1. Local Key Generation & Encryption",
      description: "The user generates a key pair. Sensitive data is encrypted locally. Only the user holds the secret key.",
      highlight: "client"
    },
    {
      title: "2. Secure Transmission",
      description: "The encrypted data (ciphertext) is sent to the cloud server. Even if intercepted, the data is unreadable.",
      highlight: "transit-to-server"
    },
    {
      title: "3. Computation on Encrypted Data",
      description: "Homomorphic encryption allows the server to perform math and ML inference directly on encrypted data without ever seeing the original content.",
      highlight: "server"
    },
    {
      title: "4. Secure Result Return",
      description: "The server sends back the encrypted result. The server still doesn't know what the result represents.",
      highlight: "transit-to-client"
    },
    {
      title: "5. Local Decryption",
      description: "The user decrypts the result using their private key. The privacy of the input and the output is maintained.",
      highlight: "client-decrypt"
    }
  ];

  // Auto-progress timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isProcessing) {
      interval = setInterval(() => {
        setStep((prev) => (prev + 1) % steps.length);
      }, 5000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isProcessing, steps.length]);

  const nextStep = () => setStep((prev) => (prev + 1) % steps.length);
  const prevStep = () => setStep((prev) => (prev - 1 + steps.length) % steps.length);

  return (
    <div className="flex flex-col items-center justify-center bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="p-4 md:p-8 text-center border-b border-slate-100">
          <h1 className="text-xl md:text-3xl font-bold text-slate-900 mb-2">Homomorphic Encryption Flow</h1>
          <p className="text-xs md:text-base text-slate-500 max-w-2xl mx-auto px-2">
            Process data without ever exposing it. A deep dive into privacy-preserving machine learning.
          </p>
        </div>

        {/* Animation Canvas */}
        <div className="relative h-[300px] md:h-[500px] bg-slate-900 overflow-hidden flex items-center justify-center">
          
          {/* Background Grid */}
          <div className="absolute inset-0 opacity-10" 
               style={{backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '30px 30px'}} />

          {/* Connection Line */}
          <div className="absolute w-[60%] h-[2px] bg-slate-700 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0" />

          <div className="relative z-10 w-full flex justify-between px-4 md:px-24">
            
            {/* Client Side */}
            <div className="flex flex-col items-center">
              <motion.div 
                animate={{ 
                  scale: (step === 0 || step === 4) ? 1.1 : 1,
                  boxShadow: (step === 0 || step === 4) ? "0 0 25px rgba(59, 130, 246, 0.5)" : "none"
                }}
                className={`w-16 h-16 md:w-32 md:h-32 rounded-xl md:rounded-2xl flex flex-col items-center justify-center transition-colors duration-500 ${
                  (step === 0 || step === 4) ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                <User size={24} className="md:w-12 md:h-12" />
                <span className="text-[8px] md:text-xs font-bold mt-1 md:mt-2 uppercase tracking-wider">Client</span>
              </motion.div>

              {/* Local Data Object */}
              <AnimatePresence mode="wait">
                {(step === 0) && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-3 md:mt-6 flex flex-col items-center"
                  >
                    <div className="flex gap-1 md:gap-2 mb-1 md:mb-2">
                      <Key size={12} className="md:w-4 md:h-4 text-yellow-400 animate-pulse" />
                      <div className="bg-green-500 text-[8px] md:text-xs px-1 md:px-2 py-0.5 md:py-1 rounded text-white font-mono">DATA_RAW</div>
                    </div>
                    <motion.div 
                      animate={{ rotate: [0, 10, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="bg-slate-700 p-1.5 md:p-3 rounded md:rounded-lg flex items-center gap-1 md:gap-2"
                    >
                      <Lock size={10} className="md:w-4 md:h-4 text-blue-400" />
                      <span className="text-[8px] md:text-[10px] text-blue-200 font-mono">ENCRYPTING...</span>
                    </motion.div>
                  </motion.div>
                )}
                {step === 4 && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mt-3 md:mt-6 flex flex-col items-center"
                  >
                    <div className="bg-green-500 p-1.5 md:p-3 rounded md:rounded-lg flex items-center gap-1 md:gap-2 shadow-lg shadow-green-500/20">
                      <Unlock size={12} className="md:w-5 md:h-5 text-white" />
                      <BarChart3 size={12} className="md:w-5 md:h-5 text-white" />
                      <span className="text-[8px] md:text-xs text-white font-bold tracking-tight">INSIGHT DECRYPTED</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Traveling Packets */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 flex justify-center pointer-events-none">
              <AnimatePresence>
                {step === 1 && (
                  <motion.div
                    initial={{ x: -80, opacity: 0 }}
                    animate={{ x: 80, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="bg-blue-500 p-1 md:p-2 rounded md:rounded-lg shadow-lg flex items-center gap-1 md:gap-2"
                  >
                    <Lock size={10} className="md:w-3.5 md:h-3.5 text-white" />
                    <div className="h-0.5 md:h-1 w-4 md:w-8 bg-white/30 rounded" />
                  </motion.div>
                )}
                {step === 3 && (
                  <motion.div
                    initial={{ x: 80, opacity: 0 }}
                    animate={{ x: -80, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="bg-purple-500 p-1 md:p-2 rounded md:rounded-lg shadow-lg flex items-center gap-1 md:gap-2"
                  >
                    <div className="h-0.5 md:h-1 w-4 md:w-8 bg-white/30 rounded" />
                    <Lock size={10} className="md:w-3.5 md:h-3.5 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Server Side */}
            <div className="flex flex-col items-center">
              <motion.div 
                animate={{ 
                  scale: (step === 2) ? 1.1 : 1,
                  boxShadow: (step === 2) ? "0 0 25px rgba(168, 85, 247, 0.5)" : "none"
                }}
                className={`w-16 h-16 md:w-32 md:h-32 rounded-xl md:rounded-2xl flex flex-col items-center justify-center transition-colors duration-500 ${
                  (step === 2) ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                <Server size={24} className="md:w-12 md:h-12" />
                <span className="text-[8px] md:text-xs font-bold mt-1 md:mt-2 uppercase tracking-wider text-center leading-tight">Cloud Server</span>
              </motion.div>

              {/* Server Processing Object */}
              <AnimatePresence mode="wait">
                {step === 2 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-3 md:mt-6 flex flex-col items-center"
                  >
                    <div className="relative">
                      <Cpu size={20} className="md:w-8 md:h-8 text-purple-300 animate-spin-slow" />
                      <div className="absolute -top-0.5 -right-0.5 md:-top-1 md:-right-1">
                        <Lock size={8} className="md:w-3 md:h-3 text-white bg-purple-500 rounded-full p-0.5" />
                      </div>
                    </div>
                    <div className="mt-1 md:mt-2 flex flex-col items-center gap-0.5 md:gap-1">
                      <div className="bg-slate-800 border border-purple-500/50 rounded p-1 md:p-2 flex flex-col gap-0.5 md:gap-1">
                        <div className="h-0.5 md:h-1 w-8 md:w-12 bg-purple-500/50 rounded overflow-hidden">
                          <motion.div 
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="h-full w-full bg-purple-400"
                          />
                        </div>
                        <span className="text-[6px] md:text-[8px] font-mono text-purple-200">OP_SUM(ENCRYPTED)</span>
                      </div>
                      <span className="text-[7px] md:text-[10px] text-purple-300 font-bold">ANALYZING CIPHERTEXT</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Overlay Privacy Indicators */}
          <div className="absolute bottom-3 md:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
            <div className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-slate-800/80 border border-slate-700">
              <EyeOff size={10} className="md:w-3.5 md:h-3.5 text-green-400" />
              <span className="text-[8px] md:text-xs text-slate-300">Server never sees raw data</span>
            </div>
          </div>
        </div>

        {/* Info & Controls */}
        <div className="p-4 md:p-8 bg-white grid md:grid-cols-3 gap-4 md:gap-8 items-center">
          
          <div className="md:col-span-2 space-y-2 md:space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-xs md:text-sm">
                {step + 1}
              </span>
              <h3 className="text-base md:text-xl font-bold text-slate-900 leading-tight">
                {steps[step].title}
              </h3>
            </div>
            <p className="text-slate-600 leading-relaxed text-xs md:text-base">
              {steps[step].description}
            </p>
            
            {/* Progress Bar */}
            <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={false}
                animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                className="h-full bg-blue-500"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 md:gap-3">
            <div className="flex gap-2">
              <button 
                onClick={prevStep}
                className="flex-1 px-3 md:px-4 py-2 md:py-3 border border-slate-200 rounded-lg md:rounded-xl hover:bg-slate-50 font-medium text-slate-700 transition-colors text-xs md:text-base"
              >
                Previous
              </button>
              <button 
                onClick={nextStep}
                className="flex-1 px-3 md:px-4 py-2 md:py-3 bg-slate-900 text-white rounded-lg md:rounded-xl hover:bg-slate-800 font-medium transition-colors flex items-center justify-center gap-1 md:gap-2 text-xs md:text-base"
              >
                Next <ArrowRight size={14} className="md:w-4 md:h-4" />
              </button>
            </div>
            <button 
              onClick={() => setIsProcessing(!isProcessing)}
              className={`w-full py-1.5 md:py-2 text-[10px] md:text-xs font-bold rounded md:rounded-lg border transition-all ${
                isProcessing 
                ? 'bg-blue-50 text-blue-600 border-blue-200' 
                : 'bg-white text-slate-400 border-slate-200 hover:text-slate-600'
              }`}
            >
              {isProcessing ? 'PAUSE AUTO-PLAY' : 'ENABLE AUTO-PLAY'}
            </button>
          </div>
        </div>

        {/* Footer / Capabilities */}
        <div className="bg-slate-50 p-3 md:p-6 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          {[
            { icon: Database, label: "Data Privacy" },
            { icon: FileDigit, label: "Zero Trust" },
            { icon: Cpu, label: "Secure AI" },
            { icon: EyeOff, label: "Compliance" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-1 md:gap-2 text-slate-500">
              <item.icon size={12} className="md:w-4 md:h-4" />
              <span className="text-[9px] md:text-[11px] font-semibold uppercase tracking-wider">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default HEAnimation;

