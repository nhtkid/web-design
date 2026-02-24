import { useRef, useState } from 'react';

interface InstagramVideoProps {
  videoSrc?: string;
  posterImage: string;
  className?: string;
}

const InstagramVideo = ({ videoSrc, posterImage, className = '' }: InstagramVideoProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-all duration-300">
          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-110 hover:bg-white">
            <svg
              className="w-5 h-5 text-[#0B0D10] ml-0.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      <div
        className={`absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/90 bg-black/60 px-3 py-1.5 rounded-full transition-all duration-300 backdrop-blur-sm ${
          isHovered ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
        }`}
      >
        Hover to play
      </div>
    </div>
  );
};

export default InstagramVideo;
