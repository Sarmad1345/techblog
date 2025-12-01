import { useState, useEffect } from 'react'
import { MAINTENANCE_MODE } from './config/maintenance'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import FeaturedSection from './components/FeaturedSection'
import BlogSection from './components/BlogSection'
import CategoriesSection from './components/CategoriesSection'
import AboutMe from './components/AboutMe'
import ContentSection from './components/ContentSection'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import BlogDetailPage from './components/BlogDetailPage'
import CategoryPage from './components/CategoryPage'
import SearchResultsPage from './components/SearchResultsPage'
import AddBlogPage from './components/AddBlogPage'

// Maintenance Page Component
const MaintenancePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-6">
            <svg 
              className="w-16 h-16 text-indigo-600 animate-pulse" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
              />
            </svg>
          </div>
        </div>
        
        <h1 className="text-5xl font-bold text-gray-900 mb-4 animate-slideDown">
          Website Under Maintenance
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          We're currently working on improving your experience. 
          <br />
          <span className="font-semibold text-indigo-600">
            Please wait for a few hours while we make things better.
          </span>
        </p>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <p className="text-gray-500 text-sm">
            Thank you for your patience. We'll be back soon with exciting updates!
          </p>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [pageData, setPageData] = useState({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const scrollPositionRef = { current: 0 };
  const [refreshKey, setRefreshKey] = useState(0);

  // Listen for new blog posts
  useEffect(() => {
    const handleBlogPostAdded = () => {
      // Force re-render to show new posts
      setRefreshKey(prev => prev + 1);
    };

    window.addEventListener('blogPostAdded', handleBlogPostAdded);
    return () => {
      window.removeEventListener('blogPostAdded', handleBlogPostAdded);
    };
  }, []);

  // Handle navigation events
  useEffect(() => {
    let isNavigating = false;

    const navigateToPage = (page, id, category, query) => {
      if (isNavigating) return;
      isNavigating = true;

      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage(page);
        setPageData({ id, category, query });
        setIsTransitioning(false);
        
        // Scroll to top for detail pages, scroll to top for home
        if (page === 'home') {
          // Always scroll to top when going to home (don't restore position)
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 100);
        } else {
          // Scroll to top instantly for detail pages (no smooth scroll)
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
        isNavigating = false;
      }, 200);
    };

    const handleNavigate = (event) => {
      const { page, id, category, query } = event.detail;
      
      // Save current scroll position before navigating away from home
      if (currentPage === 'home') {
        scrollPositionRef.current = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      }
      
      // Set hash for browser history (without triggering hashchange)
      const currentHash = window.location.hash;
      let newHash = '';
      
      if (page === 'blog') {
        newHash = `#/blog/${id}`;
      } else if (page === 'category') {
        newHash = `#/categories/${category}`;
      } else if (page === 'search') {
        newHash = `#/search?q=${encodeURIComponent(query)}`;
      } else if (page === 'add-blog') {
        newHash = `#/add-blog`;
      }
      
      // Only update hash if it's different to prevent double navigation
      if (currentHash !== newHash) {
        window.history.pushState(null, '', newHash || window.location.pathname);
      }
      
      navigateToPage(page, id, category, query);
    };

    // Handle hash changes (browser back/forward)
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/blog/')) {
        const id = hash.split('/').pop();
        // Save scroll position if on home before navigating
        if (currentPage === 'home') {
          scrollPositionRef.current = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
        }
        navigateToPage('blog', parseInt(id), null, null);
      } else if (hash.startsWith('#/categories/')) {
        const category = hash.split('/').pop();
        // Save scroll position if on home before navigating
        if (currentPage === 'home') {
          scrollPositionRef.current = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
        }
        navigateToPage('category', null, category, null);
      } else if (hash.startsWith('#/search')) {
        const urlParams = new URLSearchParams(hash.split('?')[1]);
        const query = urlParams.get('q') || '';
        navigateToPage('search', null, null, query);
      } else if (hash.startsWith('#/add-blog')) {
        navigateToPage('add-blog', null, null, null);
      } else {
        // Returning to home - restore scroll position
        navigateToPage('home', null, null, null);
      }
    };

    // Handle popstate (browser back/forward button)
    const handlePopState = () => {
      handleHashChange();
    };

    window.addEventListener('navigate', handleNavigate);
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handlePopState);
    
    // Check initial hash on mount
    const hash = window.location.hash;
    if (hash.startsWith('#/blog/')) {
      const id = hash.split('/').pop();
      setCurrentPage('blog');
      setPageData({ id: parseInt(id) });
    } else if (hash.startsWith('#/categories/')) {
      const category = hash.split('/').pop();
      setCurrentPage('category');
      setPageData({ category });
    } else if (hash.startsWith('#/search')) {
      const urlParams = new URLSearchParams(hash.split('?')[1]);
      const query = urlParams.get('q') || '';
      setCurrentPage('search');
      setPageData({ query });
    } else if (hash.startsWith('#/add-blog')) {
      setCurrentPage('add-blog');
      setPageData({});
    }

    return () => {
      window.removeEventListener('navigate', handleNavigate);
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleBack = () => {
    window.history.pushState(null, '', window.location.pathname);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage('home');
      setPageData({});
      setIsTransitioning(false);
      // Restore scroll position when returning to home
      setTimeout(() => {
        window.scrollTo({ top: scrollPositionRef.current, behavior: 'auto' });
      }, 50);
    }, 200);
  };

  // Check if maintenance mode is enabled
  if (MAINTENANCE_MODE) {
    return <MaintenancePage />
  }

  // Render based on current page with smooth transitions
  const renderPage = () => {
    if (currentPage === 'blog') {
      return <BlogDetailPage postId={pageData.id} onBack={handleBack} />;
    }

    if (currentPage === 'category') {
      return <CategoryPage categoryName={pageData.category} onBack={handleBack} />;
    }

    if (currentPage === 'search') {
      return <SearchResultsPage searchQuery={pageData.query || ''} onBack={handleBack} />;
    }

    if (currentPage === 'add-blog') {
      return <AddBlogPage onBack={handleBack} />;
    }

    // Normal website content (home page)
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          {/* Main Content Area */}
          <HeroSection />
          <FeaturedSection />
          <BlogSection />
          <CategoriesSection />
          <AboutMe />
          <ContentSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    );
  };

  return (
    <div className={`transition-opacity duration-200 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      {renderPage()}
    </div>
  );
}

export default App
