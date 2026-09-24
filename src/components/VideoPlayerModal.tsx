import React, { useState } from 'react';
import { VideoItem } from '../types';
import { X, Copy, Check, Sparkles, BookOpen, Clock } from 'lucide-react';

interface VideoPlayerModalProps {
  video: VideoItem | null;
  onClose: () => void;
  onSelectVideo?: (v: VideoItem) => void;
  allVideos?: VideoItem[];
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  video,
  onClose,
  onSelectVideo,
  allVideos = [],
}) => {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  if (!video) return null;

  const handleCopyPrompt = () => {
    if (video.keyPrompt) {
      navigator.clipboard.writeText(video.keyPrompt);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#1c1917] text-stone-100 rounded-2xl overflow-hidden shadow-2xl border border-stone-800 max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-stone-800 bg-stone-900/80">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs uppercase tracking-wider font-semibold text-stone-400">
              GardaAI Classroom Stream • {video.language}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="aspect-video w-full bg-black">
          <iframe
            key={video.id}
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        {/* Video Details & Practical Prompt Section */}
        <div className="p-5 overflow-y-auto space-y-5 bg-[#171412] text-stone-200">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-xl font-bold font-editorial text-white">
                {video.title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-stone-400 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span className="text-[#f95716] font-semibold">
                  {video.badgeTag || video.language}
                </span>
              </div>
            </div>
            <p className="mt-2 text-sm text-stone-300 leading-relaxed">
              {video.description}
            </p>
          </div>

          {/* Key Prompt Card - Real Practical Output */}
          {video.keyPrompt && (
            <div className="bg-[#241f1c] rounded-xl p-4 border border-[#3d342d] relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ea580c]">
                  <Sparkles className="w-4 h-4" />
                  <span>Karke Dekho — Copy Practice Prompt</span>
                </div>
                <button
                  onClick={handleCopyPrompt}
                  className="flex items-center gap-1.5 px-3 py-1 bg-[#372f28] hover:bg-[#493e35] text-stone-200 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                >
                  {copiedPrompt ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Prompt Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Prompt</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-sm font-mono bg-black/40 p-3 rounded-lg text-amber-100 border border-white/5 leading-relaxed selection:bg-[#f95716]">
                "{video.keyPrompt}"
              </p>
              <p className="mt-2 text-[11px] text-stone-400">
                Tip: Iss prompt ko ChatGPT ya Copilot mein paste karein aur khud
                output dekhkar experiment karein!
              </p>
            </div>
          )}

          {/* Video Learning Notes */}
          {video.notes && video.notes.length > 0 && (
            <div className="border-t border-stone-800 pt-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-400 mb-2.5">
                <BookOpen className="w-4 h-4 text-[#0d828a]" />
                <span>Key takeaways from this video</span>
              </div>
              <ul className="grid sm:grid-cols-2 gap-2 text-xs text-stone-300">
                {video.notes.map((note, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 bg-stone-900/60 p-2.5 rounded-lg border border-stone-800/80"
                  >
                    <span className="w-4 h-4 rounded-full bg-[#0d828a]/20 text-[#2dd4bf] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related Videos Playlist */}
          {allVideos.length > 1 && onSelectVideo && (
            <div className="border-t border-stone-800 pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">
                More GardaAI Videos
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {allVideos
                  .filter((v) => v.id !== video.id)
                  .slice(0, 3)
                  .map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onSelectVideo(item)}
                      className="group flex flex-col text-left bg-stone-900/70 p-2 rounded-xl hover:bg-stone-800/90 transition-all border border-stone-800/80 cursor-pointer"
                    >
                      <div className="relative aspect-video rounded-lg overflow-hidden mb-2">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span className="text-xs font-semibold text-stone-200 line-clamp-1 group-hover:text-[#f95716] transition-colors">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-stone-500 mt-0.5">
                        {item.language}
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
