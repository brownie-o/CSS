$('#reg_btn, #login_btn').on('click', function(){
  $('body, #navbar').css({
    overflow: 'auto',
    'padding-right': 0
  })
})

$('#race a').on('click', function(){
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
  autoplay:{
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