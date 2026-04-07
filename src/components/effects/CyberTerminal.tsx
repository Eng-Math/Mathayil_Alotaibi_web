import { useState, useRef, useEffect } from 'react';
import type { KeyboardEvent } from 'react';
import { motion } from 'framer-motion';

const topCertifications = [
  "Principles_of_Secure_Coding.pdf",
  "Incident_Response_Recovery.pdf", 
  "Network_Comm_Security.pdf",
  "Systems_App_Security.pdf",
  "Security_Operations.pdf",
  "Cybersecurity_Essentials.pdf"
];

export function CyberTerminal() {
  const [history, setHistory] = useState([
    { prompt: '> Initializing secure connection...', type: 'sys' },
    { prompt: '> Authenticating user: Mathayil_Fahad', type: 'sys' },
    { prompt: '> Access Granted. Type "help" for a list of commands.', type: 'sys' },
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    let response = '';
    const lowerCmd = trimmed.toLowerCase();

    if (lowerCmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else if (lowerCmd === 'help') {
      response = 'Available commands: help, whoami, get-resume, ls certs, clear';
    } else if (lowerCmd === 'whoami') {
      response = 'Mathayil Fahad Alotaibi.\nComputer Engineer & Security Specialist.\nReady to defend and innovate.';
    } else if (lowerCmd === 'get-resume') {
      const link = document.createElement('a');
      link.href = '/Resume.pdf';
      link.download = 'Mathayil_Alotaibi_Resume.pdf';
      link.click();
      response = 'Initiating secure download of Resume.pdf... Done.';
    } else if (lowerCmd === 'ls certs') {
      response = topCertifications.join('  ');
    } else {
      response = `bash: command not found: ${trimmed}`;
    }

    setHistory(prev => [...prev, { prompt: `root@mathayil-sys:~# ${cmd}`, type: 'input' }, { prompt: response, type: 'output' }]);
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="w-full max-w-lg bg-black/80 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden shadow-neon-violet text-left cursor-text relative z-20 mx-auto lg:mx-0 mt-8 mb-4 hover:border-white/20 transition-colors"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center px-4 py-2 bg-white/5 border-b border-white/10">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="mx-auto text-xs text-white/40 font-mono tracking-widest">mathayil@sys:~ (Interactive)</div>
      </div>
      <div 
        ref={scrollRef}
        className="p-4 font-mono text-sm text-neon-cyan h-48 overflow-y-auto whitespace-pre-wrap flex flex-col"
      >
        {history.map((line, i) => (
          <div key={i} className={`mb-1 ${line.type === 'output' ? 'text-white/70' : ''}`}>
            {line.prompt}
          </div>
        ))}
        <div className="flex items-center mt-1">
          <span className="mr-2 text-neon-violet">root@mathayil-sys:~#</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none border-none text-neon-cyan font-mono"
            autoFocus
          />
        </div>
      </div>
    </motion.div>
  );
}
