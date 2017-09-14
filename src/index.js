"use strict";

import "./scss/style.scss";

import {
  TweenMax,
  Elastic
} from "gsap";

const scr = window.requestAnimationFrame || ((callback) => setTimeout(callback, 1000/60));

const elementsToShow = document.querySelectorAll(".show-on-scroll");

const isElementInViewport = (el) => {
  let rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

const tweenConfig = {
  opacity: 1,
  scale: 1,
  transform: 0,
  rotation: 0,
  skewX: 0,
  x: 0,
  y: 0,
  transformOrigin: "center center",
  ease: Elastic.easeOut.config(1, 0.5)
};

const tweenDuration = 4;
const tweenDelay = tweenDuration / 6;

const loop = () => {
  elementsToShow.forEach((element) => {
    if (isElementInViewport(element) && !element.classList.contains("animate")) {
      const elementDelay = element.getAttribute("data-delay");
      let elementConfig = tweenConfig;

      if(tweenDelay) {
        elementConfig.delay = tweenDelay * elementDelay;
      }

      TweenMax.to(element, 1, elementConfig);
      element.classList.add("animate");
    }
  });

  scr(loop);
}

loop();
