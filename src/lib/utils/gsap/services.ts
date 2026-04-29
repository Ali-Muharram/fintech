import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const animateServices = (container: HTMLElement | null) => {
  if (!container) return;

  const q = gsap.utils.selector(container);

  // Animate the header part
  gsap.from(q('.services-header'), {
    scrollTrigger: {
      trigger: q('.services-header'),
      start: 'top 85%',
    },
    y: 40,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  });

  // Animate the cards with a stagger
  gsap.from(q('.service-card'), {
    scrollTrigger: {
      trigger: q('.services-grid'),
      start: 'top 80%',
    },
    y: 60,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out',
  });
};
