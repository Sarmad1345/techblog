import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// No default posts - only dynamically added posts will show
const defaultBlogPosts = [];

// Blog Store with Zustand
export const useBlogStore = create(
  persist(
    (set, get) => ({
      // State - merge default posts with localStorage posts on init
      posts: (() => {
        try {
          const stored = localStorage.getItem('blog-storage');
          if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.state?.posts) {
              // Merge: default posts + stored posts (avoid duplicates by ID)
              const storedIds = new Set(parsed.state.posts.map(p => p.id));
              const defaultOnly = defaultBlogPosts.filter(p => !storedIds.has(p.id));
              return [...parsed.state.posts, ...defaultOnly];
            }
          }
        } catch (e) {
          console.error('Error loading posts from storage:', e);
        }
        return defaultBlogPosts;
      })(),
      
      // Actions
      addPost: (newPost) => {
        const posts = get().posts;
        const newId = Math.max(100, ...posts.map(p => p.id), 0) + 1;
        const postToAdd = {
          ...newPost,
          id: newId,
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        };
        set({ posts: [postToAdd, ...posts] });
        return true;
      },
      
      getPostById: (id) => {
        return get().posts.find(post => post.id === parseInt(id));
      },
      
      getPostsByCategory: (category) => {
        return get().posts.filter(post => 
          post.category.toLowerCase() === category.toLowerCase() ||
          post.category.toLowerCase().replace(/\s+/g, '-') === category.toLowerCase()
        );
      },
      
      getAllCategories: () => {
        const posts = get().posts;
        const categories = [...new Set(posts.map(post => post.category))];
        return categories.map(cat => {
          const slug = cat.toLowerCase().replace(/\s+/g, '-');
          const posts = get().getPostsByCategory(cat);
          return {
            name: cat,
            slug,
            count: posts.length
          };
        });
      },
      
      searchPosts: (query) => {
        if (!query || query.trim() === '') return [];
        const searchTerm = query.toLowerCase().trim();
        return get().posts.filter(post => {
          const titleMatch = post.title.toLowerCase().includes(searchTerm);
          const excerptMatch = post.excerpt.toLowerCase().includes(searchTerm);
          const categoryMatch = post.category.toLowerCase().includes(searchTerm);
          const contentMatch = post.fullContent?.toLowerCase().includes(searchTerm);
          return titleMatch || excerptMatch || categoryMatch || contentMatch;
        });
      }
    }),
    {
      name: 'blog-storage',
      partialize: (state) => ({ posts: state.posts }),
    }
  )
);

