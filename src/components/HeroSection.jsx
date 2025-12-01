const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 sm:py-24 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block">Stay Updated with the</span>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Latest in Tech
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Get the latest news, reviews, and tutorials in the tech world. 
            Discover cutting-edge innovations and expert insights.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="group relative bg-blue-500 text-white py-3 px-8 rounded-full hover:bg-blue-600 transition-all duration-300 font-semibold text-lg whitespace-nowrap transform hover:scale-110 hover:shadow-2xl active:scale-95 overflow-hidden">
              <span className="relative z-10">Start Reading</span>
              {/* Shine effect on hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-in-out"></span>
            </button>
            <button className="group relative bg-transparent border-2 border-white text-white py-3 px-8 rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 font-semibold text-lg whitespace-nowrap transform hover:scale-110 active:scale-95">
              <span className="relative z-10">Explore Now</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

