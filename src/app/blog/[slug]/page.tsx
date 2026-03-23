import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { blogPosts, BlogPost } from '@/lib/blog-data';
import { ArrowLeft, Clock, Calendar, User } from 'lucide-react';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="container mx-auto flex items-center justify-between p-6 max-w-6xl">
        <Link href="/" className="text-2xl font-black tracking-tighter text-slate-900 shadow-sm px-2">ClassTrack</Link>
        <Link href="/blog">
          <Button variant="ghost" className="font-bold text-slate-500 hover:text-slate-900 border-none px-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </Link>
      </nav>

      <main className="container mx-auto px-6 py-20 max-w-3xl">
        {/* Meta Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider mb-6">
            {post.category}
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl text-slate-900 mb-8 leading-[1.2]">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400 font-bold text-xs uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {post.date}
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {post.author}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              12 min read
            </div>
          </div>
        </div>

        {/* Content Section */}
        <article className="prose prose-slate max-w-none text-slate-600 leading-[1.8] font-medium">
          {/* We're manually rendering the basic markdown since we don't have a library installed yet */}
          {post.content.split('\n\n').map((block, i) => {
            if (block.startsWith('## ')) {
              return <h2 key={i} className="text-2xl font-black text-slate-900 mt-12 mb-6 border-b border-slate-100 pb-4 tracking-tight">{block.replace('## ', '')}</h2>;
            }
            if (block.startsWith('### ')) {
              return <h3 key={i} className="text-xl font-black text-slate-900 mt-8 mb-4 tracking-tight">{block.replace('### ', '')}</h3>;
            }
            if (block.includes('*   ')) {
              const items = block.split('*   ').filter(Boolean);
              return (
                <ul key={i} className="list-disc pl-5 space-y-4 my-8">
                  {items.map((item, j) => (
                    <li key={j} className="text-slate-600 font-medium">
                      <span className="font-bold text-slate-900">
                        {item.includes(':') ? item.split(':')[0] + ':' : ''}
                      </span>
                      {item.includes(':') ? item.split(':')[1] : item}
                    </li>
                  ))}
                </ul>
              );
            }
            if (block.includes('**')) {
              // Very basic bold parsing
              return <p key={i} className="mb-6 whitespace-pre-wrap text-slate-600 font-medium" dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-black">$1</strong>') }} />;
            }
            return <p key={i} className="mb-6 whitespace-pre-wrap text-slate-600 font-medium leading-loose">{block.trim()}</p>;
          })}
        </article>

        <section className="mt-20 pt-12 border-t border-slate-100">
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center">
            <h3 className="text-xl font-black text-slate-900 mb-2">Loved this strategy?</h3>
            <p className="text-slate-500 font-medium mb-8">Start tracking your classes and never miss a goal with ClassTrack.</p>
            <Link href="/login">
              <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white font-bold h-12 px-8 rounded-xl">Get Started Free</Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-100 py-12 mt-20">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">© 2026 ClassTrack. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
