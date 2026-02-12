
import React from 'react';
import { Terminal, AlertCircle, AlertTriangle, Info } from 'lucide-react';

interface LogEntry {
    type: 'log' | 'error' | 'warn' | 'info';
    content: string[];
    timestamp: number;
}

interface ConsoleProps {
    logs: LogEntry[];
    onClear: () => void;
}

const Console: React.FC<ConsoleProps> = ({ logs, onClear }) => {
    return (
        <div className="h-full flex flex-col bg-[#111111] border-t border-[#1e293b]">
            {/* Console Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#1e293b] border-b border-[#1e293b]">
                <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-gray-400" />
                    <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Console</span>
                </div>
                <button
                    onClick={onClear}
                    className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                    Clear
                </button>
            </div>

            {/* Logs Area */}
            <div className="flex-1 overflow-auto p-2 font-mono text-sm space-y-1">
                {logs.length === 0 ? (
                    <div className="text-gray-600 italic text-center text-xs mt-4">
                        No logs yet...
                    </div>
                ) : (
                    logs.map((log, index) => (
                        <div
                            key={index}
                            className={`flex gap-2 p-1 rounded ${log.type === 'error' ? 'bg-red-900/20 text-red-200' :
                                    log.type === 'warn' ? 'bg-yellow-900/20 text-yellow-200' :
                                        'text-gray-300'
                                }`}
                        >
                            <div className="mt-0.5 shrink-0">
                                {log.type === 'error' && <AlertCircle className="w-3 h-3 text-red-500" />}
                                {log.type === 'warn' && <AlertTriangle className="w-3 h-3 text-yellow-500" />}
                                {log.type === 'info' && <Info className="w-3 h-3 text-blue-500" />}
                            </div>
                            <span className="break-all">{log.content.join(' ')}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Console;
