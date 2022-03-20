import Vue from 'vue'

Vue.directive('click-outside', {
  bind(el, binding, vnode) {
    let inAction = false

    el.clickOutsideEvent = function (event) {
      const isLazy = !!binding.modifiers.lazy

      // here I check that click was outside the el and his children
      if (!(el === event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value

        if (!isLazy || (isLazy && inAction)) {
          vnode.context[binding.expression](event)
        }

        inAction = false
      } else {
        inAction = true
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
})