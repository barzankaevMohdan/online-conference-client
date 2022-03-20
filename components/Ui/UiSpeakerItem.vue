<template>
  <div
    class="speaker-item"
    :class="{
      'speaker-item_pointer': badge
    }"
    :id="`speaker-item-${componentId}`"
    @click.prevent="openBadge(speaker.id)"
  >
    <UiPicture
      class="speaker-item__picture"
      :src="src"
      alt="Img"
      aspect-ratio="1:1"
      :style="{'--picture-border-radius': '100px'}"
    />
    <div class="speaker-item__text-block" v-if="!onlyAvatar">
      <div class="speaker-item__speaker-name">
        <slot name="name" :speaker="speaker">
          {{ speaker.name }}
        </slot>
      </div>
      <div class="speaker-item__post">
        <slot name="post" :speaker="speaker">
          {{speaker.post}}
        </slot>
      </div>
      <div class="speaker-item__company">
        <slot name="company" :speaker="speaker">
          {{ speaker.about }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SpeakerItem',
  props: {
    speaker: {
      type: Object,
      require: true,
    },
    badge: {
      type: Boolean,
      default: false
    },
    onlyAvatar: Boolean,
  },
  methods: {
    openBadge(speaker) {
      this.$vfm.show(speaker);
    },
  },
  computed: {
    src() {
      return this.speaker?.picture
    },
    componentId() {
      return this._uid
    },
  },
}
</script>

<style lang="scss">
@import '~/styles/mixins.scss';

:root {
  /* Размеры */
  --speaker-item-name-size: var(--main-text-size, 16px);
  --speaker-item-post-size: var(--main-smallest-text, 12px);
  --speaker-item-company-size: var(--main-smallest-text, 12px);
  --speaker-item-image-size: 50px;

  /* Цвета */
  --speaker-item-name-color: var(--main-light);
  --speaker-item-name-hover-color: var(--main-color);
  --speaker-item-post-color: var(--main-light);
  --speaker-item-company-color: var(--main-light);

  @include phones {
    /* Размеры */
    --speaker-item-image-size: 40px;
    --speaker-item-name-size: var(--main-text-size, 14px);
    --speaker-item-post-size: var(--main-smallest-text, 10px);

  }
}
</style>

<style lang="scss" scoped>
@import '~/styles/mixins.scss';

.speaker-item {
  display: flex;

  &_pointer {
    cursor: pointer;

    &:hover {
      --speaker-item-name-color: var(--speaker-item-name-hover-color);
    }
  }

  &__picture {
    margin-right: 20px;
    width: var(--speaker-item-image-size);
    height: var(--speaker-item-image-size);

    @include phones {
      margin-right: 10px;
    }
  }

  &__text-block {
    overflow: hidden;
  }

  &__speaker-name {
    font-size: var(--speaker-item-name-size);
    color: var(--speaker-item-name-color);

    font-weight: 600;
    margin-top: 0;
    margin-bottom: 5px;
    line-height: 1.375;
    transition-timing-function: ease-in-out;
    transition-property: color;
    transition-duration: 200ms;

    @include phones {
      margin-bottom: 5px;
    }
  }

  &__post {
    font-size: var(--speaker-item-post-size);
    color: var(--speaker-item-post-color);

    margin-top: 0;
    margin-bottom: 3px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    line-height: 1.5;
  }

  &__company {
    font-size: var(--speaker-item-company-size);
    color: var(--speaker-item-company-color);

    margin: 0;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    line-height: 1.5;

    @include phones {
      max-height: 54px;
    }
  }
}
</style>
