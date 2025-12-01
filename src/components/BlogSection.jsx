import { memo, useState, useMemo } from 'react';
import { useBlogStore } from '../stores/blogStore';
import { useNavigationStore } from '../stores/navigationStore';

const BlogSection = memo(() => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const posts = useBlogStore((state) => state.posts);
  const navigate = useNavigationStore((state) => state.navigate);

  const totalPages = useMemo(() => Math.ceil(posts.length / postsPerPage), [posts.length, postsPerPage]);
  const currentPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return posts.slice(startIndex, endIndex);
  }, [posts, currentPage, postsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePostClick = (postId) => {
    navigate('blog', { id: postId });
  };

  return (
    <section className="py-16 bg-gray-50" data-section="blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Latest Articles
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Stay up to date with our newest blog posts
          </p>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-4"></div>
        </div>

        <div className="space-y-6 mb-12">
          {currentPosts.map((post) => (
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

        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === page
                    ? 'bg-blue-500 text-white'
                    : 'bg-white border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
});

BlogSection.displayName = 'BlogSection';

export default BlogSection;
