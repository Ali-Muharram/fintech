import gsap from 'gsap';

export const animateHero = (container: HTMLElement | null) => {
  if (!container) return;

  // Use GSAP selector utility for better scoping
  const q = gsap.utils.selector(container);

  const tl = gsap.timeline({
    defaults: {
      ease: 'power3.out',
      duration: 0.8,
    },
  });

  // Ensure elements are present before animating
  const badge = q('.hero-badge');
  const title = q('.hero-title');
  const desc = q('.hero-description');

  if (badge.length) {
    tl.from(badge, {
      y: -20,
      opacity: 0,
    });
  }

  if (title.length) {
    tl.from(
      title,
      {
        y: 40,
        opacity: 0,
        duration: 1,
      },
      '-=0.4'
    );
  }

  if (desc.length) {
    tl.from(
      desc,
      {
        y: 20,
        opacity: 0,
      },
      '-=0.6'
    );
  }

  // if (btns.length) {
  //   tl.from(
  //     btns,
  //     {
  //       y: 20,
  //       opacity: 0,
  //     },
  //     '-=0.4'
  //   );
  // }

  return tl;
};
