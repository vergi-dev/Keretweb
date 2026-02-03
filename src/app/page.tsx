'use client';

import { useRef, useState } from 'react';
import VergeViewer, { VergeViewerRef } from '@/components/VergeViewer';
import { V3DMessage } from '@/lib/verge-bridge';

export default function Home() {
  const viewerRef = useRef<VergeViewerRef>(null);
  const [lastMessage, setLastMessage] = useState<string>('Nincs üzenet');

  const handleV3DMessage = (msg: V3DMessage) => {
    console.log('Verge3D üzenet érkezett:', msg);
    setLastMessage(JSON.stringify(msg));
  };

  const sendCommand = (action: string, payload?: any) => {
    if (viewerRef.current) {
      // @ts-expect-error - Demonstrációs célból lazán kezeljük a típusokat
      viewerRef.current.sendMessage({ action, payload });
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-slate-950 text-white">
      {/* Header / Nav */}
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex mb-12">
        <p className="flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Verge3D Keretrendszer v1.1
        </p>
        <div className="hidden lg:flex gap-4">
          <div className="bg-slate-900 px-3 py-1 rounded-full border border-slate-700 text-xs text-slate-400">
            Status: Ready
          </div>
        </div>
      </div>

      {/* Main 3D Section */}
      <div className="relative flex flex-col place-items-center w-full max-w-6xl gap-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            3D <span className="text-blue-500">Konfigurátor</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Az interaktív 3D élmény már nem a WordPress-ben, hanem egy dedikált, modern webes környezetben fut.
          </p>
        </div>

        <div className="w-full aspect-video md:aspect-[21/9] relative group">
          <VergeViewer ref={viewerRef} onMessage={handleV3DMessage} />
          
          {/* Interface Overlay */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 bg-slate-900/90 p-4 rounded-2xl backdrop-blur-md border border-white/10 shadow-2xl transition-all group-hover:bottom-8">
            <button 
              onClick={() => sendCommand('CHANGE_MATERIAL', { color: 'red' })}
              className="px-6 py-3 bg-red-600 hover:bg-red-500 rounded-xl font-bold transition-all transform active:scale-95"
            >
              Piros
            </button>
            <button 
              onClick={() => sendCommand('PLAY_ANIMATION', { name: 'Action' })}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-all transform active:scale-95"
            >
              Animáció
            </button>
            <button 
              onClick={() => sendCommand('CHANGE_MATERIAL', { color: 'blue' })}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold transition-all transform active:scale-95"
            >
              Kék
            </button>
          </div>
        </div>

        {/* Debug / Info Bar */}
        <div className="w-full max-w-4xl flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-900/30 p-4 rounded-xl border border-slate-800/50 mt-8">
          <div className="text-sm font-mono text-slate-500">
            Kapcsolati állapot: <span className="text-green-500">Aktív</span>
          </div>
          <div className="text-xs font-mono text-blue-400 bg-blue-400/10 px-3 py-1 rounded">
            Last Event: {lastMessage}
          </div>
        </div>
      </div>

      {/* Footer Instructions */}
      <div className="mt-auto pt-16 pb-8 text-center text-slate-500 text-sm italic">
        A fájlokat a public/v3d-app mappába másolva a tartalom automatikusan frissül.
      </div>
    </main>
  );
}
