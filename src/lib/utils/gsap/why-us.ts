import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const animateWhyUs = (container: HTMLElement | null) => {
  if (!container) return;

  // Reveal the container itself
  gsap.from(container.querySelectorAll('.section-title'), {
    scrollTrigger: {
      trigger: container.querySelector('.section-title'),
      start: 'top 85%',
    },
    y: 30,
    opacity: 0,
    duration: 1,
  });

  // Animate the tall card on the right
  gsap.from(container.querySelector('.card-right'), {
    scrollTrigger: {
      trigger: container.querySelector('.card-right'),
      start: 'top 80%',
    },
    x: 50,
    opacity: 0,
    duration: 1.2,
  });

  // Animate the top long card
  gsap.from(container.querySelector('.card-top'), {
    scrollTrigger: {
      trigger: container.querySelector('.card-top'),
      start: 'top 80%',
    },
    y: 40,
    opacity: 0,
    duration: 1,
  });

  // Animate the bottom row cards
  gsap.from(container.querySelectorAll('.card-bottom'), {
    scrollTrigger: {
      trigger: container.querySelector('.card-bottom-container'),
      start: 'top 85%',
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
  });
};
