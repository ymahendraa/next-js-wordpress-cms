import Link from "next/link";
import { getRecentPosts, WordPressPost } from "./lib/wordpress";
import ArticleCard from "./components/ArticleCard";

export default async function Home() {
  let recentPosts: WordPressPost[] = [];

  try {
    recentPosts = await getRecentPosts(3);
  } catch (error) {
    console.error("Failed to fetch recent posts:", error);
    recentPosts = [];
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight ">
            Welcome to LNK Blog
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-600 leading-relaxed">
            Discover insightful articles and stories about PT. Lautan Natural
            Krimerindo
          </p>
          <Link
            href="/articles"
            className="inline-flex items-center bg-linear-to-r from-purple-600 to-purple-900 text-white font-semibold py-4 px-8 rounded-lg hover:from-purple-700 hover:to-purple-950 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            Explore All Articles
          </Link>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              Latest Articles
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Stay up to date with our newest content and insights
            </p>
          </div>

          {recentPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {recentPosts.map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Articles Available
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                It looks like there are no published articles yet. Please check
                back later or contact the administrator.
              </p>
            </div>
          )}

          {recentPosts.length > 0 && (
            <div className="text-center">
              <Link
                href="/articles"
                className="inline-block bg-linear-to-r from-purple-600 to-purple-900 text-white font-semibold py-3 px-8 rounded-lg hover:from-purple-700 hover:to-purple-950 transition-colors"
              >
                View All Articles
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
