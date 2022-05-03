<template lang="pug">
  button.burger(:class='{"open": showMenu}' @click="$emit('click')")
    span.line.line-1
    span.line.line-2
    span.line.line-3
  </div>  
</template>

<script>
export default {
  name: 'UiBurger',
  props: {
    showMenu: {
      type: Boolean,
      default: false
    },
  },
}
</script>

<style lang='scss'>
:root {
  /* Размеры */
  --burger-width: 33px;
  --burger-height: 25px;
}
</style>

<style scoped lang="scss">
.burger {
  width: var(--burger-width);
  height: var(--burger-height);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: transparent;
  outline: none;
  border: 0;
  padding: 0;
  cursor: pointer;
}

.line {
  display: block;
  height: 2px;
  width: 100%;
  border-radius: 10px;
  background: #fff;

  &-1 {
    transform-origin: 0% 0%;
    transition: transform 0.4s ease-in-out;
  }

  &-2 {
    transition: transform 0.2s ease-in-out;
  }

  &-3 {
    transform-origin: 0% 100%;
    transition: transform 0.4s ease-in-out;
  }
}

.open {
  .line-1 {
    transform: rotate(45deg);
  }

  .line-2 {
    transform: scaleY(0);
  }

  .line-3 {
    transform: rotate(-45deg);
  }
}
</style>
