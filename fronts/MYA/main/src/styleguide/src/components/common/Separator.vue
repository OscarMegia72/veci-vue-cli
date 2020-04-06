<template>
  <component :is="tag" :class="['separator']">
    <slot></slot>
  </component>
</template>

<script>
export default {
  props: ['tag']
}
</script>

<style scoped lang="less">
@import '../../assets/variables.less';
.separator{
  padding: 2rem 1rem;
  min-height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  &._type_1 {
    font-size: 22px;
    font-weight: 400;
    line-height: 1.6;
    color: #242424;
  }

  &._type_2 {
    font-size: 18px;
    font-weight: 200;
    line-height: 1.4;
    color: #484848;
  }
  &._type_3 {
    font-size: 18px;
    font-weight: 500;
    line-height: 1.4;
    color: #484848;
  }
  &._grey{
    background-color: #FAFAFA;
  }
  &._white{
    background-color: #FFFFFF;
  }
}
@media @xl-up, @print {
  .separator{
    padding: 2rem;
    &._type_1{
      font-size: 28px;
    }
    &._type_2 {
      font-size: 22px;
    }
    &._type_3 {
      font-weight: 200;
    }
  }
}
</style>
