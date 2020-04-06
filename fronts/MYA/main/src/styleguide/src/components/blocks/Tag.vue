<template functional>
  <span :class="['tag', props.type]">
    <slot></slot>
  </span>
</template>

<script>
export default {
  props: ['type']
}
</script>

<style scoped lang="less">
@import '../../assets/variables.less';
.tag {
  display: inline-block;
  &._primary{
    font-size: 8px;
    padding: 3px 9px;
    color: #56626E;
    background-color: #E7F0F7;
    border-radius: 23px;
  }
  &._error{
    font-size: 8px;
    padding: 3px 9px;
    color: #FFF;
    background-color: #FC4965;
    border-radius: 23px;
  }
}
</style>
