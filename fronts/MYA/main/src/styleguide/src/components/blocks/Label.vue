<template>
  <label class="label" :for="field"><slot></slot></label>
</template>

<script>
export default {
  props: ['field']
}
</script>

<style scoped lang="less">
  .label{
    color: #484848;
    font-size: 11px;
    font-weight: 400;
    text-transform: uppercase;
    display: block;
    line-height: 1;
    margin-bottom: .5rem;
  }
</style>
