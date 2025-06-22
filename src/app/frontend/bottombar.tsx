
'use client';

import { useState, useEffect } from 'react';

export default function BottomBar() {
  const [systemTime, setSystemTime] = useState('');
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const startTime = Date.now();

    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setSystemTime(timeString);
      setUptime(Math.floor((Date.now() - startTime) / 1000));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-black border-t-4 border-apple-green p-4 font-mono">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center text-apple-green/80 text-sm">
          <div className="flex items-center space-x-6 mb-2 md:mb-0">
            <span className="text-lime-400">SYSTEM:</span>
            <span>© 2025 FLORENT_TAPPONNIER.EXE</span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">STATUS: ONLINE</span>
          </div>

          <div className="flex items-center space-x-6 text-xs">
            <span>TIME: {systemTime}</span>
            <span>UPTIME: {uptime}s</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
              <span>CONNECTED</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
