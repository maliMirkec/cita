---
permalink: /robots.txt
eleventyExcludeFromCollections: true
templateEngineOverride: liquid
---

{%- if BRANCH == 'master' -%}
User-agent: _
Allow: /
{%- else -%}
User-agent: _
Disallow: /
{%- endif -%}
