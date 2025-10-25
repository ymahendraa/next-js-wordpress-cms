import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold bg-linear-to-r from-purple-600 to-purple-900 bg-clip-text text-transparent"
            >
              LNK Blog
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:bg-linear-to-r hover:from-purple-500 hover:to-purple-700 hover:bg-clip-text hover:text-transparent font-medium transition-all duration-200"
            >
              Home
            </Link>
            <Link
              href="/articles"
              className="text-gray-700 hover:bg-linear-to-r hover:from-purple-500 hover:to-purple-700 hover:bg-clip-text hover:text-transparent font-medium transition-all duration-200"
            >
              Articles
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-blue-600">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden border-t border-gray-200 py-4">
          <nav className="flex flex-col space-y-2">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/articles"
              className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
            >
              Articles
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
