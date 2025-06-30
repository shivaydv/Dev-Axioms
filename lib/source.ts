import {
  webdev as webdevPost,
  web3 as web3Post,
  blog as blogPosts,
} from "@/.source";
import { loader } from "fumadocs-core/source";
import { createMDXSource } from "fumadocs-mdx";
import { icons } from "lucide-react";
import { createElement } from "react";


export const webdev = loader({
  baseUrl: "/web-dev",
  source: webdevPost.toFumadocsSource(),
  icon(icon) {
    if (!icon) {
      // You may set a default icon
      return;
    }

    if (icon in icons) return createElement(icons[icon as keyof typeof icons]);
  },
});

export const web3 = loader({
  baseUrl: "/web3",
  source: web3Post.toFumadocsSource(),
  icon(icon) {
    if (!icon) {
      // You may set a default icon
      return;
    }

    if (icon in icons) return createElement(icons[icon as keyof typeof icons]);
  },
});

export const blog = loader({
  baseUrl: "/blog",
  source: createMDXSource(blogPosts),
});
