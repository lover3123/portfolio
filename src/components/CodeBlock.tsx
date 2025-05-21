import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  editable?: boolean;
  onChange?: (code: string) => void;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ 
  code, 
  language = 'javascript', 
  showLineNumbers = true,
  editable = false,
  onChange
}) => {
  if (editable && onChange) {
    return (
      <div className="relative">
        <textarea 
          value={code}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-full font-mono p-4 bg-[#1E1E1E] text-[#D4D4D4] border border-gray-700 rounded"
          rows={code.split('\n').length}
        />
      </div>
    );
  }
  
  return (
    <SyntaxHighlighter
      language={language}
      style={vs2015}
      showLineNumbers={showLineNumbers}
      wrapLines={true}
      customStyle={{
        background: '#1E1E1E',
        padding: '1rem',
        borderRadius: '0.25rem',
        margin: 0,
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;