import React from 'react';
import { motion } from 'framer-motion';
import { Gauge, Target, Activity, Shield, AlertCircle } from 'lucide-react';
import { useDemoStore } from '../store/demoStore';

export const PerformanceMetrics: React.FC = () => {
    const { metrics } = useDemoStore();

    const metricsData = [
        { label: 'Detection Latency', value: `${metrics.detectionLatency.toFixed(0)}ms`, icon: Gauge, color: 'text-blue-500' },
        { label: 'Accuracy', value: `${metrics.accuracy.toFixed(1)}%`, icon: Target, color: 'text-green-500' },
        { label: 'Total Detections', value: metrics.totalDetections, icon: Activity, color: 'text-purple-500' },
        { label: 'Threats Blocked', value: metrics.threatsBlocked, icon: Shield, color: 'text-red-500' },
        { label: 'False Positives', value: metrics.falsePositives, icon: AlertCircle, color: 'text-yellow-500' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 backdrop-blur rounded-xl p-6 border border-gray-700"
        >
            <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {metricsData.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <motion.div
                            key={item.label}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center p-3 bg-gray-700/30 rounded-lg"
                        >
                            <Icon className={`w-6 h-6 mx-auto mb-2 ${item.color}`} />
                            <div className="text-2xl font-bold">{item.value}</div>
                            <div className="text-xs text-gray-400">{item.label}</div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
};