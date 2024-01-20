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
const swpier = new Swiper('.swiper', {
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

// GSAP
// 註冊GSAP plugin
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText)

// ScrollToPlugin
// 點擊按鈕時，頁面滑動到指定位置
$('#navbar .main-link, .backtop a').each(function (index) {
  $(this).on('click', function (e) {
    e.preventDefault() // 取消點擊預設行為(跳轉)
    if ($(this).attr('href') === '#section04' || $(this).attr('href') === '#section05') {
      gsap.to($(window), {
        scrollTo: {
          y: `#section0${index + 1}`
        },
        duration: 1.5,
        ease: 'back.inOut'
      })
    } else {
      gsap.to($(window), {
        scrollTo: {
          y: `#section0${index + 1}`,
          offsetY: 180 // 讓各section不會卡在navbar上
        },
        duration: 1.5,
        ease: 'back.inOut'
      })
    }
  })
})

// navbar 滾動收合
gsap.from('#navbar', {
  yPercent: -100,
  paused: false,
  duration: 0.5,
  scrollTrigger: {
    start: 'top 60',
    end: () => '+=' + document.documentElement.scrollHeight, // 整份文件滾動軸的高度
    onEnter(self) {
      // console.log(self)
      self.animation.play() // 進來時撥放動畫
    },
    onUpdate(self) {
      console.log(self.direction) // 滾動軸滾動的方向: 往下: 1; 往上: -1
      // 往上滾動時正向播放(往下走)，往下滾動時反向播放(往上消失)
      self.direction === -1 ? self.animation.play() : self.animation.reverse()
    },
    markers: true
  }
})

// backtop
gsap.to('.backtop', {
  scrollTrigger: {
    trigger: '#footer',
    start: 'top bottom',
    end: '100% bottom',
    toggleActions: 'play none none reverse' // 進入時正向播放 離開時反向播放(消失)
  },
  display: 'block',
  opacity: 1,
  duration: 1
})

// navbar active的位置
$('.main-link').each(function (index, link) {
  let id = $(link).attr('href') // id = #section01 .....#section05
  gsap.to(link, {
    scrollTrigger: {
      trigger: id, // 拿 #section01~5 當觸發點
      start: 'top center',
      end: 'bottom center',
      // 觸發時加上active的 class
      toggleClass: {
        targets: link,
        className: 'active'
      },
      // markers: true
    }
  })
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

// 用值是function也可以達到上面的效果
// gsap.to('.float-island', {
//   y: function(index, target, targest) {
//     return 50*(index+1)
//   },
//   duration: function(index, target, targets) {
//     return 10*(index+1)
//   },
//   repeat: -1,
//   yoyo: true, 
//   ease: 'power1.inOut'
// })

// 霧
$('.fog').each(function (index, fog) {
  // 也可以 set 用來設定樣式的初始值
  gsap.set(fog, {
    width: '100%',
    height: '100%',
    background: 'url("./images/fog.png") no-repeat center/80%',
    opacity: 0.8,
    position: 'absolute',
    top: 'random(0, 100)' + '%',
    x: function () {
      // 設定偶數的霧要從左邊進場，奇數的霧要從右邊進場
      // 單數的話 x= $(window).width() ， 雙數的話 x= -$(window).width()
      return index % 2 === 0 ? -$(window).width() : $(window).width()
    }
  })
  // to = 做補間動畫
  gsap.to(fog, {
    x: function () {
      // 正負交換
      return index % 2 === 0 ? $(window).width() : -$(window).width()
    },
    // 動畫重複播放時執行的函式
    onRepeat() {
      // 將霧的top 設定為隨機值
      $(fog).css({
        // gsap 內建 .random()
        top: gsap.utils.random(0, 100) + '%'
      })
    },
    repeat: -1,
    duration: 60,
    ease: 'none'
  })
})

// 流星
// 1. 創建流星
function createStar(starNumber) {
  for (let i = 0; i < starNumber; i++) {
    $('.shooting_star').append('<div class="star"></div>')
  }
  const stars = gsap.utils.toArray('.star') // 轉成陣列
  return stars
}

// 2. 設定流星補間動畫預設值
function setStarTween(stars) {
  gsap.set('.shooting_star', {
    perspective: 800 // 透視800 較有遠近感
  })
  // 初始化每顆星星的定位跟旋轉
  stars.forEach(function (star, index) {
    gsap.set(star, {
      transformOrigin: '0 50%', // 原點: 左邊中間
      position: 'absolute',
      left: gsap.utils.random($(window).width() / 2, $(window).width() * 2),
      top: gsap.utils.random(-100, -100),
      rotation: -25
    })
  })
  return stars
}

// 3. 流星動畫
function playStarTimeline(stars) {
  const tl = gsap.timeline({
    repeat: -1
  })

  tl.to(stars, {
    // 設定流星降落位置
    x: '-=' + $(window).width() * 1.5, // 流星往左
    y: '+=' + $(window).height() * 1.5, // 流星往下
    z: 'random(-100, 500)',
    stagger: function(index){
      return gsap.utils.random(index + 5, (index + 5)*2, 1)
    },
    duration: 'random(0.5, 3, 0.1)', // random 0.5 ~ 3 以0.1的間隔
    ease: 'none'
  })
}

const playStar = gsap.utils.pipe(createStar, setStarTween, playStarTimeline)
playStar(30)

// splitText
gsap.set('#splitText', {
  perspective: 400
})

const tl = gsap.timeline({
  repeat: -1,
  repeatDelay: 8
})

// gsap.utils.toArray() gsap內建 可將段落轉成陣列
const paragraphs = gsap.utils.toArray('#splitText p')
// console.log(paragraphs)

// 用 .map()加工元素後 丟出新陣列
const splitTexts = paragraphs.map(function (p) {
  return new SplitText(p, {
    charsClass: 'charBg' // 對 p 加上 class
  })
})
console.log(splitTexts)

splitTexts.forEach(function (splitText) {
  const chars = splitText.chars
  tl.from(chars, {
    y: 80, 
    rotationX: 0,
    rotationY: 180,
    scale: 2,
    transformOrigin: '0%, 50%, -100',
    opacity: 0,
    duration: 2,
    ease: 'back',
    stagger: 0.1,
    onComplete() {
      // 飛出去的動畫
      gsap.to(chars, {
        delay: 3,
        duration: 2,
        opacity: 0,
        scale: 2,
        y: 80,
        rotationX: 180,
        rotationY: 0,
        transformOrigin: '0%, 50%, -100',
        ease: 'back',
        stagger: 0.1
      })
    }
  }, '+=3')
})