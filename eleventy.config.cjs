module.exports = async function(eleventyConfig) {
  eleventyConfig.setInputDirectory('src')
  eleventyConfig.setIncludesDirectory('_includes')
  eleventyConfig.setLayoutsDirectory('_layouts')
  eleventyConfig.addPassthroughCopy('src/*.css');
  eleventyConfig.addPassthroughCopy('src/*.svg');
};
