import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import { useDemoStore } from '../store/demoStore';
import { generateCSV, generateJSON } from '../utils/report';

export const ReportGenerator: React.FC = () => {
    const { detectionEvents, metrics } = useDemoStore();

    const handleDownloadCSV = () => {
        const csv = generateCSV(detectionEvents);
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `threat-report-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleDownloadJSON = () => {
        const json = generateJSON(detectionEvents, metrics);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `threat-report-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 backdrop-blur rounded-xl p-6 border border-gray-700"
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-ai-purple" />
                    Export Reports
                </h3>
                <div className="flex space-x-3">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleDownloadCSV}
                        className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 flex items-center space-x-2"
                    >
                        <Download className="w-4 h-4" />
                        <span>CSV</span>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleDownloadJSON}
                        className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 flex items-center space-x-2"
                    >
                        <Download className="w-4 h-4" />
                        <span>JSON</span>
                    </motion.button>
                </div>
            </div>
            <p className="text-sm text-gray-400">
                Download detection history as CSV or JSON with performance metrics.
            </p>
        </motion.div>
    );
};