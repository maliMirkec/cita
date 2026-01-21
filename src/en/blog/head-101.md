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

## What else goes to head?

- The `<title>` tag which tells browsers and other devices the name of the current page.
- Tags for loading or inlining CSS and JavaScript code
- Tags for prefeching, preloading and prerendering code
- SEO related tags

In his [famous talk “Get your head straight”](https://speakerdeck.com/csswizardry/get-your-head-straight), Harry Roberts says to remove as much as possible ([slide 22](https://speakerdeck.com/csswizardry/get-your-head-straight?slide=22)), and not only that, but to pay attention on the order of the tags, especially if you want to get the most optimized website ([slide 39](https://speakerdeck.com/csswizardry/get-your-head-straight?slide=39)).

### Favicon

Favicon tags

```html
<link
  rel="icon"
  type="image/png"
  href="/favicon/favicon-96x96.png"
  sizes="96x96"
/>
<link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
<link rel="shortcut icon" href="/favicon/favicon.ico" />
<link
  rel="apple-touch-icon"
  sizes="180x180"
  href="/favicon/apple-touch-icon.png"
/>
<meta name="apple-mobile-web-app-title" content="Studio CiTA" />
<link rel="manifest" href="/favicon/site.webmanifest" />
```

## What are SEO related tags?

SEO related tags helps you site get better scores on search engines. These tags communicate about your link structure, the content, and other information about you and your business.

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

Most SEO tools will tell you that you need canonical link in your `<head>`. It looks like this:

```html
<link rel="canonical" href="https://www.cita.hr/en/" />
```

Canonical link tells search engines what is the preferred page version and prevents with indexing duplicated content which can hurt your SEO score.

Alternate links tells that the page is translated:

```html
<link rel="alternate" href="https://www.cita.hr/hr/" hreflang="hr" />
<link rel="alternate" href="https://www.cita.hr/en/" hreflang="x-default" />
```

You can also add RSS as an alternate link in your head so RSS readers can find you feed:

```html
<link
  rel="alternate"
  type="application/rss+xml"
  title="Studio CiTA Blog"
  href="/rss.xml"
/>
```

### Other useful tags

You can define what your website is sending to other sites. For example, to prevent the destination site to know the visitor clicked from link on your site, use this tag:

```html
<meta name="referrer" content="no-referrer" />
```

If this is too extreme, you can use a less strict version which still sends the full URLs for your internal links and sends only domain to others:

```html
<meta name="referrer" content="strict-origin-when-cross-origin" />
```

## Other tags

If you're on Fediverse, you might want to add the following tag to feature your profile:

```html
<meta name="fediverse:creator" content="@cita@mastodon.social" />
```

An modern form of the outdated pingbacks are called webmetions. Not really, but close enough. And if you are into webmentions, you can add it like this:

```html
<link
  rel="webmention"
  href="https://webmention.io/www.silvestar.codes/webmention"
/>
```

If you want to tell your visitors and your hosting provider which technology you're using, you can add the generator tag:

```html
<meta name="generator" content="Eleventy v3.1.2" />
```

Did you know you can refresh your page with HTML tag? This will refresh your page every 5 seconds.

```html
<meta http-equiv="refresh" content="5" />
```

And did you know you can redirect your page with HTML tag? This will redirect your page to example.com after 5 seconds.

```html
<meta http-equiv="refresh" content="5;url=https://example.com" />
```

Please use these tags with caution.

## Conclusion

Every great website starts with an organized head and you should let a web professional to do this job for you.
