import { useState, useEffect, useRef } from 'react';
import { blogPosts } from '../data/blogData';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: 'About Me', path: '/about' },
    { name: 'Categories', path: '/categories' },
    { name: 'Content', path: '/content' },
  ];

  // Check if we're on home page
  const isOnHomePage = () => {
    const hash = window.location.hash;
    return !hash || hash === '' || hash === '#';
  };

  const handleLinkClick = (linkName, e) => {
    e.preventDefault();
    setActiveLink(linkName);
    setIsMenuOpen(false);
    
    // Navigate to home if Home is clicked
    if (linkName === 'Home') {
      window.dispatchEvent(new CustomEvent('navigate', { 
        detail: { page: 'home' } 
      }));
    }
  };

  // Handle navigation to sections
  const handleSectionNavigation = (sectionName) => {
    // If not on home page, navigate to home first, then scroll
    if (!isOnHomePage()) {
      window.dispatchEvent(new CustomEvent('navigate', { 
        detail: { page: 'home' } 
      }));
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const section = document.querySelector(`[data-section="${sectionName}"]`);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    } else {
      // Already on home page, just scroll
      const section = document.querySelector(`[data-section="${sectionName}"]`);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Live search function
  const performSearch = (query) => {
    if (!query || query.trim() === '') {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    const searchTerm = query.toLowerCase().trim();
    const results = blogPosts.filter(post => {
      const titleMatch = post.title.toLowerCase().includes(searchTerm);
      const excerptMatch = post.excerpt.toLowerCase().includes(searchTerm);
      const categoryMatch = post.category.toLowerCase().includes(searchTerm);
      
      return titleMatch || excerptMatch || categoryMatch;
    }).slice(0, 5); // Show max 5 results in dropdown

    setSearchResults(results);
    setShowSearchDropdown(results.length > 0);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    performSearch(value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.dispatchEvent(new CustomEvent('navigate', { 
        detail: { page: 'search', query: searchQuery.trim() } 
      }));
      setSearchQuery('');
      setSearchResults([]);
      setShowSearchDropdown(false);
      setIsSearchOpen(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    } else if (e.key === 'Escape') {
      setShowSearchDropdown(false);
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  // Handle click on search result
  const handleResultClick = (postId) => {
    window.dispatchEvent(new CustomEvent('navigate', { 
      detail: { page: 'blog', id: postId } 
    }));
    setSearchQuery('');
    setSearchResults([]);
    setShowSearchDropdown(false);
    setIsSearchOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current && 
        !searchRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowSearchDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Modern Navigation Bar */}
        <div className="flex items-center py-4 gap-6">
          {/* Logo */}
          <button
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent('navigate', { 
                detail: { page: 'home' } 
              }));
              handleLinkClick('Home', e);
            }}
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 flex-shrink-0 cursor-pointer"
          >
            TechBlog
          </button>

          {/* Desktop Navigation - Pehle */}
          <nav className="hidden lg:flex items-center space-x-1 flex-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.name, e);
                  // Navigate to home or scroll to section
                  if (link.name === 'Home') {
                    window.dispatchEvent(new CustomEvent('navigate', { 
                      detail: { page: 'home' } 
                    }));
                  } else if (link.name === 'Blog') {
                    handleSectionNavigation('blog');
                  } else if (link.name === 'Categories') {
                    handleSectionNavigation('categories');
                  } else if (link.name === 'About Me') {
                    handleSectionNavigation('about');
                  } else if (link.name === 'Content') {
                    handleSectionNavigation('content');
                  }
                }}
                className={`relative group font-medium text-sm transition-all duration-300 ease-in-out px-4 py-2 rounded-lg cursor-pointer ${
                  activeLink === link.name
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <span className="relative z-10">
                  {link.name}
                </span>
              </button>
            ))}
          </nav>

          {/* Add Blog Button - Desktop */}
          <div className="hidden md:flex items-center flex-shrink-0">
            <button
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('navigate', { 
                  detail: { page: 'add-blog' } 
                }));
              }}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium text-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Blog
            </button>
          </div>

          {/* Search Bar - End Pe (Right Side) */}
          <div className="hidden md:flex items-center flex-shrink-0 relative" ref={searchRef}>
            <form onSubmit={handleSearch} className="relative w-64">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                onFocus={() => searchQuery && performSearch(searchQuery)}
                className="w-full px-4 py-2.5 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-300 ease-in-out text-sm placeholder:text-gray-400 hover:border-gray-300"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 text-gray-400 hover:text-blue-500 transition-colors"
                aria-label="Search"
              >
                <svg
                  className="w-4 h-4"
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
            </form>

            {/* Search Results Dropdown */}
            {showSearchDropdown && searchResults.length > 0 && (
              <div 
                ref={dropdownRef}
                className="absolute top-full right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto"
              >
                <div className="p-2">
                  {searchResults.map((post) => (
                    <button
                      key={post.id}
                      onClick={() => handleResultClick(post.id)}
                      className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
                    >
                      <div className="flex items-start space-x-3">
                        {post.image && (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1 mb-1">
                            {post.title}
                          </h4>
                          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                              {post.category}
                            </span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                  {searchResults.length > 0 && (
                    <button
                      onClick={handleSearch}
                      className="w-full mt-2 p-2 text-center text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                    >
                      View all results for "{searchQuery}"
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Actions - Right Side */}
          <div className="flex items-center gap-2 flex-shrink-0 lg:hidden">
            {/* Mobile Add Blog Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('navigate', { 
                  detail: { page: 'add-blog' } 
                }));
              }}
              className="text-green-600 hover:text-green-700 p-2 transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95 rounded-lg hover:bg-green-50"
              aria-label="Add Blog"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>

            {/* Mobile Search Icon */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-600 hover:text-blue-600 p-2 transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95 rounded-lg hover:bg-gray-100"
              aria-label="Search"
            >
              <svg
                className="w-5 h-5 transition-transform duration-300 ease-in-out"
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

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-blue-600 p-2 transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95 rounded-lg hover:bg-gray-100"
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
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden pb-3 animate-slideDown relative" ref={searchRef}>
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                onFocus={() => searchQuery && performSearch(searchQuery)}
                className="w-full px-4 py-2 pl-10 pr-12 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-300 ease-in-out text-sm placeholder:text-gray-400"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors duration-300"
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
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 text-gray-400 hover:text-blue-500 transition-colors"
                aria-label="Search"
              >
                <svg
                  className="w-4 h-4"
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
            </form>

            {/* Mobile Search Results Dropdown */}
            {showSearchDropdown && searchResults.length > 0 && (
              <div 
                ref={dropdownRef}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto"
              >
                <div className="p-2">
                  {searchResults.map((post) => (
                    <button
                      key={post.id}
                      onClick={() => handleResultClick(post.id)}
                      className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
                    >
                      <div className="flex items-start space-x-3">
                        {post.image && (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1 mb-1">
                            {post.title}
                          </h4>
                          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                              {post.category}
                            </span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                  {searchResults.length > 0 && (
                    <button
                      onClick={handleSearch}
                      className="w-full mt-2 p-2 text-center text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                    >
                      View all results for "{searchQuery}"
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <nav className="lg:hidden pb-4 border-t border-gray-100 pt-4 animate-slideDown">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link, index) => (
                <button
                  key={link.name}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.name, e);
                    // Navigate to home or scroll to section
                    if (link.name === 'Home') {
                      window.dispatchEvent(new CustomEvent('navigate', { 
                        detail: { page: 'home' } 
                      }));
                    } else if (link.name === 'Blog') {
                      handleSectionNavigation('blog');
                    } else if (link.name === 'Categories') {
                      handleSectionNavigation('categories');
                    } else if (link.name === 'About Me') {
                      handleSectionNavigation('about');
                    } else if (link.name === 'Content') {
                      handleSectionNavigation('content');
                    }
                  }}
                  className={`relative group text-sm font-medium py-2.5 px-4 rounded-lg transition-all duration-300 ease-in-out text-left cursor-pointer ${
                    activeLink === link.name
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;

