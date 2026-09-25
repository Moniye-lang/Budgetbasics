import React from 'react';
import { Star, ShieldCheck, MessageSquare } from 'lucide-react';

interface Review {
  name: string;
  role: string;
  studio: string;
  rating: number;
  quote: string;
  model: string;
}

const REVIEWS: Review[] = [
  {
    name: 'Marcus Lindqvist',
    role: 'Grammy-Nominated Mastering Engineer',
    studio: 'Stockholm Sound Lab',
    rating: 5,
    quote: 'The transient speed on the Horizon-1 is terrifyingly accurate. In 15 minutes of mastering, I heard phase smears standard monitors masked.',
    model: 'Horizon-1 Space Silver',
  },
  {
    name: 'Elena Rostova',
    role: 'Film Score Composer',
    studio: 'Synchron Scoring Stage',
    rating: 5,
    quote: 'Sub-bass extension down to 5Hz without artificial bloat. The 0.8ms wireless protocol lets me move around the console seamlessly.',
    model: 'Horizon-1 Obsidian Black',
  },
  {
    name: 'David Chen',
    role: 'Lead Sound Designer',
    studio: 'Polyphonic Games',
    rating: 5,
    quote: 'Spatial imaging and separation across the planar diaphragm is unparalleled for binaural Foley and spatial audio authoring.',
    model: 'Horizon-1 Cyber Neon',
  },
];

export const ReviewWall: React.FC = () => {
  return (
    <section id="reviews" className="py-20 border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-brand-400 uppercase tracking-wider mb-2">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Verified Studio Proof</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
              Trusted by World-Class Producers
            </h2>
          </div>
          <div className="flex items-center gap-1 text-xs font-mono text-zinc-400">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="font-bold text-white">4.92 / 5.0</span>
            <span>across 800+ studio deployments</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((r, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-white/10 glass-card-hover"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                    <ShieldCheck className="w-3 h-3" />
                    Verified Studio
                  </span>
                </div>

                {/* Quote (Strict <= 3 lines) */}
                <p className="text-sm text-zinc-300 leading-relaxed italic mb-6">
                  &ldquo;{r.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-white/5">
                <div className="font-semibold text-white text-sm">{r.name}</div>
                <div className="text-xs text-zinc-400">{r.role} &middot; {r.studio}</div>
                <div className="text-[10px] font-mono text-brand-400 mt-1">{r.model}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
