import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog-data';
import { ArrowRight, BookOpen } from 'lucide-react';

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="container mx-auto flex items-center justify-between p-6 max-w-6xl">
        <Link href="/" className="text-2xl font-black tracking-tighter text-slate-900">ClassTrack</Link>
        <Link href="/login">
          <Button variant="outline" className="font-bold border-slate-200">Sign In</Button>
        </Link>
      </nav>

      <main className="container mx-auto px-6 py-20 max-w-6xl">
        <div className="text-center mb-20">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl text-slate-900 mb-6">
            The Student <span className="text-slate-500">Success Hub.</span>
          </h1>
          <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto">
            Expert strategies on attendance, productivity, and navigating college life with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`} 
              className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-slate-900/5 transition-all flex flex-col"
            >
              <div className="p-8 flex flex-col h-full">
                <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider mb-6 w-fit">
                  {post.category}
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-slate-600 transition-colors">{post.title}</h2>
                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 flex-grow">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{post.date}</div>
                  <div className="flex items-center text-xs font-bold text-slate-900 gap-2 group-hover:gap-3 transition-all">
                    Read More <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {blogPosts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
            <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900">No articles yet</h3>
            <p className="text-slate-500 text-sm">Check back soon for new content!</p>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-200 py-12 mt-20">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">© 2026 ClassTrack. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
