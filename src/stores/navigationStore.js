import { create } from 'zustand';

// Navigation Store
export const useNavigationStore = create((set, get) => ({
  currentPage: 'home',
  pageData: {},
  isTransitioning: false,
  scrollPosition: 0,
  
  // Actions
  navigate: (page, data = {}) => {
    const currentPage = get().currentPage;
    
    // Save scroll position if on home page
    if (currentPage === 'home') {
      set({ scrollPosition: window.scrollY || window.pageYOffset || document.documentElement.scrollTop });
    }
    
    set({ 
      isTransitioning: true,
      pageData: data 
    });
    
    setTimeout(() => {
      set({ 
        currentPage: page,
        isTransitioning: false 
      });
      
      // Scroll to top for detail pages, restore for home
      if (page === 'home') {
        setTimeout(() => {
          window.scrollTo({ top: get().scrollPosition, behavior: 'auto' });
        }, 50);
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    }, 200);
  },
  
  goBack: () => {
    const scrollPosition = get().scrollPosition;
    set({ 
      isTransitioning: true,
      pageData: {} 
    });
    
    setTimeout(() => {
      set({ 
        currentPage: 'home',
        isTransitioning: false 
      });
      
      setTimeout(() => {
        window.scrollTo({ top: scrollPosition, behavior: 'auto' });
      }, 50);
    }, 200);
  },
  
  scrollToTop: () => {
    set({ scrollPosition: 0 });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}));

