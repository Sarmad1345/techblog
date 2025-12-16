import { memo, useState, useCallback } from 'react';
import { useBlogStore } from '../stores/blogStore';
import { useNavigationStore } from '../stores/navigationStore';
import Header from './Header';
import Footer from './Footer';

const BookmarksPage = memo(({ onBack }) => {
  const bookmarks = useBlogStore((state) => state.bookmarks);
  const getBookmarkedPosts = useBlogStore((state) => state.getBookmarkedPosts);
  const toggleBookmark = useBlogStore((state) => state.toggleBookmark);
  const navigate = useNavigationStore((state) => state.navigate);
  
  const [, forceUpdate] = useState({});
  
  const bookmarkedPosts = getBookmarkedPosts();

  const handlePostClick = (postId) => {
    navigate('blog', { id: postId });
  };

  const handleRemoveBookmark = useCallback((e, postId) => {
    e.stopPropagation();
    toggleBookmark(postId);
    forceUpdate({});
  }, [toggleBookmark]);

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
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Home
              </button>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-800">Saved Articles</h1>
                  <p className="text-gray-600 text-lg mt-1">
                    {bookmarkedPosts.length} {bookmarkedPosts.length === 1 ? 'article' : 'articles'} saved
                  </p>
                </div>
              </div>
              <div className="w-24 h-1 bg-yellow-500 mt-4"></div>
            </div>

            {/* Bookmarked Posts */}
            {bookmarkedPosts.length === 0 ? (
              <div className="text-center py-20 bg-gray-50 rounded-lg">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No saved articles yet</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Start saving articles you want to read later by clicking the bookmark icon on any post.
                </p>
                <button
                  onClick={onBack}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                >
                  Browse Articles
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookmarkedPosts.map((post) => (
                  <article
                    key={post.id}
                    className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {post.category}
                        </span>
                      </div>
                      {/* Remove Bookmark Button */}
                      <button
                        onClick={(e) => handleRemoveBookmark(e, post.id)}
                        className="absolute top-4 right-4 p-2 bg-yellow-400 text-yellow-900 rounded-full transition-all duration-300 hover:bg-red-500 hover:text-white group/btn"
                        title="Remove from saved"
                      >
                        <svg
                          className="w-5 h-5 group-hover/btn:hidden"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        <svg
                          className="w-5 h-5 hidden group-hover/btn:block"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-500 transition-colors duration-300 line-clamp-2">
                        <button
                          onClick={() => handlePostClick(post.id)}
                          className="text-left hover:underline cursor-pointer w-full"
                        >
                          {post.title}
                        </button>
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => handlePostClick(post.id)}
                          className="inline-flex items-center text-blue-500 font-semibold hover:text-blue-600 transition-colors duration-300"
                        >
                          Read Article
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
                        <span className="text-xs text-gray-400">{post.author}</span>
                      </div>
                    </div>
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

BookmarksPage.displayName = 'BookmarksPage';

export default BookmarksPage;

