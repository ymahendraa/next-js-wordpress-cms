// TypeScript types for WordPress API responses
export interface WordPressPost {
  id: number;
  date: string;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  author: number;
  featured_media: number;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      id: number;
      source_url: string;
      alt_text: string;
      media_details: {
        width: number;
        height: number;
      };
    }>;
    author?: Array<{
      id: number;
      name: string;
      slug: string;
    }>;
  };
}

export interface WordPressApiResponse {
  posts: WordPressPost[];
  totalPages: number;
  totalPosts: number;
}

const API_URL = process.env.WORDPRESS_API_URL;

if (!API_URL) {
  throw new Error("WORDPRESS_API_URL environment variable is not defined");
}

/**
 * Fetch all posts from WordPress REST API
 * @param perPage Number of posts to fetch (default: 10)
 * @param page Page number for pagination (default: 1)
 * @returns Promise<WordPressPost[]>
 */
export async function getAllPosts(
  perPage: number = 10,
  page: number = 1
): Promise<WordPressPost[]> {
  try {
    const res = await fetch(
      `${API_URL}/posts?_embed&per_page=${perPage}&page=${page}`,
      {
        next: { revalidate: 60 }, // ISR with 60 seconds revalidation
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
    }

    const posts: WordPressPost[] = await res.json();
    return posts;
  } catch (error) {
    console.error("Error fetching all posts:", error);
    throw error;
  }
}

/**
 * Fetch recent posts from WordPress REST API
 * @param count Number of recent posts to fetch
 * @returns Promise<WordPressPost[]>
 */
export async function getRecentPosts(
  count: number = 3
): Promise<WordPressPost[]> {
  try {
    const res = await fetch(
      `${API_URL}/posts?_embed&per_page=${count}&orderby=date&order=desc`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch recent posts: ${res.status} ${res.statusText}`
      );
    }

    const posts: WordPressPost[] = await res.json();
    return posts;
  } catch (error) {
    console.error("Error fetching recent posts:", error);
    throw error;
  }
}

/**
 * Fetch a single post by slug from WordPress REST API
 * @param slug Post slug
 * @returns Promise<WordPressPost | null>
 */
export async function getPostBySlug(
  slug: string
): Promise<WordPressPost | null> {
  try {
    const res = await fetch(`${API_URL}/posts?slug=${slug}&_embed`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch post by slug: ${res.status} ${res.statusText}`
      );
    }

    const posts: WordPressPost[] = await res.json();
    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    throw error;
  }
}

/**
 * Get all post slugs for static generation
 * @returns Promise<string[]>
 */
export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${API_URL}/posts?per_page=100&_fields=slug`, {
      next: { revalidate: 3600 }, // Revalidate every hour for static generation
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch post slugs: ${res.status} ${res.statusText}`
      );
    }

    const posts: Array<{ slug: string }> = await res.json();
    return posts.map((post) => post.slug);
  } catch (error) {
    console.error("Error fetching post slugs:", error);
    throw error;
  }
}

/**
 * Utility function to strip HTML tags and decode HTML entities from content
 * @param html HTML string
 * @returns Plain text string
 */
export function stripHtml(html: string): string {
  // First, remove HTML tags
  let text = html.replace(/<[^>]*>/g, "");

  // Use browser's built-in HTML entity decoding if available
  if (typeof window !== "undefined") {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    text = textarea.value;
  } else {
    // Server-side: manual decoding of common HTML entities
    const htmlEntities: { [key: string]: string } = {
      "&#8220;": '"', // Left double quotation mark
      "&#8221;": '"', // Right double quotation mark
      "&#8216;": "'", // Left single quotation mark
      "&#8217;": "'", // Right single quotation mark
      "&#8211;": "–", // En dash
      "&#8212;": "—", // Em dash
      "&#8230;": "…", // Horizontal ellipsis
      "&quot;": '"',
      "&apos;": "'",
      "&lt;": "<",
      "&gt;": ">",
      "&amp;": "&",
      "&nbsp;": " ",
      "&ndash;": "–",
      "&mdash;": "—",
      "&hellip;": "…",
      "&lsquo;": "\u2018",
      "&rsquo;": "\u2019",
      "&ldquo;": '"',
      "&rdquo;": '"',
    };

    // Replace named entities
    Object.keys(htmlEntities).forEach((entity) => {
      text = text.replace(new RegExp(entity, "g"), htmlEntities[entity]);
    });

    // Replace numeric entities (like &#8220;)
    text = text.replace(/&#(\d+);/g, (match, dec) => {
      return String.fromCharCode(parseInt(dec, 10));
    });

    // Replace hex entities (like &#x2019;)
    text = text.replace(/&#x([0-9a-f]+);/gi, (match, hex) => {
      return String.fromCharCode(parseInt(hex, 16));
    });
  }

  return text.trim();
}

/**
 * Utility function to get featured image URL from post
 * @param post WordPressPost object
 * @returns Featured image URL or fallback
 */
export function getFeaturedImageUrl(post: WordPressPost): string {
  const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0];
  return featuredMedia?.source_url || "/placeholder-image.svg";
}

/**
 * Utility function to get featured image alt text
 * @param post WordPressPost object
 * @returns Alt text or post title as fallback
 */
export function getFeaturedImageAlt(post: WordPressPost): string {
  const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0];
  return featuredMedia?.alt_text || stripHtml(post.title.rendered);
}

/**
 * Utility function to get author name from post
 * @param post WordPressPost object
 * @returns Author name or 'Unknown Author' as fallback
 */
export function getAuthorName(post: WordPressPost): string {
  const author = post._embedded?.author?.[0];
  return author?.name || "Unknown Author";
}

/**
 * Utility function to format post date
 * @param dateString ISO date string from WordPress
 * @returns Formatted date string
 */
export function formatPostDate(dateString: string): string {
  const date = new Date(dateString);

  // Use a consistent format to avoid hydration issues
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}
