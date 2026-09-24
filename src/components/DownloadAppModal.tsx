import React from 'react';
import { X, Smartphone, Download, Check, Sparkles, WifiOff, Globe } from 'lucide-react';

interface DownloadAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadAppModal: React.FC<DownloadAppModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#fdfbf7] text-[#1c1917] rounded-2xl overflow-hidden shadow-2xl border border-[#ded8c9] flex flex-col">
        {/* Top Header */}
        <div className="bg-[#1c1917] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Smartphone className="w-5 h-5 text-[#f95716]" />
            <h2 className="font-editorial text-2xl font-bold tracking-tight">
              GardaAI App
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center">
            <span className="font-handwritten text-xl text-[#ea580c] block -rotate-1 mb-1">
              Videos • Prompts • AI News
            </span>
            <h3 className="font-editorial text-2xl font-bold text-stone-900">
              Learn Anytime, Anywhere.
            </h3>
            <p className="text-stone-600 text-xs mt-1">
              Specially built for low-bandwidth 4G & 3G networks in Bihar.
            </p>
          </div>

          {/* App Features List */}
          <div className="space-y-2.5 bg-[#f4efe4] p-4 rounded-xl border border-[#ded8c9]">
            <div className="flex items-start gap-2.5 text-xs text-stone-700">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Roz naye Hinglish Prompts:</strong> Ready-to-copy prompts
                for school, shop, and content.
              </span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-stone-700">
              <WifiOff className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
              <span>
                <strong>Offline AI Dictionary:</strong> Bina internet ke AI
                technical terms ki simple Hindi definition.
              </span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-stone-700">
              <Sparkles className="w-4 h-4 text-[#0d828a] shrink-0 mt-0.5" />
              <span>
                <strong>Low Data Video Streaming:</strong> 360p aur audio-only
                modes for seamless learning.
              </span>
            </div>
          </div>

          {/* Download Buttons */}
          <div className="space-y-3">
            <a
              href="#download-android"
              onClick={(e) => {
                e.preventDefault();
                alert(
                  'GardaAI App APK (v1.2.0) downloaded! You can install directly on your Android phone.'
                );
                onClose();
              }}
              className="flex items-center justify-between w-full p-3.5 bg-[#f95716] hover:bg-[#ea4805] text-white rounded-xl shadow font-semibold transition-all hover:shadow-md cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5" />
                <div className="text-left">
                  <div className="text-sm font-bold">Download Android APK</div>
                  <div className="text-[11px] text-white/80">Direct Install • 18 MB • v1.2.0</div>
                </div>
              </div>
              <span className="text-xs bg-black/20 px-2.5 py-1 rounded-md">Free</span>
            </a>

            <button
              onClick={() => {
                alert(
                  'GardaAI PWA added to your home screen! You can access all lessons even when offline.'
                );
                onClose();
              }}
              className="flex items-center justify-between w-full p-3.5 bg-white hover:bg-stone-50 border border-[#ded8c9] text-stone-800 rounded-xl transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-[#0d828a]" />
                <div className="text-left">
                  <div className="text-sm font-bold">Launch Web App / PWA</div>
                  <div className="text-[11px] text-stone-500">No installation needed • Works on iOS & Laptop</div>
                </div>
              </div>
              <span className="text-xs font-semibold text-[#0d828a]">Open →</span>
            </button>
          </div>

          <div className="text-center pt-1 border-t border-[#ded8c9]">
            <p className="text-[11px] text-stone-500">
              Need help installing? Message on WhatsApp: <strong>+91 98350 44211</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
