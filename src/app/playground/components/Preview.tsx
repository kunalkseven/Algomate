
import React, { useEffect, useRef } from 'react';

interface PreviewProps {
    files: { name: string; content: string }[];
    triggerRun: number;
}

const Preview: React.FC<PreviewProps> = ({ files, triggerRun }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        if (triggerRun === 0) return; // Don't run on initial mount if not desired

        const htmlFile = files.find(f => f.name === 'index.html');
        const cssFile = files.find(f => f.name === 'styles.css');
        const jsFile = files.find(f => f.name === 'script.js');

        const htmlContent = htmlFile ? htmlFile.content : '';
        const cssContent = cssFile ? cssFile.content : '';
        const jsContent = jsFile ? jsFile.content : '';

        const srcDoc = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          ${cssContent}
        </style>
      </head>
      <body>
        ${htmlContent}
        <script>
          // Override console to send messages to parent
          (function() {
            const originalLog = console.log;
            const originalError = console.error;
            const originalWarn = console.warn;
            const originalInfo = console.info;

            function sendToParent(type, args) {
              try {
                window.parent.postMessage({
                  type: 'CONSOLE_LOG',
                  logType: type,
                  args: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg))
                }, '*');
              } catch (e) {
                console.error('Failed to send log to parent', e);
              }
            }

            console.log = function(...args) {
              originalLog.apply(console, args);
              sendToParent('log', args);
            };

            console.error = function(...args) {
              originalError.apply(console, args);
              sendToParent('error', args);
            };

            console.warn = function(...args) {
              originalWarn.apply(console, args);
              sendToParent('warn', args);
            };

            console.info = function(...args) {
              originalInfo.apply(console, args);
              sendToParent('info', args);
            };

            window.addEventListener('error', function(event) {
               sendToParent('error', [event.message]);
            });
          })();
        </script>
        <script>
          ${jsContent}
        </script>
      </body>
      </html>
    `;

        if (iframeRef.current) {
            iframeRef.current.srcdoc = srcDoc;
        }
    }, [triggerRun, files]);

    return (
        <div className="h-full w-full bg-white">
            <iframe
                ref={iframeRef}
                title="preview"
                className="w-full h-full border-none"
                sandbox="allow-scripts allow-modals"
            />
        </div>
    );
};

export default Preview;
