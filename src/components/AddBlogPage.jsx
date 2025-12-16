import { memo, useState, useEffect, useMemo } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useBlogStore, DEFAULT_CATEGORY } from '../stores/blogStore';
import { useNavigationStore } from '../stores/navigationStore';
import { useToastStore } from './Toast';

const AddBlogPage = memo(({ onBack, editPostId = null }) => {
  const addPost = useBlogStore((state) => state.addPost);
  const updatePost = useBlogStore((state) => state.updatePost);
  const getPostById = useBlogStore((state) => state.getPostById);
  const getAllCategories = useBlogStore((state) => state.getAllCategories);
  const addCategory = useBlogStore((state) => state.addCategory);
  const updateCategory = useBlogStore((state) => state.updateCategory);
  const deleteCategory = useBlogStore((state) => state.deleteCategory);
  const customCategories = useBlogStore((state) => state.customCategories);
  const posts = useBlogStore((state) => state.posts);
  const navigate = useNavigationStore((state) => state.navigate);
  const addToast = useToastStore((state) => state.addToast);
  
  const isEditMode = editPostId !== null;
  const existingPost = isEditMode ? getPostById(editPostId) : null;
  
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
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categoryMessage, setCategoryMessage] = useState({ type: '', text: '' });
  const [editingCategory, setEditingCategory] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');

  const categories = useMemo(() => getAllCategories().map(cat => cat.name), [getAllCategories, customCategories, posts]);

  // Load existing post data in edit mode
  useEffect(() => {
    if (isEditMode && existingPost) {
      const readTimeNum = existingPost.readTime ? existingPost.readTime.replace(/[^0-9]/g, '') : '';
      setFormData({
        title: existingPost.title || '',
        excerpt: existingPost.excerpt || '',
        fullContent: existingPost.fullContent || '',
        category: existingPost.category || '',
        readTime: readTimeNum,
        author: existingPost.author || 'TechBlog Team',
        image: existingPost.image || ''
      });
    }
  }, [isEditMode, existingPost]);

  useEffect(() => {
    if (!isEditMode && categories.length > 0 && !formData.category) {
      setFormData(prev => ({ ...prev, category: categories[0] }));
    }
  }, [categories, formData.category, isEditMode]);

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      setCategoryMessage({ type: 'error', text: 'Category name cannot be empty' });
      return;
    }
    
    const success = addCategory(newCategoryName);
    if (success) {
      setCategoryMessage({ type: 'success', text: `Category "${newCategoryName.trim()}" added!` });
      setFormData(prev => ({ ...prev, category: newCategoryName.trim() }));
      setNewCategoryName('');
    } else {
      setCategoryMessage({ type: 'error', text: 'Category already exists' });
    }
    
    setTimeout(() => setCategoryMessage({ type: '', text: '' }), 3000);
  };

  const handleEditCategory = (categoryName) => {
    setEditingCategory(categoryName);
    setEditCategoryName(categoryName);
  };

  const handleSaveEdit = () => {
    if (!editCategoryName.trim()) {
      setCategoryMessage({ type: 'error', text: 'Category name cannot be empty' });
      setTimeout(() => setCategoryMessage({ type: '', text: '' }), 3000);
      return;
    }
    
    const success = updateCategory(editingCategory, editCategoryName);
    if (success) {
      setCategoryMessage({ type: 'success', text: `Category renamed to "${editCategoryName.trim()}"` });
      // Update form if the edited category was selected
      if (formData.category === editingCategory) {
        setFormData(prev => ({ ...prev, category: editCategoryName.trim() }));
      }
    } else {
      setCategoryMessage({ type: 'error', text: 'Category name already exists' });
    }
    
    setEditingCategory(null);
    setEditCategoryName('');
    setTimeout(() => setCategoryMessage({ type: '', text: '' }), 3000);
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setEditCategoryName('');
  };

  const handleDeleteCategory = (categoryName) => {
    if (window.confirm(`Are you sure you want to delete "${categoryName}"? Posts with this category will be moved to "Uncategorized".`)) {
      deleteCategory(categoryName);
      setCategoryMessage({ type: 'success', text: `Category "${categoryName}" deleted` });
      
      // Update form if the deleted category was selected
      if (formData.category === categoryName) {
        setFormData(prev => ({ ...prev, category: DEFAULT_CATEGORY }));
      }
      
      setTimeout(() => setCategoryMessage({ type: '', text: '' }), 3000);
    }
  };

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

    if (!formData.title.trim()) {
      addToast('Title is required', 'warning');
      setIsSubmitting(false);
      return;
    }
    if (!formData.excerpt.trim()) {
      addToast('Excerpt is required', 'warning');
      setIsSubmitting(false);
      return;
    }
    if (!formData.fullContent.trim()) {
      addToast('Content is required', 'warning');
      setIsSubmitting(false);
      return;
    }
    if (!formData.readTime) {
      addToast('Read time is required', 'warning');
      setIsSubmitting(false);
      return;
    }

    const postData = {
      title: formData.title.trim(),
      excerpt: formData.excerpt.trim(),
      fullContent: formData.fullContent.trim(),
      category: formData.category || DEFAULT_CATEGORY,
      readTime: `${formData.readTime} min read`,
      author: formData.author || 'TechBlog Team',
      image: formData.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop'
    };

    if (isEditMode) {
      // Update existing post
      const success = updatePost(editPostId, postData);
      if (success) {
        addToast('🎉 Blog post updated successfully!', 'success');
        setTimeout(() => {
          navigate('blog', { id: editPostId });
        }, 1000);
      } else {
        addToast('Failed to update blog post. Please try again.', 'error');
      }
    } else {
      // Add new post
      const newId = addPost(postData);
      if (newId) {
        addToast(`🚀 "${postData.title}" published successfully!`, 'success');
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
        addToast('Failed to add blog post. Please try again.', 'error');
      }
    }

    setIsSubmitting(false);
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
                {isEditMode ? 'Back to Post' : 'Back to Home'}
              </button>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                {isEditMode ? 'Edit Blog Post' : 'Add New Blog Post'}
              </h1>
              <p className="text-gray-600 text-lg">
                {isEditMode ? 'Update your blog post details below.' : 'Fill out the form below to publish a new article.'}
              </p>
              <div className="w-24 h-1 bg-blue-500 mt-4"></div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
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
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="shadow border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  
                  {/* Add New Category */}
                  <div className="mt-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCategory())}
                        placeholder="New category name"
                        className="shadow appearance-none border rounded flex-1 py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={handleAddCategory}
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded text-sm transition-colors"
                      >
                        Add
                      </button>
                    </div>
                    {categoryMessage.text && (
                      <p className={`mt-2 text-sm ${categoryMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                        {categoryMessage.text}
                      </p>
                    )}
                  </div>

                  {/* Custom Categories List with Edit/Delete */}
                  {customCategories.length > 0 && (
                    <div className="mt-4">
                      <p className="text-gray-600 text-xs font-semibold mb-2 uppercase tracking-wide">Manage Custom Categories</p>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {customCategories.map(cat => (
                          <div key={cat} className="flex items-center gap-2 bg-gray-50 rounded px-3 py-2">
                            {editingCategory === cat ? (
                              <>
                                <input
                                  type="text"
                                  value={editCategoryName}
                                  onChange={(e) => setEditCategoryName(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      e.preventDefault();
                                      handleSaveEdit();
                                    } else if (e.key === 'Escape') {
                                      handleCancelEdit();
                                    }
                                  }}
                                  className="flex-1 py-1 px-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  autoFocus
                                />
                                <button
                                  type="button"
                                  onClick={handleSaveEdit}
                                  className="text-green-600 hover:text-green-700 p-1"
                                  title="Save"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                </button>
                                <button
                                  type="button"
                                  onClick={handleCancelEdit}
                                  className="text-gray-500 hover:text-gray-700 p-1"
                                  title="Cancel"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </>
                            ) : (
                              <>
                                <span className="flex-1 text-sm text-gray-700">{cat}</span>
                                <button
                                  type="button"
                                  onClick={() => handleEditCategory(cat)}
                                  className="text-blue-500 hover:text-blue-700 p-1"
                                  title="Edit"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteCategory(cat)}
                                  className="text-red-500 hover:text-red-700 p-1"
                                  title="Delete"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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
                  {isSubmitting 
                    ? (isEditMode ? 'Updating...' : 'Publishing...') 
                    : (isEditMode ? 'Update Post' : 'Publish Post')
                  }
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
