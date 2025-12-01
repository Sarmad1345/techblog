import { memo, useState, useEffect, useMemo } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useBlogStore } from '../stores/blogStore';

const AddBlogPage = memo(({ onBack }) => {
  const addPost = useBlogStore((state) => state.addPost);
  const getAllCategories = useBlogStore((state) => state.getAllCategories);
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    fullContent: '',
    category: '',
    readTime: '',
    author: 'TechBlog Team',
    image: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const categories = useMemo(() => getAllCategories().map(cat => cat.name), [getAllCategories]);

  useEffect(() => {
    if (categories.length > 0 && !formData.category) {
      setFormData(prev => ({ ...prev, category: categories[0] }));
    }
  }, [categories, formData.category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    if (!formData.title.trim()) {
      setErrorMessage('Title is required');
      setIsSubmitting(false);
      return;
    }
    if (!formData.excerpt.trim()) {
      setErrorMessage('Excerpt is required');
      setIsSubmitting(false);
      return;
    }
    if (!formData.fullContent.trim()) {
      setErrorMessage('Content is required');
      setIsSubmitting(false);
      return;
    }
    if (!formData.category) {
      setErrorMessage('Category is required');
      setIsSubmitting(false);
      return;
    }
    if (!formData.readTime) {
      setErrorMessage('Read time is required');
      setIsSubmitting(false);
      return;
    }

    const newPost = {
      title: formData.title.trim(),
      excerpt: formData.excerpt.trim(),
      fullContent: formData.fullContent.trim(),
      category: formData.category,
      readTime: `${formData.readTime} min read`,
      author: formData.author || 'TechBlog Team',
      image: formData.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop'
    };

    const success = addPost(newPost);
    if (success) {
      setSuccessMessage('Blog post added successfully!');
      setFormData({
        title: '',
        excerpt: '',
        fullContent: '',
        category: categories.length > 0 ? categories[0] : '',
        readTime: '',
        author: 'TechBlog Team',
        image: ''
      });
    } else {
      setErrorMessage('Failed to add blog post. Please try again.');
    }

    setIsSubmitting(false);
    setTimeout(() => {
      setSuccessMessage('');
      setErrorMessage('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <button
                onClick={onBack}
                className="inline-flex items-center text-blue-500 hover:text-blue-600 font-semibold mb-6 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Home
              </button>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Add New Blog Post</h1>
              <p className="text-gray-600 text-lg">Fill out the form below to publish a new article.</p>
              <div className="w-24 h-1 bg-blue-500 mt-4"></div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
              {successMessage && (
                <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700">
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700">
                  {errorMessage}
                </div>
              )}

              <div className="mb-6">
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter blog post title"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="excerpt" className="block text-gray-700 text-sm font-bold mb-2">
                  Excerpt <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows="3"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                  placeholder="A short summary of your blog post"
                  required
                ></textarea>
              </div>

              <div className="mb-6">
                <label htmlFor="fullContent" className="block text-gray-700 text-sm font-bold mb-2">
                  Full Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="fullContent"
                  name="fullContent"
                  value={formData.fullContent}
                  onChange={handleChange}
                  rows="10"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                  placeholder="Write your full blog post content here (supports basic markdown like # headings, **bold**, ```code```)"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="shadow border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="readTime" className="block text-gray-700 text-sm font-bold mb-2">
                    Read Time (minutes) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="readTime"
                    name="readTime"
                    value={formData.readTime}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 5"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-2">Author</label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., John Doe"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Image URL (Optional)</label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., https://example.com/image.jpg"
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Publishing...' : 'Publish Post'}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
});

AddBlogPage.displayName = 'AddBlogPage';

export default AddBlogPage;
