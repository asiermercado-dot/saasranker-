import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllArticles, type Article } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'SaaSRanker — Independent SaaS Reviews for Business Leaders',
  description:
    'Independent, data-driven comparisons of SaaS tools and business software trusted by 200,000+ business leaders.',
}

export default function HomePage() {
  const articles = getAllArticles()
  const featured = articles.slice(0, 6)
  const rest = articles.slice(6)

  return (
    <>
      <HeroSection />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-serif font-bold text-gray-900">Latest Comparisons</h2>
          <span className="text-sm text-gray-400">{articles.length} reviews published</span>
        </div>

        {/* Featured grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {featured.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>

        {/* Remaining list */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {rest.map((article) => (
              <ArticleCardCompact key={article.slug} article={article} />
            ))}
          </div>
        )}
      </section>
      <TrustBanner />
    </>
  )
}

function HeroSection() {
  return (
    <section className="bg-green-950 text-white py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <span className="inline-block text-xs font-medium text-green-300 border border-green-800 bg-green-900/40 px-3 py-1 rounded-full mb-5">
          Independent · Data-Driven · Unsponsored
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-5 leading-tight">
          Independent SaaS Reviews<br />for Business Leaders
        </h1>
        <p className="text-lg text-green-200 max-w-xl mx-auto leading-relaxed">
          In-depth comparisons of CRM, project management, accounting, and 40+ software categories — so your team buys the right tool the first time.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-green-300">
          {['CRM Software', 'Project Management', 'Accounting', 'Email Marketing', 'Payroll'].map((cat) => (
            <span key={cat} className="border border-green-800 px-3 py-1 rounded-full hover:border-green-600 cursor-pointer transition-colors">
              {cat}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/${article.slug}`}
      className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:border-green-200 transition-all duration-200"
    >
      <div className="h-1.5 w-full bg-green-600" />
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded">
            {article.category}
          </span>
          {article.verified && <span className="badge-verified">✓ Verified</span>}
        </div>
        <h3 className="font-serif text-gray-900 font-bold text-lg mb-2 leading-snug group-hover:text-green-700 transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-gray-600 flex-1 mb-4 line-clamp-3">{article.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 pt-3 mt-auto">
          <span>{article.readingTime} min read</span>
          <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>
    </Link>
  )
}

function ArticleCardCompact({ article }: { article: Article }) {
  return (
    <Link
      href={`/${article.slug}`}
      className="group flex items-start gap-4 p-4 border border-gray-200 rounded-xl hover:border-green-200 hover:shadow-sm transition-all duration-200 bg-white"
    >
      <div className="w-1 flex-shrink-0 self-stretch bg-green-600 rounded-full" />
      <div className="flex-1 min-w-0">
        <span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded">
          {article.category}
        </span>
        <h3 className="font-serif text-gray-900 font-semibold mt-1.5 mb-1 text-sm leading-snug group-hover:text-green-700 transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-xs text-gray-400">{article.readingTime} min read</p>
      </div>
    </Link>
  )
}

function TrustBanner() {
  const stats = [
    { value: '500+', label: 'Tools Reviewed' },
    { value: '50+', label: 'Software Categories' },
    { value: '200K+', label: 'Monthly Readers' },
    { value: '100%', label: 'Independent' },
  ]
  return (
    <section className="bg-gray-50 border-y border-gray-200 py-12 px-4">
      <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-12">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-3xl font-serif font-bold text-green-900">{s.value}</p>
            <p className="text-sm text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
