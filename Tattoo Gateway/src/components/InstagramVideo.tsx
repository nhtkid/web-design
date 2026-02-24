import { useEffect, useRef, useState } from 'react';

interface InstagramVideoProps {
  videoSrc?: string;
  posterImage: string;
  className?: string;
}

const InstagramVideo = ({ videoSrc, posterImage, className = '' }: InstagramVideoProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const [supportsHover, setSupportsHover] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

    const updateHoverSupport = () => {
      setSupportsHover(mediaQuery.matches);
    };

    updateHoverSupport();

    mediaQuery.addEventListener('change', updateHoverSupport);

    return () => {
      mediaQuery.removeEventListener('change', updateHoverSupport);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);

    if (!videoRef.current || !videoSrc) return;

    const playPromise = videoRef.current.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Silent fail to keep UX stable if browser blocks autoplay unexpectedly.
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);

    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {videoSrc && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isHovered && canPlay ? 'opacity-100' : 'opacity-0'
          }`}
          src={videoSrc}
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={() => setCanPlay(true)}
        />
      )}

      <div
        className={`absolute inset-0 transition-opacity duration-500 ease-out ${
          isHovered && canPlay && videoSrc ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <img
          src={posterImage}
          alt="Video thumbnail"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {supportsHover && (
        <div
          className={`absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/90 bg-black/60 px-3 py-1.5 rounded-full transition-all duration-300 backdrop-blur-sm ${
            isHovered ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
          }`}
        >
          Hover to play
        </div>
      )}
    </div>
  );
};

export default InstagramVideo;
