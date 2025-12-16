import { memo, useMemo } from 'react';
import { useBlogStore } from '../stores/blogStore';
import { useNavigationStore } from '../stores/navigationStore';

const CategoriesSection = memo(() => {
  const getAllCategories = useBlogStore((state) => state.getAllCategories);
  const navigate = useNavigationStore((state) => state.navigate);
  
  const categories = useMemo(() => getAllCategories(), [getAllCategories]);

  const categoryIcons = {
    'Web Development': '💻',
    'AI & Machine Learning': '🤖',
    'Cloud Computing': '☁️',
    'Security': '🔒',
    'DevOps': '⚙️',
    'Backend': '🖥️',
    'Mobile Development': '📱',
    'Database': '🗄️',
    'Architecture': '🏗️'
  };

  const categoryColors = {
    'Web Development': 'bg-orange-500',
    'AI & Machine Learning': 'bg-pink-500',
    'Cloud Computing': 'bg-cyan-500',
    'Security': 'bg-red-500',
    'DevOps': 'bg-yellow-500',
    'Backend': 'bg-indigo-500',
    'Mobile Development': 'bg-purple-500',
    'Database': 'bg-blue-500',
    'Architecture': 'bg-green-500'
  };

  const handleCategoryClick = (category) => {
    navigate('category', { category: category.slug });
  };

  return (
    <section className="py-16 bg-white" data-section="categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Browse by Categories
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore content organized by topics
          </p>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-4"></div>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <div className="text-6xl mb-4">📂</div>
            <p className="text-gray-600 text-lg mb-2">No categories yet</p>
            <p className="text-gray-500">Categories will appear here once you add blog posts!</p>
          </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryClick(category)}
              className="group bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer w-full text-left"
            >
              <div className="flex items-start space-x-4">
                <div className={`${categoryColors[category.name] || 'bg-blue-500'} text-white rounded-lg p-3 text-2xl transform group-hover:scale-110 transition-transform duration-300`}>
                  {categoryIcons[category.name] || '📝'}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-500 transition-colors duration-300">
                    {category.name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{category.count} articles</span>
                    <svg
                      className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
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
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
        )}
      </div>
    </section>
  );
});

CategoriesSection.displayName = 'CategoriesSection';

export default CategoriesSection;
