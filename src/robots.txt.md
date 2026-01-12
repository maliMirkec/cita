---
permalink: /robots.txt
eleventyExcludeFromCollections: true
templateEngineOverride: liquid
---

{%- if BRANCH == 'master' -%}
User-agent: *
Allow: /
{%- else -%}
User-agent: *
Disallow: /
{%- endif -%}
