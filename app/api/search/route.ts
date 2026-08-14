import { web3, webdev, blog } from '@/lib/source';
import { createSearchAPI } from 'fumadocs-core/search/server';

export const { GET } = createSearchAPI('advanced', {
  indexes: async () => {
    const pages = [...webdev.getPages(), ...web3.getPages(), ...blog.getPages()];
    return Promise.all(
      pages.map(async (page) => {
        const structuredData = await page.data.structuredData();
        return {
          title: page.data.title,
          description: page.data.description,
          url: page.url,
          id: page.url,
          structuredData,
        };
      })
    );
  }
});
