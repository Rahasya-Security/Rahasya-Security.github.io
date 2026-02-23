import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';

export default function Blog() {
  return (
    <>
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-gradient-to-br from-white/40 via-cipherra-blue-lighter/40 to-white/40 backdrop-blur-xs">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
          <Link to="/" className="inline-flex items-center text-cipherra-blue font-medium hover:text-cipherra-blue-dark transition-colors text-sm mb-8">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Blogs
          </h1>
          <p className="text-xl text-gray-600 mb-10 md:mb-12">
            Writeups on privacy-preserving analytics and homomorphic encryption.
          </p>
          <div className="grid gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="block glass-card rounded-3xl p-6 md:p-8 shadow-xl card-hover border border-transparent hover:border-cipherra-blue/20 transition-all"
              >
                <time className="text-sm text-cipherra-blue font-medium" dateTime={post.date}>
                  {post.date}
                </time>
                <h2 className="text-2xl font-bold text-gray-900 mt-2 mb-3 hover:text-cipherra-blue transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <div className="w-8 h-8 rounded-full bg-cipherra-blue-light flex items-center justify-center text-cipherra-blue font-semibold text-xs shrink-0">
                    {post.authorName.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium text-gray-900">{post.authorName}</span>
                    <span className="text-gray-400"> · </span>
                    <span>{post.authorTitle}</span>
                  </div>
                </div>
                <span className="inline-flex items-center mt-4 text-cipherra-blue font-medium text-sm">
                  Read more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
