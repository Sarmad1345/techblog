import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: 'About Me', path: '/about' },
    { name: 'Categories', path: '/categories' },
    { name: 'Content', path: '/content' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: '📘', url: 'https://facebook.com' },
    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com' },
    { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com' },
  ];

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar with Search, CTA, and Social Icons */}
        <div className="flex items-center justify-between py-3 border-b border-gray-200">
          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mr-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out focus:shadow-md hover:border-blue-300"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Right Side: CTA Button and Social Icons */}
          <div className="flex items-center space-x-4">
            {/* Social Media Icons */}
            <div className="hidden lg:flex items-center space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative text-gray-600 hover:text-blue-500 transition-all duration-300 ease-in-out text-xl transform hover:scale-125 hover:rotate-12 active:scale-100"
                  aria-label={social.name}
                >
                  <span className="relative z-10 inline-block">{social.icon}</span>
                  <span className="absolute inset-0 bg-blue-100 rounded-full scale-0 hover:scale-150 transition-transform duration-300 ease-in-out opacity-0 hover:opacity-30 -z-0" />
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <button className="relative bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-all duration-300 ease-in-out font-medium text-sm sm:text-base whitespace-nowrap transform hover:scale-110 hover:shadow-lg active:scale-95 overflow-hidden group">
              <span className="relative z-10">Subscribe Now</span>
              {/* Shine effect on hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-in-out" />
            </button>

            {/* Mobile Search Icon */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden text-gray-600 hover:text-blue-500 p-2 transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95 rounded-full hover:bg-blue-50"
              aria-label="Search"
            >
              <svg
                className="w-6 h-6 transition-transform duration-300 ease-in-out"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden py-3 border-b border-gray-200 animate-slideDown">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out focus:shadow-md"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        )}

        {/* Main Navigation Bar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <a
            href="/"
            onClick={() => handleLinkClick('Home')}
            className="text-2xl font-bold text-gray-800 hover:text-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
          >
            <span className="relative inline-block">
              TechBlog
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 ease-in-out hover:w-full" />
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={() => handleLinkClick(link.name)}
                className={`relative group font-medium transition-all duration-300 ease-in-out ${
                  activeLink === link.name
                    ? 'text-blue-500'
                    : 'text-gray-600 hover:text-blue-500'
                }`}
              >
                <span className="relative z-10 inline-block py-2 px-1">
                  {link.name}
                </span>
                {/* Animated underline on hover */}
                <span
                  className={`absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 ease-in-out group-hover:w-full ${
                    activeLink === link.name ? 'w-full' : ''
                  }`}
                />
                {/* Background highlight on hover */}
                <span className="absolute inset-0 -z-0 bg-blue-50 rounded-md scale-0 group-hover:scale-100 transition-transform duration-300 ease-in-out opacity-0 group-hover:opacity-100" />
              </a>
            ))}
          </nav>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-gray-600 hover:text-blue-500 p-2 transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95 rounded-full hover:bg-blue-50"
            aria-label="Toggle menu"
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <nav className="lg:hidden pb-4 border-t border-gray-200 pt-4 animate-slideDown">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={() => handleLinkClick(link.name)}
                  className={`relative group text-gray-600 hover:text-blue-500 transition-all duration-300 ease-in-out font-medium py-3 px-4 rounded-lg transform hover:translate-x-2 hover:scale-105 active:scale-95 ${
                    activeLink === link.name
                      ? 'text-blue-500 bg-blue-50 shadow-md'
                      : 'hover:bg-gray-50 hover:shadow-sm'
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <span className="relative z-10 flex items-center">
                    <span className={`absolute left-0 w-1 h-0 bg-blue-500 rounded-r-full transition-all duration-300 ease-in-out ${
                      activeLink === link.name ? 'h-full' : 'group-hover:h-full'
                    }`} />
                    <span className="ml-3">{link.name}</span>
                  </span>
                  {/* Ripple effect on click */}
                  <span className="absolute inset-0 bg-blue-100 rounded-lg scale-0 group-active:scale-100 opacity-0 group-active:opacity-50 transition-all duration-300 ease-out" />
                </a>
              ))}
              {/* Mobile Social Icons */}
              <div className="flex items-center space-x-4 pt-2 px-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-500 transition-all duration-300 ease-in-out text-xl transform hover:scale-125 hover:rotate-12 active:scale-100 rounded-full p-2 hover:bg-blue-50"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;

