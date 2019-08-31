---
title: "Images Native Lazy Loading and Its Polyfill"
date: 2019-08-31T19:32:04+02:00
draft: false
tags: ["tutorial", "performance", "HTML", "JS"]
description: "How to natively lazy load images and iframes starting supported from Chrome 75, and polyfill for other browsers."
cover: ""
---

{{% parawrap %}}
## What is Lazy loading
Images, and videos consume a huge amount of data, and affects web performances. If your web page contains many images (or videos), it is true that some -if not many- of them are out of viewport. The normal behaviour of any browser is to load all images during the web page loading which may slow loading time. 

Lazy loading is to defer images loading until it is about to enter the viewport, and only load the ones that are displayed once the web page loads. Thus decreases the time the web page needs to firstly load.
{{% /parawrap %}}

{{% parawrap %}}
## Native Lazy Loading
Developers use javascript plugins to make lazy loading. The good news is that Native lazy loading is now supported in Chrome 75. Using it is very simple. You will only have to add the attribute `loading="lazy"` to the `<img>` element.


{{< highlight html >}}

 <img src="image.jpg" loading="lazy" alt="..." />

{{</ highlight >}}

The value of the attribute `loading` can be either:

- **lazy**  => _tell the browser to load image just before showing onthe screen._
- **eager** => _make browser load image as soon as possible. This can be added to the images that will appear inside viewport once theweb page loads._
- **auto**  => _make browser determine whether or not to lazily load._

{{% /parawrap %}}

{{% parawrap %}}
## Lazy Loading Plugin

There are many javascript plugins to achieve lazy loading. They depend on replacing `src` attribute by `data-src` attribute to prevent the browser from loading the image. 
{{< highlight html >}}
 <img data-src="image.jpg" alt="..." />
{{</ highlight >}}
Then use javascript to detect when image is close to the viewport to copy the value of the `data-src` attribute to the `src` attribute so the browser can load it.

Examples for such libraries: 

- [vanilla-lazyload.](https://www.andreaverlicchi.eu/lazyload)
- [lazysizes.](https://github.com/aFarkas/lazysizes)
{{% /parawrap %}}

{{% parawrap %}}
## Hybrid Lazy Loading

As explained by [Andrea Verlicchi](https://twitter.com/verlok) in his [article](https://www.smashingmagazine.com/2019/05/hybrid-lazy-loading-progressive-migration-native/) on Smashing Magazine: 
"_Hybrid lazy loading is a technique to use native lazy loading on browsers that support it, otherwise, rely on JavaScript to handle the lazy loading._"

{{< highlight html "linenos=table,linenostart=1" >}}
<!--Load this hero image as soon as possible-->
<img src="hero.jpg" loading="eager" alt=".."/>

<!--Lazy load these images as user scroll down-->
<img data-src="image1.jpg" loading="lazy" alt=".." class="lazyload"/>

<img data-src="image2.jpg" loading="lazy" alt=".." class="lazyload"/>

<img data-src="image3.jpg" loading="lazy" alt=".." class="lazyload"/>
{{</ highlight >}}
<br />
{{< highlight js "linenos=table,linenostart=1" >}}
//Check for browser support.
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('lazyload')
    //copy the value of the data-src to the src.
    images.forEach(img => img.src = img.dataset.src)
} else {
    //if no support, async load the lazysizes plugin
    let script = document.createElement("script");
    script.async = true;
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/4.1.8/lazysizes.min.js";
    document.body.appendChild(script);
}
{{</ highlight >}}
{{% /parawrap %}}
{{% parawrap %}}
{{< youtube id="bE2jCvZAdqs" >}}
{{% /parawrap %}}

{{% parawrap %}}
## Resources
- [Native image lazy-loading for the web!](https://addyosmani.com/blog/lazy-loading/)
- [Hybrid Lazy Loading: A Progressive Migration To Native Lazy Loading](https://www.smashingmagazine.com/2019/05/hybrid-lazy-loading-progressive-migration-native/)
{{% /parawrap %}}