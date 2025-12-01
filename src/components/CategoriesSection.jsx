const CategoriesSection = () => {
  const categories = [
    {
      id: 1,
      name: "Tech News",
      description: "Latest updates and breaking news from the tech industry",
      icon: "📰",
      count: 24,
      color: "bg-blue-500"
    },
    {
      id: 2,
      name: "Product Reviews",
      description: "In-depth reviews of the latest tech products and gadgets",
      icon: "⭐",
      count: 18,
      color: "bg-purple-500"
    },
    {
      id: 3,
      name: "Tutorials",
      description: "Step-by-step guides and tutorials for developers",
      icon: "📚",
      count: 32,
      color: "bg-green-500"
    },
    {
      id: 4,
      name: "Web Development",
      description: "Frontend, backend, and full-stack development content",
      icon: "💻",
      count: 45,
      color: "bg-orange-500"
    },
    {
      id: 5,
      name: "AI & Machine Learning",
      description: "Artificial intelligence, ML, and data science articles",
      icon: "🤖",
      count: 28,
      color: "bg-pink-500"
    },
    {
      id: 6,
      name: "Cloud Computing",
      description: "AWS, Azure, GCP, and cloud infrastructure topics",
      icon: "☁️",
      count: 21,
      color: "bg-cyan-500"
    },
    {
      id: 7,
      name: "Cybersecurity",
      description: "Security best practices and threat analysis",
      icon: "🔒",
      count: 15,
      color: "bg-red-500"
    },
    {
      id: 8,
      name: "Mobile Development",
      description: "iOS, Android, and cross-platform mobile apps",
      icon: "📱",
      count: 19,
      color: "bg-indigo-500"
    },
    {
      id: 9,
      name: "DevOps",
      description: "CI/CD, automation, and infrastructure as code",
      icon: "⚙️",
      count: 22,
      color: "bg-yellow-500"
    }
  ];

  return (
    <section className="py-16 bg-white" data-section="categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Browse by Categories
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore content organized by topics
          </p>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-4"></div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                window.dispatchEvent(new CustomEvent('navigate', { 
                  detail: { page: 'category', category: category.name.toLowerCase().replace(/\s+/g, '-') } 
                }));
              }}
              className="group bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer w-full text-left"
            >
              <div className="flex items-start space-x-4">
                {/* Category Icon */}
                <div className={`${category.color} text-white rounded-lg p-3 text-2xl transform group-hover:scale-110 transition-transform duration-300`}>
                  {category.icon}
                </div>
                
                {/* Category Info */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-500 transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {category.description}
                  </p>
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
      </div>
    </section>
  );
};

export default CategoriesSection;


