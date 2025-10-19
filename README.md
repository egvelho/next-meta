# A static data management layer for Next.js

This package provides an improved programming experience for using NetlifyCMS with Next.js. Also, it provides tools to manage assets (images, icons, manifests) and HTML metadata.
Please refer to this [project](https://github.com/eduardavelho/next-material-netlify-cms-blog) for some usage examples.

# What is inside the box?

* Generate PWA icons based on a single SVG file;
* Improved programming experience for NetlifyCMS and Next.js;
* Components with sensible defaults for HTML metadata;
* Tools for handling JSON files.

# A blog post example

```typescript
import {
  collectionFolder,
  GetCollectionType,
} from "@egvelho/next-meta/cms/collection";

export type BlogPost = GetCollectionType<typeof blogPost>;

export const blogPost = collectionFolder({
  folder: "app/blog/posts",
  label: "Blog posts",
  labelSingular: "post",
  slug: "{{title}}",
  sortableFields: ["publishDate"],
}).fields((data) => ({
  title: data.string({
    label: "Title",
  }),
  description: data.string({
    label: "Description",
  }),
  image: data.image({
    label: "Image",
  }),
  publishDate: data.datetime<"optional">({
    label: "Publish date",
    dateFormat: "MM/YYYY",
    timeFormat: "HH:mm",
    required: false,
  }),
  tags: data.keywords({
    label: "Tags",
    min: 1,
    max: 5,
  }),
  authorName: data.string<"optional">({
    label: "Author name",
    required: false,
  }),
  authorDescription: data.string<"optional">({
    label: "Author description",
    required: false,
  }),
  authorPicture: data.image<"optional">({
    label: "Author picture",
    required: false,
  }),
  titleColor: data.color<"optional">({
    label: "Title color",
    required: false,
    allowInput: true,
  }),
  backgroundColor: data.color<"optional">({
    label: "Background color",
    required: false,
    allowInput: true,
  }),
  backgroundImage: data.image<"optional">({
    label: "Background image",
    required: false,
  }),
  content: data.markdown({
    label: "Content",
  }),
}));
```
