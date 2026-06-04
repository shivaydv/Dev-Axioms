import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  defineCollections,
  metaSchema,
} from "fumadocs-mdx/config";
import lastModified from 'fumadocs-mdx/plugins/last-modified';
import { z } from "zod";

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.vercel.app/docs/mdx/collections#define-docs
export const webdev = defineDocs({
  dir: "content/web-dev",
  docs: {
    schema: frontmatterSchema,
    async: true,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export const web3 = defineDocs({
  dir: "content/web3",
  docs: {
    schema: frontmatterSchema,
    async: true,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export const blog = defineCollections({
  type: "doc",
  dir: "content/blogs",
  async: true,
  postprocess: {
    includeProcessedMarkdown: true,
  },
  schema: frontmatterSchema.extend({
    author: z.string(),
    date: z.string().date().or(z.date()),
  }),
});

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
  plugins: [lastModified()],
});
