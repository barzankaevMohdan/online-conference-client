<template lang='pug' functional>
  .screen
    slot
</template>

<script>
export default {
  name: 'PageContent',
}
</script>

<style>
.screen {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
}
</style>
