import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Default category for posts without a category
export const DEFAULT_CATEGORY = 'Uncategorized';

// Blog Store with Zustand
export const useBlogStore = create(
  persist(
    (set, get) => ({
      // State - posts (empty by default, will be hydrated from localStorage)
      posts: [],
      
      // State - bookmarks (array of post IDs)
      bookmarks: [],
      
      // State - custom categories (user-created categories)
      customCategories: [],
      
      // Actions - Add Post
      addPost: (newPost) => {
        const posts = get().posts;
        const newId = Math.max(100, ...posts.map(p => p.id), 0) + 1;
        const postToAdd = {
          ...newPost,
          id: newId,
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        };
        set({ posts: [postToAdd, ...posts] });
        return newId;
      },
      
      // Actions - Update Post
      updatePost: (id, updatedData) => {
        const posts = get().posts;
        const postIndex = posts.findIndex(post => post.id === parseInt(id));
        if (postIndex === -1) return false;
        
        const updatedPosts = [...posts];
        updatedPosts[postIndex] = {
          ...updatedPosts[postIndex],
          ...updatedData,
          id: parseInt(id), // Keep original ID
          updatedAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        };
        set({ posts: updatedPosts });
        return true;
      },
      
      // Actions - Delete Post
      deletePost: (id) => {
        const posts = get().posts;
        const bookmarks = get().bookmarks;
        const filteredPosts = posts.filter(post => post.id !== parseInt(id));
        const filteredBookmarks = bookmarks.filter(bookmarkId => bookmarkId !== parseInt(id));
        set({ posts: filteredPosts, bookmarks: filteredBookmarks });
        return true;
      },
      
      // Actions - Toggle Bookmark
      toggleBookmark: (id) => {
        const bookmarks = get().bookmarks;
        const postId = parseInt(id);
        if (bookmarks.includes(postId)) {
          set({ bookmarks: bookmarks.filter(b => b !== postId) });
          return false; // Removed from bookmarks
        } else {
          set({ bookmarks: [...bookmarks, postId] });
          return true; // Added to bookmarks
        }
      },
      
      // Actions - Add Custom Category
      addCategory: (categoryName) => {
        const trimmedName = categoryName.trim();
        if (!trimmedName) return false;
        
        const customCategories = get().customCategories;
        const posts = get().posts;
        
        // Check if category already exists (in custom categories or from posts)
        const existingFromPosts = posts.map(p => p.category.toLowerCase());
        const existingCustom = customCategories.map(c => c.toLowerCase());
        
        if (
          trimmedName.toLowerCase() === DEFAULT_CATEGORY.toLowerCase() ||
          existingFromPosts.includes(trimmedName.toLowerCase()) ||
          existingCustom.includes(trimmedName.toLowerCase())
        ) {
          return false; // Category already exists
        }
        
        set({ customCategories: [...customCategories, trimmedName] });
        return true;
      },
      
      // Actions - Update Custom Category (rename)
      updateCategory: (oldName, newName) => {
        const trimmedNewName = newName.trim();
        if (!trimmedNewName || oldName === trimmedNewName) return false;
        
        const customCategories = get().customCategories;
        const posts = get().posts;
        
        // Check if new name already exists
        const existingFromPosts = posts.map(p => p.category.toLowerCase());
        const existingCustom = customCategories.map(c => c.toLowerCase());
        
        if (
          trimmedNewName.toLowerCase() === DEFAULT_CATEGORY.toLowerCase() ||
          existingFromPosts.includes(trimmedNewName.toLowerCase()) ||
          existingCustom.includes(trimmedNewName.toLowerCase())
        ) {
          return false; // Category already exists
        }
        
        // Update custom categories
        const updatedCustomCategories = customCategories.map(c => 
          c === oldName ? trimmedNewName : c
        );
        
        // Update all posts that use this category
        const updatedPosts = posts.map(post => 
          post.category === oldName 
            ? { ...post, category: trimmedNewName }
            : post
        );
        
        set({ customCategories: updatedCustomCategories, posts: updatedPosts });
        return true;
      },
      
      // Actions - Delete Custom Category
      deleteCategory: (categoryName) => {
        const customCategories = get().customCategories;
        const posts = get().posts;
        
        // Update posts with this category to DEFAULT_CATEGORY
        const updatedPosts = posts.map(post => 
          post.category === categoryName 
            ? { ...post, category: DEFAULT_CATEGORY }
            : post
        );
        
        set({ 
          customCategories: customCategories.filter(c => c !== categoryName),
          posts: updatedPosts
        });
        return true;
      },
      
      // Getters - Check if bookmarked
      isBookmarked: (id) => {
        return get().bookmarks.includes(parseInt(id));
      },
      
      // Getters - Get all bookmarked posts
      getBookmarkedPosts: () => {
        const posts = get().posts;
        const bookmarks = get().bookmarks;
        return posts.filter(post => bookmarks.includes(post.id));
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
        const customCategories = get().customCategories;
        const categoriesFromPosts = [...new Set(posts.map(post => post.category))];
        
        // Combine categories from posts and custom categories
        const combinedCategories = [...new Set([...categoriesFromPosts, ...customCategories])];
        
        // Always include DEFAULT_CATEGORY as an option
        const allCategories = combinedCategories.includes(DEFAULT_CATEGORY) 
          ? combinedCategories 
          : [DEFAULT_CATEGORY, ...combinedCategories];
        
        return allCategories.map(cat => {
          const slug = cat.toLowerCase().replace(/\s+/g, '-');
          const catPosts = get().getPostsByCategory(cat);
          return {
            name: cat,
            slug,
            count: catPosts.length
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
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        posts: state.posts, 
        bookmarks: state.bookmarks, 
        customCategories: state.customCategories 
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error('Error rehydrating storage:', error);
        } else {
          console.log('Blog storage rehydrated successfully', state);
        }
      },
    }
  )
);

