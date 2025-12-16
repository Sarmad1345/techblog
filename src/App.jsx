import { useEffect } from "react";
import { MAINTENANCE_MODE } from "./config/maintenance";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FeaturedSection from "./components/FeaturedSection";
import BlogSection from "./components/BlogSection";
import CategoriesSection from "./components/CategoriesSection";
import AboutMe from "./components/AboutMe";
import ContentSection from "./components/ContentSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import BlogDetailPage from "./components/BlogDetailPage";
import CategoryPage from "./components/CategoryPage";
import SearchResultsPage from "./components/SearchResultsPage";
import AddBlogPage from "./components/AddBlogPage";
import BookmarksPage from "./components/BookmarksPage";
import FloatingBookmarkButton from "./components/FloatingBookmarkButton";
import ToastContainer from "./components/Toast";
import { useNavigationStore } from "./stores/navigationStore";

// Maintenance Page Component
const MaintenancePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-6">
            <svg
              className="w-16 h-16 text-indigo-600 animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-5xl font-bold text-gray-900 mb-4 animate-slideDown">
          Website Under Maintenance
        </h1>

        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          We're currently working on improving your experience.
          <br />
          <span className="font-semibold text-indigo-600">
            Please wait for a few hours while we make things better.
          </span>
        </p>

        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <p className="text-gray-500 text-sm">
            Thank you for your patience. We'll be back soon with exciting
            updates!
          </p>
        </div>
      </div>
    </div>
  );
};

function App() {
  const { currentPage, pageData, isTransitioning, navigate, goBack } =
    useNavigationStore();

  // Handle browser navigation (hash changes, back/forward)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#/blog/")) {
        const id = hash.split("/").pop();
        navigate("blog", { id: parseInt(id) });
      } else if (hash.startsWith("#/categories/")) {
        const category = hash.split("/").pop();
        navigate("category", { category });
      } else if (hash.startsWith("#/search")) {
        const urlParams = new URLSearchParams(hash.split("?")[1]);
        const query = urlParams.get("q") || "";
        navigate("search", { query });
      } else if (hash.startsWith("#/edit-blog/")) {
        const id = hash.split("/").pop();
        navigate("edit-blog", { id: parseInt(id) });
      } else if (hash.startsWith("#/bookmarks")) {
        navigate("bookmarks", {});
      } else if (hash.startsWith("#/add-blog")) {
        navigate("add-blog", {});
      } else {
        navigate("home", {});
      }
    };

    // Listen for custom navigate events
    const handleNavigate = (event) => {
      const { page, id, category, query } = event.detail;

      // Update URL hash
      let newHash = "";
      if (page === "blog") {
        newHash = `#/blog/${id}`;
      } else if (page === "category") {
        newHash = `#/categories/${category}`;
      } else if (page === "search") {
        newHash = `#/search?q=${encodeURIComponent(query)}`;
      } else if (page === "edit-blog") {
        newHash = `#/edit-blog/${id}`;
      } else if (page === "bookmarks") {
        newHash = `#/bookmarks`;
      } else if (page === "add-blog") {
        newHash = `#/add-blog`;
      }

      if (window.location.hash !== newHash) {
        window.history.pushState(null, "", newHash || window.location.pathname);
      }

      navigate(page, { id, category, query });
    };

    window.addEventListener("navigate", handleNavigate);
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handleHashChange);

    // Check initial hash on mount
    handleHashChange();

    return () => {
      window.removeEventListener("navigate", handleNavigate);
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handleHashChange);
    };
  }, [navigate]);

  // Check if maintenance mode is enabled
  if (MAINTENANCE_MODE) {
    return <MaintenancePage />;
  }

  // Render based on current page
  const renderPage = () => {
    if (currentPage === "blog") {
      return <BlogDetailPage postId={pageData.id} onBack={goBack} />;
    }

    if (currentPage === "category") {
      return <CategoryPage categoryName={pageData.category} onBack={goBack} />;
    }

    if (currentPage === "search") {
      return (
        <SearchResultsPage searchQuery={pageData.query || ""} onBack={goBack} />
      );
    }

    if (currentPage === "add-blog") {
      return <AddBlogPage onBack={goBack} />;
    }

    if (currentPage === "edit-blog") {
      return <AddBlogPage onBack={goBack} editPostId={pageData.id} />;
    }

    if (currentPage === "bookmarks") {
      return <BookmarksPage onBack={goBack} />;
    }

    // Home page
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <HeroSection />
          <FeaturedSection />
          <BlogSection />
          <CategoriesSection />
          <AboutMe />
          <ContentSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    );
  };

  return (
    <div
      className={`transition-opacity duration-200 ${
        isTransitioning ? "opacity-0" : "opacity-100"
      }`}
    >
      {renderPage()}
      <FloatingBookmarkButton />
      <ToastContainer />
    </div>
  );
}

export default App;
