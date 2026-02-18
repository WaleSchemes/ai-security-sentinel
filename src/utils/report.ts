import { DetectionEvent, PerformanceMetrics } from '../types';

export function generateCSV(events: DetectionEvent[]): string {
    const headers = ['ID', 'Type', 'Timestamp', 'Confidence', 'Source', 'Result'];
    const rows = events.map(e => [
        e.id,
        e.type,
        new Date(e.timestamp).toISOString(),
        e.confidence.toFixed(2),
        e.source,
        e.result
    ]);
    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}

export function generateJSON(events: DetectionEvent[], metrics: PerformanceMetrics): string {
    const report = {
        generatedAt: new Date().toISOString(),
        metrics,
        events
    };
    return JSON.stringify(report, null, 2);
}