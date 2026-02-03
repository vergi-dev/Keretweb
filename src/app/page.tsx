'use client';

import { useRef, useState, useEffect } from 'react';
import VergeViewer, { VergeViewerRef } from '@/components/VergeViewer';
import { V3DMessage } from '@/lib/verge-bridge';
import { getLatestPosts, WPPost } from '@/lib/wordpress';

export default function Home() {
  const viewerRef = useRef<VergeViewerRef>(null);
  const [lastMessage, setLastMessage] = useState<string>('Nincs üzenet');
  const [posts, setPosts] = useState<WPPost[]>([]);

  // WordPress adatok betöltése
  useEffect(() => {
    getLatestPosts().then(data => setPosts(data));
  }, []);

  const handleV3DMessage = (msg: V3DMessage) => {
    console.log('Verge3D üzenet érkezett:', msg);
    setLastMessage(JSON.stringify(msg));
  };

  const sendCommand = (action: string, payload?: any) => {
    if (viewerRef.current) {
      // @ts-expect-error - Demonstrációs célból lazán kezeljük a típusokat itt
      viewerRef.current.sendMessage({ action, payload });
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 bg-slate-950 text-white">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Next.js + Headless WP + Verge3D
        </p>
      </div>

      <div className="relative flex flex-col place-items-center w-full max-w-6xl mt-12 gap-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Modernizált <span className="text-blue-500">3D Élmény</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-4">
            A tartalom a régi WordPress-ből jön, a megjelenítés Next.js.
          </p>
          
          {/* Debug Console */}
          <div className="bg-slate-900 border border-slate-700 p-2 rounded text-xs font-mono text-green-400 min-w-[300px]">
            Legutóbbi üzenet: {lastMessage}
          </div>
        </div>

        <div className="w-full aspect-video md:aspect-[21/9] relative">
          <VergeViewer ref={viewerRef} onMessage={handleV3DMessage} />
          
          {/* UI Overlay Példa */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 bg-slate-900/80 p-4 rounded-xl backdrop-blur border border-white/10">
            <button 
              onClick={() => sendCommand('CHANGE_MATERIAL', { color: 'red' })}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded font-bold transition"
            >
              Piros Anyag
            </button>
            <button 
              onClick={() => sendCommand('PLAY_ANIMATION', { name: 'Run' })}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded font-bold transition"
            >
              Animáció Start
            </button>
            <button 
              onClick={() => sendCommand('CHANGE_MATERIAL', { color: 'blue' })}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded font-bold transition"
            >
              Kék Anyag
            </button>
          </div>
        </div>
      </div>

      {/* WordPress Hírek Szekció */}
      <div className="w-full max-w-5xl mt-16">
        <h2 className="text-2xl font-bold mb-6 border-b border-slate-800 pb-2">Hírek a WordPressből</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map(post => (
            <div key={post.id} className="p-6 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition">
              <h3 className="text-xl font-semibold text-blue-400 mb-2">{post.title.rendered}</h3>
              <div 
                className="text-slate-400 text-sm prose prose-invert"
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left gap-4">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className={`mb-3 text-2xl font-semibold text-blue-400`}>
            Vezérlés
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-slate-300`}>
            Itt alakíthatjuk ki a 3D jelenetet befolyásoló UI gombokat.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className={`mb-3 text-2xl font-semibold text-purple-400`}>
            Adatok
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-slate-300`}>
            A Next.js backendről érkező infók átadása a Verge3D-nek.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className={`mb-3 text-2xl font-semibold text-green-400`}>
            Export
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-slate-300`}>
            A kész konfigurációk mentése és megosztása.
          </p>
        </div>
      </div>
    </main>
  );
}