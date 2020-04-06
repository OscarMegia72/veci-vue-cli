<template functional>
  <component :is="props.tag" :class="['stack',props.type]">
    <slot></slot>
  </component>
</template>

<script>
export default {
  props: {'tag':{ default: 'div'}, 'type': { default: '_vertical'}}
}
</script>

<style lang="less">
  @space : 1em;
  .stack {
    > * {
    margin: 0;
    }
    &._vertical > * + * {
      margin-top: @space;
    }
    &._horizontal > * + * {
      margin-left: @space;
    }
  }
</style>