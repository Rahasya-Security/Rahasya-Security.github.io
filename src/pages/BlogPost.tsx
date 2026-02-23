import { Link, useParams } from 'react-router-dom';
import { getPostBySlug } from '../data/blogPosts';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <>
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden bg-gradient-to-br from-white/40 via-cipherra-blue-lighter/40 to-white/40 backdrop-blur-xs">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
            <Link to="/blog" className="inline-flex items-center text-cipherra-blue font-medium hover:text-cipherra-blue-dark transition-colors text-sm mb-8">
              ← Back to Blog
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Post not found</h1>
            <p className="text-gray-600">The blog post you're looking for doesn't exist or has been removed.</p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden bg-gradient-to-br from-white/40 via-cipherra-blue-lighter/40 to-white/40 backdrop-blur-xs">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
          <Link to="/blog" className="block text-cipherra-blue font-medium hover:text-cipherra-blue-dark transition-colors text-sm mb-8">
            ← Back to Blog
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            {post.title}
          </h1>
          <time className="text-sm text-cipherra-blue font-medium" dateTime={post.date}>
            {post.date}
          </time>
          <div className="mt-10 md:mt-12">
          <div className="glass-card rounded-3xl p-8 md:p-12 shadow-xl">
            <div
              className="prose prose-lg max-w-none text-gray-600 prose-headings:text-gray-900 prose-a:text-cipherra-blue prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <div className="mt-10 pt-8 border-t border-gray-200 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-cipherra-blue-light flex items-center justify-center text-cipherra-blue font-bold text-lg shrink-0">
                {post.authorName.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{post.authorName}</p>
                <p className="text-sm text-gray-600">{post.authorTitle}</p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>
    </>
  );
}
