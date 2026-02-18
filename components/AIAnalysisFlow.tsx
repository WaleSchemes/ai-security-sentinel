import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Activity, Cpu, Brain, Shield, Zap,
    AlertTriangle, CheckCircle, XCircle,
    Play, RotateCcw, Server, Network
} from 'lucide-react';
import { useDemoStore } from '../store/demoStore';
import { ThreatType } from '../types';

const threatConfig: Record<ThreatType, { color: string; icon: JSX.Element; label: string }> = {
    malware: {
        color: 'from-red-500 to-orange-500',
        icon: <AlertTriangle className="w-5 h-5" />,
        label: 'Malware Attack'
    },
    phishing: {
        color: 'from-yellow-500 to-amber-500',
        icon: <AlertTriangle className="w-5 h-5" />,
        label: 'Phishing Attempt'
    },
    ddos: {
        color: 'from-purple-500 to-pink-500',
        icon: <AlertTriangle className="w-5 h-5" />,
        label: 'DDoS Attack'
    },
    insider: {
        color: 'from-orange-500 to-red-500',
        icon: <AlertTriangle className="w-5 h-5" />,
        label: 'Insider Threat'
    },
    safe: {
        color: 'from-green-500 to-emerald-500',
        icon: <CheckCircle className="w-5 h-5" />,
        label: 'Normal Traffic'
    }
};

const iconMap: Record<string, React.ElementType> = {
    Activity, Cpu, Brain, Shield, Zap
};

export const AIAnalysisFlow: React.FC = () => {
    const {
        currentThreat,
        isAnalyzing,
        analysisSteps,
        aiVisualization,
        triggerThreat,
        resetDemo
    } = useDemoStore();

    const [showNeurons, setShowNeurons] = useState(false);

    // Animate neural network visualization
    useEffect(() => {
        if (isAnalyzing) {
            const interval = setInterval(() => {
                setShowNeurons(prev => !prev);
            }, 500);
            return () => clearInterval(interval);
        }
    }, [isAnalyzing]);

    return (
        <div className="bg-gray-800/50 backdrop-blur rounded-xl p-6 border border-gray-700">
            {/* Threat Selection Grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h2 className="text-xl font-semibold mb-6">Select Threat Scenario</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {(Object.keys(threatConfig) as ThreatType[]).map((type, index) => (
                        <motion.button
                            key={type}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => !isAnalyzing && triggerThreat(type)}
                            disabled={isAnalyzing}
                            className={`relative overflow-hidden rounded-xl p-6 bg-gradient-to-br ${threatConfig[type].color
                                } ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                            <div className="absolute inset-0 bg-black/20" />
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="mb-3">{threatConfig[type].icon}</div>
                                <h3 className="font-medium">{threatConfig[type].label}</h3>
                                {currentThreat === type && (
                                    <motion.div
                                        layoutId="active-threat"
                                        className="absolute inset-0 border-4 border-white rounded-xl"
                                    />
                                )}
                            </div>

                            {/* Animated scan line */}
                            {isAnalyzing && currentThreat === type && (
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                    animate={{ x: ['-100%', '100%'] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            )}
                        </motion.button>
                    ))}
                </div>
            </motion.div>

            {/* Main Visualization Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Analysis Pipeline */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Flow Diagram */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gray-700/30 rounded-xl p-6"
                    >
                        <h3 className="text-lg font-semibold mb-6 flex items-center">
                            <Network className="w-5 h-5 mr-2 text-ai-purple" />
                            AI Analysis Pipeline
                        </h3>

                        <div className="relative">
                            {/* Connection Lines */}
                            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
                                <defs>
                                    <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
                                        <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
                                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                {analysisSteps.map((step, index) => {
                                    if (index === analysisSteps.length - 1) return null;
                                    return (
                                        <motion.line
                                            key={`line-${index}`}
                                            x1={`${(index + 0.8) * 20}%`}
                                            y1="60"
                                            x2={`${(index + 1.2) * 20}%`}
                                            y2="60"
                                            stroke="url(#line-gradient)"
                                            strokeWidth="2"
                                            strokeDasharray="5,5"
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            animate={{
                                                pathLength: step.status === 'complete' ? 1 : 0,
                                                opacity: step.status === 'complete' ? 1 : 0.3
                                            }}
                                            transition={{ duration: 0.5 }}
                                        />
                                    );
                                })}
                            </svg>

                            {/* Steps */}
                            <div className="grid grid-cols-5 gap-4 relative">
                                {analysisSteps.map((step, index) => {
                                    const Icon = iconMap[step.icon];
                                    return (
                                        <motion.div
                                            key={step.id}
                                            className="relative z-10"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <motion.div
                                                className={`flex flex-col items-center p-4 rounded-lg ${step.status === 'processing'
                                                        ? 'bg-ai-purple/20 border-2 border-ai-purple'
                                                        : step.status === 'complete'
                                                            ? 'bg-safe-green/20 border-2 border-safe-green'
                                                            : step.status === 'warning'
                                                                ? 'bg-threat-red/20 border-2 border-threat-red'
                                                                : 'bg-gray-700/50 border border-gray-600'
                                                    }`}
                                                animate={{
                                                    scale: step.status === 'processing' ? [1, 1.05, 1] : 1,
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: step.status === 'processing' ? Infinity : 0,
                                                }}
                                            >
                                                <div className={`p-3 rounded-full mb-3 ${step.status === 'complete' ? 'bg-safe-green' :
                                                        step.status === 'warning' ? 'bg-threat-red' :
                                                            step.status === 'processing' ? 'bg-ai-purple' :
                                                                'bg-gray-600'
                                                    }`}>
                                                    <Icon className="w-6 h-6" />
                                                </div>
                                                <h4 className="text-sm font-medium text-center mb-1">
                                                    {step.title}
                                                </h4>
                                                <p className="text-xs text-gray-400 text-center">
                                                    {step.description}
                                                </p>

                                                {/* Status Indicator */}
                                                <AnimatePresence>
                                                    {step.status === 'processing' && (
                                                        <motion.div
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            exit={{ opacity: 0 }}
                                                            className="mt-2 flex space-x-1"
                                                        >
                                                            <motion.div
                                                                className="w-2 h-2 bg-ai-purple rounded-full"
                                                                animate={{ scale: [1, 1.5, 1] }}
                                                                transition={{ duration: 0.8, repeat: Infinity }}
                                                            />
                                                            <motion.div
                                                                className="w-2 h-2 bg-ai-purple rounded-full"
                                                                animate={{ scale: [1, 1.5, 1] }}
                                                                transition={{ duration: 0.8, delay: 0.2, repeat: Infinity }}
                                                            />
                                                            <motion.div
                                                                className="w-2 h-2 bg-ai-purple rounded-full"
                                                                animate={{ scale: [1, 1.5, 1] }}
                                                                transition={{ duration: 0.8, delay: 0.4, repeat: Infinity }}
                                                            />
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>

                                                {step.status === 'complete' && (
                                                    <CheckCircle className="w-4 h-4 text-safe-green mt-2" />
                                                )}

                                                {step.status === 'warning' && (
                                                    <AlertTriangle className="w-4 h-4 text-threat-red mt-2" />
                                                )}
                                            </motion.div>

                                            {/* Step Number */}
                                            <div className="absolute -top-2 -left-2 w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-xs font-bold border-2 border-gray-600">
                                                {index + 1}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>

                    {/* Neural Network Visualization */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-gray-700/30 rounded-xl p-6"
                    >
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                            <Brain className="w-5 h-5 mr-2 text-ai-purple" />
                            Neural Network Activation
                            <span className="ml-auto text-sm text-gray-400">
                                {aiVisualization.processingStage}
                            </span>
                        </h3>

                        <div className="relative h-48">
                            {/* Neural Network Layers */}
                            <svg className="w-full h-full">
                                {[0, 1, 2, 3].map((layer, layerIndex) => (
                                    <g key={layer}>
                                        {/* Neurons */}
                                        {[0, 1, 2, 3].map((neuron, neuronIndex) => {
                                            const x = 50 + layerIndex * 150;
                                            const y = 50 + neuronIndex * 40;
                                            const activation = aiVisualization.activations[layerIndex] || 0.5;

                                            return (
                                                <motion.circle
                                                    key={`${layerIndex}-${neuronIndex}`}
                                                    cx={x}
                                                    cy={y}
                                                    r={8 + activation * 8}
                                                    fill={`rgba(139, 92, 246, ${activation})`}
                                                    initial={{ scale: 0 }}
                                                    animate={{
                                                        scale: showNeurons ? [1, 1.2, 1] : 1,
                                                        r: 8 + activation * 8
                                                    }}
                                                    transition={{
                                                        duration: 0.5,
                                                        delay: neuronIndex * 0.1,
                                                    }}
                                                />
                                            );
                                        })}

                                        {/* Connections */}
                                        {layerIndex < 3 && [0, 1, 2, 3].map((fromNeuron) => (
                                            [0, 1, 2, 3].map((toNeuron) => {
                                                const x1 = 50 + layerIndex * 150;
                                                const y1 = 50 + fromNeuron * 40;
                                                const x2 = 50 + (layerIndex + 1) * 150;
                                                const y2 = 50 + toNeuron * 40;

                                                return (
                                                    <motion.line
                                                        key={`conn-${layerIndex}-${fromNeuron}-${toNeuron}`}
                                                        x1={x1}
                                                        y1={y1}
                                                        x2={x2}
                                                        y2={y2}
                                                        stroke="rgba(139, 92, 246, 0.2)"
                                                        strokeWidth="1"
                                                        initial={{ pathLength: 0 }}
                                                        animate={{ pathLength: 1 }}
                                                        transition={{ duration: 1, delay: layerIndex * 0.3 }}
                                                    />
                                                );
                                            })
                                        ))}
                                    </g>
                                ))}
                            </svg>

                            {/* Scanning Animation */}
                            {isAnalyzing && (
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-ai-purple/20 to-transparent"
                                    animate={{ x: ['-100%', '100%'] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Right Column - Results & Controls */}
                <div className="space-y-6">
                    {/* Current Status */}
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="bg-gray-700/30 rounded-xl p-6"
                    >
                        <h3 className="text-lg font-semibold mb-4">Detection Status</h3>

                        <AnimatePresence mode="wait">
                            {currentThreat ? (
                                <motion.div
                                    key={currentThreat}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className={`p-4 rounded-lg bg-gradient-to-br ${threatConfig[currentThreat].color
                                        }`}
                                >
                                    <div className="flex items-center space-x-3 mb-3">
                                        {threatConfig[currentThreat].icon}
                                        <h4 className="font-bold">{threatConfig[currentThreat].label}</h4>
                                    </div>

                                    {!isAnalyzing && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="mt-4"
                                        >
                                            {currentThreat === 'safe' ? (
                                                <div className="flex items-center text-safe-green">
                                                    <CheckCircle className="w-5 h-5 mr-2" />
                                                    <span>Traffic Allowed - No Threat Detected</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center text-threat-red">
                                                    <AlertTriangle className="w-5 h-5 mr-2" />
                                                    <span>Threat Blocked - Security Policy Enforced</span>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </motion.div>
                            ) : (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-gray-400 text-center py-8"
                                >
                                    Select a threat scenario to begin analysis
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Recent Detections Feed */}
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gray-700/30 rounded-xl p-6"
                    >
                        <h3 className="text-lg font-semibold mb-4">Recent Detections</h3>

                        <div className="space-y-3 max-h-64 overflow-y-auto">
                            <AnimatePresence>
                                {useDemoStore.getState().detectionEvents.map((event, index) => (
                                    <motion.div
                                        key={event.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`p-3 rounded-lg border ${event.result === 'blocked'
                                                ? 'border-threat-red/30 bg-threat-red/10'
                                                : event.result === 'flagged'
                                                    ? 'border-yellow-500/30 bg-yellow-500/10'
                                                    : 'border-safe-green/30 bg-safe-green/10'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center space-x-2">
                                                {event.result === 'blocked' ? (
                                                    <XCircle className="w-4 h-4 text-threat-red" />
                                                ) : event.result === 'flagged' ? (
                                                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                                                ) : (
                                                    <CheckCircle className="w-4 h-4 text-safe-green" />
                                                )}
                                                <span className="font-medium text-sm">
                                                    {threatConfig[event.type].label}
                                                </span>
                                            </div>
                                            <span className="text-xs text-gray-400">
                                                {new Date(event.timestamp).toLocaleTimeString()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-gray-400">Source: {event.source}</span>
                                            <span className="text-gray-400">
                                                Confidence: {(event.confidence * 100).toFixed(0)}%
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {useDemoStore.getState().detectionEvents.length === 0 && (
                                <p className="text-gray-500 text-center py-4">
                                    No detection events yet
                                </p>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};