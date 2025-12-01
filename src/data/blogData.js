// Get custom posts from localStorage
const getCustomPosts = () => {
  try {
    const customPosts = localStorage.getItem('customBlogPosts');
    return customPosts ? JSON.parse(customPosts) : [];
  } catch (error) {
    return [];
  }
};

// Complete blog posts data with full content
const defaultBlogPosts = [
  {
    id: 1,
    title: "The Future of Artificial Intelligence in 2024",
    excerpt: "Explore how AI is transforming industries and what to expect in the coming year. From machine learning to neural networks, discover the latest breakthroughs.",
    fullContent: `# The Future of Artificial Intelligence in 2024

Artificial Intelligence has been one of the most transformative technologies of the 21st century, and 2024 promises to be a groundbreaking year for AI development. In this comprehensive guide, we'll explore the latest trends, breakthroughs, and what the future holds.

## The Current State of AI

As we enter 2024, AI has already revolutionized numerous industries. From healthcare to finance, transportation to entertainment, AI systems are becoming increasingly sophisticated and integrated into our daily lives.

### Key Developments in 2024

**1. Large Language Models Evolution**
The evolution of language models continues at an unprecedented pace. Models are becoming more efficient, requiring less computational power while delivering better results. This democratization of AI technology means more businesses can leverage powerful AI capabilities.

**2. Multimodal AI Systems**
We're seeing a rise in AI systems that can process and understand multiple types of data simultaneously - text, images, audio, and video. This creates more natural and intuitive AI interactions.

**3. AI in Healthcare**
AI is making significant strides in medical diagnosis, drug discovery, and personalized treatment plans. Machine learning algorithms can now analyze medical images with accuracy that rivals or exceeds human experts.

**4. Autonomous Systems**
Self-driving cars, drones, and robotic systems are becoming more reliable and widespread. These systems rely on advanced AI for perception, decision-making, and control.

## Industry Transformations

### Healthcare Revolution
AI-powered diagnostic tools are helping doctors detect diseases earlier and more accurately. Predictive analytics are improving patient outcomes by identifying at-risk individuals before symptoms appear.

### Financial Services
Fraud detection, algorithmic trading, and personalized financial advice are all being enhanced by AI. Banks are using AI to improve customer service and streamline operations.

### Education
Personalized learning platforms adapt to each student's needs, providing customized educational experiences. AI tutors are available 24/7 to help students learn at their own pace.

## Challenges and Considerations

While AI offers tremendous benefits, we must also consider:

- **Ethical Implications**: Ensuring AI systems are fair, transparent, and unbiased
- **Job Displacement**: Preparing the workforce for an AI-driven economy
- **Privacy Concerns**: Balancing innovation with data protection
- **Regulation**: Developing appropriate frameworks for AI governance

## Looking Ahead

The future of AI is bright, with continued innovation expected in:
- Quantum computing integration
- More efficient training methods
- Better human-AI collaboration
- Enhanced creativity and problem-solving capabilities

As we navigate this exciting landscape, it's crucial to stay informed and engaged with AI developments. The technology is here to stay, and understanding it will be essential for success in the coming years.`,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    category: "AI & Machine Learning",
    date: "March 15, 2024",
    readTime: "5 min read",
    author: "TechBlog Team"
  },
  {
    id: 2,
    title: "Complete Guide to React 19: What's New?",
    excerpt: "Dive deep into React 19's new features, including server components, improved hooks, and performance optimizations that will change how you build apps.",
    fullContent: `# Complete Guide to React 19: What's New?

React 19 represents a significant evolution in the React ecosystem, introducing powerful new features that make building modern web applications more efficient and enjoyable. Let's explore what's new and how it will impact your development workflow.

## Major New Features

### Server Components
One of the most anticipated features, Server Components allow you to build applications that leverage both server and client rendering. This means:

- **Better Performance**: Components can render on the server, reducing JavaScript bundle size
- **Direct Database Access**: Server components can directly access databases and APIs
- **Improved Security**: Sensitive code and data stay on the server

### Improved Hooks API
React 19 introduces several enhancements to the hooks system:

**use() Hook**
A new hook that allows you to read the value of a Promise or context. This simplifies async data fetching and makes code more readable.

**useOptimistic Hook**
Perfect for optimistic UI updates, this hook allows you to immediately update the UI while a server request is in progress, then revert if the request fails.

### Enhanced Concurrent Features
React 19 improves concurrent rendering capabilities, making applications feel more responsive:

- Better prioritization of updates
- Improved handling of user interactions
- Smoother animations and transitions

## Performance Improvements

### Automatic Batching
React 19 automatically batches more state updates, reducing unnecessary re-renders and improving performance.

### Better Tree Shaking
The new compiler optimizes bundle sizes by removing unused code more effectively.

### Improved DevTools
Enhanced debugging capabilities make it easier to identify performance bottlenecks and understand component behavior.

## Migration Guide

If you're upgrading from React 18, here's what you need to know:

1. **Breaking Changes**: Some deprecated APIs have been removed
2. **New Compiler**: Consider using the new React compiler for better performance
3. **TypeScript**: Update your TypeScript definitions
4. **Testing**: Update your testing setup to work with new features

## Best Practices

When adopting React 19:

- Start with Server Components for new features
- Gradually migrate existing components
- Take advantage of improved performance optimizations
- Update your build tools and dependencies

## Real-World Examples

Let's look at how these features work in practice:

\`\`\`jsx
// Server Component Example
async function BlogPost({ id }) {
  const post = await fetchPost(id); // Runs on server
  return <article>{post.content}</article>;
}

// use() Hook Example
function UserProfile({ userId }) {
  const user = use(fetchUser(userId));
  return <div>{user.name}</div>;
}
\`\`\`

## Conclusion

React 19 brings exciting new capabilities that will shape the future of React development. Whether you're building new applications or maintaining existing ones, these features offer significant benefits in terms of performance, developer experience, and application architecture.

Start experimenting with these features today and see how they can improve your React applications!`,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
    category: "Web Development",
    date: "March 12, 2024",
    readTime: "8 min read",
    author: "TechBlog Team"
  },
  {
    id: 3,
    title: "Cloud Computing Trends: AWS vs Azure vs GCP",
    excerpt: "Compare the top cloud providers and understand which platform suits your needs. We break down pricing, features, and use cases for each.",
    fullContent: `# Cloud Computing Trends: AWS vs Azure vs GCP

The cloud computing landscape is dominated by three major players: Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP). Each platform offers unique strengths and caters to different needs. Let's dive deep into comparing these cloud giants.

## Market Overview

As of 2024, AWS maintains the largest market share, followed by Azure and GCP. However, each platform has been rapidly innovating and expanding their services.

### AWS: The Pioneer
Amazon Web Services launched in 2006 and has been the market leader ever since. With over 200 services, AWS offers the most comprehensive cloud platform.

**Strengths:**
- Largest service catalog
- Extensive global infrastructure
- Strong enterprise support
- Mature ecosystem
- Excellent documentation

**Best For:**
- Startups and enterprises
- Companies needing extensive service options
- Organizations with complex infrastructure needs

### Azure: The Enterprise Choice
Microsoft Azure has strong integration with Microsoft's ecosystem, making it attractive for organizations already using Microsoft products.

**Strengths:**
- Seamless Microsoft integration
- Strong hybrid cloud capabilities
- Excellent enterprise support
- Growing AI/ML services
- Good compliance certifications

**Best For:**
- Microsoft-centric organizations
- Enterprise customers
- Hybrid cloud deployments
- Windows-based workloads

### GCP: The Innovation Leader
Google Cloud Platform leverages Google's expertise in data analytics, machine learning, and infrastructure.

**Strengths:**
- Superior data analytics (BigQuery)
- Excellent AI/ML tools
- Strong Kubernetes support
- Competitive pricing
- Innovative services

**Best For:**
- Data-driven companies
- AI/ML workloads
- Kubernetes-native applications
- Cost-conscious organizations

## Pricing Comparison

### Compute Services
- **AWS EC2**: Pay-as-you-go with various instance types
- **Azure Virtual Machines**: Similar pricing, good for Windows workloads
- **GCP Compute Engine**: Often more cost-effective, sustained use discounts

### Storage
- **AWS S3**: Industry standard, very reliable
- **Azure Blob Storage**: Competitive pricing, good integration
- **GCP Cloud Storage**: Competitive pricing, excellent performance

### Database Services
All three platforms offer managed database services, but with different strengths:
- AWS: RDS, DynamoDB, Redshift
- Azure: SQL Database, Cosmos DB, Synapse
- GCP: Cloud SQL, Firestore, BigQuery

## Use Case Recommendations

### For Startups
**AWS** or **GCP** - Both offer free tiers and startup programs. GCP often has better pricing for small workloads.

### For Enterprises
**Azure** or **AWS** - Both have strong enterprise features and support. Azure if you're Microsoft-centric, AWS for maximum flexibility.

### For AI/ML Projects
**GCP** - Superior AI/ML tools and data analytics capabilities.

### For Hybrid Cloud
**Azure** - Best hybrid cloud capabilities and integration.

## Migration Considerations

When choosing a platform, consider:

1. **Existing Infrastructure**: What systems are you already using?
2. **Team Expertise**: What skills does your team have?
3. **Compliance Requirements**: Which platform meets your regulatory needs?
4. **Cost Structure**: Understand pricing models and hidden costs
5. **Vendor Lock-in**: Consider multi-cloud strategies

## The Future of Cloud Computing

Looking ahead, we see trends toward:
- Multi-cloud strategies
- Serverless computing growth
- Edge computing expansion
- AI/ML integration
- Sustainability initiatives

## Conclusion

There's no one-size-fits-all answer. The best cloud platform depends on your specific needs, existing infrastructure, and long-term goals. Many organizations are adopting multi-cloud strategies to leverage the strengths of each platform.

Evaluate your requirements carefully, consider a proof-of-concept, and choose the platform that best aligns with your business objectives.`,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
    category: "Cloud Computing",
    date: "March 10, 2024",
    readTime: "6 min read",
    author: "TechBlog Team"
  },
  {
    id: 4,
    title: "Cybersecurity Best Practices for Developers",
    excerpt: "Learn essential security practices every developer should know. From authentication to encryption, protect your applications from threats.",
    fullContent: `# Cybersecurity Best Practices for Developers

In today's digital landscape, security is not optional—it's essential. As a developer, understanding and implementing security best practices is crucial for protecting your applications and users. This comprehensive guide covers the fundamental security practices every developer should know.

## The Security Mindset

Security should be integrated into every stage of development, not added as an afterthought. Adopting a security-first mindset means:

- Thinking about threats from the start
- Regular security audits
- Staying updated with security news
- Learning from security incidents

## Authentication and Authorization

### Strong Authentication
Implement robust authentication mechanisms:

- **Multi-Factor Authentication (MFA)**: Require multiple verification methods
- **Password Policies**: Enforce strong password requirements
- **Session Management**: Use secure, HTTP-only cookies
- **Token Expiration**: Implement reasonable token lifetimes

### Authorization Best Practices
- Principle of Least Privilege: Grant minimum necessary permissions
- Role-Based Access Control (RBAC): Organize permissions by roles
- Regular Access Reviews: Audit who has access to what

## Data Protection

### Encryption
- **In Transit**: Always use HTTPS/TLS
- **At Rest**: Encrypt sensitive data in databases
- **Key Management**: Use secure key storage solutions
- **Hashing**: Hash passwords with bcrypt or Argon2

### Data Handling
- **Input Validation**: Validate and sanitize all user inputs
- **SQL Injection Prevention**: Use parameterized queries
- **XSS Prevention**: Escape user-generated content
- **Data Minimization**: Only collect and store necessary data

## Secure Coding Practices

### Input Validation
Never trust user input. Always validate:

\`\`\`javascript
// Good: Validate input
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Bad: Trusting input
function processUserInput(input) {
  return eval(input); // Never do this!
}
\`\`\`

### Error Handling
- Don't expose sensitive information in error messages
- Log errors securely
- Provide generic error messages to users
- Include detailed errors in server logs only

### Dependency Management
- Regularly update dependencies
- Use dependency scanning tools
- Review dependency licenses
- Remove unused dependencies

## API Security

### RESTful API Best Practices
- Use HTTPS for all API calls
- Implement rate limiting
- Validate all inputs
- Use proper HTTP status codes
- Implement API versioning

### Authentication for APIs
- Use OAuth 2.0 or JWT tokens
- Implement token refresh mechanisms
- Validate tokens on every request
- Use short-lived tokens

## Common Vulnerabilities to Avoid

### OWASP Top 10
Familiarize yourself with the OWASP Top 10:

1. Broken Access Control
2. Cryptographic Failures
3. Injection
4. Insecure Design
5. Security Misconfiguration
6. Vulnerable Components
7. Authentication Failures
8. Software and Data Integrity Failures
9. Security Logging Failures
10. Server-Side Request Forgery

## Security Testing

### Types of Security Testing
- **Static Analysis**: Automated code scanning
- **Dynamic Analysis**: Runtime security testing
- **Penetration Testing**: Simulated attacks
- **Dependency Scanning**: Check for vulnerable packages

### Tools to Use
- OWASP ZAP for web app testing
- Snyk for dependency scanning
- SonarQube for code quality
- Burp Suite for penetration testing

## Incident Response

### Preparation
- Have an incident response plan
- Know who to contact
- Document procedures
- Regular drills and training

### During an Incident
1. Contain the threat
2. Assess the damage
3. Notify affected parties
4. Document everything
5. Learn and improve

## Compliance and Regulations

### Important Regulations
- **GDPR**: European data protection
- **CCPA**: California privacy law
- **HIPAA**: Healthcare data protection
- **PCI DSS**: Payment card security

### Best Practices
- Understand applicable regulations
- Implement privacy by design
- Regular compliance audits
- Document security measures

## Continuous Improvement

Security is an ongoing process:

- Stay informed about new threats
- Regularly update security measures
- Conduct security training
- Participate in security communities
- Learn from security incidents

## Conclusion

Security is a shared responsibility. By implementing these best practices, you can significantly reduce the risk of security breaches and protect your applications and users. Remember, security is not a one-time task but an ongoing commitment to protecting digital assets.

Start implementing these practices today, and make security a core part of your development process!`,
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
    category: "Security",
    date: "March 8, 2024",
    readTime: "7 min read",
    author: "TechBlog Team"
  },
  {
    id: 5,
    title: "Getting Started with TypeScript: A Comprehensive Guide",
    excerpt: "TypeScript brings static typing to JavaScript, making your code more robust and maintainable. Learn the fundamentals and best practices.",
    fullContent: `# Getting Started with TypeScript: A Comprehensive Guide

TypeScript has become the de facto standard for large-scale JavaScript development. This comprehensive guide will help you understand TypeScript's core concepts and get you started on your journey to writing better, more maintainable code.

## What is TypeScript?

TypeScript is a superset of JavaScript that adds static type definitions. It compiles to plain JavaScript, meaning any valid JavaScript code is also valid TypeScript code.

### Why Use TypeScript?

**Benefits:**
- **Type Safety**: Catch errors at compile time
- **Better IDE Support**: Enhanced autocomplete and refactoring
- **Improved Documentation**: Types serve as inline documentation
- **Easier Refactoring**: Safer code changes
- **Better Team Collaboration**: Clearer code contracts

## Getting Started

### Installation

\`\`\`bash
# Install TypeScript globally
npm install -g typescript

# Or use it in your project
npm install --save-dev typescript
\`\`\`

### Your First TypeScript File

\`\`\`typescript
// greeting.ts
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

console.log(greet("TypeScript"));
\`\`\`

### Compiling TypeScript

\`\`\`bash
tsc greeting.ts
\`\`\`

## Core Concepts

### Basic Types

TypeScript provides several basic types:

\`\`\`typescript
// Primitive types
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;

// Arrays
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["John", "Jane"];

// Tuples
let person: [string, number] = ["John", 30];

// Enums
enum Color {
  Red,
  Green,
  Blue
}
\`\`\`

### Interfaces

Interfaces define the structure of objects:

\`\`\`typescript
interface User {
  name: string;
  age: number;
  email?: string; // Optional property
}

const user: User = {
  name: "John",
  age: 30
};
\`\`\`

### Classes

TypeScript enhances JavaScript classes with type annotations:

\`\`\`typescript
class Person {
  private name: string;
  public age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(): string {
    return \`Hello, I'm \${this.name}\`;
  }
}
\`\`\`

### Generics

Generics allow you to create reusable components:

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("myString");
\`\`\`

## Advanced Features

### Union Types

\`\`\`typescript
type StringOrNumber = string | number;
\`\`\`

### Type Guards

\`\`\`typescript
function isString(value: any): value is string {
  return typeof value === "string";
}
\`\`\`

### Decorators

\`\`\`typescript
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class BugReport {
  type = "report";
}
\`\`\`

## Best Practices

### 1. Use Strict Mode
Enable strict type checking in tsconfig.json:

\`\`\`json
{
  "compilerOptions": {
    "strict": true
  }
}
\`\`\`

### 2. Avoid 'any'
Use specific types instead of 'any':

\`\`\`typescript
// Bad
function process(data: any) { }

// Good
function process(data: User) { }
\`\`\`

### 3. Use Interfaces for Object Shapes
\`\`\`typescript
interface Config {
  apiUrl: string;
  timeout: number;
}
\`\`\`

### 4. Leverage Type Inference
TypeScript can infer types, so you don't always need explicit annotations:

\`\`\`typescript
// TypeScript infers the type
const message = "Hello"; // string
\`\`\`

## TypeScript with React

### Functional Components

\`\`\`typescript
interface Props {
  name: string;
  age?: number;
}

const Greeting: React.FC<Props> = ({ name, age }) => {
  return <div>Hello, {name}!</div>;
};
\`\`\`

### Hooks with TypeScript

\`\`\`typescript
const [count, setCount] = useState<number>(0);
\`\`\`

## Common Patterns

### Utility Types

TypeScript provides useful utility types:

\`\`\`typescript
// Partial: Make all properties optional
type PartialUser = Partial<User>;

// Pick: Select specific properties
type UserName = Pick<User, 'name'>;

// Omit: Exclude specific properties
type UserWithoutEmail = Omit<User, 'email'>;
\`\`\`

## Conclusion

TypeScript is a powerful tool that can significantly improve your development experience. Start with the basics, gradually adopt more advanced features, and you'll soon appreciate the benefits of type safety in your JavaScript projects.

Remember, TypeScript is JavaScript with types—you can adopt it gradually and learn as you go!`,
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop",
    category: "Web Development",
    date: "March 20, 2024",
    readTime: "10 min read",
    author: "TechBlog Team"
  },
  {
    id: 6,
    title: "Docker Containerization: Simplifying Deployment",
    excerpt: "Master Docker and containerization to streamline your development workflow. From basics to advanced orchestration techniques.",
    fullContent: `# Docker Containerization: Simplifying Deployment

Docker has revolutionized how we develop, ship, and run applications. This guide will take you from Docker basics to advanced containerization techniques, helping you streamline your deployment process.

## What is Docker?

Docker is a platform that uses containerization technology to package applications and their dependencies into lightweight, portable containers. These containers can run consistently across different environments.

### Why Docker?

**Benefits:**
- **Consistency**: Works the same everywhere
- **Isolation**: Applications don't interfere with each other
- **Portability**: Run anywhere Docker runs
- **Scalability**: Easy to scale applications
- **Efficiency**: Better resource utilization than VMs

## Core Concepts

### Images vs Containers

- **Image**: A read-only template for creating containers
- **Container**: A running instance of an image

### Dockerfile

A Dockerfile defines how to build an image:

\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

## Getting Started

### Installation

Install Docker Desktop for your operating system from docker.com.

### Basic Commands

\`\`\`bash
# Build an image
docker build -t myapp .

# Run a container
docker run -p 3000:3000 myapp

# List running containers
docker ps

# Stop a container
docker stop <container-id>

# View logs
docker logs <container-id>
\`\`\`

## Docker Compose

Docker Compose allows you to define multi-container applications:

\`\`\`yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
  db:
    image: postgres:14
    environment:
      POSTGRES_PASSWORD: password
\`\`\`

Run with: \`docker-compose up\`

## Best Practices

### 1. Use .dockerignore
Exclude unnecessary files from your build context.

### 2. Multi-stage Builds
Reduce image size:

\`\`\`dockerfile
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
\`\`\`

### 3. Layer Caching
Order Dockerfile commands to maximize cache usage.

### 4. Security
- Use official base images
- Run as non-root user
- Keep images updated
- Scan for vulnerabilities

## Advanced Topics

### Docker Networking
- Bridge networks for container communication
- Custom networks for isolation
- Port mapping and exposure

### Volume Management
- Named volumes for data persistence
- Bind mounts for development
- Volume drivers for cloud storage

### Orchestration
- Docker Swarm for clustering
- Kubernetes for large-scale deployments
- Container orchestration best practices

## Real-World Examples

### Node.js Application

\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
USER node
EXPOSE 3000
CMD ["node", "server.js"]
\`\`\`

### Python Application

\`\`\`dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["python", "app.py"]
\`\`\`

## Troubleshooting

### Common Issues
- Container won't start: Check logs
- Port conflicts: Change port mappings
- Permission issues: Check user permissions
- Build failures: Review Dockerfile syntax

### Debugging
\`\`\`bash
# Execute commands in running container
docker exec -it <container> sh

# Inspect container
docker inspect <container>

# View resource usage
docker stats
\`\`\`

## Conclusion

Docker simplifies deployment and makes applications more portable and scalable. Start with the basics, practice with simple applications, and gradually adopt more advanced patterns. The containerization journey begins with a single Dockerfile!`,
    image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=600&fit=crop",
    category: "DevOps",
    date: "March 18, 2024",
    readTime: "12 min read",
    author: "TechBlog Team"
  },
  {
    id: 7,
    title: "Building Responsive UIs with Tailwind CSS",
    excerpt: "Create beautiful, responsive interfaces faster with Tailwind CSS. Discover utility-first CSS and modern design patterns.",
    fullContent: `# Building Responsive UIs with Tailwind CSS

Tailwind CSS has revolutionized how we build user interfaces. This utility-first CSS framework allows you to rapidly build modern, responsive designs without writing custom CSS. Let's explore how to master Tailwind CSS.

## What is Tailwind CSS?

Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs. Instead of pre-built components, you compose your design using utility classes.

### Why Tailwind?

**Advantages:**
- **Rapid Development**: Build UIs faster
- **Consistency**: Design system built-in
- **Responsive**: Mobile-first approach
- **Customizable**: Highly configurable
- **Small Bundle Size**: Only includes used classes

## Getting Started

### Installation

\`\`\`bash
npm install -D tailwindcss
npx tailwindcss init
\`\`\`

### Configuration

\`\`\`javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
\`\`\`

## Core Concepts

### Utility Classes

Tailwind uses utility classes for styling:

\`\`\`html
<div class="bg-blue-500 text-white p-4 rounded-lg">
  Hello Tailwind
</div>
\`\`\`

### Responsive Design

Tailwind uses mobile-first breakpoints:

\`\`\`html
<div class="text-sm md:text-base lg:text-lg">
  Responsive text
</div>
\`\`\`

### State Variants

\`\`\`html
<button class="bg-blue-500 hover:bg-blue-600 focus:ring-2">
  Click me
</button>
\`\`\`

## Common Patterns

### Cards

\`\`\`html
<div class="bg-white rounded-lg shadow-md p-6">
  <h2 class="text-2xl font-bold mb-4">Card Title</h2>
  <p class="text-gray-600">Card content</p>
</div>
\`\`\`

### Buttons

\`\`\`html
<button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
  Button
</button>
\`\`\`

### Forms

\`\`\`html
<input class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
\`\`\`

## Best Practices

### 1. Use @apply for Repeated Patterns
\`\`\`css
.btn-primary {
  @apply px-4 py-2 bg-blue-500 text-white rounded;
}
\`\`\`

### 2. Component Extraction
Extract repeated patterns into components.

### 3. Custom Configuration
Extend Tailwind's theme for your brand:

\`\`\`javascript
theme: {
  extend: {
    colors: {
      brand: '#1DA1F2',
    },
  },
}
\`\`\`

## Advanced Features

### Dark Mode

\`\`\`html
<div class="bg-white dark:bg-gray-800">
  Content
</div>
\`\`\`

### Custom Plugins

Create reusable utilities:

\`\`\`javascript
plugins: [
  function({ addUtilities }) {
    addUtilities({
      '.scrollbar-hide': {
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
      },
    })
  },
]
\`\`\`

## Performance Tips

- Use PurgeCSS (built-in)
- Avoid arbitrary values when possible
- Use JIT mode for development
- Optimize your configuration

## Conclusion

Tailwind CSS empowers you to build beautiful, responsive UIs quickly. Start with the basics, practice with real projects, and gradually explore advanced features. The utility-first approach might feel different at first, but you'll soon appreciate the speed and flexibility it provides!`,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
    category: "Web Development",
    date: "March 16, 2024",
    readTime: "8 min read",
    author: "TechBlog Team"
  },
  {
    id: 8,
    title: "Understanding GraphQL: The Modern API Query Language",
    excerpt: "Explore GraphQL's powerful querying capabilities and how it compares to REST APIs. Build efficient data-fetching solutions.",
    fullContent: `# Understanding GraphQL: The Modern API Query Language

GraphQL has emerged as a powerful alternative to REST APIs, offering more flexibility and efficiency in data fetching. This guide will help you understand GraphQL and how to use it effectively.

## What is GraphQL?

GraphQL is a query language for APIs and a runtime for executing those queries. It was developed by Facebook and provides a more efficient, powerful, and flexible alternative to REST.

### Key Benefits

- **Precise Data Fetching**: Get exactly what you need
- **Single Endpoint**: One endpoint for all operations
- **Strongly Typed**: Type system ensures data consistency
- **Introspection**: Self-documenting API
- **Real-time**: Subscriptions for live updates

## Core Concepts

### Queries

Fetch data with queries:

\`\`\`graphql
query {
  user(id: "1") {
    name
    email
    posts {
      title
    }
  }
}
\`\`\`

### Mutations

Modify data with mutations:

\`\`\`graphql
mutation {
  createPost(title: "New Post", content: "Content") {
    id
    title
  }
}
\`\`\`

### Subscriptions

Real-time updates:

\`\`\`graphql
subscription {
  postAdded {
    id
    title
  }
}
\`\`\`

## GraphQL vs REST

### REST Limitations
- Over-fetching: Get more data than needed
- Under-fetching: Need multiple requests
- Fixed endpoints: Less flexibility

### GraphQL Advantages
- Fetch exactly what you need
- Single request for related data
- Flexible query structure

## Setting Up GraphQL

### Server Setup (Node.js)

\`\`\`javascript
const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql\`
  type Query {
    hello: String
  }
\`;

const resolvers = {
  Query: {
    hello: () => 'Hello GraphQL!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(\`Server ready at \${url}\`);
});
\`\`\`

### Client Setup (React)

\`\`\`javascript
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});
\`\`\`

## Best Practices

### 1. Use Fragments
Reusable query parts:

\`\`\`graphql
fragment UserInfo on User {
  id
  name
  email
}
\`\`\`

### 2. Implement Pagination
\`\`\`graphql
query {
  posts(first: 10, after: "cursor") {
    edges {
      node {
        title
      }
    }
    pageInfo {
      hasNextPage
    }
  }
}
\`\`\`

### 3. Error Handling
Always handle errors gracefully.

### 4. Caching
Implement proper caching strategies.

## Common Patterns

### Authentication
Use context for authentication:

\`\`\`javascript
const server = new ApolloServer({
  context: ({ req }) => {
    const token = req.headers.authorization;
    return { user: getUser(token) };
  },
});
\`\`\`

### File Uploads
Use libraries like graphql-upload.

## Conclusion

GraphQL offers a modern approach to API design that can significantly improve your application's data fetching efficiency. Start with simple queries, gradually adopt more advanced features, and you'll soon see the benefits of this powerful technology!`,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
    category: "Backend",
    date: "March 14, 2024",
    readTime: "9 min read",
    author: "TechBlog Team"
  },
  {
    id: 9,
    title: "Mobile App Development: React Native vs Flutter",
    excerpt: "Compare React Native and Flutter to choose the right framework for your next mobile project. Performance, ecosystem, and developer experience.",
    fullContent: `# Mobile App Development: React Native vs Flutter

Choosing the right framework for mobile app development is crucial. React Native and Flutter are two of the most popular cross-platform frameworks. Let's compare them to help you make an informed decision.

## React Native

React Native, developed by Facebook, allows you to build mobile apps using React and JavaScript.

### Strengths
- **JavaScript/TypeScript**: Familiar language for web developers
- **Large Community**: Extensive ecosystem and libraries
- **Hot Reload**: Fast development iteration
- **Native Modules**: Access to native device features
- **Mature Ecosystem**: Well-established with many resources

### Weaknesses
- **Performance**: Slightly slower than native
- **Platform Differences**: Some platform-specific code needed
- **Third-party Dependencies**: Can have compatibility issues

## Flutter

Flutter, developed by Google, uses Dart language and provides a complete UI toolkit.

### Strengths
- **Performance**: Near-native performance
- **Consistent UI**: Same look across platforms
- **Hot Reload**: Fast development
- **Rich Widgets**: Comprehensive UI components
- **Growing Ecosystem**: Rapidly expanding

### Weaknesses
- **Dart Language**: Less familiar to most developers
- **Larger App Size**: Apps tend to be larger
- **Newer**: Less mature than React Native

## Comparison

### Performance
Flutter generally has better performance due to compiled code, but React Native is catching up.

### Development Experience
Both offer excellent developer experiences with hot reload and good tooling.

### UI/UX
Flutter provides more consistent UI across platforms, while React Native feels more native.

### Learning Curve
React Native is easier if you know React/JavaScript. Flutter requires learning Dart.

## When to Choose What?

### Choose React Native If:
- Your team knows JavaScript/React
- You need to share code with web app
- You want access to many third-party libraries
- You prioritize development speed

### Choose Flutter If:
- Performance is critical
- You want consistent UI across platforms
- You're building a new app from scratch
- You want Google's backing

## Conclusion

Both frameworks are excellent choices. React Native suits JavaScript developers and existing React projects, while Flutter offers better performance and UI consistency. Consider your team's skills, project requirements, and long-term goals when making your decision.`,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
    category: "Mobile Development",
    date: "March 13, 2024",
    readTime: "11 min read",
    author: "TechBlog Team"
  },
  {
    id: 10,
    title: "Database Design Best Practices for Scalable Applications",
    excerpt: "Learn how to design databases that scale. From normalization to indexing strategies, optimize your data architecture.",
    fullContent: `# Database Design Best Practices for Scalable Applications

Good database design is the foundation of scalable applications. This guide covers essential principles and practices for designing databases that can grow with your application.

## Fundamental Principles

### Normalization
Normalize your database to reduce redundancy:
- First Normal Form (1NF): Eliminate duplicate columns
- Second Normal Form (2NF): Remove partial dependencies
- Third Normal Form (3NF): Remove transitive dependencies

### Denormalization
Sometimes denormalize for performance:
- Read-heavy workloads
- Complex joins
- Reporting systems

## Indexing Strategies

### When to Index
- Foreign keys
- Frequently queried columns
- Columns used in WHERE clauses
- Columns used for sorting

### Index Types
- **B-tree**: Default, good for most cases
- **Hash**: Fast equality lookups
- **Composite**: Multiple columns
- **Partial**: Filtered indexes

## Scalability Patterns

### Vertical Scaling
- Increase server resources
- Limited by hardware
- Easier to implement

### Horizontal Scaling
- Add more servers
- Sharding strategies
- More complex but more scalable

## Best Practices

### 1. Use Appropriate Data Types
Choose the right data type for each column to optimize storage and performance.

### 2. Design for Queries
Structure your database based on how you'll query it.

### 3. Plan for Growth
Design with scalability in mind from the start.

### 4. Monitor Performance
Regularly analyze query performance and optimize.

## Conclusion

Good database design requires balancing normalization, performance, and scalability. Start with solid fundamentals, monitor your application's needs, and adjust your design as you grow.`,
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=600&fit=crop",
    category: "Database",
    date: "March 11, 2024",
    readTime: "7 min read",
    author: "TechBlog Team"
  },
  {
    id: 11,
    title: "Microservices Architecture: Patterns and Anti-patterns",
    excerpt: "Navigate the complexities of microservices. Understand when to use them and how to avoid common pitfalls.",
    fullContent: `# Microservices Architecture: Patterns and Anti-patterns

Microservices architecture has become a popular approach for building scalable applications. This guide explores patterns that work and anti-patterns to avoid.

## What are Microservices?

Microservices are an architectural approach where applications are built as a collection of small, independent services.

### Benefits
- Independent deployment
- Technology diversity
- Scalability
- Fault isolation

### Challenges
- Distributed system complexity
- Data consistency
- Network latency
- Operational overhead

## Common Patterns

### API Gateway
Single entry point for all client requests.

### Service Discovery
Services find and communicate with each other.

### Circuit Breaker
Prevent cascading failures.

### Saga Pattern
Manage distributed transactions.

## Anti-patterns to Avoid

### 1. Too Many Small Services
Don't over-microservice. Balance is key.

### 2. Shared Databases
Each service should have its own database.

### 3. Ignoring Failure
Plan for and handle failures gracefully.

### 4. Premature Optimization
Start simple, scale when needed.

## Conclusion

Microservices can be powerful but require careful design. Understand your needs, start simple, and evolve your architecture as requirements grow.`,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
    category: "Architecture",
    date: "March 9, 2024",
    readTime: "14 min read",
    author: "TechBlog Team"
  },
  {
    id: 12,
    title: "JavaScript Performance Optimization Techniques",
    excerpt: "Boost your JavaScript application's performance with proven optimization strategies. From code splitting to lazy loading.",
    fullContent: `# JavaScript Performance Optimization Techniques

Performance is crucial for user experience. This guide covers proven techniques to optimize your JavaScript applications.

## Code Optimization

### Minimize Re-renders
- Use React.memo
- Implement useMemo and useCallback
- Optimize state management

### Bundle Optimization
- Code splitting
- Tree shaking
- Lazy loading

### Memory Management
- Avoid memory leaks
- Proper cleanup
- Efficient data structures

## Runtime Optimization

### Debouncing and Throttling
Control function execution frequency.

### Virtual Scrolling
Render only visible items.

### Web Workers
Offload heavy computations.

## Conclusion

Performance optimization is an ongoing process. Measure, identify bottlenecks, optimize, and repeat. Your users will thank you!`,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
    category: "Web Development",
    date: "March 7, 2024",
    readTime: "6 min read",
    author: "TechBlog Team"
  },
  {
    id: 13,
    title: "CI/CD Pipelines: Automating Your Deployment Process",
    excerpt: "Set up continuous integration and deployment pipelines. Automate testing, building, and deploying your applications.",
    fullContent: `# CI/CD Pipelines: Automating Your Deployment Process

Continuous Integration and Continuous Deployment (CI/CD) are essential for modern software development. This guide will help you set up effective CI/CD pipelines.

## What is CI/CD?

**CI (Continuous Integration)**: Automatically build and test code changes.

**CD (Continuous Deployment)**: Automatically deploy code to production.

## Benefits

- Faster releases
- Higher quality
- Reduced manual errors
- Better collaboration

## Pipeline Stages

### 1. Source
Code is committed to version control.

### 2. Build
Compile and build the application.

### 3. Test
Run automated tests.

### 4. Deploy
Deploy to staging/production.

## Popular Tools

- **GitHub Actions**: Integrated with GitHub
- **Jenkins**: Flexible and extensible
- **GitLab CI**: Built into GitLab
- **CircleCI**: Cloud-based solution

## Best Practices

1. Start simple
2. Automate everything
3. Test thoroughly
4. Monitor deployments
5. Rollback capability

## Conclusion

CI/CD pipelines are essential for modern development. Start with basic automation and gradually add more sophisticated features as your needs grow.`,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
    category: "DevOps",
    date: "March 5, 2024",
    readTime: "9 min read",
    author: "TechBlog Team"
  }
];

// Combine default and custom posts
export const getBlogPosts = () => {
  const customPosts = getCustomPosts();
  return [...defaultBlogPosts, ...customPosts];
};

// Export blogPosts as a getter function result
export const blogPosts = getBlogPosts();

// Get post by ID
export const getPostById = (id) => {
  const allPosts = getBlogPosts();
  return allPosts.find(post => post.id === parseInt(id));
};

// Get posts by category
export const getPostsByCategory = (category) => {
  const allPosts = getBlogPosts();
  return allPosts.filter(post => 
    post.category.toLowerCase() === category.toLowerCase() ||
    post.category.toLowerCase().replace(/\s+/g, '-') === category.toLowerCase()
  );
};

// Get all categories
export const getAllCategories = () => {
  const allPosts = getBlogPosts();
  const categories = [...new Set(allPosts.map(post => post.category))];
  return categories.map(cat => {
    const posts = getPostsByCategory(cat);
    return {
      name: cat,
      slug: cat.toLowerCase().replace(/\s+/g, '-'),
      count: posts.length
    };
  });
};

