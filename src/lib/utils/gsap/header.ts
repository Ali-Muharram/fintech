import gsap from 'gsap';

export const animateHeader = (container: HTMLElement | null) => {
  if (!container) return;

  gsap.from(container.querySelector('.header-nav'), {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: 'power4.out',
    delay: 0.5,
  });
};
