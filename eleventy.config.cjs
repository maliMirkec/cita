const markdownIt = require('markdown-it');

module.exports = async function(eleventyConfig) {
  const md = new markdownIt({
    html: true
  });

  eleventyConfig.addFilter('markdownify', (content) => {
    return md.render(content);
  });

  eleventyConfig.setInputDirectory('src')
  eleventyConfig.setIncludesDirectory('_includes')
  eleventyConfig.setLayoutsDirectory('_layouts')
  eleventyConfig.addPassthroughCopy('src/*.css');
  eleventyConfig.addPassthroughCopy('src/*.svg');
};
