/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/clas.js":
/*!*****************************!*\
  !*** ./src/modules/clas.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// ? Class ------------------------------------------------------------

function clas() {
  class menuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parentSelector = document.querySelector(parentSelector);
      this.transfer = 11700;
      this.changeToUZS();
    }

    changeToUZS() {
      this.price *= this.transfer;
    }

    render() {
      const card = document.createElement("div");

      if (this.classes.length === 0) {
        card.classList.add("menu__item");
      } else {
        this.classes.forEach((className) => card.classList.add(className));
      }

      card.innerHTML = `
              <img src="${this.src}" alt="${this.alt}" />
              <h3 class="menu__item-subtitle">${this.title}</h3>
              <div class="menu__item-descr">${this.descr}</div>
              <div class="menu__item-divider"></div>
              <div class="menu__item-price">
                  <div class="menu__item-cost">Price:</div>
                  <div class="menu__item-total"><span>${this.price}so'm</span> month</div>
              </div>
          `;

      this.parentSelector.append(card);
    }
  }

  axios.get('http://localhost:3000/menu').then(data => {
    data.data.forEach(({src, alt, title, descr, price}) => {
      new menuCard(src, alt, title, descr, price, ".menu .container").render();
    })
  })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clas);

/***/ }),

/***/ "./src/modules/form.js":
/*!*****************************!*\
  !*** ./src/modules/form.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// ? FORM ------------------------------------------------------------

function form() {
  const forms = document.querySelectorAll("form");
  const message = {
    loading: "../img/spinner.svg",
    success: "Ma'lumot yuborildi :)",
    failure: "Xatolik yuz berdi :(",
  };

  forms.forEach((form) => {
    BindPostData(form);
  });

  async function postData(url, data) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: data,
    })

    return await res.json()
  }

  function BindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const loading = document.createElement("img");
      loading.src = message.loading;
      loading.style.cssText = `
              display: block;
              margin: 0 auto;
              width: 60px;
          `;
      form.insertAdjacentElement("afterend", loading);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()))

      postData('http://localhost:3000/request', json)
        .then((data) => {
          console.log(data);
          showMessageModal(message.success);
          loading.remove();
        })
        .catch(() => showMessageModal(message.failure))
        .finally(() => form.reset());
    });
  }


  function showMessageModal(msg) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");

    showModal();

    const messageModal = document.createElement("div");
    messageModal.classList.add("modal__dialog");
    messageModal.innerHTML = `
          <div class="modal__content">
              <div data-close class="modal__close">&times;</div>
              <div class="modal__title">${msg}</div>
          </div>
      `;
    modal.append(messageModal);

    setTimeout(() => {
      messageModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      hideModal();
    }, 3000);
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./src/modules/loader.js":
/*!*******************************!*\
  !*** ./src/modules/loader.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// ? Loader ------------------------------------------------------------
function loader() {
  let loader = document.querySelector(".loader");

  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }, 2000);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (loader);

/***/ }),

/***/ "./src/modules/modal.js":
/*!******************************!*\
  !*** ./src/modules/modal.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function modal() {
  // ? Modal ------------------------------------------------------------

  let modal = document.querySelector(".modal"),
  modalTrigger = document.querySelectorAll("[data-modal]");
  const modalTimerId = setTimeout(showModal, 5000);

  function showModal() {
  modal.classList.add("show");
  modal.classList.remove("hide");
  document.body.style.overflow = "hidden";
  clearTimeout(modalTimerId);
  }

  function hideModal() {
  modal.classList.add("hide");
  modal.classList.remove("show");
  document.body.style.overflow = "";
  }

  modalTrigger.forEach((item) => {
  item.addEventListener("click", () => {
    showModal();
  });
  });

  modal.addEventListener("click", (e) => {
  if (e.target == modal || e.target.getAttribute("data-close") == "") {
    hideModal();
  }
  });

  window.addEventListener("keydown", (e) => {
  if (e.code === "Escape" && modal.classList.contains("show")) {
    hideModal();
  }
  });

  function showModalByScroll() {
  if (
    window.scrollY + document.documentElement.clientHeight >=
    document.documentElement.scrollHeight - 1
  ) {
    showModal();
    window.removeEventListener("scroll", showModalByScroll);
  }
  }
  window.addEventListener("scroll", showModalByScroll);

  // ! For example
  // setInterval(() => {
  //     console.log('----------');
  //     console.log(window.scrollY);
  //     console.log(window.pageYOffset);
  //     console.log(document.documentElement.scrollTop);
  //     console.log(document.documentElement.clientHeight);
  //     console.log(document.documentElement.scrollHeight);
  // },  10000)
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);

/***/ }),

/***/ "./src/modules/slider.js":
/*!*******************************!*\
  !*** ./src/modules/slider.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./src/modules/tab.js":
/*!****************************!*\
  !*** ./src/modules/tab.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tab() {
  // ? Tabs ------------------------------------------------------------

  let tabheader__items = document.querySelector(".tabheader__items"),
  tabheader__item = document.querySelectorAll(".tabheader__item"),
  tabcontent = document.querySelectorAll(".tabcontent");



  function hideTabContent() {
  tabcontent.forEach((item) => {
    item.classList.add("hide");
    item.classList.remove("show", "fade");
  });

  tabheader__item.forEach((item) => {
    item.classList.remove("tabheader__item_active");
  });
  }
  hideTabContent();

  function showTabContent(i) {
  tabcontent[i].classList.add("show", "fade");
  tabcontent[i].classList.remove("hide");
  tabheader__item[i].classList.add("tabheader__item_active");
  }
  showTabContent(0);

  tabheader__items.addEventListener("click", (e) => {
    let target = e.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabheader__item.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tab);

/***/ }),

/***/ "./src/modules/timer.js":
/*!******************************!*\
  !*** ./src/modules/timer.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer() {
  // ? Timer ------------------------------------------------------------

  const deadline = "2023-08-28";

  function getTimeRemaining(endtime) {
  let days, hours, minutes, seconds;

  const timer = Date.parse(endtime) - Date.parse(new Date());

  if (timer <= 0) {
    days = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
  } else {
    days = Math.floor(timer / (1000 * 60 * 60 * 24));
    hours = Math.floor((timer / (1000 * 60 * 60)) % 24);
    minutes = Math.floor((timer / 1000 / 60) % 60);
    seconds = Math.floor((timer / 1000) % 60);
  }

  return { timer, days, hours, minutes, seconds };
  }

  function setZero(num) {
  if (num >= 0 && num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
  }

  function setClock(selector, endtime) {
  const timer = document.querySelector(selector),
    days = timer.querySelector("#days"),
    hours = timer.querySelector("#hours"),
    minutes = timer.querySelector("#minutes"),
    seconds = timer.querySelector("#seconds"),
    timeInterval = setInterval(updateClock, 1000);

  function updateClock() {
    const t = getTimeRemaining(endtime);

    days.textContent = setZero(t.days);
    hours.textContent = setZero(t.hours);
    minutes.textContent = setZero(t.minutes);
    seconds.textContent = setZero(t.seconds);

    if (t.timer <= 0) {
      clearInterval(timeInterval);
    }
  }
  }

  setClock(".timer", deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_clas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/clas */ "./src/modules/clas.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/form */ "./src/modules/form.js");
/* harmony import */ var _modules_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/loader */ "./src/modules/loader.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modules/modal */ "./src/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modules/slider */ "./src/modules/slider.js");
/* harmony import */ var _modules_tab__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../modules/tab */ "./src/modules/tab.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../modules/timer */ "./src/modules/timer.js");









(0,_modules_loader__WEBPACK_IMPORTED_MODULE_2__["default"])()
;(0,_modules_clas__WEBPACK_IMPORTED_MODULE_0__["default"])()
;(0,_modules_form__WEBPACK_IMPORTED_MODULE_1__["default"])()
;(0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])()
;(0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])()
;(0,_modules_tab__WEBPACK_IMPORTED_MODULE_5__["default"])()
;(0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])()

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map