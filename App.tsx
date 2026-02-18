import React, { useEffect } from 'react';
import { AIAnalysisFlow } from './components/AIAnalysisFlow';
import { Auth } from './components/Auth';
import { PerformanceMetrics } from './components/PerformanceMetrics';
import { ReportGenerator } from './components/ReportGenerator';
import { useDemoStore } from './store/demoStore';
import { Wifi, WifiOff } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
    const { isWebSocketConnected, connectWebSocket, disconnectWebSocket } = useDemoStore();

    useEffect(() => {
        // Auto-connect WebSocket on app start
        connectWebSocket();
        return () => disconnectWebSocket();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            {/* Header with Auth and WebSocket status */}
            <header className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700 sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <h1 className="text-2xl font-bold">AI Security Sentinel</h1>
                            <motion.div
                                animate={{ scale: isWebSocketConnected ? [1, 1.2, 1] : 1 }}
                                transition={{ duration: 1, repeat: isWebSocketConnected ? Infinity : 0 }}
                            >
                                {isWebSocketConnected ? (
                                    <Wifi className="w-5 h-5 text-green-500" />
                                ) : (
                                    <WifiOff className="w-5 h-5 text-red-500" />
                                )}
                            </motion.div>
                        </div>
                        <Auth />
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-8 space-y-8">
                <AIAnalysisFlow />
                <PerformanceMetrics />
                <ReportGenerator />
            </main>
        </div>
    );
}

export default App;