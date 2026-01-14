const markdownIt = require('markdown-it');
const CleanCSS = require('clean-css');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const fs = require('fs');
const path = require('path');

module.exports = async function(eleventyConfig) {
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

  // Blog collections by language
  eleventyConfig.addCollection("blogHr", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/hr/blog/*.md")
      .filter(item => item.url !== "/hr/blog/");
  });

  eleventyConfig.addCollection("blogEn", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/en/blog/*.md")
      .filter(item => item.url !== "/en/blog/");
  });

  // eleventyConfig.addPassthroughCopy({ "src/favicon": "subfolder/img" });
};
