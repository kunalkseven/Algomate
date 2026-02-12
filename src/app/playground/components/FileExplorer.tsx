
import React from 'react';
import { FileCode2, FileJson, FileType, Video, ExternalLink } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface FileExplorerProps {
    files: { name: string; language: string }[];
    activeFile: string;
    onSelectFile: (fileName: string) => void;
}

export function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

const FileExplorer: React.FC<FileExplorerProps> = ({ files, activeFile, onSelectFile }) => {
    const getFileIcon = (fileName: string) => {
        if (fileName.endsWith('.html')) return <FileCode2 className="w-4 h-4 text-orange-500" />;
        if (fileName.endsWith('.css')) return <FileType className="w-4 h-4 text-blue-500" />;
        if (fileName.endsWith('.js')) return <FileJson className="w-4 h-4 text-yellow-500" />;
        return <FileCode2 className="w-4 h-4 text-gray-400" />;
    };

    return (
        <div className="h-full bg-[#030303] text-gray-300 flex flex-col border-r border-[#1e293b]">
            {/* Project Header */}
            <div className="p-4 border-b border-[#1e293b]">
                <h2 className="text-sm font-semibold text-white">Project Files</h2>
            </div>

            {/* Files List */}
            <div className="flex-1 overflow-y-auto py-2">
                {files.map((file) => (
                    <button
                        key={file.name}
                        onClick={() => onSelectFile(file.name)}
                        className={cn(
                            "w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-[#1e293b] transition-colors text-left",
                            activeFile === file.name && "bg-[#1e293b] text-white border-l-2 border-green-500"
                        )}
                    >
                        {getFileIcon(file.name)}
                        <span className="truncate">{file.name}</span>
                    </button>
                ))}
            </div>

            {/* External Links (Mock) */}
            <div className="p-4 border-t border-[#1e293b]">
                <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">External Links</h3>
                <div className="space-y-2">
                    <a href="#" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                        <ExternalLink className="w-3 h-3" />
                        <span>NamasteDev</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FileExplorer;
