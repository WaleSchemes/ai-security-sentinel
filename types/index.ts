export type ThreatType = 'malware' | 'phishing' | 'ddos' | 'insider' | 'safe';

export interface AnalysisStep {
    id: string;
    title: string;
    description: string;
    icon: string;
    status: 'pending' | 'processing' | 'complete' | 'warning';
    duration: number;
}

export interface DetectionEvent {
    id: string;
    type: ThreatType;
    timestamp: Date;
    confidence: number;
    source: string;
    analyzed: boolean;
    result: 'allowed' | 'blocked' | 'flagged';
}

export interface AIModelVisualization {
    layers: number;
    activations: number[];
    processingStage: 'idle' | 'analyzing' | 'complete';
}

export interface PerformanceMetrics {
    detectionLatency: number; // average ms
    accuracy: number; // percentage
    totalDetections: number;
    threatsBlocked: number;
    falsePositives: number;
}

export interface User {
    id: string;
    username: string;
    detectionHistory: DetectionEvent[];
}