import { memo, useMemo } from 'react';
import { useBlogStore } from '../stores/blogStore';
import { useNavigationStore } from '../stores/navigationStore';
import Header from './Header';
import Footer from './Footer';

const CategoryPage = memo(({ categoryName, onBack }) => {
  const getPostsByCategory = useBlogStore((state) => state.getPostsByCategory);
  const getAllCategories = useBlogStore((state) => state.getAllCategories);
  const navigate = useNavigationStore((state) => state.navigate);

  const category = useMemo(() => {
    return getAllCategories().find(cat => 
      cat.slug === categoryName || cat.name.toLowerCase() === categoryName.toLowerCase()
    );
  }, [categoryName, getAllCategories]);

  const posts = useMemo(() => {
    return getPostsByCategory(category?.name || categoryName);
  }, [category, categoryName, getPostsByCategory]);

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
                {category?.name || categoryName}
              </h1>
              <p className="text-gray-600 text-lg">
                {posts.length} {posts.length === 1 ? 'article' : 'articles'} in this category
              </p>
              <div className="w-24 h-1 bg-blue-500 mt-4"></div>
            </div>

            {posts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-600 text-lg">No articles found in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
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
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
});

CategoryPage.displayName = 'CategoryPage';

export default CategoryPage;
