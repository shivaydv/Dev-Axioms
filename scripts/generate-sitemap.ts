import { writeFileSync } from 'fs';
import { globby } from 'globby';
import prettier from 'prettier';

async function generate() {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
  const pages = await globby([
    'app/**/*.tsx',
    'contents/**/*.mdx',
    '!app/**/_*.tsx',
    '!app/**/layout.tsx',
    '!app/**/loading.tsx',
    '!app/**/error.tsx',
  ]);

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map((page: string) => {
          const path = page
            .replace('app', '')
            .replace('contents', '')
            .replace('.tsx', '')
            .replace('.mdx', '')
            .replace('/page', '');
            
          const route = path === '/index' ? '' : path;
          
          return `
            <url>
              <loc>${`https://dev-axioms.vercel.app${route}`}</loc>
              <changefreq>daily</changefreq>
              <priority>0.7</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;

  const formatted = await prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  });

  writeFileSync('public/sitemap.xml', formatted);
}

generate(); 