const FeaturedSection = () => {
  const featuredPosts = [
    {
      id: 1,
      title: "The Future of Artificial Intelligence in 2024",
      excerpt: "Explore how AI is transforming industries and what to expect in the coming year. From machine learning to neural networks, discover the latest breakthroughs.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
      category: "AI & Machine Learning",
      date: "March 15, 2024",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Complete Guide to React 19: What's New?",
      excerpt: "Dive deep into React 19's new features, including server components, improved hooks, and performance optimizations that will change how you build apps.",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
      category: "Web Development",
      date: "March 12, 2024",
      readTime: "8 min read"
    },
    {
      id: 3,
      title: "Cloud Computing Trends: AWS vs Azure vs GCP",
      excerpt: "Compare the top cloud providers and understand which platform suits your needs. We break down pricing, features, and use cases for each.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
      category: "Cloud Computing",
      date: "March 10, 2024",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "Cybersecurity Best Practices for Developers",
      excerpt: "Learn essential security practices every developer should know. From authentication to encryption, protect your applications from threats.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
      category: "Security",
      date: "March 8, 2024",
      readTime: "7 min read"
    }
  ];

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
                  <a href={`/blog/${post.id}`} className="hover:underline">
                    {post.title}
                  </a>
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                <a
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center text-blue-500 font-semibold hover:text-blue-600 transition-colors duration-300 group/link"
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
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;

