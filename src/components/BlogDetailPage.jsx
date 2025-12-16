import { memo, useState } from 'react';
import { useBlogStore } from '../stores/blogStore';
import { useNavigationStore } from '../stores/navigationStore';
import { useToastStore } from './Toast';
import Header from './Header';
import Footer from './Footer';
import ShareButton from './ShareButton';

const BlogDetailPage = memo(({ postId, onBack }) => {
  const getPostById = useBlogStore((state) => state.getPostById);
  const deletePost = useBlogStore((state) => state.deletePost);
  const toggleBookmark = useBlogStore((state) => state.toggleBookmark);
  const isBookmarked = useBlogStore((state) => state.isBookmarked);
  const navigate = useNavigationStore((state) => state.navigate);
  const addToast = useToastStore((state) => state.addToast);
  
  const post = getPostById(postId);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookmarked, setBookmarked] = useState(isBookmarked(postId));

  const handleEdit = () => {
    navigate('edit-blog', { id: postId });
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    deletePost(postId);
    setShowDeleteModal(false);
    addToast('🗑️ Post deleted successfully', 'success');
    onBack();
  };

  const handleBookmarkToggle = () => {
    const newState = toggleBookmark(postId);
    setBookmarked(newState);
    if (newState) {
      addToast('📚 Article saved to bookmarks', 'success');
    } else {
      addToast('Removed from bookmarks', 'info');
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Home
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const formatContent = (content) => {
    const lines = content.split('\n');
    const elements = [];
    let inCodeBlock = false;
    let codeBlockContent = [];
    let codeBlockIndex = 0;

    lines.forEach((line, index) => {
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre key={`code-${codeBlockIndex}`} className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4">
              <code>{codeBlockContent.join('\n')}</code>
            </pre>
          );
          codeBlockContent = [];
          codeBlockIndex++;
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        return;
      }

      if (line.startsWith('# ')) {
        elements.push(<h1 key={index} className="text-4xl font-bold mt-8 mb-4 text-gray-900">{line.substring(2)}</h1>);
        return;
      }
      if (line.startsWith('## ')) {
        elements.push(<h2 key={index} className="text-3xl font-bold mt-6 mb-3 text-gray-800">{line.substring(3)}</h2>);
        return;
      }
      if (line.startsWith('### ')) {
        elements.push(<h3 key={index} className="text-2xl font-bold mt-4 mb-2 text-gray-800">{line.substring(4)}</h3>);
        return;
      }

      if (line.includes('**')) {
        const parts = line.split('**');
        elements.push(
          <p key={index} className="mb-4 text-gray-700 leading-relaxed">
            {parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="font-semibold">{part}</strong> : part)}
          </p>
        );
        return;
      }

      if (line.trim()) {
        elements.push(<p key={index} className="mb-4 text-gray-700 leading-relaxed">{line}</p>);
        return;
      }
    });

    if (inCodeBlock && codeBlockContent.length > 0) {
      elements.push(
        <pre key={`code-${codeBlockIndex}`} className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4">
          <code>{codeBlockContent.join('\n')}</code>
        </pre>
      );
    }

    return elements;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <div className="relative h-64 md:h-96 overflow-hidden bg-gray-900">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="max-w-4xl mx-auto">
              <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">{post.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-200">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
                <span>•</span>
                <span>{post.author}</span>
              </div>
            </div>
          </div>
        </div>

        <article className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              {formatContent(post.fullContent)}
            </div>

            {/* Action Buttons - Edit, Delete, Bookmark */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                {/* Bookmark Button */}
                <button
                  onClick={handleBookmarkToggle}
                  className={`inline-flex items-center px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    bookmarked
                      ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill={bookmarked ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                  {bookmarked ? 'Saved' : 'Save Article'}
                </button>

                {/* Edit Button */}
                <button
                  onClick={handleEdit}
                  className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition-all duration-300"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit Post
                </button>

                {/* Delete Button */}
                <button
                  onClick={handleDelete}
                  className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 transition-all duration-300"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Delete Post
                </button>
              </div>

              <ShareButton 
                title={post.title}
                url={`${window.location.origin}${window.location.pathname}#/blog/${postId}`}
                description={`Check out this article: ${post.title}`}
              />
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <button
                onClick={onBack}
                className="inline-flex items-center text-blue-500 hover:text-blue-600 font-semibold transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Articles
              </button>
            </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-fadeIn">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Post</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this post? This action cannot be undone.</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
});

BlogDetailPage.displayName = 'BlogDetailPage';

export default BlogDetailPage;
