<template>
  <div class="main_container">
    <eci-title :class="'main_container-title title _main'" :tag="'h2'">
      <slot name="title"></slot>
    </eci-title>
    <div class="main_container-body">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import Title from '../blocks/Title.vue'

export default {
  components: {
    'eci-title': Title
  }
}
</script>

<style scoped lang="less">
  .main_container{
    width: 100%;
    border-bottom-width: 2px;
    background: white;
    min-height: 550px;
    box-sizing: border-box;
  }
</style>
