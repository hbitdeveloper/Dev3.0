(()=>{"use strict";var __webpack_modules__={162:()=>{eval("\n// UNUSED EXPORTS: default\n\n;// CONCATENATED MODULE: ./src/js/utils/index.js\n/*\r\n * @Date: 2022-12-28 09:58:32\r\n * @LastEditors: Leo\r\n * @LastEditTime: 2023-01-07 15:45:27\r\n * @FilePath: \\3.0-manger\\src\\js\\utils\\index.js\r\n */\nfunction debounce(fn, wait) {\n  var _this = this;\n  var t;\n  return function () {\n    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n    clearTimeout(t);\n    t = setTimeout(function () {\n      return fn.apply(_this, args);\n    }, wait);\n  };\n}\nvar trapFocusHandlers = {};\nfunction getFocusableElements(container) {\n  return Array.from(container.querySelectorAll(\"summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe\"));\n}\nfunction trapFocus(container) {\n  var elementToFocus = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : container;\n  var elements = getFocusableElements(container);\n  var first = elements[0];\n  var last = elements[elements.length - 1];\n  removeTrapFocus();\n  trapFocusHandlers.focusin = function (event) {\n    if (event.target !== container && event.target !== last && event.target !== first) return;\n    document.addEventListener('keydown', trapFocusHandlers.keydown);\n  };\n  trapFocusHandlers.focusout = function () {\n    document.removeEventListener('keydown', trapFocusHandlers.keydown);\n  };\n  trapFocusHandlers.keydown = function (event) {\n    if (event.code.toUpperCase() !== 'TAB') return; // If not TAB key\n    // On the last focusable element and tab forward, focus the first element.\n    if (event.target === last && !event.shiftKey) {\n      event.preventDefault();\n      first.focus();\n    }\n\n    //  On the first focusable element and tab backward, focus the last element.\n    if ((event.target === container || event.target === first) && event.shiftKey) {\n      event.preventDefault();\n      last.focus();\n    }\n  };\n  document.addEventListener('focusout', trapFocusHandlers.focusout);\n  document.addEventListener('focusin', trapFocusHandlers.focusin);\n  elementToFocus.focus();\n}\nfunction removeTrapFocus() {\n  var elementToFocus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;\n  document.removeEventListener('focusin', trapFocusHandlers.focusin);\n  document.removeEventListener('focusout', trapFocusHandlers.focusout);\n  document.removeEventListener('keydown', trapFocusHandlers.keydown);\n  if (elementToFocus) elementToFocus.focus();\n}\n\n/*\r\n    指定容器下 - autoplay video\r\n    el - video 父元素\r\n*/\nfunction autoplayVideo(el) {\n  var video = el.querySelector('iframe[src*=\"www.youtube.com\"], iframe[src*=\"player.vimeo.com\"], video');\n  if (!video) return;\n  if (video.tagName.toLowerCase() === 'video') {\n    video.play();\n    return;\n  }\n  video.src = video.src + (video.src.indexOf('?') < 0 ? '?' : '&') + 'autoplay=1';\n}\n/*\r\n    指定容器下 - stop video\r\n    el - video 父元素\r\n*/\nfunction stopVideo(el) {\n  var video = el.querySelector('iframe[src*=\"www.youtube.com\"], iframe[src*=\"player.vimeo.com\"], video');\n  if (!video) return;\n  if (video.tagName.toLowerCase() === 'video') {\n    video.pause();\n    return;\n  }\n  video.src = video.src.replace('&autoplay=1', '').replace('?autoplay=1', '');\n}\n;// CONCATENATED MODULE: ./src/js/index/video-swiper.js\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return _typeof(key) === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (_typeof(input) !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (_typeof(res) !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\n/*\r\n * @Date: 2022-12-01 17:11:17\r\n * @LastEditors: Leo\r\n * @LastEditTime: 2023-01-07 15:53:05\r\n * @FilePath: \\3.0-manger\\src\\js\\index\\video-swiper.js\r\n */\n\nvar VideoSlideshow = /*#__PURE__*/function () {\n  function VideoSlideshow(el) {\n    var _this = this;\n    _classCallCheck(this, VideoSlideshow);\n    this.DOM = {\n      el: el\n    };\n    this.config = {\n      slideshow: {\n        delay: 5000,\n        pagination: {\n          duration: 5\n        }\n      }\n    };\n    document.addEventListener('DOMContentLoaded', function () {\n      _this.DOM.el = document.querySelector('.video-slideshow');\n      _this.init();\n    });\n  }\n  _createClass(VideoSlideshow, [{\n    key: \"init\",\n    value: function init() {\n      var self = this;\n      this.slideshow = new Swiper(this.DOM.el, {\n        loop: true,\n        slidesPerView: \"auto\",\n        spaceBetween: 30,\n        centeredSlides: true,\n        preloadImages: true,\n        followFinger: false,\n        updateOnImagesReady: true,\n        lazy: true,\n        pagination: {\n          el: '.slideshow-pagination',\n          clickable: true,\n          bulletClass: 'slideshow-pagination-item',\n          bulletActiveClass: 'active pagination-active',\n          clickableClass: 'slideshow-pagination-clickable',\n          modifierClass: 'slideshow-pagination-',\n          renderBullet: function renderBullet(index, className) {\n            var slideIndex = index,\n              number = index <= 8 ? '0' + (slideIndex + 1) : slideIndex + 1;\n            var paginationItem = '<span class=\"slideshow-pagination-item\">';\n            paginationItem = index <= 8 ? paginationItem + '<span class=\"pagination-separator\"><span class=\"pagination-separator-loader\"></span></span>' : paginationItem;\n            paginationItem += '</span>';\n            return paginationItem;\n          }\n        },\n        effect: $(window).width() > 750 ? \"slide\" : \"fade\",\n        navigation: {\n          nextEl: '.slideshow-navigation-button.next',\n          prevEl: '.slideshow-navigation-button.prev'\n        },\n        scrollbar: {\n          el: '.swiper-scrollbar'\n        },\n        on: {\n          init: function init() {\n            self.animate('next');\n          }\n        }\n      });\n      this.initEvents();\n    }\n  }, {\n    key: \"initEvents\",\n    value: function initEvents() {\n      var _this2 = this;\n      this.slideshow.on('slideNextTransitionStart', function () {\n        return _this2.animate('next');\n      });\n      this.slideshow.on('slidePrevTransitionStart', function () {\n        return _this2.animate('prev');\n      });\n    }\n  }, {\n    key: \"animate\",\n    value: function animate() {\n      var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'next';\n      gsap.set(this.DOM.el.querySelectorAll(\".slide-content\"), {\n        opacity: 0\n      });\n      this.DOM.activeSlide = this.DOM.el.querySelector('.swiper-slide-active');\n      this.DOM.unctiveSlide = this.DOM.el.querySelectorAll('.swiper-slide:not(.swiper-slide-active)');\n      this.DOM.activeSlideImg = this.DOM.activeSlide.querySelector('.slide-image');\n      this.DOM.activeSlideTitle = this.DOM.activeSlide.querySelector('.slide-content');\n      this.DOM.activeSlideVideo = this.DOM.activeSlide.querySelector('.slide-video');\n      this.DOM.activeSlideTitleLetters = this.DOM.activeSlideTitle.querySelectorAll('span');\n      this.DOM.activeSlideTitleLetters = direction === \"next\" ? this.DOM.activeSlideTitleLetters : [].slice.call(this.DOM.activeSlideTitleLetters).reverse();\n      this.DOM.oldSlide = direction === \"next\" ? this.DOM.el.querySelector('.swiper-slide-prev') : this.DOM.el.querySelector('.swiper-slide-next');\n      if (this.DOM.oldSlide) {\n        this.DOM.oldSlideTitle = this.DOM.oldSlide.querySelector('.slide-content');\n      }\n\n      // slider title\n      gsap.to(this.DOM.activeSlideTitle, 0.5, {\n        ease: \"power1.out\",\n        startAt: {\n          y: '40px',\n          opacity: 0\n        },\n        y: '0%',\n        opacity: 1\n      });\n\n      // Animate background\n      gsap.to(this.DOM.activeSlideImg, 1.5, {\n        ease: \"expo.out\",\n        startAt: {\n          opacity: 1\n        },\n        x: 0\n      });\n\n      // video controy\n      this.DOM.activeSlideVideo.play();\n      this.DOM.unctiveSlide;\n      for (var index = 0; index < this.DOM.unctiveSlide.length; index++) {\n        var video = this.DOM.unctiveSlide[index].querySelector(\".slide-video\");\n        if (video) {\n          video.pause();\n          video.currentTime = 0;\n        }\n      }\n\n      // video modal\n      var vModalID = this.DOM.activeSlide.getAttribute(\"block-id\");\n      var vModalSrc = this.DOM.activeSlide.getAttribute(\"block-src\");\n      var vModalDOM = document.querySelector(\".video-swiper-modal\");\n      vModalDOM.setAttribute(\"id\", 's' + vModalID);\n      var player = videojs('index-section-video');\n      player.src({\n        type: \"video/mp4\",\n        src: vModalSrc\n      });\n      var that = this;\n      modals.init({\n        callbackOpen: function callbackOpen(toggle, modal) {\n          autoplayVideo(modal);\n        },\n        callbackClose: function callbackClose(toggle, modal) {\n          stopVideo(modal);\n        }\n      });\n    }\n  }, {\n    key: \"destroy\",\n    value: function destroy(fn) {\n      this.slideshow.destroy();\n      fn && fn();\n    }\n  }]);\n  return VideoSlideshow;\n}();\nvar videoSlideshow = new VideoSlideshow();\n/* harmony default export */ const video_swiper = ((/* unused pure expression or super */ null && (videoSlideshow)));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUEsT0FFRCxpQkFBUXRILEVBQUUsRUFBRTtNQUNWLElBQUksQ0FBQ2dELFNBQVMsQ0FBQ3dFLE9BQU8sRUFBRTtNQUN4QnhILEVBQUUsSUFBSUEsRUFBRSxFQUFFO0lBQ1o7RUFBQztFQUFBO0FBQUE7QUFHSCxJQUFNeUgsY0FBYyxHQUFHLElBQUk1RSxjQUFjLEVBQUU7QUFDM0MsbURBQWU0RSxnREFBQUEsY0FBYyIsInNvdXJjZXMiOlsid2VicGFjazovL3Nob3BpZnktc3RhcnRlci10aGVtZS8uL3NyYy9qcy91dGlscy9pbmRleC5qcz9lMmMyIiwid2VicGFjazovL3Nob3BpZnktc3RhcnRlci10aGVtZS8uL3NyYy9qcy9pbmRleC92aWRlby1zd2lwZXIuanM/MzE5YSJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBARGF0ZTogMjAyMi0xMi0yOCAwOTo1ODozMlxyXG4gKiBATGFzdEVkaXRvcnM6IExlb1xyXG4gKiBATGFzdEVkaXRUaW1lOiAyMDIzLTAxLTA3IDE1OjQ1OjI3XHJcbiAqIEBGaWxlUGF0aDogXFwzLjAtbWFuZ2VyXFxzcmNcXGpzXFx1dGlsc1xcaW5kZXguanNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWJvdW5jZShmbiwgd2FpdCkge1xyXG4gICAgbGV0IHQ7XHJcbiAgICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcclxuICAgICAgICBjbGVhclRpbWVvdXQodCk7XHJcbiAgICAgICAgdCA9IHNldFRpbWVvdXQoKCkgPT4gZm4uYXBwbHkodGhpcywgYXJncyksIHdhaXQpO1xyXG4gICAgfTtcclxufVxyXG5cclxuXHJcbmNvbnN0IHRyYXBGb2N1c0hhbmRsZXJzID0ge307XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rm9jdXNhYmxlRWxlbWVudHMoY29udGFpbmVyKSB7XHJcbiAgICByZXR1cm4gQXJyYXkuZnJvbShcclxuICAgICAgICBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbChcclxuICAgICAgICAgICAgXCJzdW1tYXJ5LCBhW2hyZWZdLCBidXR0b246ZW5hYmxlZCwgW3RhYmluZGV4XTpub3QoW3RhYmluZGV4Xj0nLSddKSwgW2RyYWdnYWJsZV0sIGFyZWEsIGlucHV0Om5vdChbdHlwZT1oaWRkZW5dKTplbmFibGVkLCBzZWxlY3Q6ZW5hYmxlZCwgdGV4dGFyZWE6ZW5hYmxlZCwgb2JqZWN0LCBpZnJhbWVcIlxyXG4gICAgICAgIClcclxuICAgICk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0cmFwRm9jdXMoY29udGFpbmVyLCBlbGVtZW50VG9Gb2N1cyA9IGNvbnRhaW5lcikge1xyXG4gICAgdmFyIGVsZW1lbnRzID0gZ2V0Rm9jdXNhYmxlRWxlbWVudHMoY29udGFpbmVyKTtcclxuICAgIHZhciBmaXJzdCA9IGVsZW1lbnRzWzBdO1xyXG4gICAgdmFyIGxhc3QgPSBlbGVtZW50c1tlbGVtZW50cy5sZW5ndGggLSAxXTtcclxuXHJcbiAgICByZW1vdmVUcmFwRm9jdXMoKTtcclxuXHJcbiAgICB0cmFwRm9jdXNIYW5kbGVycy5mb2N1c2luID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICBldmVudC50YXJnZXQgIT09IGNvbnRhaW5lciAmJlxyXG4gICAgICAgICAgICBldmVudC50YXJnZXQgIT09IGxhc3QgJiZcclxuICAgICAgICAgICAgZXZlbnQudGFyZ2V0ICE9PSBmaXJzdFxyXG4gICAgICAgIClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdHJhcEZvY3VzSGFuZGxlcnMua2V5ZG93bik7XHJcbiAgICB9O1xyXG5cclxuICAgIHRyYXBGb2N1c0hhbmRsZXJzLmZvY3Vzb3V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0cmFwRm9jdXNIYW5kbGVycy5rZXlkb3duKTtcclxuICAgIH07XHJcblxyXG4gICAgdHJhcEZvY3VzSGFuZGxlcnMua2V5ZG93biA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudC5jb2RlLnRvVXBwZXJDYXNlKCkgIT09ICdUQUInKSByZXR1cm47IC8vIElmIG5vdCBUQUIga2V5XHJcbiAgICAgICAgLy8gT24gdGhlIGxhc3QgZm9jdXNhYmxlIGVsZW1lbnQgYW5kIHRhYiBmb3J3YXJkLCBmb2N1cyB0aGUgZmlyc3QgZWxlbWVudC5cclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSBsYXN0ICYmICFldmVudC5zaGlmdEtleSkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBmaXJzdC5mb2N1cygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gIE9uIHRoZSBmaXJzdCBmb2N1c2FibGUgZWxlbWVudCBhbmQgdGFiIGJhY2t3YXJkLCBmb2N1cyB0aGUgbGFzdCBlbGVtZW50LlxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgKGV2ZW50LnRhcmdldCA9PT0gY29udGFpbmVyIHx8IGV2ZW50LnRhcmdldCA9PT0gZmlyc3QpICYmXHJcbiAgICAgICAgICAgIGV2ZW50LnNoaWZ0S2V5XHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGxhc3QuZm9jdXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgdHJhcEZvY3VzSGFuZGxlcnMuZm9jdXNvdXQpO1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsIHRyYXBGb2N1c0hhbmRsZXJzLmZvY3VzaW4pO1xyXG5cclxuICAgIGVsZW1lbnRUb0ZvY3VzLmZvY3VzKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVUcmFwRm9jdXMoZWxlbWVudFRvRm9jdXMgPSBudWxsKSB7XHJcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1c2luJywgdHJhcEZvY3VzSGFuZGxlcnMuZm9jdXNpbik7XHJcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIHRyYXBGb2N1c0hhbmRsZXJzLmZvY3Vzb3V0KTtcclxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0cmFwRm9jdXNIYW5kbGVycy5rZXlkb3duKTtcclxuXHJcbiAgICBpZiAoZWxlbWVudFRvRm9jdXMpIGVsZW1lbnRUb0ZvY3VzLmZvY3VzKCk7XHJcbn1cclxuXHJcbi8qXHJcbiAgICDmjIflrprlrrnlmajkuIsgLSBhdXRvcGxheSB2aWRlb1xyXG4gICAgZWwgLSB2aWRlbyDniLblhYPntKBcclxuKi8gXHJcbmV4cG9ydCBmdW5jdGlvbiBhdXRvcGxheVZpZGVvKGVsKSB7XHJcbiAgICBsZXQgdmlkZW8gPSBlbC5xdWVyeVNlbGVjdG9yKCdpZnJhbWVbc3JjKj1cInd3dy55b3V0dWJlLmNvbVwiXSwgaWZyYW1lW3NyYyo9XCJwbGF5ZXIudmltZW8uY29tXCJdLCB2aWRlbycpO1xyXG4gICAgaWYgKCF2aWRlbykgcmV0dXJuO1xyXG4gICAgXHJcbiAgICBpZiAodmlkZW8udGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAndmlkZW8nKSB7XHJcbiAgICAgIHZpZGVvLnBsYXkoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdmlkZW8uc3JjID0gdmlkZW8uc3JjICsgKHZpZGVvLnNyYy5pbmRleE9mKCc/JykgPCAwID8gJz8nIDogJyYnKSArICdhdXRvcGxheT0xJztcclxufVxyXG4vKlxyXG4gICAg5oyH5a6a5a655Zmo5LiLIC0gc3RvcCB2aWRlb1xyXG4gICAgZWwgLSB2aWRlbyDniLblhYPntKBcclxuKi8gXHJcbmV4cG9ydCBmdW5jdGlvbiBzdG9wVmlkZW8oZWwpIHtcclxuICAgIGxldCB2aWRlbyA9IGVsLnF1ZXJ5U2VsZWN0b3IoJ2lmcmFtZVtzcmMqPVwid3d3LnlvdXR1YmUuY29tXCJdLCBpZnJhbWVbc3JjKj1cInBsYXllci52aW1lby5jb21cIl0sIHZpZGVvJyk7XHJcbiAgICBpZiAoIXZpZGVvKSByZXR1cm47XHJcblxyXG4gICAgaWYgKHZpZGVvLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3ZpZGVvJykge1xyXG4gICAgICB2aWRlby5wYXVzZSgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB2aWRlby5zcmMgPSB2aWRlby5zcmMucmVwbGFjZSgnJmF1dG9wbGF5PTEnLCAnJykucmVwbGFjZSgnP2F1dG9wbGF5PTEnLCAnJyk7XHJcbn0iLCIvKlxyXG4gKiBARGF0ZTogMjAyMi0xMi0wMSAxNzoxMToxN1xyXG4gKiBATGFzdEVkaXRvcnM6IExlb1xyXG4gKiBATGFzdEVkaXRUaW1lOiAyMDIzLTAxLTA3IDE1OjUzOjA1XHJcbiAqIEBGaWxlUGF0aDogXFwzLjAtbWFuZ2VyXFxzcmNcXGpzXFxpbmRleFxcdmlkZW8tc3dpcGVyLmpzXHJcbiAqL1xyXG5pbXBvcnQge2F1dG9wbGF5VmlkZW8sIHN0b3BWaWRlb30gZnJvbSAnLi4vdXRpbHMvaW5kZXguanMnXHJcbmNsYXNzIFZpZGVvU2xpZGVzaG93IHtcclxuICBjb25zdHJ1Y3RvcihlbCkge1xyXG4gICAgdGhpcy5ET00gPSB7IGVsIH07XHJcbiAgICB0aGlzLmNvbmZpZyA9IHtcclxuICAgICAgc2xpZGVzaG93OiB7XHJcbiAgICAgICAgZGVsYXk6IDUwMDAsXHJcbiAgICAgICAgcGFnaW5hdGlvbjogeyBkdXJhdGlvbjogNSB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLkRPTS5lbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52aWRlby1zbGlkZXNob3cnKTtcclxuICAgICAgdGhpcy5pbml0KClcclxuICAgIH0pXHJcbiAgfVxyXG4gIGluaXQoKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIHRoaXMuc2xpZGVzaG93ID0gbmV3IFN3aXBlcih0aGlzLkRPTS5lbCwge1xyXG4gICAgICBsb29wOiB0cnVlLFxyXG4gICAgICBzbGlkZXNQZXJWaWV3OiBcImF1dG9cIixcclxuICAgICAgc3BhY2VCZXR3ZWVuOiAzMCxcclxuICAgICAgY2VudGVyZWRTbGlkZXM6IHRydWUsXHJcbiAgICAgIHByZWxvYWRJbWFnZXM6IHRydWUsXHJcbiAgICAgIGZvbGxvd0ZpbmdlcjogZmFsc2UsXHJcbiAgICAgIHVwZGF0ZU9uSW1hZ2VzUmVhZHk6IHRydWUsXHJcbiAgICAgIGxhenk6IHRydWUsXHJcbiAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICBlbDogJy5zbGlkZXNob3ctcGFnaW5hdGlvbicsXHJcbiAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgIGJ1bGxldENsYXNzOiAnc2xpZGVzaG93LXBhZ2luYXRpb24taXRlbScsXHJcbiAgICAgICAgYnVsbGV0QWN0aXZlQ2xhc3M6ICdhY3RpdmUgcGFnaW5hdGlvbi1hY3RpdmUnLFxyXG4gICAgICAgIGNsaWNrYWJsZUNsYXNzOiAnc2xpZGVzaG93LXBhZ2luYXRpb24tY2xpY2thYmxlJyxcclxuICAgICAgICBtb2RpZmllckNsYXNzOiAnc2xpZGVzaG93LXBhZ2luYXRpb24tJyxcclxuICAgICAgICByZW5kZXJCdWxsZXQ6IGZ1bmN0aW9uIChpbmRleCwgY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICB2YXIgc2xpZGVJbmRleCA9IGluZGV4LFxyXG4gICAgICAgICAgICBudW1iZXIgPSAoaW5kZXggPD0gOCkgPyAnMCcgKyAoc2xpZGVJbmRleCArIDEpIDogKHNsaWRlSW5kZXggKyAxKTtcclxuXHJcbiAgICAgICAgICB2YXIgcGFnaW5hdGlvbkl0ZW0gPSAnPHNwYW4gY2xhc3M9XCJzbGlkZXNob3ctcGFnaW5hdGlvbi1pdGVtXCI+JztcclxuICAgICAgICAgIHBhZ2luYXRpb25JdGVtID0gKGluZGV4IDw9IDgpID8gcGFnaW5hdGlvbkl0ZW0gK1xyXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJwYWdpbmF0aW9uLXNlcGFyYXRvclwiPjxzcGFuIGNsYXNzPVwicGFnaW5hdGlvbi1zZXBhcmF0b3ItbG9hZGVyXCI+PC9zcGFuPjwvc3Bhbj4nIDpcclxuICAgICAgICAgICAgcGFnaW5hdGlvbkl0ZW07XHJcbiAgICAgICAgICBwYWdpbmF0aW9uSXRlbSArPSAnPC9zcGFuPic7XHJcbiAgICAgICAgICByZXR1cm4gcGFnaW5hdGlvbkl0ZW07XHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAgZWZmZWN0OiAkKHdpbmRvdykud2lkdGgoKSA+IDc1MCA/IFwic2xpZGVcIiA6IFwiZmFkZVwiLFxyXG4gICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgbmV4dEVsOiAnLnNsaWRlc2hvdy1uYXZpZ2F0aW9uLWJ1dHRvbi5uZXh0JyxcclxuICAgICAgICBwcmV2RWw6ICcuc2xpZGVzaG93LW5hdmlnYXRpb24tYnV0dG9uLnByZXYnLFxyXG4gICAgICB9LFxyXG4gICAgICBzY3JvbGxiYXI6IHtcclxuICAgICAgICBlbDogJy5zd2lwZXItc2Nyb2xsYmFyJyxcclxuICAgICAgfSxcclxuICAgICAgb246IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBzZWxmLmFuaW1hdGUoJ25leHQnKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMuaW5pdEV2ZW50cygpO1xyXG4gIH1cclxuICBpbml0RXZlbnRzKCkge1xyXG4gICAgdGhpcy5zbGlkZXNob3cub24oJ3NsaWRlTmV4dFRyYW5zaXRpb25TdGFydCcsICgpID0+IHRoaXMuYW5pbWF0ZSgnbmV4dCcpKTtcclxuICAgIHRoaXMuc2xpZGVzaG93Lm9uKCdzbGlkZVByZXZUcmFuc2l0aW9uU3RhcnQnLCAoKSA9PiB0aGlzLmFuaW1hdGUoJ3ByZXYnKSk7XHJcbiAgfVxyXG5cclxuICBhbmltYXRlKGRpcmVjdGlvbiA9ICduZXh0Jykge1xyXG4gICAgZ3NhcC5zZXQodGhpcy5ET00uZWwucXVlcnlTZWxlY3RvckFsbChcIi5zbGlkZS1jb250ZW50XCIpLCB7XHJcbiAgICAgIG9wYWNpdHk6IDBcclxuICAgIH0pXHJcblxyXG4gICAgdGhpcy5ET00uYWN0aXZlU2xpZGUgPSB0aGlzLkRPTS5lbC5xdWVyeVNlbGVjdG9yKCcuc3dpcGVyLXNsaWRlLWFjdGl2ZScpO1xyXG4gICAgdGhpcy5ET00udW5jdGl2ZVNsaWRlID0gdGhpcy5ET00uZWwucXVlcnlTZWxlY3RvckFsbCgnLnN3aXBlci1zbGlkZTpub3QoLnN3aXBlci1zbGlkZS1hY3RpdmUpJyk7XHJcbiAgICB0aGlzLkRPTS5hY3RpdmVTbGlkZUltZyA9IHRoaXMuRE9NLmFjdGl2ZVNsaWRlLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZS1pbWFnZScpO1xyXG4gICAgdGhpcy5ET00uYWN0aXZlU2xpZGVUaXRsZSA9IHRoaXMuRE9NLmFjdGl2ZVNsaWRlLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZS1jb250ZW50Jyk7XHJcbiAgICB0aGlzLkRPTS5hY3RpdmVTbGlkZVZpZGVvID0gdGhpcy5ET00uYWN0aXZlU2xpZGUucXVlcnlTZWxlY3RvcignLnNsaWRlLXZpZGVvJyk7XHJcbiAgICB0aGlzLkRPTS5hY3RpdmVTbGlkZVRpdGxlTGV0dGVycyA9IHRoaXMuRE9NLmFjdGl2ZVNsaWRlVGl0bGUucXVlcnlTZWxlY3RvckFsbCgnc3BhbicpO1xyXG5cclxuICAgIHRoaXMuRE9NLmFjdGl2ZVNsaWRlVGl0bGVMZXR0ZXJzID0gZGlyZWN0aW9uID09PSBcIm5leHRcIiA/IHRoaXMuRE9NLmFjdGl2ZVNsaWRlVGl0bGVMZXR0ZXJzIDogW10uc2xpY2UuY2FsbCh0aGlzLkRPTS5hY3RpdmVTbGlkZVRpdGxlTGV0dGVycykucmV2ZXJzZSgpO1xyXG5cclxuICAgIHRoaXMuRE9NLm9sZFNsaWRlID0gZGlyZWN0aW9uID09PSBcIm5leHRcIiA/IHRoaXMuRE9NLmVsLnF1ZXJ5U2VsZWN0b3IoJy5zd2lwZXItc2xpZGUtcHJldicpIDogdGhpc1xyXG4gICAgICAuRE9NLmVsLnF1ZXJ5U2VsZWN0b3IoJy5zd2lwZXItc2xpZGUtbmV4dCcpO1xyXG4gICAgaWYgKHRoaXMuRE9NLm9sZFNsaWRlKSB7XHJcbiAgICAgIHRoaXMuRE9NLm9sZFNsaWRlVGl0bGUgPSB0aGlzLkRPTS5vbGRTbGlkZS5xdWVyeVNlbGVjdG9yKCcuc2xpZGUtY29udGVudCcpXHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2xpZGVyIHRpdGxlXHJcbiAgICBnc2FwLnRvKHRoaXMuRE9NLmFjdGl2ZVNsaWRlVGl0bGUsIDAuNSwge1xyXG4gICAgICBlYXNlOiBcInBvd2VyMS5vdXRcIixcclxuICAgICAgc3RhcnRBdDoge1xyXG4gICAgICAgIHk6ICc0MHB4JyxcclxuICAgICAgICBvcGFjaXR5OiAwXHJcbiAgICAgIH0sXHJcbiAgICAgIHk6ICcwJScsXHJcbiAgICAgIG9wYWNpdHk6IDFcclxuICAgIH0pXHJcblxyXG4gICAgLy8gQW5pbWF0ZSBiYWNrZ3JvdW5kXHJcbiAgICBnc2FwLnRvKHRoaXMuRE9NLmFjdGl2ZVNsaWRlSW1nLCAxLjUsIHtcclxuICAgICAgZWFzZTogXCJleHBvLm91dFwiLFxyXG4gICAgICBzdGFydEF0OiB7XHJcbiAgICAgICAgb3BhY2l0eTogMVxyXG4gICAgICB9LFxyXG4gICAgICB4OiAwLFxyXG4gICAgfSlcclxuXHJcbiAgICAvLyB2aWRlbyBjb250cm95XHJcbiAgICB0aGlzLkRPTS5hY3RpdmVTbGlkZVZpZGVvLnBsYXkoKVxyXG4gICAgdGhpcy5ET00udW5jdGl2ZVNsaWRlXHJcbiAgICBmb3IobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkRPTS51bmN0aXZlU2xpZGUubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGNvbnN0IHZpZGVvID0gdGhpcy5ET00udW5jdGl2ZVNsaWRlW2luZGV4XS5xdWVyeVNlbGVjdG9yKFwiLnNsaWRlLXZpZGVvXCIpXHJcbiAgICAgIGlmKHZpZGVvKSB7XHJcbiAgICAgICAgdmlkZW8ucGF1c2UoKVxyXG4gICAgICAgIHZpZGVvLmN1cnJlbnRUaW1lID0gMFxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdmlkZW8gbW9kYWxcclxuICAgIGNvbnN0IHZNb2RhbElEID0gdGhpcy5ET00uYWN0aXZlU2xpZGUuZ2V0QXR0cmlidXRlKFwiYmxvY2staWRcIilcclxuICAgIGNvbnN0IHZNb2RhbFNyYyA9IHRoaXMuRE9NLmFjdGl2ZVNsaWRlLmdldEF0dHJpYnV0ZShcImJsb2NrLXNyY1wiKVxyXG4gICAgY29uc3Qgdk1vZGFsRE9NID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi52aWRlby1zd2lwZXItbW9kYWxcIilcclxuICAgIHZNb2RhbERPTS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCAncycgKyB2TW9kYWxJRClcclxuXHJcbiAgICBsZXQgcGxheWVyID0gdmlkZW9qcygnaW5kZXgtc2VjdGlvbi12aWRlbycpO1xyXG4gICAgcGxheWVyLnNyYyh7IHR5cGU6IFwidmlkZW8vbXA0XCIsIHNyYzogdk1vZGFsU3JjIH0pO1xyXG5cclxuICAgIGNvbnN0IHRoYXQgPSB0aGlzXHJcbiAgICBtb2RhbHMuaW5pdCh7XHJcbiAgICAgIGNhbGxiYWNrT3BlbjogZnVuY3Rpb24gKHRvZ2dsZSwgbW9kYWwpIHtcclxuICAgICAgICBhdXRvcGxheVZpZGVvKG1vZGFsKTtcclxuICAgICAgfSxcclxuICAgICAgY2FsbGJhY2tDbG9zZTogZnVuY3Rpb24gKHRvZ2dsZSwgbW9kYWwpIHtcclxuICAgICAgICBzdG9wVmlkZW8obW9kYWwpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGRlc3Ryb3koZm4pIHtcclxuICAgIHRoaXMuc2xpZGVzaG93LmRlc3Ryb3koKTtcclxuICAgIGZuICYmIGZuKClcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IHZpZGVvU2xpZGVzaG93ID0gbmV3IFZpZGVvU2xpZGVzaG93KCk7XHJcbmV4cG9ydCBkZWZhdWx0IHZpZGVvU2xpZGVzaG93XHJcbiJdLCJuYW1lcyI6WyJkZWJvdW5jZSIsImZuIiwid2FpdCIsInQiLCJhcmdzIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsImFwcGx5IiwidHJhcEZvY3VzSGFuZGxlcnMiLCJnZXRGb2N1c2FibGVFbGVtZW50cyIsImNvbnRhaW5lciIsIkFycmF5IiwiZnJvbSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJ0cmFwRm9jdXMiLCJlbGVtZW50VG9Gb2N1cyIsImVsZW1lbnRzIiwiZmlyc3QiLCJsYXN0IiwibGVuZ3RoIiwicmVtb3ZlVHJhcEZvY3VzIiwiZm9jdXNpbiIsImV2ZW50IiwidGFyZ2V0IiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwia2V5ZG93biIsImZvY3Vzb3V0IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImNvZGUiLCJ0b1VwcGVyQ2FzZSIsInNoaWZ0S2V5IiwicHJldmVudERlZmF1bHQiLCJmb2N1cyIsImF1dG9wbGF5VmlkZW8iLCJlbCIsInZpZGVvIiwicXVlcnlTZWxlY3RvciIsInRhZ05hbWUiLCJ0b0xvd2VyQ2FzZSIsInBsYXkiLCJzcmMiLCJpbmRleE9mIiwic3RvcFZpZGVvIiwicGF1c2UiLCJyZXBsYWNlIiwiVmlkZW9TbGlkZXNob3ciLCJET00iLCJjb25maWciLCJzbGlkZXNob3ciLCJkZWxheSIsInBhZ2luYXRpb24iLCJkdXJhdGlvbiIsImluaXQiLCJzZWxmIiwiU3dpcGVyIiwibG9vcCIsInNsaWRlc1BlclZpZXciLCJzcGFjZUJldHdlZW4iLCJjZW50ZXJlZFNsaWRlcyIsInByZWxvYWRJbWFnZXMiLCJmb2xsb3dGaW5nZXIiLCJ1cGRhdGVPbkltYWdlc1JlYWR5IiwibGF6eSIsImNsaWNrYWJsZSIsImJ1bGxldENsYXNzIiwiYnVsbGV0QWN0aXZlQ2xhc3MiLCJjbGlja2FibGVDbGFzcyIsIm1vZGlmaWVyQ2xhc3MiLCJyZW5kZXJCdWxsZXQiLCJpbmRleCIsImNsYXNzTmFtZSIsInNsaWRlSW5kZXgiLCJudW1iZXIiLCJwYWdpbmF0aW9uSXRlbSIsImVmZmVjdCIsIiQiLCJ3aW5kb3ciLCJ3aWR0aCIsIm5hdmlnYXRpb24iLCJuZXh0RWwiLCJwcmV2RWwiLCJzY3JvbGxiYXIiLCJvbiIsImFuaW1hdGUiLCJpbml0RXZlbnRzIiwiZGlyZWN0aW9uIiwiZ3NhcCIsInNldCIsIm9wYWNpdHkiLCJhY3RpdmVTbGlkZSIsInVuY3RpdmVTbGlkZSIsImFjdGl2ZVNsaWRlSW1nIiwiYWN0aXZlU2xpZGVUaXRsZSIsImFjdGl2ZVNsaWRlVmlkZW8iLCJhY3RpdmVTbGlkZVRpdGxlTGV0dGVycyIsInNsaWNlIiwiY2FsbCIsInJldmVyc2UiLCJvbGRTbGlkZSIsIm9sZFNsaWRlVGl0bGUiLCJ0byIsImVhc2UiLCJzdGFydEF0IiwieSIsIngiLCJjdXJyZW50VGltZSIsInZNb2RhbElEIiwiZ2V0QXR0cmlidXRlIiwidk1vZGFsU3JjIiwidk1vZGFsRE9NIiwic2V0QXR0cmlidXRlIiwicGxheWVyIiwidmlkZW9qcyIsInR5cGUiLCJ0aGF0IiwibW9kYWxzIiwiY2FsbGJhY2tPcGVuIiwidG9nZ2xlIiwibW9kYWwiLCJjYWxsYmFja0Nsb3NlIiwiZGVzdHJveSIsInZpZGVvU2xpZGVzaG93Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///162\n")}},__webpack_exports__={};__webpack_modules__[162]()})();