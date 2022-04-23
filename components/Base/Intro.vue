<template lang='pug'>
  .s-intro(
    :style='styles'
    :class='{[`s-intro__${theme}`]: theme}'
  )
    LayoutsContainer
      .s-intro__relative
        .s-intro__row
          .s-intro__text-box
            UiHeadline.s-intro__text(v-html='title' tag='h1')
            UiHeadline.s-intro__text(v-html='description' tag='h4')
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

  &__relative {
    position: relative;
    padding: 142px 0 162px;
    @include desktop() {
      padding: 94px 0 116px;
    }
    @include tablets() {
      padding: 110px 0 110px;
    }
    @include phones() {
      padding: 52px 0 241px;
    }
  }

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
    z-index: 1;
    @include phones() {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  &__text {
    @include phones() {
      text-align: center;
    }
  }

  &__kv {
    display: flex;
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;

    @include tablets() {
      right: -100px;
    }

    @include phones() {
      right: 50%;
      transform: translateX(50%);
      top: auto;
      bottom: 0;
      height: 220px;
    }
  }

  &__schedule {
    .s-intro__relative {
      padding: 110px 0 90px;
      @include desktop() {
        padding: 95px 0 100px;
      }
      @include tablets() {
        padding: 110px 0 85px;
      }
      @include phones() {
        padding: 40px 0 54px;
      }
    }

    .s-intro__text {
      @include phones() {
        text-align: left;
      }
    }

    .s-intro__kv {
      @include desktop() {
        right: -15px;
      }

      @include phones() {
        height: 130px;
        right: 0;
        transform: translateX(0);
      }
    }

    .s-intro__row {
      @include phones() {
        align-items: flex-start;
      }
    }

    .s-intro__text-box {
      @include phones() {
        align-items: flex-start;
      }
    }
  }
}
</style>
