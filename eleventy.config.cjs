const markdownIt = require('markdown-it');
const CleanCSS = require('clean-css');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const fs = require('fs');
const path = require('path');
const site = require('./src/_data/site.json');

module.exports = async function(eleventyConfig) {
  const { cldnryfetch } = await import('./eleventy/cldnry.js');
  // Add BRANCH environment variable as global data
  eleventyConfig.addGlobalData('BRANCH', process.env.BRANCH || '');

  const md = new markdownIt({
    html: true
  });

  eleventyConfig.addFilter('markdownify', (content) => {
    return md.render(content);
  });

  // Filter to read and return file contents
  eleventyConfig.addFilter('readFile', (filePath) => {
    try {
      const fullPath = path.join(__dirname, '_site', filePath);
      return fs.readFileSync(fullPath, 'utf8');
    } catch (err) {
      console.error(`Error reading file ${filePath}:`, err);
      return '';
    }
  });

  eleventyConfig.addShortcode('cldnryfetch', async (src, alt, width, lazy = true, classes = '') => cldnryfetch(src, alt, width, lazy, classes, site.cldnry))

  // Process and minify CSS with Autoprefixer
  eleventyConfig.addTemplateFormats('css');
  eleventyConfig.addExtension('css', {
    outputFileExtension: 'css',
    compile: async function(inputContent) {
      return async () => {
        // Add vendor prefixes for last 2 years of browsers
        const prefixed = await postcss([
          autoprefixer({ overrideBrowserslist: ['last 2 years'] })
        ]).process(inputContent, { from: undefined });

        // Minify the prefixed CSS
        const minified = new CleanCSS({}).minify(prefixed.css);
        return minified.styles;
      };
    }
  });

  eleventyConfig.setInputDirectory('src')
  eleventyConfig.setIncludesDirectory('_includes')
  eleventyConfig.setLayoutsDirectory('_layouts')
  eleventyConfig.addPassthroughCopy('src/*.svg');
  eleventyConfig.addPassthroughCopy('src/favicon/*');
  eleventyConfig.addPassthroughCopy('src/gfx/*');
  eleventyConfig.addPassthroughCopy({ ".cache/cldnry":
  "gfx/cldnry" });

  // Blog collections by language (excluding future posts)
  eleventyConfig.addCollection("blogHr", function(collectionApi) {
    const now = new Date();
    return collectionApi.getFilteredByGlob("src/hr/blog/*.md")
      .filter(item => item.url !== "/hr/blog/")
      .filter(item => !item.data.published || new Date(item.data.published) <= now);
  });

  eleventyConfig.addCollection("blogEn", function(collectionApi) {
    const now = new Date();
    return collectionApi.getFilteredByGlob("src/en/blog/*.md")
      .filter(item => item.url !== "/en/blog/")
      .filter(item => !item.data.published || new Date(item.data.published) <= now);
  });

  // eleventyConfig.addPassthroughCopy({ "src/favicon": "subfolder/img" });
};
