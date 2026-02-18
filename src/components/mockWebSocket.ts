import { ThreatType, DetectionEvent } from '../types';
import { useDemoStore } from '../store/demoStore';

class MockWebSocketService {
    private interval: ReturnType<typeof setInterval> | null = null;
    private isConnected = false;

    connect() {
        if (this.isConnected) return;
        this.isConnected = true;
        console.log('Mock WebSocket connected');

        // Simulate real-time threat events every 5-10 seconds
        this.interval = setInterval(() => {
            const threatTypes: ThreatType[] = ['malware', 'phishing', 'ddos', 'insider', 'safe'];
            const randomType = threatTypes[Math.floor(Math.random() * threatTypes.length)];

            const newEvent: DetectionEvent = {
                id: `ws-${Date.now()}`,
                type: randomType,
                timestamp: new Date(),
                confidence: randomType === 'safe' ? 0.1 : 0.7 + Math.random() * 0.25,
                source: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
                analyzed: true,
                result: randomType === 'safe' ? 'allowed' :
                    randomType === 'malware' ? 'blocked' : 'flagged'
            };

            // Add to store and trigger sound
            useDemoStore.getState().addDetectionEvent(newEvent);

            // Update metrics
            useDemoStore.getState().updateMetricsFromEvent(newEvent);

        }, Math.random() * 5000 + 5000); // 5-10 seconds
    }

    disconnect() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        this.isConnected = false;
        console.log('Mock WebSocket disconnected');
    }
}

export const mockWebSocket = new MockWebSocketService();