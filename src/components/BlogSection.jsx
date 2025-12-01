import { useState } from 'react';

const BlogSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with TypeScript: A Comprehensive Guide",
      excerpt: "TypeScript brings static typing to JavaScript, making your code more robust and maintainable. Learn the fundamentals and best practices.",
      date: "March 20, 2024",
      category: "Web Development",
      readTime: "10 min read"
    },
    {
      id: 2,
      title: "Docker Containerization: Simplifying Deployment",
      excerpt: "Master Docker and containerization to streamline your development workflow. From basics to advanced orchestration techniques.",
      date: "March 18, 2024",
      category: "DevOps",
      readTime: "12 min read"
    },
    {
      id: 3,
      title: "Building Responsive UIs with Tailwind CSS",
      excerpt: "Create beautiful, responsive interfaces faster with Tailwind CSS. Discover utility-first CSS and modern design patterns.",
      date: "March 16, 2024",
      category: "Web Development",
      readTime: "8 min read"
    },
    {
      id: 4,
      title: "Understanding GraphQL: The Modern API Query Language",
      excerpt: "Explore GraphQL's powerful querying capabilities and how it compares to REST APIs. Build efficient data-fetching solutions.",
      date: "March 14, 2024",
      category: "Backend",
      readTime: "9 min read"
    },
    {
      id: 5,
      title: "Mobile App Development: React Native vs Flutter",
      excerpt: "Compare React Native and Flutter to choose the right framework for your next mobile project. Performance, ecosystem, and developer experience.",
      date: "March 13, 2024",
      category: "Mobile Development",
      readTime: "11 min read"
    },
    {
      id: 6,
      title: "Database Design Best Practices for Scalable Applications",
      excerpt: "Learn how to design databases that scale. From normalization to indexing strategies, optimize your data architecture.",
      date: "March 11, 2024",
      category: "Database",
      readTime: "7 min read"
    },
    {
      id: 7,
      title: "Microservices Architecture: Patterns and Anti-patterns",
      excerpt: "Navigate the complexities of microservices. Understand when to use them and how to avoid common pitfalls.",
      date: "March 9, 2024",
      category: "Architecture",
      readTime: "14 min read"
    },
    {
      id: 8,
      title: "JavaScript Performance Optimization Techniques",
      excerpt: "Boost your JavaScript application's performance with proven optimization strategies. From code splitting to lazy loading.",
      date: "March 7, 2024",
      category: "Web Development",
      readTime: "6 min read"
    },
    {
      id: 9,
      title: "CI/CD Pipelines: Automating Your Deployment Process",
      excerpt: "Set up continuous integration and deployment pipelines. Automate testing, building, and deploying your applications.",
      date: "March 5, 2024",
      category: "DevOps",
      readTime: "9 min read"
    }
  ];

  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = blogPosts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Latest Articles
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Stay up to date with our newest blog posts
          </p>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-4"></div>
        </div>

        {/* Blog Posts List */}
        <div className="space-y-6 mb-12">
          {currentPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-md p-6 sm:p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
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
                <a href={`/blog/${post.id}`} className="hover:underline">
                  {post.title}
                </a>
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {post.excerpt}
              </p>
              <a
                href={`/blog/${post.id}`}
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg border transition-colors duration-300 ${
                    currentPage === page
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;

