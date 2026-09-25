import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Star, ShoppingBag, Check, Sparkles } from 'lucide-react';
import { Product, ProductColorway } from '../types/store';

interface ProductCatalogProps {
  products: Product[];
  onAddToCart: (product: Product, colorway: ProductColorway) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onAddToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', label: 'All Hardware' },
    { id: 'headphones', label: 'Planar Headphones' },
    { id: 'dacs', label: 'Modular DACs' },
    { id: 'mics', label: 'Studio Mics' },
    { id: 'cables', label: 'Cables & Links' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
        const matchesSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tagline.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  const handleQuickAdd = (product: Product) => {
    onAddToCart(product, product.colorways[0]);
    setAddedItemIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <section id="catalog" className="py-20 border-b border-white/[0.06] bg-surface-300/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-brand-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Studio Ecosystem</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
              Precision Acoustic Hardware
            </h2>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search hardware..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-1.5 rounded-lg bg-surface-200 border border-white/10 text-xs font-mono text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-brand-400 transition-colors"
                id="catalog-search-input"
              />
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-1.5 p-1 rounded-lg bg-surface-200 border border-white/10 text-xs font-mono">
              <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400 ml-1.5" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-zinc-300 border-none outline-none pr-2 py-0.5 text-xs font-mono cursor-pointer"
                id="catalog-sort-select"
              >
                <option value="featured" className="bg-surface-100">Featured</option>
                <option value="price-asc" className="bg-surface-100">Price: Low to High</option>
                <option value="price-desc" className="bg-surface-100">Price: High to Low</option>
                <option value="rating" className="bg-surface-100">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all border ${
                selectedCategory === cat.id
                  ? 'bg-brand-500 text-white border-brand-400 font-semibold shadow-glow'
                  : 'bg-surface-200/80 border-white/5 text-zinc-400 hover:text-zinc-200 hover:border-white/10'
              }`}
              id={`category-pill-${cat.id}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((p) => {
            const isAdded = !!addedItemIds[p.id];
            return (
              <div
                key={p.id}
                className="glass-card rounded-2xl p-5 flex flex-col justify-between border border-white/10 group glass-card-hover"
                id={`product-card-${p.id}`}
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between text-xs font-mono mb-4">
                    {p.isNew ? (
                      <span className="px-2 py-0.5 rounded bg-brand-500/20 border border-brand-500/30 text-brand-300 text-[10px] uppercase font-bold">
                        New Launch
                      </span>
                    ) : (
                      <span className="text-zinc-500 text-[10px] uppercase">{p.category}</span>
                    )}

                    <div className="flex items-center gap-1 text-zinc-300">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-[11px] font-semibold">{p.rating}</span>
                      <span className="text-[10px] text-zinc-500">({p.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Visual Preview Graphic */}
                  <div className="w-full aspect-video bg-surface-300/80 rounded-xl border border-white/5 flex items-center justify-center p-4 mb-4 relative overflow-hidden group-hover:border-white/15 transition-colors">
                    <div
                      className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center"
                      style={{ backgroundColor: `${p.colorways[0].accent}15` }}
                    >
                      <span
                        className="w-8 h-8 rounded-full border border-white/20 shadow-md"
                        style={{ backgroundColor: p.colorways[0].hex }}
                      />
                    </div>
                    {/* Colorway preview swatches */}
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 p-1 rounded-md bg-surface-200/90 border border-white/5">
                      {p.colorways.map((cw, i) => (
                        <span
                          key={i}
                          className="w-2.5 h-2.5 rounded-full border border-white/20"
                          style={{ backgroundColor: cw.hex }}
                          title={cw.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-semibold text-white text-base tracking-tight mb-1">{p.name}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4 line-clamp-2">{p.tagline}</p>
                </div>

                {/* Bottom Price & Quick Add */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                  <div className="font-mono">
                    <span className="text-lg font-bold text-white">${p.price}</span>
                    {p.originalPrice && (
                      <span className="text-xs text-zinc-500 line-through ml-1.5">${p.originalPrice}</span>
                    )}
                  </div>

                  <button
                    onClick={() => handleQuickAdd(p)}
                    className="px-3 py-1.5 rounded-lg bg-surface-100 hover:bg-brand-500 text-zinc-200 hover:text-white border border-white/10 hover:border-brand-400 text-xs font-mono uppercase font-semibold flex items-center gap-1.5 transition-all active:scale-[0.98]"
                    id={`quick-add-btn-${p.id}`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300">Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
