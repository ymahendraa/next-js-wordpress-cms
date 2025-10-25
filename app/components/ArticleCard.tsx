import Link from "next/link";
import Image from "next/image";
import {
  WordPressPost,
  stripHtml,
  getFeaturedImageUrl,
  getFeaturedImageAlt,
  formatPostDate,
} from "../lib/wordpress";

interface ArticleCardProps {
  post: WordPressPost;
  showExcerpt?: boolean;
}

export default function ArticleCard({
  post,
  showExcerpt = true,
}: ArticleCardProps) {
  const featuredImageUrl = getFeaturedImageUrl(post);
  const featuredImageAlt = getFeaturedImageAlt(post);
  const formattedDate = formatPostDate(post.date);
  const excerpt = showExcerpt ? stripHtml(post.excerpt.rendered) : "";

  return (
    <article className="article-card border rounded-lg overflow-hidden bg-white shadow-sm">
      <Link href={`/articles/${post.slug}`}>
        <div className="relative w-full h-48 bg-gray-200">
          <Image
            src={featuredImageUrl}
            alt={featuredImageAlt}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>

      <div className="p-6">
        <div className="article-meta mb-3">
          <time
            className="flex items-center text-gray-500"
            dateTime={post.date}
          >
            <svg
              className="w-4 h-4 mr-1.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {formattedDate}
          </time>
        </div>

        <Link href={`/articles/${post.slug}`}>
          <h2 className="text-xl font-semibold text-gray-900 mb-3 hover:text-purple-600 transition-colors line-clamp-2 leading-tight">
            {stripHtml(post.title.rendered)}
          </h2>
        </Link>

        {showExcerpt && excerpt && (
          <p className="article-excerpt mb-4 line-clamp-3">{excerpt}</p>
        )}

        <Link
          href={`/articles/${post.slug}`}
          className="inline-flex items-center bg-linear-to-r from-purple-600 to-purple-900 bg-clip-text text-transparent font-medium text-sm transition-all duration-200 hover:gap-2 hover:text-purple-200"
        >
          Read More
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}
