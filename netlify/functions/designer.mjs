import fs from 'node:fs';
import markdownIt from 'markdown-it';
import slugify from '@sindresorhus/slugify';
import slug from 'slugify';
import { createHostedHandler, liquidFromSetup } from 'staticrafter/hosted';

const site = JSON.parse(fs.readFileSync('src/_data/site.json', 'utf8'));
const md = markdownIt({ html: true });

const setup = (eleventyConfig) => {
  eleventyConfig.addFilter('markdownify', (content) =>
    md.render(content || '')
  );
  eleventyConfig.addFilter('readFile', () => '');
  eleventyConfig.addFilter('slug', (str) => slug(`${str}`, { lower: true }));
  eleventyConfig.addFilter('slugify', (str) =>
    slugify(`${str}`, { decamelize: false })
  );
  eleventyConfig.addFilter('xml_escape', (str) =>
    `${str}`.replace(/[<>&'"]/g, (char) => `&#${char.charCodeAt(0)};`)
  );
  eleventyConfig.addShortcode(
    'cldnryfetch',
    (src, alt, width = 400, lazy = true, classes = '') => {
      const url = src.startsWith('http')
        ? src
        : `${site.cldnry}/f_auto,q_auto,c_scale,w_${width * 2}/${src}`;
      return `<img src="${url}" alt="${alt || ''}" width="${width}" class="${classes}" loading="${lazy ? 'lazy' : 'eager'}">`;
    }
  );
};

const handler = createHostedHandler({
  engine: liquidFromSetup({
    root: ['src/_includes', 'src/_layouts', 'src'],
    setups: [setup],
  }),
  markdown: md,
  directories: {
    input: 'src',
    includes: '_includes',
    layouts: '_layouts',
  },
  dataDir: '.designer',
  media: { provider: 'cloudinary', direct: true },
  uploadFolder: () => 'cita',
});

export default (request) => handler(request);

export const config = { path: '/api/designer/*' };
