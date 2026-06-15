new Swiper(".card-wrapper", {
  loop: true,
  spaceBetween: 20,

  // pagination bullet
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    768: {
        slidesPerView: 1
    },
    995: {
        slidesPerView: 2
    },
    1024: {
        slidesPerView: 2
    },
  }
});
