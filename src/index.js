import "./scss/style.scss";

import {
  TweenMax,
  TimelineMax,
  Bounce,
  SlowMo,
  Elastic
} from "gsap";

const tl = new TimelineMax();

const logo = document.querySelectorAll(".cita");
const letter = document.querySelectorAll(".cita__letter");
const title = document.querySelectorAll(".js-target-title");
const info = document.querySelectorAll(".js-target-info");

const bounceIn = {
  scale: 0.15,
  rotationY: 90,
  rotationX: 90,
  transformOrigin: "center center",
  ease: Bounce.easeOut
};
const bounceOut = {
  scale: 0.85,
  rotation: 6,
  skewX: -3,
  transformOrigin: "bottom center",
  ease: Bounce.easeOut
};
const slideFromLeft = {
  x: "-100%",
  ease: SlowMo.ease.config(0.7, 0.7, false)
};
const slideFromRight = {
  x: "100%",
  ease: SlowMo.ease.config(0.7, 0.7, false)
};
const slideCenter = {
  x: "0%",
  ease: Elastic.easeOut.config(1, 0.75)
};

tl.add(TweenMax.from(logo, 10, bounceIn));
tl.add(TweenMax.staggerFrom(letter, 10, bounceOut, -0.5), "-=5");
tl.add(TweenMax.staggerFromTo(title, 5, slideFromLeft, slideCenter, 2.8), "-=2.5");
tl.add(TweenMax.staggerFromTo(info, 5, slideFromRight, slideCenter, 2.8), "-=2.5");

tl.duration(10);
