import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const animatePricing = (container: HTMLElement | null) => {
  if (!container) return;

  // Reveal the section header
  gsap.from(container.querySelectorAll('.pricing-header > *'), {
    scrollTrigger: {
      trigger: container.querySelector('.pricing-header'),
      start: 'top 85%',
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    // stagger: 0.1,
  });

  // Reveal the pricing cards
  gsap.from(container.querySelectorAll('.pricing-card'), {
    scrollTrigger: {
      trigger: container.querySelector('.pricing-cards-container'),
      start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    // stagger: 0.2,
    ease: 'power3.out',
  });
};
