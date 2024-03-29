<template>
  <div
    class="speaker-item"
    :id="`speaker-item-${componentId}`"
  >
    <UiAvatar
      :src="src"
      :userName='speaker.name'
      :size='50'
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
  name: 'UiSpeakerItem',
  props: {
    speaker: {
      type: Object,
      require: true,
    },
    onlyAvatar: Boolean,
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
  --speaker-item-name-size: var(--main-size);
  --speaker-item-post-size: var(--main-smallest-text);
  --speaker-item-company-size: var(--main-smallest-text);

  /* Цвета */
  --speaker-item-name-color: var(--main-light);
  --speaker-item-post-color: var(--main-light);
  --speaker-item-company-color: var(--gray-2);
}
</style>

<style lang="scss" scoped>
@import '~/styles/mixins.scss';

.speaker-item {
  display: flex;

  &__text-block {
    overflow: hidden;

    margin-left: 20px;

    @include phones {
      margin-left: 10px;
    }
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
