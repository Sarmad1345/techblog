import { getPostsByCategory, getAllCategories, getBlogPosts } from '../data/blogData';
import Header from './Header';
import Footer from './Footer';
import { useState, useEffect } from 'react';

const CategoryPage = ({ categoryName, onBack }) => {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const updatePosts = () => {
      const foundCategory = getAllCategories().find(cat => 
        cat.slug === categoryName || cat.name.toLowerCase() === categoryName.toLowerCase()
      );
      setCategory(foundCategory);
      setPosts(getPostsByCategory(foundCategory?.name || categoryName));
    };

    updatePosts();
    window.addEventListener('blogPostAdded', updatePosts);
    return () => window.removeEventListener('blogPostAdded', updatePosts);
  }, [categoryName]);

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
                {category?.name || categoryName}
              </h1>
              <p className="text-gray-600 text-lg">
                {posts.length} {posts.length === 1 ? 'article' : 'articles'} in this category
              </p>
              <div className="w-24 h-1 bg-blue-500 mt-4"></div>
            </div>

            {/* Posts List */}
            {posts.length > 0 ? (
              <div className="space-y-6">
                {posts.map((post) => (
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
                      <a 
                        href={`#/blog/${post.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'blog', id: post.id } }));
                        }}
                        className="hover:underline"
                      >
                        {post.title}
                      </a>
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <a
                      href={`#/blog/${post.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'blog', id: post.id } }));
                      }}
                      className="inline-flex items-center text-blue-500 font-semibold hover:text-blue-600 transition-colors duration-300 group"
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
                    </a>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-600 text-lg mb-4">No articles found in this category.</p>
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

export default CategoryPage;

