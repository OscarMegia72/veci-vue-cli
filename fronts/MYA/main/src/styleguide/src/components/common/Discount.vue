<template>
  <component :is="tag" :class="{'discount':true}" :style="{fontSize: size + 'px' }">
    <slot name="discount_slot">
      -{{amount}}%
    </slot>
  </component>
</template>

<script>
export default {
  name: 'price',
  props: {
    amount: {
      default: '0'
    },
    tag: {
      type: String,
      default: 'span'
    },
    size: {
      type: Number,
      default: 14
    }
  }
}
</script>

<style lang="less" scoped>
.discount{  
  color: #FFF;
  font-family: 'ECIFont';
  font-weight: 500;
  background-color: #FC4965;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: .25rem .5rem;
}
</style>
