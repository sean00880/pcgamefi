'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Wallet, Info } from 'lucide-react';
import { Button } from './Button';
import { SOCIAL_LINKS, NAV_LINKS } from '@/lib/constants';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showWalletTooltip, setShowWalletTooltip] = useState(false);
  const pathname = usePathname();

  const isActivePath = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#E8E5D5] border-b border-gray-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-bold display-font tracking-tight">
              PC <span className="text-[#7FF252]">GAMEFI</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`font-semibold transition-colors ${
                  isActivePath(link.path)
                    ? 'text-[#7FF252] border-b-2 border-[#7FF252]'
                    : 'text-black hover:text-[#7FF252]'
                } ${link.disabled ? 'opacity-50 cursor-not-allowed' : ''} pb-1`}
                onClick={(e) => link.disabled && e.preventDefault()}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Wallet Button with Tooltip - Desktop */}
          <div className="hidden md:block relative">
            <div
              className="relative"
              onMouseEnter={() => setShowWalletTooltip(true)}
              onMouseLeave={() => setShowWalletTooltip(false)}
            >
              <Button
                variant="primary"
                className="flex items-center gap-2 cursor-not-allowed opacity-80"
                disabled
              >
                <Wallet size={18} />
                Connect Wallet
              </Button>

              {/* Tooltip */}
              {showWalletTooltip && (
                <div className="absolute top-full mt-2 right-0 bg-black text-white px-4 py-3 rounded-lg shadow-xl w-64 z-50 animate-fade-in">
                  <div className="flex items-start gap-2">
                    <Info size={18} className="flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm mb-1">Coming in Phase 2</p>
                      <p className="text-xs text-gray-300">Full Web3 wallet integration with MetaMask, WalletConnect, and more will be available soon.</p>
                    </div>
                  </div>
                  {/* Arrow */}
                  <div className="absolute -top-2 right-6 w-4 h-4 bg-black transform rotate-45"></div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-200 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-300 shadow-lg animate-fade-in">
          <div className="px-4 py-6 space-y-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => {
                  if (!link.disabled) setMobileMenuOpen(false);
                }}
                className={`block py-2 font-semibold text-lg ${
                  isActivePath(link.path) ? 'text-[#7FF252]' : 'text-black'
                } ${link.disabled ? 'opacity-50' : ''}`}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 border-t border-gray-200">
              <div className="bg-gray-100 rounded-lg p-4 border-2 border-gray-300">
                <div className="flex items-start gap-2 mb-2">
                  <Info size={18} className="flex-shrink-0 mt-0.5 text-gray-600" />
                  <p className="text-sm font-semibold text-gray-700">Wallet Connection</p>
                </div>
                <p className="text-xs text-gray-600">Coming in Phase 2 - Full Web3 integration will be available soon.</p>
              </div>
            </div>

            <div className="flex gap-4 pt-2">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#7FF252] transition-colors"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
