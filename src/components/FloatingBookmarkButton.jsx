import { memo, useState } from 'react';
import { useBlogStore } from '../stores/blogStore';
import { useNavigationStore } from '../stores/navigationStore';

const FloatingBookmarkButton = memo(() => {
  const bookmarks = useBlogStore((state) => state.bookmarks);
  const navigate = useNavigationStore((state) => state.navigate);
  const currentPage = useNavigationStore((state) => state.currentPage);
  const [isHovered, setIsHovered] = useState(false);

  // Don't show on bookmarks page
  if (currentPage === 'bookmarks') return null;

  return (
    <button
      onClick={() => navigate('bookmarks', {})}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="View saved articles"
    >
      {/* Main Button */}
      <div className={`
        relative flex items-center gap-2 px-4 py-3 
        bg-gradient-to-r from-yellow-400 to-amber-500 
        text-white font-semibold rounded-full 
        shadow-lg shadow-yellow-500/30
        hover:shadow-xl hover:shadow-yellow-500/40
        hover:scale-105 active:scale-95
        transition-all duration-300 ease-out
        ${isHovered ? 'pr-32' : 'pr-4'}
      `}>
        {/* Bookmark Icon */}
        <svg 
          className="w-6 h-6 flex-shrink-0" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
        
        {/* Text - shows on hover */}
        <span className={`
          whitespace-nowrap overflow-hidden
          transition-all duration-300 ease-out
          ${isHovered ? 'w-20 opacity-100' : 'w-0 opacity-0'}
        `}>
          Saved
        </span>

        {/* Badge Count */}
        {bookmarks.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold shadow-md animate-pulse">
            {bookmarks.length > 99 ? '99+' : bookmarks.length}
          </span>
        )}
      </div>

      {/* Tooltip - shows when no bookmarks */}
      {bookmarks.length === 0 && isHovered && (
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap shadow-lg">
          No saved articles yet
          <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
        </div>
      )}
    </button>
  );
});

FloatingBookmarkButton.displayName = 'FloatingBookmarkButton';

export default FloatingBookmarkButton;

