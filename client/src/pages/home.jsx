import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/spotlight-new";

import { 
  Users, 
  Trophy, 
  TrendingUp,
  Zap,
  Sparkles,
  Menu,
  X,
  ChevronDown,
  Instagram,
} from 'lucide-react';

import GameRules from '@/components/flow';


const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden">
      {/* Cyberpunk-style grid background */}
      <Spotlight />

      <div className="absolute inset-0 opacity-10 [mask-image:linear-gradient(to_bottom,transparent,black)]">
        <div className="absolute inset-0 bg-[url('https://assets-global.website-files.com/6450b31696e25f8aa6cdd7b0/6450b31696e25f2b65cdd7e8_Grid.svg')] bg-[size:60px] animate-grid-pulse" />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 opacity-20 animate-particle-flow">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="absolute w-0.5 h-0.5 bg-green-400 rounded-full" />
        ))}
      </div>

     

      {/* Hero Section */}
<main className="relative pt-40 pb-24 flex flex-col items-center justify-center min-h-screen text-center px-4">
<div className="space-y-8 max-w-6xl mx-auto">
    
    {/* Modified IPL Section with tighter layout */}
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
      {/* IPL Logo Section - Reduced spacing */}
      <div className="flex-none relative w-full md:w-1/2 flex justify-center md:justify-start">
        <div className="relative">
          <img 
            src="/IPL-Logo.png"
            alt="IPL 2024"
            className="w-56 h-56 md:w-64 md:h-64 object-contain animate-float"
          />
          <h1 className="absolute left-0 right-0 text-4 xl md:text-5xl font-bold text-white text-center">
            Battle 5.0
          </h1>
        </div>
      </div>

      {/* Event Details - Adjusted spacing */}
      <div className="flex-1 text-left space-y-6 pl-0 md:pl-8">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
        Build Your Dream Cricket Team 
        </h2>
              
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
              Join the ultimate cricket auction experience and prove your team management skills
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="flex items-center space-x-4 p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                  <Trophy className="w-8 h-8 text-amber-400" />
                  <div>
                    <h3 className="text-xl font-semibold text-white">₹ 5000</h3>
                    <p className="text-gray-400 text-sm">Prize Pool</p> 
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                  <Users className="w-8 h-8 text-green-400" />
                  <div>
                    <h3 className="text-xl font-semibold text-white">₹ 100</h3>
                    <p className="text-gray-400 text-sm">Registrion Fee</p> 
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                  <TrendingUp className="w-8 h-8 text-cyan-400" />
                  <div>
                    <h3 className="text-xl font-semibold text-white">Live Auction</h3>
                    <p className="text-gray-400 text-sm">Real-time updates</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                  <Zap className="w-8 h-8 text-purple-400" />
                  <div>
                    <h3 className="text-xl font-semibold text-white">Power Plays</h3>
                    <p className="text-gray-400 text-sm">Special match events</p>
                  </div>
                </div>
              </div>


            </div>
          </div>
          
        </div>


        <GameRules/>

      </main>
    </div>

  );
};

export default Home;
