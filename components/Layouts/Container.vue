<template lang='pug' functional>
  .container
    slot

</template>

<script>
export default {
  name: 'Container',
}
</script>

<style lang='scss'>
@import "~/styles/mixins.scss";

.container {
  width: 100%;
  max-width: 1196px;
  padding-left: 15px;
  padding-right: 15px;
  margin-left: auto;
  margin-right: auto;
}
</style>
