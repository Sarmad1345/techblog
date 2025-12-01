import { useState } from 'react';

const AboutMe = () => {
  const [isHovered, setIsHovered] = useState(false);

  const socialLinks = [
    { name: 'Facebook', icon: '📘', url: 'https://facebook.com' },
    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com' },
    { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com' },
    { name: 'GitHub', icon: '💻', url: 'https://github.com' },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 relative inline-block">
            <span className="relative z-10">About Me</span>
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-blue-500 transform origin-left animate-underline"></span>
          </h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 transform transition-all duration-500"></div>
        </div>

        {/* Main Content Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 lg:p-16 transform transition-all duration-300 hover:shadow-2xl">
          {/* Profile Picture and Introduction Section */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
            {/* Profile Picture */}
            <div className="relative group flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300 animate-pulse"></div>
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
                alt="Profile"
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-white shadow-lg relative z-10 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
              <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white rounded-full p-2 shadow-lg transform transition-all duration-300 group-hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* Introduction Text */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                Welcome to My World
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Hi there! I'm a passionate tech enthusiast, content creator, and lifelong learner. 
                With years of experience in the technology industry, I've dedicated myself to sharing 
                knowledge, insights, and the latest trends in the ever-evolving world of technology.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Through this platform, I aim to bridge the gap between complex technical concepts and 
                accessible, engaging content that helps readers stay informed and inspired in their 
                tech journey.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-10"></div>

          {/* Website Mission Section */}
          <div className="mb-10">
            <h3 className="font-semibold text-xl sm:text-2xl text-gray-800 mb-4 text-center md:text-left flex items-center gap-3">
              <span className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg">
                🎯
              </span>
              Our Mission
            </h3>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 sm:p-8 border-l-4 border-blue-500 transform transition-all duration-300 hover:shadow-md">
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4">
                At <span className="font-semibold text-blue-600">TechBlog</span>, our mission is to 
                provide high-quality, educational content that empowers our readers to stay ahead in 
                the fast-paced world of technology. We believe in making complex topics accessible, 
                engaging, and actionable.
              </p>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                Whether you're a seasoned developer, a tech enthusiast, or someone just starting 
                their journey, we're here to support you with valuable insights, tutorials, and 
                thought-provoking articles that inspire innovation and continuous learning.
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              { icon: '📚', title: 'Education', desc: 'Learn something new every day' },
              { icon: '🚀', title: 'Innovation', desc: 'Stay ahead of the curve' },
              { icon: '💡', title: 'Inspiration', desc: 'Turn ideas into reality' },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center transform transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="text-4xl mb-3 transform transition-transform duration-300 hover:scale-110">
                  {value.icon}
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">{value.title}</h4>
                <p className="text-sm text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Button and Social Media Section */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-gray-200">
            {/* CTA Button */}
            <button className="relative bg-blue-500 text-white py-3 px-8 rounded-full hover:bg-blue-600 transition-all duration-300 font-medium text-base sm:text-lg whitespace-nowrap transform hover:scale-110 hover:shadow-lg active:scale-95 overflow-hidden group">
              <span className="relative z-10">Get In Touch</span>
              {/* Shine effect on hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-in-out" />
            </button>

            {/* Social Media Icons */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 font-medium hidden sm:inline">Connect with me:</span>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative text-gray-600 hover:text-blue-500 transition-all duration-300 ease-in-out text-2xl transform hover:scale-125 hover:rotate-12 active:scale-100 rounded-full p-2 hover:bg-blue-50 group"
                  aria-label={social.name}
                >
                  <span className="relative z-10 inline-block">{social.icon}</span>
                  <span className="absolute inset-0 bg-blue-100 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300 ease-in-out opacity-0 group-hover:opacity-30 -z-0" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-xl shadow-md p-6 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-blue-500">📝</span>
              What I Write About
            </h4>
            <ul className="text-gray-600 space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Web Development & Frameworks
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Cloud Computing & DevOps
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                AI & Machine Learning
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Tech Industry Insights
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-blue-500">🎓</span>
              My Background
            </h4>
            <ul className="text-gray-600 space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Software Engineering Experience
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Technical Writing & Content Creation
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Community Building & Mentoring
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Continuous Learning Advocate
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;

