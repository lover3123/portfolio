import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

interface TerminalProps {
  welcomeMessage?: string;
  prompt?: string;
  children?: React.ReactNode;
}

const Terminal: React.FC<TerminalProps> = ({
  welcomeMessage = 'Welcome to the developer terminal',
  prompt = '$ ',
  children
}) => {
  const [command, setCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Focus input when terminal is clicked
    const handleTerminalClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    const terminal = terminalRef.current;
    if (terminal) {
      terminal.addEventListener('click', handleTerminalClick);
    }

    return () => {
      if (terminal) {
        terminal.removeEventListener('click', handleTerminalClick);
      }
    };
  }, []);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (command.trim()) {
      setCommandHistory([...commandHistory, command]);
      setCommand('');
      setHistoryIndex(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
      if (newIndex >= 0 && commandHistory.length > 0) {
        setHistoryIndex(newIndex);
        setCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(newIndex);
      if (newIndex >= 0) {
        setCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      } else {
        setCommand('');
      }
    }
  };

  return (
    <div 
      ref={terminalRef}
      className="bg-black text-green-400 font-mono p-4 rounded-md shadow-md overflow-auto"
      style={{ height: '300px' }}
    >
      <div className="text-gray-500 mb-2">
        {welcomeMessage}
      </div>
      
      {commandHistory.map((cmd, index) => (
        <div key={index} className="mb-1">
          <span className="text-blue-400">{prompt}</span>
          <span>{cmd}</span>
        </div>
      ))}
      
      {children}
      
      <form onSubmit={handleCommandSubmit} className="flex items-center">
        <span className="text-blue-400 mr-1">{prompt}</span>
        <input
          ref={inputRef}
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent outline-none flex-1 caret-green-400 text-green-400"
          autoFocus
        />
      </form>
      
      <div className="h-4"></div> {/* Extra space at bottom */}
    </div>
  );
};

export default Terminal;