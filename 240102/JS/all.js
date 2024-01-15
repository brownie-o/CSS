$('#reg_btn, #login_btn').on('click', function () {
  $('body, #navbar').css({
    overflow: 'auto',
    'padding-right': 0
  })
})

$('#race a').on('click', function () {
  $('#race a').removeClass('active')
  $(this).addClass('active')
})

// swiper
const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,
  speed: 1000,
  spaceBetween: 15, // 每個item距離15px
  centerSlides: true,
  autoplay: {
    delay: 5000,
  },
  slidesPerView: 1,
  effect: 'coverflow',
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: 0,
  },
  // https://swiperjs.com/demos#responsive-breakpoints
  breakpoints: {
    576: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    920: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
    },
  },
  // https://swiperjs.com/demos#navigation
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
})

// 視差效果 
// 星空背景
gsap.to('body', {
  scrollTrigger: {
    trigger: 'body',
    start: 'top 0%',
    end: 'bottom 0%',
    scrub: 5, // takes 5 second to "catch up" to the scrollbar
    // markers: true,
  },
  backgroundPosition: '50% 100%',
  ease: 'none',
})

// 空島
// 用時間軸控制三個島做進場動畫
const float_tl = gsap.timeline({
  scrollTrigger: {
    trigger: 'body', // body動時就會觸發
    start: 'top 0%',
    end: 'bottom 0%',
    scrub: 5,
    // markers: true
  },
  ease: 'none' // 空島的動畫速率: none
})

float_tl
  .from('.float-wrap-01', {
    left: '-30%',
  })
  .from('.float-wrap-02', {
    right: '-30%'
  }, '<') // '<' 讓三個動畫起點一致
  .from('.float-wrap-03', {
    bottom: '-100%'
  }, '<') // '<' 讓三個動畫起點一致

// 空島自己上下浮動的動畫
$('.float-island').each(function (index, island) {
  gsap.to(island, {
    y: 50 * (index + 1),
    duration: 10 * (index + 1),
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
  })
})