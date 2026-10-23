import eleventyConfig from '../../eleventy.config.cjs';
import { netlifyHandler } from 'staticrafter/hosted';

export default netlifyHandler({ eleventyConfig });

export const config = { path: '/api/designer/*' };
