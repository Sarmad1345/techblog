import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Default blog posts
const defaultBlogPosts = [
  {
    id: 1,
    title: "The Future of Artificial Intelligence in 2024",
    excerpt: "Exploring the latest trends and breakthroughs in AI technology that are shaping our world.",
    category: "AI & Machine Learning",
    date: "January 15, 2024",
    readTime: "8 min read",
    author: "TechBlog Team",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    fullContent: `# The Future of Artificial Intelligence in 2024

Artificial Intelligence continues to evolve at an unprecedented pace. In 2024, we're seeing remarkable breakthroughs that are transforming industries.

## Key Developments

**Large Language Models** have become more sophisticated, with improved reasoning capabilities and reduced hallucinations. Companies are deploying AI assistants that can handle complex tasks.

### Industry Impact

The healthcare sector is leveraging AI for early disease detection, while finance uses it for fraud prevention. Manufacturing benefits from predictive maintenance powered by AI.

\`\`\`
// Example AI integration
const aiAssistant = new AIAssistant({
  model: 'gpt-4',
  capabilities: ['reasoning', 'coding', 'analysis']
});
\`\`\`

The future looks promising as AI becomes more accessible and powerful.`
  },
  {
    id: 2,
    title: "Mastering React Hooks: A Complete Guide",
    excerpt: "Deep dive into React Hooks and learn how to build efficient, modern React applications.",
    category: "Web Development",
    date: "January 12, 2024",
    readTime: "12 min read",
    author: "TechBlog Team",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
    fullContent: `# Mastering React Hooks

React Hooks revolutionized how we write React components. This guide covers everything you need to know.

## useState Hook

The **useState** hook allows functional components to manage state.

\`\`\`
const [count, setCount] = useState(0);
\`\`\`

## useEffect Hook

**useEffect** handles side effects in functional components.

### Best Practices

Always include dependencies in the dependency array to avoid infinite loops.`
  },
  {
    id: 3,
    title: "Cloud Computing Best Practices for 2024",
    excerpt: "Essential strategies for optimizing cloud infrastructure and reducing costs.",
    category: "Cloud Computing",
    date: "January 10, 2024",
    readTime: "10 min read",
    author: "TechBlog Team",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
    fullContent: `# Cloud Computing Best Practices

Cloud computing has become the backbone of modern applications. Here are best practices for 2024.

## Cost Optimization

**Right-sizing** your resources is crucial. Monitor usage patterns and adjust accordingly.

## Security First

Always implement proper access controls and encryption.`
  },
  {
    id: 4,
    title: "Cybersecurity Essentials for Developers",
    excerpt: "Learn critical security practices every developer should know to protect applications.",
    category: "Security",
    date: "January 8, 2024",
    readTime: "15 min read",
    author: "TechBlog Team",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
    fullContent: `# Cybersecurity Essentials

Security is paramount in modern development. Here are essential practices.

## Authentication

Implement strong authentication mechanisms. Use OAuth 2.0 or JWT tokens.

## Data Encryption

Always encrypt sensitive data both in transit and at rest.`
  },
  {
    id: 5,
    title: "DevOps Automation: CI/CD Pipeline Setup",
    excerpt: "Step-by-step guide to setting up automated deployment pipelines.",
    category: "DevOps",
    date: "January 5, 2024",
    readTime: "14 min read",
    author: "TechBlog Team",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=600&fit=crop",
    fullContent: `# DevOps Automation

CI/CD pipelines automate the software delivery process.

## Continuous Integration

Automate testing and building on every commit.

## Continuous Deployment

Deploy automatically after successful tests.`
  },
  {
    id: 6,
    title: "Building Scalable Backend Architectures",
    excerpt: "Design patterns and strategies for creating robust backend systems.",
    category: "Backend",
    date: "January 3, 2024",
    readTime: "11 min read",
    author: "TechBlog Team",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
    fullContent: `# Scalable Backend Architectures

Building scalable backends requires careful planning.

## Microservices

Break down applications into smaller, independent services.

## Load Balancing

Distribute traffic across multiple servers for better performance.`
  }
];

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

