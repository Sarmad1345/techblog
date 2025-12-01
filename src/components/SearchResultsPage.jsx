import { getBlogPosts } from '../data/blogData';
import Header from './Header';
import Footer from './Footer';
import { useState, useEffect } from 'react';

const SearchResultsPage = ({ searchQuery, onBack }) => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const updatePosts = () => {
      setBlogPosts(getBlogPosts());
    };

    updatePosts();
    window.addEventListener('blogPostAdded', updatePosts);
    return () => window.removeEventListener('blogPostAdded', updatePosts);
  }, []);

  // Search through posts
  const searchPosts = (query) => {
    if (!query || query.trim() === '') return [];
    
    const searchTerm = query.toLowerCase().trim();
    return blogPosts.filter(post => {
      const titleMatch = post.title.toLowerCase().includes(searchTerm);
      const excerptMatch = post.excerpt.toLowerCase().includes(searchTerm);
      const categoryMatch = post.category.toLowerCase().includes(searchTerm);
      const contentMatch = post.fullContent.toLowerCase().includes(searchTerm);
      
      return titleMatch || excerptMatch || categoryMatch || contentMatch;
    });
  };

  const results = searchPosts(searchQuery);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-12">
              <button
                onClick={onBack}
                className="inline-flex items-center text-blue-500 hover:text-blue-600 font-semibold mb-6 transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Home
              </button>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Search Results
              </h1>
              <p className="text-gray-600 text-lg">
                {results.length > 0 
                  ? `Found ${results.length} ${results.length === 1 ? 'article' : 'articles'} for "${searchQuery}"`
                  : `No articles found for "${searchQuery}"`
                }
              </p>
              <div className="w-24 h-1 bg-blue-500 mt-4"></div>
            </div>

            {/* Search Results */}
            {results.length > 0 ? (
              <div className="space-y-6">
                {results.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2 sm:mb-0">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
                          {post.category}
                        </span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3 hover:text-blue-500 transition-colors duration-300">
                      <button
                        onClick={() => {
                          window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'blog', id: post.id } }));
                        }}
                        className="text-left hover:underline cursor-pointer w-full"
                      >
                        {post.title}
                      </button>
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <button
                      onClick={() => {
                        window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'blog', id: post.id } }));
                      }}
                      className="inline-flex items-center text-blue-500 font-semibold hover:text-blue-600 transition-colors duration-300 group cursor-pointer"
                    >
                      Read More
                      <svg
                        className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <svg
                  className="w-24 h-24 mx-auto text-gray-300 mb-4"
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
                <p className="text-gray-600 text-lg mb-4">No articles found matching your search.</p>
                <p className="text-gray-500 text-sm mb-8">Try different keywords or browse our categories.</p>
                <button
                  onClick={onBack}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Back to Home
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SearchResultsPage;

