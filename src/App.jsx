/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { Search, Gamepad2, X, Maximize2, ExternalLink } from 'lucide-react';
import gamesData from './games.json';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const filteredGames = useMemo(() => {
    return gamesData.filter((game) =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleGameClick = (game) => {
    setSelectedGame(game);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeGame = () => {
    setSelectedGame(null);
    setIsFullscreen(false);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-indigo-500/30">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-[#0f172a]/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSelectedGame(null)}>
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white hidden sm:block">
              Unblocked<span className="text-indigo-500">Games</span>
            </h1>
          </div>

          <div className="relative max-w-md w-full mx-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search games..."
              className="w-full bg-slate-900/50 border border-slate-700 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="text-sm font-medium hover:text-indigo-400 transition-colors hidden md:block">
              Request Game
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Game Player Section */}
        {selectedGame && (
          <div className={`mb-12 transition-all duration-500 ease-in-out ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''}`}>
            <div className={`bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl ${isFullscreen ? 'h-full rounded-none border-none' : ''}`}>
              <div className="bg-slate-800/50 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="font-semibold text-white">{selectedGame.title}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white"
                    title="Toggle Fullscreen"
                  >
                    <Maximize2 className="w-5 h-5" />
                  </button>
                  <a 
                    href={selectedGame.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white"
                    title="Open in New Tab"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <button 
                    onClick={closeGame}
                    className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-colors text-slate-400"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className={`relative bg-black ${isFullscreen ? 'h-[calc(100%-48px)]' : 'aspect-video'}`}>
                <iframe
                  src={selectedGame.url}
                  className="absolute inset-0 w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}

        {/* Hero Section (only show if no game selected) */}
        {!selectedGame && (
          <div className="mb-12 text-center py-12">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
              Play Your Favorite <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Unblocked Games
              </span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              The ultimate collection of unblocked games for school and work. 
              Fast, free, and always accessible.
            </p>
          </div>
        )}

        {/* Games Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              onClick={() => handleGameClick(game)}
              className="group relative bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10"
            >
              <div className="aspect-[3/2] overflow-hidden">
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-white group-hover:text-indigo-400 transition-colors truncate">
                  {game.title}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-400 bg-indigo-400/10 px-2 py-0.5 rounded">
                    Unblocked
                  </span>
                </div>
              </div>
              
              {/* Play Overlay */}
              <div className="absolute inset-0 bg-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-indigo-600 p-3 rounded-full scale-75 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                  <Gamepad2 className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-block p-4 bg-slate-900 rounded-full mb-4">
              <Search className="w-8 h-8 text-slate-700" />
            </div>
            <h3 className="text-xl font-bold text-white">No games found</h3>
            <p className="text-slate-500 mt-2">Try searching for something else or request a game.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-20 py-12 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <Gamepad2 className="w-6 h-6 text-indigo-500" />
              <span className="text-lg font-bold text-white">Unblocked Hub</span>
            </div>
            <div className="flex gap-8 text-sm text-slate-500">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
            <div className="text-sm text-slate-600">
              © 2026 Unblocked Games Hub. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
