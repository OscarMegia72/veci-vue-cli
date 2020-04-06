<template>
  <ul>
    <slot></slot>
  </ul>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
  @import '../../assets/variables.less';  
  ul{
    list-style: none;
    width: 100%;
    margin: 0 auto 0 auto;
    li{
      font-size: @font-size-s;
      font-weight: 200;
      display: flex;
      align-items: center;
      text-align: left;
      border-bottom: solid 1px #F0F0F0;
      padding: 1.1rem;
      svg { 
        flex-shrink: 0;
        width: 24px;
        height: 24px;
        margin-right: 1.5rem;
      }
      &:last-of-type {
        padding-bottom: 0;
        border-bottom: none;
      }
    }
  }
</style>
