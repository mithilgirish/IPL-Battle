import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Zap, Sparkles, X, Menu } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-gray-950/95 backdrop-blur-xl shadow-2xl border-b border-gray-800/50'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
          <div className="flex items-center justify-between h-20">
            <div className="flex flex-col items-start">
              <a href="/" className="flex items-center space-x-3">
                <img src="/e_cell_logo.png" alt="E Cell" className="h-14 w-auto animate-pulse" />
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent font-mono">
                  E-CELL
                </span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="group relative text-gray-300 hover:text-white transition-all">
                <span className="text-sm font-medium">Home</span>
                <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-green-400 to-cyan-400 group-hover:w-full transition-all duration-300" />
              </a>
              <a href="/rules" className="group relative text-gray-300 hover:text-white transition-all">
                <span className="text-sm font-medium">Rules</span>
                <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-green-400 to-cyan-400 group-hover:w-full transition-all duration-300" />
              </a>
              <a href="/dashboard" className="group relative text-gray-300 hover:text-white transition-all">
                <span className="text-sm font-medium">Dashboard</span>
                <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-green-400 to-cyan-400 group-hover:w-full transition-all duration-300" />
              </a>
              <a href="/participant/login" className="group relative text-orange-400 hover:text-white transition-all">
                <Button className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-400 hover:to-yellow-400 px-6 py-2 rounded-full font-medium text-gray-900 hover:text-gray-950 transition-all group">
                  <span className="relative z-10">Login</span>
                  <Sparkles className="absolute -right-4 w-8 h-8 text-white/30 group-hover:right-4 transition-all duration-500" />
                </Button>
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:bg-gray-800/50"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-950/95 backdrop-blur-xl border-b border-gray-800/50">
            <div className="px-4 py-3 space-y-3">
              <a
                href="/"
                className="block px-4 py-3 text-gray-300 hover:text-white bg-gray-900/50 rounded-lg"
              >
                Home
              </a>
              <a
                href="/rules"
                className="block px-4 py-3 text-gray-300 hover:text-white bg-gray-900/50 rounded-lg"
              >
                Rules
              </a>
              <a
                href="/dashboard"
                className="block px-4 py-3 text-gray-300 hover:text-white bg-gray-900/50 rounded-lg"
              >
                Dashboard
              </a>
              <a
                href="/participant/login"
                className="block px-4 py-3 text-orange-400 hover:text-white bg-gray-900/50 rounded-lg"
              >
                <Button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-gray-900 font-medium mt-2">
                  Login
                </Button>
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
