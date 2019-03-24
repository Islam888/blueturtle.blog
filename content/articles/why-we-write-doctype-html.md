---
title: "Why We Write <!DOCTYPE html> ?"
date: 2019-03-11T01:13:08+02:00
draft: false
tags: ["article", "beginner", "HTML"]
description: "Things we take as granted."
cover: "/img/cover/tape.jpg"
---
{{% parawrap %}}
Yes, this is for the absolute beginner, and also for those non-beginners who forgot. I am going to look back behinds and re-discover things we take as granted by asking "WHAT", "WHY", and "HOW".
{{% /parawrap %}}
{{% parawrap %}}
{{< highlight html "hl_lines=1" >}}
<!DOCTYPE html>
<html lang="en">
    <head></head>
    <body></body>
</html>
{{</ highlight >}}
<br />

`<! DOCTYPE html>` is the first html tag written at the beginning of any html file. It is not an element and doesn't has content or closing tag.
Its job is to tell the browser that the document being rendered is an HTML document. That's the reason for its position to be the first thing the browser read.
{{% /parawrap %}}

{{% parawrap %}}

## But what would happen if we didn't write it?

If browser didn't find a [DOCTYPE](https://developer.mozilla.org/en-US/docs/Glossary/Doctype) declaration, it would enter [quirks mode](https://en.m.wikipedia.org/wiki/Quirks_mode)🤔 which is a technique used by browsers to try to support old web pages that has been made for Navigator 4 and Internet Explorer 5. [Read about it here](https://developer.mozilla.org/en-US/docs/Web/HTML/Quirks_Mode_and_Standards_Mode).

This means that your website will have different behavior and look with different browsers especially if it has new HTML elements and features.

{{% /parawrap %}}
