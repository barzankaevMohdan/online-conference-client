<template lang='pug'>
  .s-intro(
    :style='styles'
    :class='{[`s-intro__${theme}`]: theme}'
  )
    LayoutsContainer
      .s-intro__relative
        .s-intro__row
          .s-intro__text-box
            h1.s-intro__title(v-html='title')
            h2.s-intro__description
              slot(name='description')
          .s-intro__kv
            ShopIntroCoins.s-intro__coins(v-if="theme === 'shop'")
          .s-intro__img
            slot(name='kv')
              template(v-if="activeHall === 2")
                img(:src="require('~/assets/img/demo/intro/kv-2.png')")
              template(v-else)
                img(:src="require('~/assets/img/demo/intro/kv.svg')")
          .s-intro__img-phone
            slot(name='kv-phone')
              template(v-if="activeHall === 2")
                img(:src="require('~/assets/img/demo/intro/kv-2-phone.png')")
              template(v-else)
                img(:src="require('~/assets/img/demo/intro/kv-phone.png')")
</template>

<script>
export default {
  name: 'Intro',
  props: {
    src: String,
    title: String,
    isFirst: {
      type: Boolean,
      default: true,
    },
    theme: String,
  },
  computed: {
    activeHall() {
      if (this.$route.params.slug === '90ed0330-97dc-489d-9df8-98e3a4daa613') {
        return 2
      } else {
        return 1
      }
    },
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

$s-intro-text-color: #fff;

$s-intro-title-size: 64px;
$s-intro-title-size-desktop: 48px;
$s-intro-title-size-phone: 24px;
$s-intro-title-color: var(--main-light);
$s-intro-text-accent: var(--main-color);

$s-intro-description-size: 24px;
$s-intro-description-size-phone: 14px;
$s-intro-description-color: var(--main-light);

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

  &__title {
    font-style: normal;
    font-weight: bold;
    font-size: $s-intro-title-size;
    line-height: 100%;
    color: $s-intro-text-color;
    flex: none;
    order: 0;
    flex-grow: 0;
    margin-bottom: 30px;

    & ::v-deep .text-accent {
      color: var(--main-color);
    }

    @include desktop() {
      font-size: $s-intro-title-size-desktop;
    }

    @include tablets() {
      margin-bottom: 10px;
    }

    @include phones() {
      line-height: 32px;
      text-align: center;
      margin-bottom: 5px;
      font-size: $s-intro-title-size-phone;
    }
  }

  &__description {
    font-style: normal;
    font-weight: normal;
    font-size: $s-intro-description-size;
    line-height: 1.5em;
    color: $s-intro-description-color;
    max-width: 525px;

    @include phones() {
      text-align: center;
      font-size: $s-intro-description-size-phone;
    }
  }

  &__kv {
    z-index: 1;
  }

  &__img {
    display: flex;
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    @include tablets() {
      right: -100px;
    }
    @include phones() {
      display: none;
    }
  }

  &__img-phone {
    position: absolute;
    display: none;
    @include phones() {
      display: flex;
      right: 50%;
      transform: translateX(50%);
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

    .s-intro__title {
      @include tablets() {
        font-size: 36px;
      }

      @include phones() {
        font-size: 18px;
        line-height: 24px;
        margin-bottom: 0;
        max-width: 80%;
        text-align: left;
      }
    }

    .s-intro__img {
      @include desktop() {
        right: -15px;
      }
    }

    .s-intro__img-phone {
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

  &__shop {
    .s-intro__relative {
      padding: 107px 0 125px;
      @include desktop() {
        padding: 95px 0 100px;
      }
      @include tablets() {
        padding: 52px 0 40px;
      }
      @include phones() {
        padding: 40px 0 30px;
      }
    }

    .s-intro__title {
      font-size: 48px;
      line-height: 52px;
      @include tablets() {
        font-size: 36px;
        line-height: 48px;
      }
      @include phones() {
        font-size: 24px;
        line-height: 32px;
        margin-bottom: 10px;
      }
    }

    .s-intro__row {
      @include tablets() {
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
      }
    }

    .s-intro__img {
      right: 300px;
      @include tablets() {
        right: -70px;
      }
      @include phones() {
        display: flex;
        right: -250px;
        transform: translateX(0);
      }
    }

    .s-intro__img-phone {
      display: none;
    }
  }
}
</style>
