// ? Slider ------------------------------------------------------------

function slider() {
  const slides = document.querySelectorAll('.offer__slide'),
  next = document.querySelector('.offer__slider-next'),
  back = document.querySelector('.offer__slider-prev'),
  current = document.querySelector('#current'),
  total = document.querySelector('#total'),
  wrapper = document.querySelector('.offer__slider-wrapper'),
  innerSlider = document.querySelector('.offer__slider-inner'),
  width = window.getComputedStyle(wrapper).width,
  slider = document.querySelector('.offer__slider')

  let slideIndex = 1
  let offset = 0

  // ! CORUSEL SLIDER ---------------------------------------------------
  if (slides.length < 10) {
  total.textContent = `0${slides.length}`
  current.textContent = `0${slideIndex}`;
  } else {
  total.textContent = slides.length
  current.textContent = slideIndex;
  }

  innerSlider.style.width = 100 * slides.length + '%'
  innerSlider.style.display = 'flex'
  innerSlider.style.transition = '.5s ease transform'
  wrapper.style.overflow = 'hidden'

  slides.forEach(slide => {
  slide.style.width = width
  })

  const indicators = document.createElement('ol')
  const dots = []
  indicators.classList.add('carusel-indicators')
  slider.append(indicators)

  for (let i = 0; i < slides.length; i++) {
  const dot = document.createElement('li')
  dot.setAttribute('data-slide-to', i + 1)
  dot.classList.add('carusel-dot')
  if(i == 0) dot.style.opacity = 1
  indicators.append(dot)
  dots.push(dot)
  }

  // ? slider next btn
  next.addEventListener('click', () => {
  if(offset == parseFloat(width) * (slides.length - 1)) {
    offset = 0
  } else {
    offset += parseFloat(width)
  }
  innerSlider.style.transform = `translateX(-${offset}px)`

  if (slideIndex == slides.length) {
    slideIndex = 1
  } else {
    slideIndex++ 
  } 

  if (slideIndex < 10) {
    current.textContent = `0${slideIndex}`;
  } else {
    current.textContent = slideIndex;
  }

  dots.forEach(dot => dot.style.opacity = 0.5)
  dots[slideIndex - 1].style.opacity = 1
  })

  // ? slider back btn
  back.addEventListener('click', () => {
  if (offset <= 0) {
    offset = parseFloat(width) * (slides.length - 1)
    console.log(width);
  } else {
    offset -= parseFloat(width)
  }
  innerSlider.style.transform = `translateX(-${offset}px)`

  if (slideIndex == 1) {
    slideIndex = slides.length
  } else {
    slideIndex--
  } 

  if (slideIndex < 10) {
    current.textContent = `0${slideIndex}`;
  } else {
    current.textContent = slideIndex;
  }

  dots.forEach(dot => dot.style.opacity = 0.5)
  dots[slideIndex - 1].style.opacity = 1

  })

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to')

      slideIndex = slideTo

      offset = parseFloat(width) * (slideTo - 1)

      innerSlider.style.transform = `translateX(-${offset}px)`

      dots.forEach(dot => dot.style.opacity = 0.5)
      dots[slideIndex - 1].style.opacity = 1

      if (slideIndex < 10) {
        current.textContent = `0${slideIndex}`;
      } else {
        current.textContent = slideIndex;
      }
    })
  })
}

export default slider