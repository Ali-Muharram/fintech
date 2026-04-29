import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const animateReviews = (container: HTMLElement | null) => {
  if (!container) return;

  const q = gsap.utils.selector(container);

  // Header animation
  gsap.from(q('.reviews-header'), {
    scrollTrigger: {
      trigger: q('.reviews-header'),
      start: 'top 85%',
    },
    y: 30,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  });

  // Cards animation
  gsap.from(q('.review-card'), {
    scrollTrigger: {
      trigger: q('.reviews-container'),
      start: 'top 80%',
    },
    x: 100,
    opacity: 0,
    duration: 1,
    // stagger: 0.15,
    ease: 'power3.out',
  });
};

export const scrollReviews = (container: HTMLElement | null, direction: 'left' | 'right') => {
  if (!container) return;

  const scrollAmount = 380; // Card width + gap
  const targetScroll = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);

  gsap.to(container, {
    scrollLeft: targetScroll,
    duration: 0.8,
    ease: 'power3.inOut',
  });
};
