
import React from 'react';
import Editor, { OnMount } from '@monaco-editor/react';

interface CodeEditorProps {
    activeFile: string;
    code: string;
    onChange: (value: string | undefined) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ activeFile, code, onChange }) => {
    const getLanguage = (fileName: string) => {
        if (fileName.endsWith('.html')) return 'html';
        if (fileName.endsWith('.css')) return 'css';
        if (fileName.endsWith('.js')) return 'javascript';
        return 'javascript';
    };

    const handleEditorDidMount: OnMount = (editor, monaco) => {
        // Define themes or configurations here if needed
        monaco.editor.defineTheme('playground-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [],
            colors: {
                'editor.background': '#111111',
            }
        });
        monaco.editor.setTheme('playground-dark');
    };

    return (
        <div className="h-full w-full bg-[#111111]">
            <Editor
                height="100%"
                path={activeFile} // Important for intellisense to treat files separately
                language={getLanguage(activeFile)}
                value={code}
                onChange={onChange}
                onMount={handleEditorDidMount}
                theme="vs-dark" // Will be overridden by handleEditorDidMount
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    padding: { top: 16, bottom: 16 },
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    roundedSelection: false,
                    renderLineHighlight: 'all',
                }}
            />
        </div>
    );
};

export default CodeEditor;
