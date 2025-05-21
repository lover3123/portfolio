import React, { ReactNode } from 'react';
import { X, Minus, Square } from 'lucide-react';

interface CodeWindowProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const CodeWindow: React.FC<CodeWindowProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`code-window ${className}`}>
      <div className="code-window-header">
        <span className="text-gray-300 text-sm">{title}</span>
        <div className="flex items-center space-x-2">
          <Minus size={14} className="text-gray-400 hover:text-white cursor-pointer" />
          <Square size={14} className="text-gray-400 hover:text-white cursor-pointer" />
          <X size={14} className="text-gray-400 hover:text-white cursor-pointer" />
        </div>
      </div>
      <div className="code-window-body">
        {children}
      </div>
    </div>
  );
};

export default CodeWindow;