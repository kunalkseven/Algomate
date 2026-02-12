
import React, { useState, useEffect } from 'react';
import { Group as PanelGroup, Panel, Separator as PanelResizeHandle } from 'react-resizable-panels';
import FileExplorer, { cn } from './FileExplorer';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import Console from './Console';
import { Play } from 'lucide-react';

interface LogEntry {
    type: 'log' | 'error' | 'warn' | 'info';
    content: string[];
    timestamp: number;
}

const PlaygroundLayout = () => {
    const [files, setFiles] = useState([
        { name: 'index.html', language: 'html', content: '<h1>Hello World</h1>\n<p>Start editing to see some magic happen!</p>' },
        { name: 'styles.css', language: 'css', content: 'body {\n  font-family: sans-serif;\n  background: #f0f0f0;\n  padding: 2rem;\n}\nh1 {\n  color: #333;\n}' },
        { name: 'script.js', language: 'javascript', content: 'console.log("Hello from JavaScript!");\n\nconst sum = (a, b) => a + b;\nconsole.log("Sum of 2 + 3 =", sum(2, 3));' },
    ]);
    const [activeFileName, setActiveFileName] = useState('script.js');
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [triggerRun, setTriggerRun] = useState(0);

    const activeFile = files.find(f => f.name === activeFileName);

    const handleCodeChange = (value: string | undefined) => {
        setFiles(prev => prev.map(f => f.name === activeFileName ? { ...f, content: value || '' } : f));
    };

    const handleRun = () => {
        setLogs([]);
        setTriggerRun(prev => prev + 1);
    };

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data && event.data.type === 'CONSOLE_LOG') {
                setLogs(prev => [...prev, {
                    type: event.data.logType,
                    content: event.data.args,
                    timestamp: Date.now()
                }]);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    return (
        <div className="h-screen w-full bg-[#030303] text-white flex flex-col overflow-hidden">
            {/* Header */}
            <header className="h-14 border-b border-[#1e293b] flex items-center justify-between px-4 bg-[#030303]">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-lg bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">JS Playground</span>
                </div>
                <div>
                    <button
                        onClick={handleRun}
                        className="flex items-center gap-2 px-6 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded font-medium transition-colors text-sm"
                    >
                        <Play className="w-4 h-4 fill-current" />
                        Run
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 overflow-hidden">
                <PanelGroup orientation="horizontal">
                    {/* Sidebar */}
                    <Panel defaultSize={8} minSize={8} id="sidebar-panel">
                        <FileExplorer
                            files={files}
                            activeFile={activeFileName}
                            onSelectFile={setActiveFileName}
                        />
                    </Panel>

                    <PanelResizeHandle className="w-1 bg-[#1e293b] hover:bg-blue-500 transition-colors cursor-col-resize active:bg-blue-600" />

                    {/* Editor */}
                    <Panel defaultSize={50} minSize={30}>
                        <CodeEditor
                            activeFile={activeFileName}
                            code={activeFile?.content || ''}
                            onChange={handleCodeChange}
                        />
                    </Panel>

                    <PanelResizeHandle className="w-1 bg-[#1e293b] hover:bg-blue-500 transition-colors cursor-col-resize active:bg-blue-600" />

                    {/* Output & Console */}
                    <Panel defaultSize={35} minSize={20}>
                        <PanelGroup orientation="vertical">
                            {/* Preview */}
                            <Panel defaultSize={60} minSize={30}>
                                <Preview files={files} triggerRun={triggerRun} />
                            </Panel>

                            <PanelResizeHandle className="h-1 bg-[#1e293b] hover:bg-blue-500 transition-colors cursor-row-resize active:bg-blue-600" />

                            {/* Console */}
                            <Panel defaultSize={40} minSize={10}>
                                <Console logs={logs} onClear={() => setLogs([])} />
                            </Panel>
                        </PanelGroup>
                    </Panel>
                </PanelGroup>
            </div>
        </div>
    );
};

export default PlaygroundLayout;
