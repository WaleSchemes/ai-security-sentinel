import { create } from 'zustand';
import { ThreatType, AnalysisStep, DetectionEvent, AIModelVisualization, PerformanceMetrics } from '../types';
import { soundFX } from '../utils/sound';
import { useAuthStore } from './authStore';

const initialSteps: AnalysisStep[] = [
    {
        id: 'capture',
        title: 'Packet Capture',
        description: 'Intercepting network traffic',
        icon: 'Activity',
        status: 'pending',
        duration: 800
    },
    {
        id: 'extraction',
        title: 'Feature Extraction',
        description: 'Analyzing patterns',
        icon: 'Cpu',
        status: 'pending',
        duration: 1000
    },
    {
        id: 'inference',
        title: 'AI Model Inference',
        description: 'Neural network processing',
        icon: 'Brain',
        status: 'pending',
        duration: 1200
    },
    {
        id: 'classification',
        title: 'Threat Classification',
        description: 'Determining threat level',
        icon: 'Shield',
        status: 'pending',
        duration: 600
    },
    {
        id: 'response',
        title: 'Automated Response',
        description: 'Executing security policy',
        icon: 'Zap',
        status: 'pending',
        duration: 400
    }
];


interface DemoState {
    currentThreat: ThreatType | null;
    isAnalyzing: boolean;
    analysisSteps: AnalysisStep[];
    detectionEvents: DetectionEvent[];
    aiVisualization: AIModelVisualization;
    metrics: PerformanceMetrics;
    isWebSocketConnected: boolean;

    // Actions
    triggerThreat: (type: ThreatType) => void;
    resetDemo: () => void;
    updateAnalysisStep: (stepId: string, status: AnalysisStep['status']) => void;
    addDetectionEvent: (event: DetectionEvent) => void;
    updateMetricsFromEvent: (event: DetectionEvent) => void;
    connectWebSocket: () => void;
    disconnectWebSocket: () => void;
}

const initialMetrics: PerformanceMetrics = {
    detectionLatency: 0,
    accuracy: 100,
    totalDetections: 0,
    threatsBlocked: 0,
    falsePositives: 0
};

export const useDemoStore = create<DemoState>((set, get) => ({
    currentThreat: null,
    isAnalyzing: false,
    analysisSteps: initialSteps,
    detectionEvents: [],
    aiVisualization: {
        layers: 4,
        activations: [0.2, 0.5, 0.3, 0.8],
        processingStage: 'idle'
    },
    metrics: initialMetrics,
    isWebSocketConnected: false,

    triggerThreat: (type) => {
        const startTime = Date.now();
        set({
            currentThreat: type,
            isAnalyzing: true,
            analysisSteps: initialSteps.map(step => ({ ...step, status: 'pending' as const })),
            aiVisualization: {
                layers: 4,
                activations: [0.2, 0.5, 0.3, 0.8],
                processingStage: 'analyzing'
            }
        });

        const steps = initialSteps;
        let cumulativeTime = 0;

        steps.forEach((step, index) => {
            // Mark step as processing
            setTimeout(() => {
                get().updateAnalysisStep(step.id, 'processing');
            }, cumulativeTime);

            // Mark step as complete
            cumulativeTime += step.duration;
            setTimeout(() => {
                get().updateAnalysisStep(step.id, 'complete');

                // Update AI visualization activations
                set((state) => ({
                    aiVisualization: {
                        ...state.aiVisualization,
                        activations: state.aiVisualization.activations.map(() => Math.random()),
                        processingStage: index === steps.length - 1 ? 'complete' : 'analyzing'
                    }
                }));

                // On last step, create detection event
                if (index === steps.length - 1) {
                    const latency = Date.now() - startTime;
                    const newEvent: DetectionEvent = {
                        id: Date.now().toString(),
                        type,
                        timestamp: new Date(),
                        confidence: type === 'safe' ? 0.15 : 0.85 + Math.random() * 0.12,
                        source: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
                        analyzed: true,
                        result: type === 'safe' ? 'allowed' : type === 'malware' ? 'blocked' : 'flagged'
                    };

                    // Play sound
                    if (type === 'safe') {
                        soundFX.playSafeTraffic();
                    } else {
                        soundFX.playThreatDetected(type === 'malware' || type === 'ddos' ? 'high' : 'low');
                    }

                    // Add to store and auth history
                    get().addDetectionEvent(newEvent);

                    // Update metrics with latency
                    set((state) => {
                        const totalBefore = state.metrics.totalDetections;
                        const avgBefore = state.metrics.detectionLatency;
                        const newAvg = (avgBefore * totalBefore + latency) / (totalBefore + 1);

                        return {
                            metrics: {
                                ...state.metrics,
                                detectionLatency: newAvg,
                                totalDetections: totalBefore + 1,
                                threatsBlocked: state.metrics.threatsBlocked + (newEvent.result === 'blocked' ? 1 : 0),
                                falsePositives: state.metrics.falsePositives + (newEvent.result === 'flagged' && type === 'safe' ? 1 : 0)
                            },
                            isAnalyzing: false
                        };
                    });

                    // Recalculate accuracy
                    get().updateMetricsFromEvent(newEvent);
                }
            }, cumulativeTime);
        });
    },

    addDetectionEvent: (event) => {
        set((state) => ({
            detectionEvents: [event, ...state.detectionEvents.slice(0, 49)]
        }));
        // Also save to auth store if user is logged in
        const authUser = useAuthStore.getState().user;
        if (authUser) {
            useAuthStore.getState().saveDetectionEvent(event);
        }
    },

    updateMetricsFromEvent: (event) => {
        set((state) => {
            const total = state.metrics.totalDetections;
            const correct = event.result === 'blocked' && event.type !== 'safe' ? 1 :
                event.result === 'allowed' && event.type === 'safe' ? 1 : 0;
            const newAccuracy = (state.metrics.accuracy * total + correct * 100) / (total + 1);

            return {
                metrics: {
                    ...state.metrics,
                    accuracy: newAccuracy
                }
            };
        });
    },

    connectWebSocket: () => {
        if (get().isWebSocketConnected) return;
        set({ isWebSocketConnected: true });
        // In a real app, you'd instantiate WebSocket here
        // For mock, we'll import the service and call connect
        import('../components/mockWebSocket').then(({ mockWebSocket }) => {
            mockWebSocket.connect();
        });
    },

    disconnectWebSocket: () => {
        set({ isWebSocketConnected: false });
        import('../components/mockWebSocket').then(({ mockWebSocket }) => {
            mockWebSocket.disconnect();
        });
    },

    resetDemo: () => {
        set({
            currentThreat: null,
            isAnalyzing: false,
            analysisSteps: initialSteps,
            aiVisualization: {
                layers: 4,
                activations: [0.2, 0.5, 0.3, 0.8],
                processingStage: 'idle'
            }
        });
    },

    updateAnalysisStep: (stepId, status) => {
        set((state) => ({
            analysisSteps: state.analysisSteps.map(step =>
                step.id === stepId ? { ...step, status } : step
            )
        }));
    }
}));