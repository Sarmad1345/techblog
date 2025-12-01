import { memo, useMemo } from 'react';
import { useBlogStore } from '../stores/blogStore';
import { useNavigationStore } from '../stores/navigationStore';
import Header from './Header';
import Footer from './Footer';

const SearchResultsPage = memo(({ searchQuery, onBack }) => {
  const searchPosts = useBlogStore((state) => state.searchPosts);
  const navigate = useNavigationStore((state) => state.navigate);

  const results = useMemo(() => {
    return searchPosts(searchQuery);
  }, [searchQuery, searchPosts]);

  const handlePostClick = (postId) => {
    navigate('blog', { id: postId });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <button
                onClick={onBack}
                className="inline-flex items-center text-blue-500 hover:text-blue-600 font-semibold mb-6 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Home
              </button>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Search Results
              </h1>
              <p className="text-gray-600 text-lg">
                {results.length} {results.length === 1 ? 'result' : 'results'} for "{searchQuery}"
              </p>
              <div className="w-24 h-1 bg-blue-500 mt-4"></div>
            </div>

            {results.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-600 text-lg">No results found for "{searchQuery}".</p>
                <p className="text-gray-500 mt-2">Try a different search term.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {results.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-lg shadow-md p-6 sm:p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold mb-2">
                            {post.category}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 hover:text-blue-500 transition-colors">
                            <button
                              onClick={() => handlePostClick(post.id)}
                              className="text-left hover:underline cursor-pointer"
                            >
                              {post.title}
                            </button>
                          </h3>
                          <p className="text-gray-600 line-clamp-2 mb-3">{post.excerpt}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <span>{post.date}</span>
                            <span className="mx-2">•</span>
                            <span>{post.readTime}</span>
                            <span className="mx-2">•</span>
                            <span>{post.author}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handlePostClick(post.id)}
                      className="inline-flex items-center text-blue-500 font-semibold hover:text-blue-600 transition-colors"
                    >
                      Read More
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
});

SearchResultsPage.displayName = 'SearchResultsPage';

export default SearchResultsPage;
