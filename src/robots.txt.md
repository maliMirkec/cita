---
permalink: /robots.txt
eleventyExcludeFromCollections: true
templateEngineOverride: liquid
---

{%- if BRANCH == 'master' -%}
User-agent: *
Allow: /
Sitemap: https://www.cita.hr/sitemap.xml
{%- else -%}
User-agent: *
Disallow: /
{%- endif -%}
