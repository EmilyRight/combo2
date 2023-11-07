export default class Animations {
  /**
   * @type {number}
   */

  keyframesForSim = [
    {
      transform: 'translateY(-5rem)',
      opacity: 0,
      offset: 0,
    },
    {
      transform: 'translateX(0.5rem)',
      opacity: 1,
      offset: 1,
    },
  ];

  keyframesForShadow = [
    {
      transform: 'scaleX(0)',
      right: '3rem',
      opacity: 0,
      offset: 0,
    },
    {
      transform: 'scaleX(1)',
      right: '-2.7rem',
      opacity: 1,
      offset: 1,
    },
  ];

  optionsForAnimations = {
    duration: 1000,
    delay: 400,
    iterations: 1,
    fill: 'forwards',
    easing: 'ease',
  };

  constructor() {
    this.scrollObserverElement = document.querySelector('.observe');
    this.animatedItems = document.querySelectorAll('.js-animation');
  }

  setAnimationOnScroll() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.setAnimation();
          observer.unobserve(this.scrollObserverElement);
        }
      });
    });
    observer.observe(this.scrollObserverElement);
  }

  setAnimation() {
    this.animatedItems.forEach((item) => {
      if (item.classList.contains('pic-layer_sim')) {
        item.animate(this.keyframesForSim, this.optionsForAnimations);
      } else {
        item.animate(this.keyframesForShadow, this.optionsForAnimations);
      }
    });
  }

  init() {
    this.setAnimationOnScroll();
  }
}
