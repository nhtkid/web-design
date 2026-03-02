import { useRef, useState, useEffect, useCallback } from 'react';
import PaywallOverlay from './PaywallOverlay';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  canWatchFull: boolean;
  previewDuration: number; // seconds
  courseId: string;
  onPurchase: () => void;
}

const VideoPlayer = ({ src, poster, canWatchFull, previewDuration, courseId, onPurchase }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (showPaywall) return;
    if (video.paused) {
      video.play().catch(() => {});
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  }, [showPaywall]);

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime);
    if (!canWatchFull && video.currentTime >= previewDuration) {
      video.pause();
      setPlaying(false);
      setShowPaywall(true);
    }
  }, [canWatchFull, previewDuration]);

  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (video) setDuration(video.duration);
  }, []);

  const handleSeek = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const video = videoRef.current;
      if (!video) return;
      const time = Number(e.target.value);
      if (!canWatchFull && time >= previewDuration) return;
      video.currentTime = time;
      setCurrentTime(time);
    },
    [canWatchFull, previewDuration]
  );

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setMuted(video.muted);
    }
  }, []);

  const handleFullscreen = useCallback(() => {
    const video = videoRef.current;
    if (video?.requestFullscreen) video.requestFullscreen();
  }, []);

  const handlePurchaseFromPaywall = useCallback(() => {
    onPurchase();
    setShowPaywall(false);
    // Reset video to beginning for full viewing
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      setCurrentTime(0);
    }
  }, [onPurchase]);

  useEffect(() => {
    // If access changes (e.g., purchased), remove paywall
    if (canWatchFull) setShowPaywall(false);
  }, [canWatchFull]);

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const displayDuration = !canWatchFull ? Math.min(duration, previewDuration) : duration;

  return (
    <div className="relative w-full aspect-video bg-[#0B0D10] group">
      {videoError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-[rgba(242,242,242,0.03)] border border-[rgba(242,242,242,0.1)]">
          <div className="text-center">
            <Play className="w-12 h-12 text-[#B8BDC4] mx-auto mb-3 opacity-40" />
            <p className="text-[#B8BDC4] text-sm">Video not available yet</p>
            <p className="text-[#B8BDC4] text-xs mt-1 opacity-60">The course video will appear here once uploaded</p>
          </div>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onError={() => setVideoError(true)}
            onClick={togglePlay}
            className="w-full h-full object-contain cursor-pointer"
            playsInline
          />

          {/* Paywall overlay */}
          {showPaywall && (
            <PaywallOverlay courseId={courseId} onPurchase={handlePurchaseFromPaywall} />
          )}

          {/* Preview badge */}
          {!canWatchFull && !showPaywall && (
            <div className="absolute top-3 right-3 px-2 py-1 bg-[rgba(11,13,16,0.8)] border border-[rgba(242,242,242,0.2)] text-[10px] font-mono uppercase tracking-wider text-[#D4A24A]">
              Preview · {previewDuration}s
            </div>
          )}

          {/* Controls */}
          {!showPaywall && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[rgba(11,13,16,0.9)] to-transparent p-3 pt-8 opacity-0 group-hover:opacity-100 transition-opacity">
              {/* Progress bar */}
              <div className="relative mb-2">
                <div className="w-full h-1 bg-[rgba(242,242,242,0.15)] rounded-full">
                  <div
                    className="h-full bg-[#D4A24A] rounded-full transition-all"
                    style={{ width: `${progressPercent}%` }}
                  />
                  {/* Preview limit marker */}
                  {!canWatchFull && duration > 0 && (
                    <div
                      className="absolute top-0 w-0.5 h-full bg-red-500"
                      style={{ left: `${(previewDuration / duration) * 100}%` }}
                    />
                  )}
                </div>
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  step={0.1}
                  value={currentTime}
                  onChange={handleSeek}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button onClick={togglePlay} className="text-[#F2F2F2] hover:text-[#D4A24A] transition-colors">
                    {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>
                  <button onClick={toggleMute} className="text-[#F2F2F2] hover:text-[#D4A24A] transition-colors">
                    {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <span className="font-mono text-[11px] text-[#B8BDC4]">
                    {formatTime(currentTime)} / {formatTime(displayDuration)}
                  </span>
                </div>
                <button onClick={handleFullscreen} className="text-[#F2F2F2] hover:text-[#D4A24A] transition-colors">
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Big play button (when paused) */}
          {!playing && !showPaywall && !videoError && (
            <div
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              onClick={togglePlay}
            >
              <div className="w-16 h-16 rounded-full bg-[rgba(212,162,74,0.9)] flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <Play className="w-7 h-7 text-[#0B0D10] ml-1" />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
