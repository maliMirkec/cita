---
layout: default
lang: en
altLang: hr
altPage: /hr/blog/web-stranica-101/
title: Every great website starts with an organized head
description: In the head section, we can add metadata that will be used by many different devices and software, like browsers, screen readers, social networks and others.
author: cita
published: 2026-01-14
---

# Every great website starts with an organized head

HTML document consists of a `<head>` and `<body>` tags. The `<head>` tag is a place where we can add metadata that will be used for many different devices and software, like browsers, screen readers, social networks and more. Therefore, it is crucial to define all metadata carefully and take provide all meaningful information about your business.

## Common tags

When talking about a `<head>` element, I often think of Anand Chowdhary's article called [Explain the First 10 Lines of Twitter’s Source Code to Me](https://css-tricks.com/explain-the-first-10-lines-of-twitter-source-code/). In this article, Anand writes which answers would be perfect (and good enough) explanations of some of the most common `<head>` tags. One of my favorites are the `<meta charset="utf-8">` tag:

> **Perfect answer**: The meta tag in the source code is for supplying metadata about this document. The character set (char-set) attribute tells the browser which character encoding to use, and Twitter uses the standard UTF-8 encoding. UTF-8 is great because it has many character points so you can use all sorts of symbols and emoji in your source code. It’s important to put this tag near the beginning of your code so the browser hasn’t already started parsing too much text when it comes across this line.

and the `<meta name="viewport" content="width=device-...` tag:

> **Perfect answer**: This meta tag in the source code is for properly sizing the webpage on small screens, like smartphones. (...) `width=device-width` tells the browser to use 100% of the device’s width as the viewport so there’s no horizontal scrolling, but you can even specify specific pixel values for width. The standard best practice is to set the initial scale to 1 and the width to device-width so people can still zoom around if they wish.

So the first two things you want to place in your `<head>` are:

```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

<iframe hidden class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/3a0d26bdfec642e496cb6d04103360b0?slide=39" title="Get Your Head Straight" allowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 100%; height: auto; aspect-ratio: 560 / 315;" data-ratio="1.7777777777777777"></iframe>

## What else goes to head?

- The `<title>` tag which tells browsers and other devices the name of the current page.
- Tags for loading or inlining CSS and JavaScript code
- Tags for prefeching, preloading and prerendering code
- SEO related tags

In his [famous talk “Get your head straight”](https://speakerdeck.com/csswizardry/get-your-head-straight), Harry Roberts says to remove as much as possible ([slide 22](https://speakerdeck.com/csswizardry/get-your-head-straight?slide=22)), and not only that, but to pay attention on the order of the tags, especially if you want to get the most optimized website ([slide 39](https://speakerdeck.com/csswizardry/get-your-head-straight?slide=39)).

## What are SEO related tags?

### The description tag

The description tag describes the content of the current page.

```html
<meta
  name="description"
  content="In the head section, we can add metadata that will be used by many different devices and software, like browsers, screen readers, social networks and others."
/>
```

### OG tags

Social networks and other software like Slack or WhatsApp use OG tags to display image, title, and description when sharing the links.

```html
<meta
  property="og:title"
  content="Every great website starts with an organized head"
/>
<meta
  property="og:description"
  content="In the head section, we can add metadata that will be used by many different devices and software, like browsers, screen readers, social networks and others."
/>
<meta
  property="og:image"
  content="https://www.cita.hr/og-image?title=Every+great+website+starts+with+an+organized+head&lang=en"
/>
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:url" content="https://www.cita.hr/en/blog/head-101/" />
<meta property="og:type" content="website" />
```

### Structured data

When you Google a term, for example a company or a person, do you wonder why some brands or persons have additional data in the sidebar? That is called [Knowledge Graph](https://blog.google/products-and-platforms/products/search/introducing-knowledge-graph-things-not/) and it has been around for a long time. Most of these information comes from [Structured data markup](https://developers.google.com/search/docs/appearance/structured-data/search-gallery).

Structured data allows you to define many different entities and information. Make sure to escape and output HTML safe characters. To avoid any issues, use [Rich Results Test](https://search.google.com/test/rich-results) and fix any issues it reporst.

Structured data looks like this:

```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.cita.hr/#organization",
        "name": "Studio CiTA",
        "url": "https://www.cita.hr",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.cita.hr/favicon/favicon-96x96.png"
        },
        "description": "Studio CiTA is an experienced engineering studio that specializes in developing challenging websites and performing online stores.",
        "founder": {
          "@type": "Person",
          "name": "Silvestar Bistrović",
          "url": "https://www.silvestar.codes/",
          "sameAs": [
            "https://www.linkedin.com/in/starbist/",
            "https://github.com/maliMirkec",
            "https://codepen.io/CiTA"
          ]
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "silvestar@cita.hr",
          "contactType": "Customer Service"
        }
      }
    ]
  }
</script>
```

### Canonical and alternative links

Canonical

Alternate

RSS

Favicon

Extras - generator, fediverse, verifications, etc

<m reta http-equiv="refresh" content="5;url=https://example.com">
<m reta name="referrer" content="no-referrer">

https://www.smashingmagazine.com/2021/09/css-head-tag/
https://csswizardry.com/ct/
