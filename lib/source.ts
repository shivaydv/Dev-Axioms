import {
  webdev as webdevPost,
  web3 as web3Post,
  blog as blogPosts,
} from "@/.source";
import { loader } from "fumadocs-core/source";
import { createMDXSource } from "fumadocs-mdx";
import { icons } from "lucide-react";
import { createElement } from "react";

export const WEBDEV_BASE_URL = "/web-dev";
export const webdev = Object.assign(
  loader({
    baseUrl: WEBDEV_BASE_URL,
    source: webdevPost.toFumadocsSource(),
    icon(icon) {
      if (!icon) {
        // You may set a default icon
        return;
      }

      if (icon in icons) return createElement(icons[icon as keyof typeof icons]);
    },
  }),
  { baseUrl: WEBDEV_BASE_URL }
);

export const WEB3_BASE_URL = "/web3";
export const web3 = Object.assign(
  loader({
    baseUrl: WEB3_BASE_URL,
    source: web3Post.toFumadocsSource(),
    icon(icon) {
      if (!icon) {
        // You may set a default icon
        return;
      }

      if (icon in icons) return createElement(icons[icon as keyof typeof icons]);
    },
  }),
  { baseUrl: WEB3_BASE_URL }
);

export const BLOG_BASE_URL = "/blog";
export const blog = Object.assign(
  loader({
    baseUrl: BLOG_BASE_URL,
    source: createMDXSource(blogPosts),
  }),
  { baseUrl: BLOG_BASE_URL }
);
