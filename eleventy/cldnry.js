import Image from '@11ty/eleventy-img';

const cldnryfetch = async (
  src,
  alt,
  width = 400,
  lazy = false,
  classes,
  link
) => {
  const isSvg = src.endsWith('.svg');
  const formats = isSvg ? ['svg'] : ['webp'];
  const widths = isSvg ? [null] : [width, width * 2];
  const isFullUrl = src.startsWith('http');
  const linkUrl = isSvg ? `${link}/` : `${link}/f_auto,q_auto,c_scale/`;
  const fullUrl = isFullUrl ? src : `${linkUrl}${src}`;

  let metadata = await Image(fullUrl, {
    widths: widths,
    formats: formats,
    svgShortCircuit: true,
    urlPath: '/gfx/cldnry/',
    outputDir: '.cache/cldnry/',
  });

  let imageAttributes = {
    alt,
    class: classes || '',
    sizes: '100vw',
    loading: lazy ? 'lazy' : 'eager',
    decoding: lazy ? 'async' : 'sync',
  };

  return Image.generateHTML(metadata, imageAttributes);
};

export { cldnryfetch };
