import React from 'react';

export const TrustLogos: React.FC = () => {
  const logos = [
    {
      name: 'Vercel',
      svg: (
        <svg className="h-5 w-auto fill-current" viewBox="0 0 1155 1000">
          <path d="m577.3 0 577.4 1000H0z" />
        </svg>
      ),
    },
    {
      name: 'Supabase',
      svg: (
        <svg className="h-5 w-auto fill-current" viewBox="0 0 109 113">
          <path d="M63.7 110.8c-2.4 2.9-7.2 1.4-7.5-2.4l-3.3-43.7h45.8c5.4 0 8.5 6 5.2 10.3l-40.2 35.8z" />
          <path d="M45.5 2.2c2.4-2.9 7.2-1.4 7.5 2.4l3.3 43.7H10.5C5.1 48.3 2 42.3 5.3 38L45.5 2.2z" />
        </svg>
      ),
    },
    {
      name: 'Cloudflare',
      svg: (
        <svg className="h-5 w-auto fill-current" viewBox="0 0 24 24">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      svg: (
        <svg className="h-5 w-auto fill-current" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
    {
      name: 'Linear',
      svg: (
        <svg className="h-5 w-auto fill-current" viewBox="0 0 100 100">
          <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 14c19.9 0 36 16.1 36 36 0 8.2-2.8 15.8-7.5 21.9L28.1 21.5C34.2 16.8 41.8 14 50 14zm-36 36c0-8.2 2.8-15.8 7.5-21.9l50.4 50.4c-6.1 4.7-13.7 7.5-21.9 7.5-19.9 0-36-16.1-36-36z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="py-8 border-b border-white/[0.06] bg-surface-300/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 whitespace-nowrap">
            Engineered for high-throughput teams at
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-8 sm:gap-12 text-zinc-500 hover:text-zinc-400 transition-colors">
            {logos.map((logo) => (
              <div
                key={logo.name}
                className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors opacity-70 hover:opacity-100"
                title={logo.name}
              >
                {logo.svg}
                <span className="font-mono text-xs font-medium tracking-tight text-zinc-400">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
