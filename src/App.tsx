/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ActiveTab, VideoItem } from './types';
import { VIDEOS } from './data/academyData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { AboutView } from './components/AboutView';
import { LearnView } from './components/LearnView';
import { AIUpdatesView } from './components/AIUpdatesView';
import { PrivacyView } from './components/PrivacyView';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { SchoolWorkshopModal } from './components/SchoolWorkshopModal';
import { DownloadAppModal } from './components/DownloadAppModal';
import { ReadStoryModal } from './components/ReadStoryModal';
import { Chatbot } from './components/Chatbot';
import { PATHS, applySeo, tabFromPath } from './routes';
import { useScrollReveal } from './components/ui';

export default function App({ path }: { path?: string }) {
  // `path` is passed during prerender; in the browser the URL decides
  const [activeTab, setActiveTab] = useState<ActiveTab>(() => tabFromPath(path ?? (typeof window === 'undefined' ? '/' : location.pathname)));
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isWorkshopModalOpen, setIsWorkshopModalOpen] = useState(false);
  const [isDownloadAppOpen, setIsDownloadAppOpen] = useState(false);
  const [isReadStoryOpen, setIsReadStoryOpen] = useState(false);

  useEffect(() => {
    // old #about style links → real routes
    const legacy = location.hash.slice(1) as ActiveTab;
    if (legacy in PATHS) { history.replaceState(null, '', PATHS[legacy]); setActiveTab(legacy); }
    const onPop = () => setActiveTab(tabFromPath(location.pathname));
    addEventListener('popstate', onPop);
    return () => removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => applySeo(activeTab), [activeTab]);

  useScrollReveal(activeTab);

  const handleTabChange = (tab: ActiveTab) => {
    if (tab !== activeTab) history.pushState(null, '', PATHS[tab]);
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // switch page, then scroll to a section id (home page anchors) or to the top
  const goTo = (tab: ActiveTab, anchor?: string) => {
    handleTabChange(tab);
    if (anchor) setTimeout(() => document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' }), 200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f4] text-[#1c1917] selection:bg-[#ff5b19] selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onOpenDownloadApp={() => setIsDownloadAppOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pt-16 isolate">
        {activeTab === 'home' && <HomeView />}

        {activeTab === 'about' && (
          <AboutView
            onNavigateToLearn={() => handleTabChange('learn')}
            onOpenVideo={(video) => setSelectedVideo(video)}
            onOpenReadStory={() => setIsReadStoryOpen(true)}
          />
        )}

        {activeTab === 'learn' && (
          <LearnView
            onOpenVideo={(video) => setSelectedVideo(video)}
            onOpenDownloadApp={() => setIsDownloadAppOpen(true)}
          />
        )}

        {activeTab === 'ai-updates' && <AIUpdatesView />}

        {activeTab === 'privacy' && <PrivacyView />}
      </main>

      {/* Footer */}
      <Footer onNavigate={goTo} />

      {/* Modals */}
      <VideoPlayerModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
        onSelectVideo={(v) => setSelectedVideo(v)}
        allVideos={VIDEOS}
      />

      <SchoolWorkshopModal
        isOpen={isWorkshopModalOpen}
        onClose={() => setIsWorkshopModalOpen(false)}
      />

      <Chatbot />

      <DownloadAppModal
        isOpen={isDownloadAppOpen}
        onClose={() => setIsDownloadAppOpen(false)}
      />

      <ReadStoryModal
        isOpen={isReadStoryOpen}
        onClose={() => setIsReadStoryOpen(false)}
      />
    </div>
  );
}
