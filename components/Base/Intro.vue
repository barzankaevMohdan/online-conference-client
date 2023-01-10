<template lang='pug'>
  .s-intro(
    :style='styles'
    :class='{[`s-intro__${theme}`]: theme}'
  )
    LayoutsContainer
      .s-intro__row
        .s-intro__text-box
          UiHeadline(v-html='title' tag='h1')

          UiHeadline(v-html='description' tag='h4')

        .s-intro__kv
          slot(name='kv')

</template>

<script>
export default {
  name: 'Intro',
  props: {
    src: String,
    title: String,
    description: String,
    theme: String,
  },
  computed: {
    styles() {
      const styles = {}

      if (this.src) {
        styles.backgroundImage = `url(${this.src})`
      }

      return styles
    },
  },
}
</script>

<style scoped lang='scss'>
@import "~/styles/mixins.scss";

.s-intro {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  overflow: hidden;

  &__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include phones() {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  &__text-box {
    width: 70%;
    @include phones() {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      margin-top: 50px;
    }
  }

  &__kv {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;
    @include phones() {
      width: 100%;
      height: 220px;
      margin-top: 30px;
    }

    & img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  &__schedule {
    .s-intro {
      &__row {
        @include phones() {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }
      }

      &__text-box {
        @include tablets() {
          --headline-size-h1: 36px;
        }

        @include phones() {
          width: 50%;
          align-items: flex-start;
          margin-top: 0;
        }

        @include phones-small() {
          --headline-size-h1: 22px;
        }
      }

      &__kv {
        @include phones() {
          width: 50%;
          height: 100%;
          margin-top: 0;
        }
      }
    }
  }
}
</style>
