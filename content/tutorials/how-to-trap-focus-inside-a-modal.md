---
title: "How to Trap Focus Inside a Modal"
date: 2018-08-10T13:04:33+02:00
draft: false
tags: ["tutorial", "A11y", "JS"]
---

{{% parawrap %}}

Trapping focus is one of the important issues concerningaccessibility. In case of assistive technology (like screen readers)users, or keyboard users,trapping focus is a must.

We are going to talk about How to Trap Focus inside of a modal as long as it is open and transfer focus to the rest of page once it is closed.

{{% /parawrap %}}

{{% parawrap %}}

Let’s see what we have here.

_Hint: If you only want the code snippet, just go to "Trap Focus Method" section._

**Contents**:

1. Terminology.
2. tabindex Attribute.
3. Element.focus()
4. Trap Focus method
5. Resources.

{{% /parawrap %}}

{{% parawrap %}}

## Terminology

According to [Ally.js](https://allyjs.io/what-is-focusable.html) library an HTML element can be a member of exactly one of the following five categories:

1. **Inert**: The element is not interactive and thus not focusable. And should not be focused by script (except in rare cases).

2. **Focusable**: The element can be focused by script Element.focus() and possibly the mouse (or pointer), but not the keyboard.

3. **Tabbable**: The element is keyboard focusable (“tabbable”), as it is part of the document’s sequential focus navigation order. The element is also focusable by script and possibly the mouse (or pointer). It is important to note that this navigation order is the same as DOM order.

4. **Only Tabbable**: The element is only keyboard focusable, possibly by the mouse (or pointer), but it cannot be focused by script.

5. **Forward Focus**: The element will forward focus to another element instead of receiving focus itself.

Here is a [table](https://allyjs.io/data-tables/focusable.html) of Browser Compatibility of Focusable and Tabbable Elements. It shows which elements are tabbable, focusable, or inert and its compatibility with different browsers.
{{% /parawrap %}}

{{% parawrap %}}

## tabindex Attribute

The attribute tabindex is a global HTML attribute. It decides which element could be focused and puts it in the sequential focus navigation order (or simply tab order).

Its value can be one of three:

1. **Negative value**: `tabindex="-1"` removes the element from tab order but it can be focusable by script.

2. **Zero value**: `tabindex="0"` put the element in the tab order and its order is affected by to DOM structure. Note that the visual (CSS) structure does not affect tab order. Therefore, it is a good practice to have a similar viasual and DOM order not to confuse keyboard users.

3. **Positive value**: `tabindex="1"` meaning that the element should be focusable in sequential keyboard navigation, with its order defined by the value of the number in an ascending manner. So `tabindex="2"` will precede `tabindex="3"`. This is Anti-Pattern and should be avoided because you will end up jumping between elements and this would cause confusion.
   {{% /parawrap %}}

{{% parawrap %}}

## Element.focus()

It sets focus on a specified element. This does not mean that it outs the element in the tab order, but it drags focus to it in a certain event using script. It can be used to a focusale or not unfocusable element.

```js
Element.focus();
```

The optional focus option is a boolean value.

If `false` method will scroll the element into the visible area of the browser window.

If `true` (default) method will not scroll the element into the visible area of the browser window.

{{% /parawrap %}}

{{% parawrap %}}

## Trap Focus Method

Here comes the exciting part. In this article we will tackle trapping focus inside a modal using JavaScript Of course, it is not the only method.

This a simple page example contains:

- _**Sign in button**_. It is not a button in fact. It is just a div acts like a button. That’s why I added `tabindex="0"` attribute to it.

- _**Form consists**_ of a Text box and a button.

- _**Modal**_ that pops up when you click Sign in button or press enter while it is focused. It contains:
  - _**Two Text boxes**_ . One for user name and the second for password entry. And finally a Log in button.

The required behavior is that when the modal is open focus is trapped inside it and does not reach other elements until modal is closed.
<br />

- **_HTML_**

{{< highlight html "linenos=table,linenostart=1" >}}

<!-- This div to make the overlay effect -->
<div id="overlay"></div>
<div id="top">
<div class="btn" tabindex="0">Sign in</div>
</div>
<br />
<form action="">
    <input type="submit" value="Search" class="backgroundElement" />
    <input type="text" class="searchTextBox backgroundElement" />
</form>
<div class="modal">
    <form action="" id="modal-form">
        <label for="">
            Username
            <input type="text" id="usernameBox" autocomplete="off" />
        </label>
        <br />
        <label for="">
            Password
            <input type="password" id="password" autocomplete="off" />
        </label>
        <input type="button" value="Log on" class="logOn" />
    </form>
</div>
{{</ highlight >}}

<br />

- **_Javascript_**


{{< highlight js "linenos=table,linenostart=1" >}}
const allBackgroundElements = document.querySelectorAll(
  '.backgroundElement, [tabindex="0"]'
);
const signInBtn = document.querySelector(".btn");
const logOnBtn = document.querySelector(".logOn");
const modal = document.querySelector(".modal");
const usernameTextBox = document.getElementById("usernameBox");
const searchTextBox = document.querySelector(".searchTextBox");
const passwordTextBox = document.getElementById("password");
const overlay = document.getElementById("overlay");

//listen for keydown. Check for target of the event.
document.addEventListener("keydown", e => {
  //if target is sign in button, check the key pressed.
  if (e.target === signInBtn) {
    //if key is "Enter":
    //Show modal.
    //Remove elements outside modal from tab order.
    //Focus on user name text box.
    //display overlay.
    if (e.keyCode === 13) {
      modal.classList.add("modal-visible");
      for (const element of allBackgroundElements) {
        element.setAttribute("tabindex", "-1");
      }
      usernameTextBox.focus();
      overlay.style.display = "block";
    }
  } else if (e.target === logOnBtn) {
    //if target is log on button, check for key(s) pressed.
    //if keys are "shift" and "tab":
    //Focus on password text box.
    if (e.shiftKey && e.keyCode === 9) {
      e.preventDefault();
      passwordTextBox.focus();
    } else if (e.keyCode === 13) {
      //if key is "Enter":
      //hide modal.
      //Add elements outside modal to tab order.
      //Focus on search text box.
      //hide overlay.
      e.preventDefault();
      modal.classList.remove("modal-visible");
      for (const element of allBackgroundElements) {
        element.setAttribute("tabindex", "0");
      }
      searchTextBox.focus();
      overlay.style.display = "none";
      //if key is "Tab":
      //Focus on user name text box.
    } else if (e.keyCode === 9) {
      e.preventDefault();
      usernameTextBox.focus();
    }
  } else if (e.target === usernameTextBox) {
    //If target is user name text box, check for keys pressed.
    //if keys are "shift" and "tab":
    //Focus on log on button.
    if (e.shiftKey && e.keyCode === 9) {
      e.preventDefault();
      logOnBtn.focus();
    }
  }
});

//listen for Click. Check for target of the event.
document.addEventListener("click", e => {
  //If target is sign in button:
  //Show modal.
  //Remove elements outside modal from tab order.
  //Focus on user name text box.
  //display overlay.
  if (e.target === signInBtn) {
    modal.classList.add("modal-visible");
    for (const element of allBackgroundElements) {
      element.setAttribute("tabindex", "-1");
    }
    usernameTextBox.focus();
    overlay.style.display = "block";
  } else if (e.target === logOnBtn) {
    //if target is log on button:
    //hide modal.
    //Add elements outside modal to tab order.
    //Focus on search text box.
    //hide overlay.
    modal.classList.remove("modal-visible");
    for (const element of allBackgroundElements) {
      element.setAttribute("tabindex", "0");
    }
    searchTextBox.focus();
    overlay.style.display = "none";
  }
});

{{</ highlight >}}

_**What did I do?**_

1.  When the Sign in button is clicked or pressed "Enter" upon, I opened modal, remove elements outside modal from tab order, and start focusing on the first focusable element of modal.

2.  Inside modal I took care of the first and last focusable elements, to ensure that when user reaches the last element for example the first element will be the target of the next tab, and when user presses "shift+tab" while on first element, it will bring focus to the last element. So Focus is trapped inside the modal as long as it is open.

3.  When user click or press "Enter" while on Log on button, the modal disappears, and all other elements return focusable again.

{{% /parawrap %}}

{{% parawrap %}}

## Resources

- [How to get the first and last focusable element in the DOM.](https://gomakethings.com/how-to-get-the-first-and-last-focusable-elements-in-the-dom/)

- [Focusable Elements — Browser compatibility table.](https://allyjs.io/data-tables/focusable.html)

- [What does Focusable mean?](https://allyjs.io/what-is-focusable.html)

- [HTMLElement.focus()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus)

- [Element.removeAttribute()](https://developer.mozilla.org/en-US/docs/Web/API/Element/removeAttribute)

- [NodeList.](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)

- [Creating keyboard shortcuts using JavaScript.](https://medium.com/@melwinalm/crcreating-keyboard-shortcuts-in-javascripteating-keyboard-shortcuts-in-javascript-763ca19beb9e)

- [Find Element based on Attribute Value.](https://stackoverflow.com/questions/2694640/find-an-element-in-dom-based-on-an-attribute-value#16775485)

{{% /parawrap %}}
