"use strict";

import "./scss/cita.scss";

import {
  TweenMax,
  TimelineMax,
  Elastic
} from "gsap";

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

const tweenDuration = 2;
const tweenDelay = tweenDuration / 2;

const scr = window.requestAnimationFrame || ((callback) => setTimeout(callback, 1000/60));

const elementsToShow = document.querySelectorAll(".tile");

const isElementInViewport = (el) => {
  let rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight * 1.55 || document.documentElement.clientHeight * 1.55) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

const animateElements = (el) => {
  if (isElementInViewport(el) && !el.classList.contains("animate")) {
    el.classList.add("animate");

    const tl = new TimelineMax();

    const animateElements = el.querySelectorAll(".show-on-scroll");

    tl.add(TweenMax.staggerTo(animateElements, tweenDuration, tweenConfig, tweenDelay));
    tl.duration(animateElements.length * 2 / 3);
  }
};

const loop = () => {
  elementsToShow.forEach(animateElements);

  scr(loop);
};

loop();
