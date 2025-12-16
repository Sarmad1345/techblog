const CTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          Stay Updated with the Latest Articles
        </h2>
        <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join our community and never miss an update. Get the latest tech news, tutorials, and insights delivered straight to your inbox.
        </p>
        
        {/* Newsletter Signup Form */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-700 transition-all duration-300"
          />
          <button className="bg-white text-blue-600 py-3 px-8 rounded-full hover:bg-gray-100 transition-all duration-300 font-semibold text-lg whitespace-nowrap transform hover:scale-110 hover:shadow-lg active:scale-95">
            Subscribe Now
          </button>
        </div>
        
        <p className="text-sm text-blue-200">
          No spam, unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    </section>
  );
};

export default CTASection;







