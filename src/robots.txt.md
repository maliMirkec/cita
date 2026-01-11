---
permalink: /robots.txt
eleventyExcludeFromCollections: true
templateEngineOverride: liquid
---
{%- if CONTEXT == 'production' -%}
User-agent: *
Allow: /
{%- else -%}
User-agent: *
Disallow: /
{%- endif -%}
