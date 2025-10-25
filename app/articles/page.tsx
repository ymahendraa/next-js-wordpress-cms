import { getAllPosts, WordPressPost } from "../lib/wordpress";
import ArticleCard from "../components/ArticleCard";

export default async function ArticlesPage() {
  let posts: WordPressPost[] = [];

  try {
    posts = await getAllPosts(20); // Fetch up to 20 posts
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    posts = [];
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-16">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            All Articles
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our collection of insightful articles and stories
          </p>
        </div>

        {/* Articles Grid */}
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-6">📄</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              No Articles Found
            </h2>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              It looks like there are no published articles yet. Please check
              back later or contact the administrator.
            </p>
            <a
              href="/"
              className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
