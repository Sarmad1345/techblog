import { getBlogPosts } from '../data/blogData';
import { useState, useEffect } from 'react';

const FeaturedSection = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);

  useEffect(() => {
    const updatePosts = () => {
      const allPosts = getBlogPosts();
      setFeaturedPosts(allPosts.slice(0, 4));
    };

    updatePosts();
    window.addEventListener('blogPostAdded', updatePosts);
    return () => window.removeEventListener('blogPostAdded', updatePosts);
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Featured Posts
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our most popular and trending articles
          </p>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-4"></div>
        </div>

        {/* Featured Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Post Image */}
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
              </div>

              {/* Post Content */}
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-500 transition-colors duration-300 line-clamp-2">
                  <button
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'blog', id: post.id } }));
                    }}
                    className="text-left hover:underline cursor-pointer w-full"
                  >
                    {post.title}
                  </button>
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                <button
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'blog', id: post.id } }));
                  }}
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
      </div>
    </section>
  );
};

export default FeaturedSection;


