'use client';

import { use, useEffect, useId, useState } from 'react';
import { useTheme } from 'next-themes';

export function Mermaid({ chart }: { chart: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return <MermaidContent chart={chart} />;
}

const cache = new Map<string, Promise<unknown>>();

function cachePromise<T>(key: string, setPromise: () => Promise<T>): Promise<T> {
  const cached = cache.get(key);
  if (cached) return cached as Promise<T>;

  const promise = setPromise();
  cache.set(key, promise);
  return promise;
}

function MermaidContent({ chart }: { chart: string }) {
  const rawId = useId();
  const id = `mermaid-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`;
  const { resolvedTheme } = useTheme();

  const { default: mermaid } = use(
    cachePromise('mermaid', () => import('mermaid'))
  );

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'loose',
    fontFamily: 'inherit',
    themeVariables: {
      fontSize: '14px',
    },
    themeCSS: `
      margin: 0.5rem auto;
      .node text { font-size: 14px !important; font-weight: 500 !important; }
      .edgeLabel text { font-size: 13px !important; }
      .cluster-label text { font-size: 14px !important; font-weight: 600 !important; }
      .node rect, .node circle, .node polygon { stroke-width: 1.5px !important; }
      .edgePath .path { stroke-width: 1.5px !important; }
    `,
    theme: resolvedTheme === 'dark' ? 'dark' : 'default',
  });

  const { svg, bindFunctions } = use(
    cachePromise(`${chart}-${resolvedTheme}`, () => {
      return mermaid.render(id, chart.replaceAll('\\n', '\n'));
    })
  );

  return (
    <div className="my-5 w-full overflow-x-auto rounded-lg border border-border/80 bg-card/40 p-3 sm:p-4">
      <div
        className="w-full flex justify-center py-1 [&>svg]:max-w-full [&>svg]:h-auto"
        ref={(container) => {
          if (container) bindFunctions?.(container);
        }}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}
