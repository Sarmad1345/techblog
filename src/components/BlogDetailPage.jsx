import { memo } from 'react';
import { useBlogStore } from '../stores/blogStore';
import Header from './Header';
import Footer from './Footer';
import ShareButton from './ShareButton';

const BlogDetailPage = memo(({ postId, onBack }) => {
  const getPostById = useBlogStore((state) => state.getPostById);
  const post = getPostById(postId);

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

            <div className="mt-12 pt-8 border-t border-gray-200">
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
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
});

BlogDetailPage.displayName = 'BlogDetailPage';

export default BlogDetailPage;
