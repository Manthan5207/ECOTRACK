import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Newspaper, 
  Search, 
  Clock, 
  Tag, 
  ExternalLink, 
  BookOpen, 
  Share2, 
  Bookmark, 
  Sparkles, 
  Globe2,
  X,
  TrendingUp
} from 'lucide-react';
import { DAILY_NEWS, NEWS_CATEGORIES } from '../data/news';
import { useToast } from '../components/common/Toast';

export default function News() {
  const { addToast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [readingArticle, setReadingArticle] = useState(null);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);

  const filteredNews = DAILY_NEWS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesQuery = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  const featuredArticle = DAILY_NEWS[0];

  const toggleBookmark = (id, e) => {
    e.stopPropagation();
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter(b => b !== id));
      addToast({ message: 'Removed article from saved bookmarks.', type: 'info' });
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
      addToast({ message: 'Saved article to reading list!', type: 'success' });
    }
  };

  const handleShare = (article, e) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${article.title} - Read on EcoTrack`);
      addToast({ message: 'Article headline & link copied to clipboard!', type: 'success' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-cyan-950 rounded-3xl p-6 sm:p-8 text-white border border-blue-500/20 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-cyan-300 border border-blue-500/30 text-xs font-semibold mb-3">
              <Newspaper className="w-3.5 h-3.5" />
              <span>Daily Ecological Intelligence & Climate News</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-heading">
              Global Environmental Briefing
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-xl">
              Curated daily updates on renewable breakthroughs, municipal clean air mandates, green tech innovations, and climate policy worldwide.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search news, topics, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/10 hover:bg-white/15 focus:bg-white/20 backdrop-blur-md border border-white/20 rounded-2xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />
          </div>
        </div>
      </div>

      {/* Categories Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {NEWS_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Featured Lead Article */}
      {selectedCategory === 'all' && !searchQuery && featuredArticle && (
        <div
          onClick={() => setReadingArticle(featuredArticle)}
          className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-cyan-500/40 transition-all cursor-pointer group grid grid-cols-1 lg:grid-cols-12"
        >
          <div className="lg:col-span-6 relative overflow-hidden h-64 lg:h-auto min-h-[260px]">
            <img
              src={featuredArticle.imageUrl}
              alt={featuredArticle.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
              {featuredArticle.impactBadge}
            </div>
          </div>

          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                <span className="font-semibold text-blue-600 dark:text-cyan-400">{featuredArticle.categoryLabel}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {featuredArticle.readTime}</span>
                <span>•</span>
                <span>{featuredArticle.publishedAt}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-400 transition font-heading">
                {featuredArticle.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-3 line-clamp-3 leading-relaxed">
                {featuredArticle.summary}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="text-xs font-semibold text-slate-500">
                Source: {featuredArticle.source}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => toggleBookmark(featuredArticle.id, e)}
                  className={`p-2 rounded-xl border transition ${
                    bookmarkedIds.includes(featuredArticle.id)
                      ? 'bg-amber-500/10 border-amber-500 text-amber-500'
                      : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                  }`}
                  title="Bookmark"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
                <span className="text-xs font-bold text-blue-600 dark:text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition">
                  Read Article <BookOpen className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((article) => {
          const isBookmarked = bookmarkedIds.includes(article.id);
          return (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setReadingArticle(article)}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-lg hover:border-cyan-500/40 transition-all cursor-pointer flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-cyan-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-cyan-500/30">
                  {article.categoryLabel}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1.5">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readTime}</span>
                    <span>•</span>
                    <span>{article.publishedAt}</span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-cyan-400 transition font-heading">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 mt-2 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-400">{article.source}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleShare(article, e)}
                      className="p-1.5 text-slate-400 hover:text-cyan-400 rounded-lg transition"
                      title="Share"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => toggleBookmark(article.id, e)}
                      className={`p-1.5 rounded-lg transition ${
                        isBookmarked ? 'text-amber-500' : 'text-slate-400 hover:text-amber-500'
                      }`}
                      title="Bookmark"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Article Detail Reader Modal */}
      <AnimatePresence>
        {readingArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8"
            >
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <img
                  src={readingArticle.imageUrl}
                  alt={readingArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <button
                  onClick={() => setReadingArticle(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-md transition"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[11px] font-bold mb-2">
                    {readingArticle.categoryLabel}
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold leading-snug font-heading">
                    {readingArticle.title}
                  </h2>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6 max-h-[55vh] overflow-y-auto">
                <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div>By <span className="font-semibold text-slate-700 dark:text-slate-200">{readingArticle.author}</span> • {readingArticle.source}</div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{readingArticle.readTime}</span>
                  </div>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {readingArticle.content}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                  {readingArticle.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-medium flex items-center gap-1"
                    >
                      <Tag className="w-3 h-3 text-cyan-400" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={(e) => handleShare(readingArticle, e)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" /> Share Story
                </button>
                <button
                  onClick={() => setReadingArticle(null)}
                  className="px-5 py-2 text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-xl shadow-sm transition"
                >
                  Close Reader
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
