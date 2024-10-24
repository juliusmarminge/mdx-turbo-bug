/* eslint-disable @typescript-eslint/no-explicit-any */
import nextMdx from "@next/mdx";
// @ts-expect-error - no types
import { remarkRehypeWrap } from "remark-rehype-wrap";


const withMdx = nextMdx({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [
      [
        remarkRehypeWrap,
        {
          node: { type: "element", tagName: "article" },
          start: "element[tagName=hr]",
          transform: (article: { children: any[]; properties: any }) => {
            article.children.splice(0, 1);
            const heading = article.children.find((n) => n.tagName === "h2");
            article.properties = {
              ...heading.properties,
              title: String(heading),
            };
            heading.properties = {};
            return article;
          },
        },
      ],
    ],
  },
});


export default withMdx({
  pageExtensions: ["ts", "tsx", "mdx"],
})
