import { memo, useState, useMemo, useCallback } from 'react';
import { useBlogStore } from '../stores/blogStore';
import { useNavigationStore } from '../stores/navigationStore';

const ContentSection = memo(() => {
  const posts = useBlogStore((state) => state.posts);
  const bookmarks = useBlogStore((state) => state.bookmarks);
  const toggleBookmark = useBlogStore((state) => state.toggleBookmark);
  const getAllCategories = useBlogStore((state) => state.getAllCategories);
  const navigate = useNavigationStore((state) => state.navigate);
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [readTimeFilter, setReadTimeFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [, forceUpdate] = useState({});

  const categories = useMemo(() => ['All', 'Saved', ...getAllCategories().map(cat => cat.name)], [getAllCategories]);

  const filteredAndSortedPosts = useMemo(() => {
    let filtered = [...posts];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory === 'Saved') {
      filtered = filtered.filter(post => bookmarks.includes(post.id));
    } else if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Read time filter
    if (readTimeFilter !== 'All') {
      filtered = filtered.filter(post => {
        const readTime = parseInt(post.readTime);
        if (readTimeFilter === 'Quick') return readTime <= 5;
        if (readTimeFilter === 'Medium') return readTime > 5 && readTime <= 10;
        if (readTimeFilter === 'Long') return readTime > 10;
        return true;
      });
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === 'oldest') {
        return new Date(a.date) - new Date(b.date);
      } else if (sortBy === 'alphabetical') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return filtered;
  }, [posts, selectedCategory, sortBy, readTimeFilter, searchQuery, bookmarks]);

  const handlePostClick = (postId) => {
    navigate('blog', { id: postId });
  };

  const handleBookmarkClick = useCallback((e, postId) => {
    e.stopPropagation();
    toggleBookmark(postId);
    forceUpdate({});
  }, [toggleBookmark]);

  return (
    <section className="py-16 bg-gray-50" data-section="content">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Content Library
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Browse all articles with advanced filtering and sorting
          </p>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-4"></div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Read Time Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Read Time
              </label>
              <select
                value={readTimeFilter}
                onChange={(e) => setReadTimeFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All</option>
                <option value="Quick">Quick (≤5 min)</option>
                <option value="Medium">Medium (6-10 min)</option>
                <option value="Long">Long (&gt;10 min)</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                View
              </label>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                    viewMode === 'list'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  List
                </button>
              </div>
            </div>
          </div>

          {/* Sort */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredAndSortedPosts.length} of {posts.length} articles
          </p>
        </div>

        {/* Posts Display */}
        {filteredAndSortedPosts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg">
            <p className="text-gray-600 text-lg">No articles found matching your criteria.</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>
                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => handleBookmarkClick(e, post.id)}
                    className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 ${
                      bookmarks.includes(post.id)
                        ? 'bg-yellow-400 text-yellow-900'
                        : 'bg-white/80 text-gray-600 hover:bg-white'
                    }`}
                    title={bookmarks.includes(post.id) ? 'Remove from saved' : 'Save article'}
                  >
                    <svg
                      className="w-5 h-5"
                      fill={bookmarks.includes(post.id) ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-blue-500 transition-colors">
                    <button
                      onClick={() => handlePostClick(post.id)}
                      className="text-left hover:underline cursor-pointer w-full"
                    >
                      {post.title}
                    </button>
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <button
                    onClick={() => handlePostClick(post.id)}
                    className="inline-flex items-center text-blue-500 font-semibold hover:text-blue-600 transition-colors"
                  >
                    Read More
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredAndSortedPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full sm:w-32 h-48 sm:h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold mb-2">
                      {post.category}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 hover:text-blue-500 transition-colors">
                      <button
                        onClick={() => handlePostClick(post.id)}
                        className="text-left hover:underline cursor-pointer"
                      >
                        {post.title}
                      </button>
                    </h3>
                    <p className="text-gray-600 mb-3">{post.excerpt}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handlePostClick(post.id)}
                        className="inline-flex items-center text-blue-500 font-semibold hover:text-blue-600 transition-colors"
                      >
                        Read More
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      {/* Bookmark Button */}
                      <button
                        onClick={(e) => handleBookmarkClick(e, post.id)}
                        className={`inline-flex items-center px-3 py-2 rounded-lg font-semibold transition-all duration-300 ${
                          bookmarks.includes(post.id)
                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        title={bookmarks.includes(post.id) ? 'Remove from saved' : 'Save article'}
                      >
                        <svg
                          className="w-5 h-5 mr-1"
                          fill={bookmarks.includes(post.id) ? 'currentColor' : 'none'}
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                          />
                        </svg>
                        {bookmarks.includes(post.id) ? 'Saved' : 'Save'}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
});

ContentSection.displayName = 'ContentSection';

export default ContentSection;
