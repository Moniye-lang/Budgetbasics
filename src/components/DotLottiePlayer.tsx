import React, { useEffect, useRef } from 'react';

interface DotLottiePlayerProps {
  src?: string;
  animationData?: object;
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  speed?: number;
}

export const DotLottiePlayer: React.FC<DotLottiePlayerProps> = ({
  src,
  animationData,
  className = '',
  autoplay = true,
  loop = true,
  speed = 1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animInstance: any = null;
    let isCancelled = false;

    // 1. Primary High-Fidelity SVG Renderer via window.lottie (lottie-web)
    const renderWithLottieWeb = (dataOrPath: any, isPath = false) => {
      if (isCancelled || !container) return false;
      const lottie = (window as any).lottie;
      if (lottie && typeof lottie.loadAnimation === 'function') {
        try {
          container.innerHTML = '';
          animInstance = lottie.loadAnimation({
            container,
            renderer: 'svg',
            loop,
            autoplay,
            [isPath ? 'path' : 'animationData']: dataOrPath,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid meet',
              clearCanvas: true,
              progressiveLoad: true,
              hideOnTransparent: true,
            }
          });

          if (speed !== 1 && animInstance) {
            animInstance.setSpeed(speed);
          }
          return true;
        } catch (err) {
          console.error('lottie-web render error', err);
        }
      }
      return false;
    };

    if (animationData) {
      const rendered = renderWithLottieWeb(animationData, false);
      if (rendered) {
        return () => {
          isCancelled = true;
          if (animInstance) {
            try { animInstance.destroy(); } catch (_) {}
          }
          if (container) container.innerHTML = '';
        };
      }
    } else if (src) {
      fetch(src)
        .then(res => res.json())
        .then(data => {
          if (!isCancelled) {
            renderWithLottieWeb(data, false);
          }
        })
        .catch(() => {
          if (!isCancelled) {
            renderWithLottieWeb(src, true);
          }
        });
    }

    // 2. Fallback: DotLottie Player Web Component
    let objectUrl = '';
    let resolvedSrc = src || '';
    if (animationData) {
      try {
        const jsonStr = JSON.stringify(animationData);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        objectUrl = URL.createObjectURL(blob);
        resolvedSrc = objectUrl;
      } catch (e) {
        console.error('Blob creation error', e);
      }
    }

    const player = document.createElement('dotlottie-player') as HTMLElement & {
      load?: (data: string | object) => void;
    };
    if (resolvedSrc) {
      player.setAttribute('src', resolvedSrc);
    }
    player.setAttribute('background', 'transparent');
    player.setAttribute('speed', speed.toString());
    if (loop) player.setAttribute('loop', '');
    if (autoplay) player.setAttribute('autoplay', '');
    player.style.width = '100%';
    player.style.height = '100%';
    player.style.display = 'block';
    player.style.margin = 'auto';
    player.style.pointerEvents = 'none';

    container.innerHTML = '';
    container.appendChild(player);

    return () => {
      isCancelled = true;
      if (animInstance) {
        try { animInstance.destroy(); } catch (_) {}
      }
      if (container) container.innerHTML = '';
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [src, animationData, autoplay, loop, speed]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full flex items-center justify-center m-auto pointer-events-none [&>svg]:w-full [&>svg]:h-full [&>svg]:m-auto [&>svg]:block [&>dotlottie-player]:w-full [&>dotlottie-player]:h-full [&>dotlottie-player]:m-auto ${className}`}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    />
  );
};
