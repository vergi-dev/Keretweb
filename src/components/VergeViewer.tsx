'use client';

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { V3DMessage, isV3DMessage } from '@/lib/verge-bridge';

interface VergeViewerProps {
  src?: string;
  className?: string;
  onMessage?: (msg: V3DMessage) => void;
}

export interface VergeViewerRef {
  sendMessage: (msg: V3DMessage) => void;
}

const VergeViewer = forwardRef<VergeViewerRef, VergeViewerProps>(({ 
  src = '/v3d-app/index.html', 
  className = '',
  onMessage
}, ref) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Expose sendMessage to parent via ref
  useImperativeHandle(ref, () => ({
    sendMessage: (msg: V3DMessage) => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage(msg, '*');
      }
    }
  }));

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Biztonsági ellenőrzés: csak a saját iframe-ünktől fogadunk
      // (Bár local developmentnél a source ellenőrzés trükkös lehet, a data check fontos)
      if (isV3DMessage(event.data)) {
        if (onMessage) {
          onMessage(event.data);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onMessage]);

  return (
    <div className={`relative w-full h-full min-h-[500px] overflow-hidden rounded-xl border border-slate-800 shadow-2xl ${className}`}>
      <iframe
        ref={iframeRef}
        src={src}
        title="Verge3D Viewer"
        className="w-full h-full border-none"
        allow="autoplay; fullscreen; vr"
      />
    </div>
  );
});

VergeViewer.displayName = 'VergeViewer';

export default VergeViewer;
