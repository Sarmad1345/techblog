import { memo, useMemo, useState, useCallback } from 'react';
import { useBlogStore } from '../stores/blogStore';
import { useNavigationStore } from '../stores/navigationStore';

const FeaturedSection = memo(() => {
  const posts = useBlogStore((state) => state.posts);
  const bookmarks = useBlogStore((state) => state.bookmarks);
  const toggleBookmark = useBlogStore((state) => state.toggleBookmark);
  const navigate = useNavigationStore((state) => state.navigate);
  
  const [, forceUpdate] = useState({});

  const featuredPosts = useMemo(() => posts.slice(0, 4), [posts]);

  const handlePostClick = (postId) => {
    navigate('blog', { id: postId });
  };

  const handleBookmarkClick = useCallback((e, postId) => {
    e.stopPropagation();
    toggleBookmark(postId);
    forceUpdate({});
  }, [toggleBookmark]);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Featured Posts
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our most popular and trending articles
          </p>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-4"></div>
        </div>

        {featuredPosts.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-gray-600 text-lg mb-2">No posts yet</p>
            <p className="text-gray-500">Add your first blog post to see it featured here!</p>
          </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-48 sm:h-56 overflow-hidden">
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
                <button
                  onClick={() => handlePostClick(post.id)}
                  className="inline-flex items-center text-blue-500 font-semibold hover:text-blue-600 transition-colors duration-300 group/link cursor-pointer"
                >
                  Read More
                  <svg
                    className="w-5 h-5 ml-2 transform group-hover/link:translate-x-1 transition-transform duration-300"
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
              </div>
            </article>
          ))}
        </div>
        )}
      </div>
    </section>
  );
});

FeaturedSection.displayName = 'FeaturedSection';

export default FeaturedSection;
