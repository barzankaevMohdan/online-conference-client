(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{774:function(e,t,l){var r;r=function(){return function(e){var t={};function l(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,l),o.l=!0,o.exports}return l.m=e,l.c=t,l.d=function(e,t,r){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(l.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)l.d(r,o,function(t){return e[t]}.bind(null,o));return r},l.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(t,"a",t),t},l.o=function(object,e){return Object.prototype.hasOwnProperty.call(object,e)},l.p="",l(l.s=0)}([function(e,t,l){"use strict";l.r(t);var r=function(e){return Array.isArray(e)?e:[e]},o=function(e){return e instanceof Node},n=function(e,t){if(e&&t){e=function(e){return e instanceof NodeList}(e)?e:[e];for(var i=0;i<e.length&&!0!==t(e[i],i,e.length);i++);}},c=function(e){return console.error("[scroll-lock] ".concat(e))},d=function(e){if(Array.isArray(e))return e.join(", ")},f=function(e){var t=[];return n(e,(function(e){return t.push(e)})),t},h=function(e,t){var l=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:document;if(l&&-1!==f(r.querySelectorAll(t)).indexOf(e))return e;for(;(e=e.parentElement)&&-1===f(r.querySelectorAll(t)).indexOf(e););return e},v=function(e,t){var l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:document,r=-1!==f(l.querySelectorAll(t)).indexOf(e);return r},m=function(e){if(e)return"hidden"===getComputedStyle(e).overflow},S=function(e){if(e)return!!m(e)||e.scrollTop<=0},y=function(e){if(e){if(m(e))return!0;var t=e.scrollTop,l=e.scrollHeight;return t+e.offsetHeight>=l}},k=function(e){if(e)return!!m(e)||e.scrollLeft<=0},w=function(e){if(e){if(m(e))return!0;var t=e.scrollLeft,l=e.scrollWidth;return t+e.offsetWidth>=l}},A=function(e){return v(e,'textarea, [contenteditable="true"]')},G=function(e){return v(e,'input[type="range"]')};function T(e,t,l){return t in e?Object.defineProperty(e,t,{value:l,enumerable:!0,configurable:!0,writable:!0}):e[t]=l,e}l.d(t,"disablePageScroll",(function(){return L})),l.d(t,"enablePageScroll",(function(){return x})),l.d(t,"getScrollState",(function(){return Y})),l.d(t,"clearQueueScrollLocks",(function(){return E})),l.d(t,"getTargetScrollBarWidth",(function(){return O})),l.d(t,"getCurrentTargetScrollBarWidth",(function(){return P})),l.d(t,"getPageScrollBarWidth",(function(){return j})),l.d(t,"getCurrentPageScrollBarWidth",(function(){return M})),l.d(t,"addScrollableTarget",(function(){return N})),l.d(t,"removeScrollableTarget",(function(){return B})),l.d(t,"addScrollableSelector",(function(){return C})),l.d(t,"removeScrollableSelector",(function(){return K})),l.d(t,"addLockableTarget",(function(){return R})),l.d(t,"addLockableSelector",(function(){return U})),l.d(t,"setFillGapMethod",(function(){return _})),l.d(t,"addFillGapTarget",(function(){return X})),l.d(t,"removeFillGapTarget",(function(){return Q})),l.d(t,"addFillGapSelector",(function(){return D})),l.d(t,"removeFillGapSelector",(function(){return H})),l.d(t,"refillGaps",(function(){return J}));var W=["padding","margin","width","max-width","none"],F={scroll:!0,queue:0,scrollableSelectors:["[data-scroll-lock-scrollable]"],lockableSelectors:["body","[data-scroll-lock-lockable]"],fillGapSelectors:["body","[data-scroll-lock-fill-gap]","[data-scroll-lock-lockable]"],fillGapMethod:W[0],startTouchY:0,startTouchX:0},L=function(e){F.queue<=0&&(F.scroll=!1,z(),te()),N(e),F.queue++},x=function(e){F.queue>0&&F.queue--,F.queue<=0&&(F.scroll=!0,I(),le()),B(e)},Y=function(){return F.scroll},E=function(){F.queue=0},O=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(o(e)){var l=e.style.overflowY;t?Y()||(e.style.overflowY=e.getAttribute("data-scroll-lock-saved-overflow-y-property")):e.style.overflowY="scroll";var r=P(e);return e.style.overflowY=l,r}return 0},P=function(e){if(o(e)){if(e===document.body){var t=document.documentElement.clientWidth;return window.innerWidth-t}var l=e.style.borderLeftWidth,r=e.style.borderRightWidth;e.style.borderLeftWidth="0px",e.style.borderRightWidth="0px";var n=e.offsetWidth-e.clientWidth;return e.style.borderLeftWidth=l,e.style.borderRightWidth=r,n}return 0},j=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return O(document.body,e)},M=function(){return P(document.body)},N=function(e){e&&r(e).map((function(e){n(e,(function(e){o(e)?e.setAttribute("data-scroll-lock-scrollable",""):c('"'.concat(e,'" is not a Element.'))}))}))},B=function(e){e&&r(e).map((function(e){n(e,(function(e){o(e)?e.removeAttribute("data-scroll-lock-scrollable"):c('"'.concat(e,'" is not a Element.'))}))}))},C=function(e){e&&r(e).map((function(e){F.scrollableSelectors.push(e)}))},K=function(e){e&&r(e).map((function(e){F.scrollableSelectors=F.scrollableSelectors.filter((function(t){return t!==e}))}))},R=function(e){e&&(r(e).map((function(e){n(e,(function(e){o(e)?e.setAttribute("data-scroll-lock-lockable",""):c('"'.concat(e,'" is not a Element.'))}))})),Y()||z())},U=function(e){e&&(r(e).map((function(e){F.lockableSelectors.push(e)})),Y()||z(),D(e))},_=function(e){if(e)if(-1!==W.indexOf(e))F.fillGapMethod=e,J();else{var t=W.join(", ");c('"'.concat(e,'" method is not available!\nAvailable fill gap methods: ').concat(t,"."))}},X=function(e){e&&r(e).map((function(e){n(e,(function(e){o(e)?(e.setAttribute("data-scroll-lock-fill-gap",""),F.scroll||oe(e)):c('"'.concat(e,'" is not a Element.'))}))}))},Q=function(e){e&&r(e).map((function(e){n(e,(function(e){o(e)?(e.removeAttribute("data-scroll-lock-fill-gap"),F.scroll||ce(e)):c('"'.concat(e,'" is not a Element.'))}))}))},D=function(e){e&&r(e).map((function(e){-1===F.fillGapSelectors.indexOf(e)&&(F.fillGapSelectors.push(e),F.scroll||re(e))}))},H=function(e){e&&r(e).map((function(e){F.fillGapSelectors=F.fillGapSelectors.filter((function(t){return t!==e})),F.scroll||ne(e)}))},J=function(){F.scroll||te()},z=function(){var e=d(F.lockableSelectors);V(e)},I=function(){var e=d(F.lockableSelectors);Z(e)},V=function(e){var t=document.querySelectorAll(e);n(t,(function(e){$(e)}))},Z=function(e){var t=document.querySelectorAll(e);n(t,(function(e){ee(e)}))},$=function(e){if(o(e)&&"true"!==e.getAttribute("data-scroll-lock-locked")){var t=window.getComputedStyle(e);e.setAttribute("data-scroll-lock-saved-overflow-y-property",t.overflowY),e.setAttribute("data-scroll-lock-saved-inline-overflow-property",e.style.overflow),e.setAttribute("data-scroll-lock-saved-inline-overflow-y-property",e.style.overflowY),e.style.overflow="hidden",e.setAttribute("data-scroll-lock-locked","true")}},ee=function(e){o(e)&&"true"===e.getAttribute("data-scroll-lock-locked")&&(e.style.overflow=e.getAttribute("data-scroll-lock-saved-inline-overflow-property"),e.style.overflowY=e.getAttribute("data-scroll-lock-saved-inline-overflow-y-property"),e.removeAttribute("data-scroll-lock-saved-overflow-property"),e.removeAttribute("data-scroll-lock-saved-inline-overflow-property"),e.removeAttribute("data-scroll-lock-saved-inline-overflow-y-property"),e.removeAttribute("data-scroll-lock-locked"))},te=function(){F.fillGapSelectors.map((function(e){re(e)}))},le=function(){F.fillGapSelectors.map((function(e){ne(e)}))},re=function(e){var t=document.querySelectorAll(e),l=-1!==F.lockableSelectors.indexOf(e);n(t,(function(e){oe(e,l)}))},oe=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(o(e)){var l;if(""===e.getAttribute("data-scroll-lock-lockable")||t)l=O(e,!0);else{var r=h(e,d(F.lockableSelectors));l=O(r,!0)}"true"===e.getAttribute("data-scroll-lock-filled-gap")&&ce(e);var n=window.getComputedStyle(e);if(e.setAttribute("data-scroll-lock-filled-gap","true"),e.setAttribute("data-scroll-lock-current-fill-gap-method",F.fillGapMethod),"margin"===F.fillGapMethod){var c=parseFloat(n.marginRight);e.style.marginRight="".concat(c+l,"px")}else if("width"===F.fillGapMethod)e.style.width="calc(100% - ".concat(l,"px)");else if("max-width"===F.fillGapMethod)e.style.maxWidth="calc(100% - ".concat(l,"px)");else if("padding"===F.fillGapMethod){var f=parseFloat(n.paddingRight);e.style.paddingRight="".concat(f+l,"px")}}},ne=function(e){var t=document.querySelectorAll(e);n(t,(function(e){ce(e)}))},ce=function(e){if(o(e)&&"true"===e.getAttribute("data-scroll-lock-filled-gap")){var t=e.getAttribute("data-scroll-lock-current-fill-gap-method");e.removeAttribute("data-scroll-lock-filled-gap"),e.removeAttribute("data-scroll-lock-current-fill-gap-method"),"margin"===t?e.style.marginRight="":"width"===t?e.style.width="":"max-width"===t?e.style.maxWidth="":"padding"===t&&(e.style.paddingRight="")}};"undefined"!=typeof window&&window.addEventListener("resize",(function(e){J()})),"undefined"!=typeof document&&(document.addEventListener("touchstart",(function(e){F.scroll||(F.startTouchY=e.touches[0].clientY,F.startTouchX=e.touches[0].clientX)})),document.addEventListener("touchmove",(function(e){if(!F.scroll){var t=F.startTouchY,l=F.startTouchX,r=e.touches[0].clientY,o=e.touches[0].clientX;if(e.touches.length<2){var n=d(F.scrollableSelectors),c={up:t<r,down:t>r,left:l<o,right:l>o},f={up:t+3<r,down:t-3>r,left:l+3<o,right:l-3>o};!function t(l){var r=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(l){var o=h(l,n,!1);if(G(l))return!1;if(r||A(l)&&h(l,n)||v(l,n)){var d=!1;k(l)&&w(l)?(c.up&&S(l)||c.down&&y(l))&&(d=!0):S(l)&&y(l)?(c.left&&k(l)||c.right&&w(l))&&(d=!0):(f.up&&S(l)||f.down&&y(l)||f.left&&k(l)||f.right&&w(l))&&(d=!0),d&&(o?t(o,!0):e.cancelable&&e.preventDefault())}else t(o)}else e.cancelable&&e.preventDefault()}(e.target)}}}),{passive:!1}),document.addEventListener("touchend",(function(e){F.scroll||(F.startTouchY=0,F.startTouchX=0)})));var ae={hide:function(e){c('"hide" is deprecated! Use "disablePageScroll" instead. \n https://github.com/FL3NKEY/scroll-lock#disablepagescrollscrollabletarget'),L(e)},show:function(e){c('"show" is deprecated! Use "enablePageScroll" instead. \n https://github.com/FL3NKEY/scroll-lock#enablepagescrollscrollabletarget'),x(e)},toggle:function(e){c('"toggle" is deprecated! Do not use it.'),Y()?L():x(e)},getState:function(){return c('"getState" is deprecated! Use "getScrollState" instead. \n https://github.com/FL3NKEY/scroll-lock#getscrollstate'),Y()},getWidth:function(){return c('"getWidth" is deprecated! Use "getPageScrollBarWidth" instead. \n https://github.com/FL3NKEY/scroll-lock#getpagescrollbarwidth'),j()},getCurrentWidth:function(){return c('"getCurrentWidth" is deprecated! Use "getCurrentPageScrollBarWidth" instead. \n https://github.com/FL3NKEY/scroll-lock#getcurrentpagescrollbarwidth'),M()},setScrollableTargets:function(e){c('"setScrollableTargets" is deprecated! Use "addScrollableTarget" instead. \n https://github.com/FL3NKEY/scroll-lock#addscrollabletargetscrollabletarget'),N(e)},setFillGapSelectors:function(e){c('"setFillGapSelectors" is deprecated! Use "addFillGapSelector" instead. \n https://github.com/FL3NKEY/scroll-lock#addfillgapselectorfillgapselector'),D(e)},setFillGapTargets:function(e){c('"setFillGapTargets" is deprecated! Use "addFillGapTarget" instead. \n https://github.com/FL3NKEY/scroll-lock#addfillgaptargetfillgaptarget'),X(e)},clearQueue:function(){c('"clearQueue" is deprecated! Use "clearQueueScrollLocks" instead. \n https://github.com/FL3NKEY/scroll-lock#clearqueuescrolllocks'),E()}},ie=function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{},t=Object.keys(source);"function"==typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(source).filter((function(e){return Object.getOwnPropertyDescriptor(source,e).enumerable})))),t.forEach((function(t){T(e,t,source[t])}))}return e}({disablePageScroll:L,enablePageScroll:x,getScrollState:Y,clearQueueScrollLocks:E,getTargetScrollBarWidth:O,getCurrentTargetScrollBarWidth:P,getPageScrollBarWidth:j,getCurrentPageScrollBarWidth:M,addScrollableSelector:C,removeScrollableSelector:K,addScrollableTarget:N,removeScrollableTarget:B,addLockableSelector:U,addLockableTarget:R,addFillGapSelector:D,removeFillGapSelector:H,addFillGapTarget:X,removeFillGapTarget:Q,setFillGapMethod:_,refillGaps:J,_state:F},ae);t.default=ie}]).default},e.exports=r()}}]);