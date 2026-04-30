import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const animateFAQ = (container: HTMLElement | null) => {
  if (!container) return;

  // Reveal header
  gsap.from(container.querySelectorAll('.faq-header > *'), {
    scrollTrigger: {
      trigger: container.querySelector('.faq-header'),
      start: 'top 85%',
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
  });

  // Reveal FAQ items
  gsap.from(container.querySelectorAll('.faq-item'), {
    scrollTrigger: {
      trigger: container.querySelector('.faq-items-container'),
      start: 'top 80%',
    },
    y: 20,
    opacity: 0,
    duration: 0.6,
    // stagger: 0.1,
    ease: 'power2.out',
  });
};
