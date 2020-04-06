<template>
  <component :is="tag" :class="{'new_title':true}">
    <slot></slot>
  </component>
</template>

<script>
export default {
  props: ['tag']
}
</script>

<style scoped lang="less" >
@import '../../assets/variables.less';

  @media @m-up{
    .new_title{
      &._main{
        margin: 0px 0 0 0;
      }
    }
  }

  .new_title{
    min-height: 53px;
    &._main{
      background-color: #f0f0f0;
      color: #8f8f8f;
      font-size: 12px;
      font-weight: normal;
      text-transform: uppercase;
      text-align: center;
      padding: 1rem 0;
      line-height: 1.2rem;

      ._webview & {
        display: none;
      }
    }
    &._page{
      font-size: 28px;
      font-weight: 400;
      color: #242424;
      text-align: center;
      line-height: 2;
    }
    &._level_1{
      font-size: 18px;
      font-weight: 400;
      color: #242424;
      line-height: 1.4;
      margin-bottom: .75rem;
    }
    &._level_2{
      font-size: 13px;
      color: #242424;
      line-height: 1.4;
      margin-bottom: .75rem;
      font-weight: 500;
      text-transform: uppercase;
    }
    &._with_back_button {
      display: flex;
      > *:nth-child(1) {
        width: 50px;
      }
      > *:nth-child(2) {
        flex: 1;
        text-align: center;
      }
    }
  }
</style>
