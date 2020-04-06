<template>
<div>
  <form class="search_order">
    <input class="search_order-input" :placeholder="placeholder" />
    <button type="submit" class="search_order-button" title="Buscar">
      <span class="icon search"></span>
    </button>
  </form>
</div>

</template>

<script>

export default {
  props: ['placeholder']
}
</script>

<style lang="less">
@import '../../assets/variables.less';
& {
  @control_height: 55px;
  @control_height_tablet: 90px;
  .search_order{
    width: 100%;
    display: flex;
    border-bottom: solid 1px #c5c5c5;
    &-input{
      flex:1;
      display: flex;
      align-items: center;
      padding: 1rem 0 1rem 1rem;
      height: @control_height;
      background-color: white;
      border: none;
      outline: none;        
      font-size: 14px;
      color: #242424;
      transition: all .1s ease-in-out;
      &::-webkit-input-placeholder {
        font-size: 12px;
        color: #8F8F8F;
        font-style: italic;
      }
      &::-moz-placeholder {
        font-size: 12px;
        color: #8f8f8f;
        font-style: italic;
      }
      &:-ms-input-placeholder {
        font-size: 12px;
        color: #8f8f8f;
        font-style: italic;
      }
      &:-moz-placeholder {
        font-size: 12px;
        color: #8f8f8f;
        font-style: italic;
      }
    }
    &-button{
      width: 40px;
      flex-shrink: 0;
      color: #88cc88;      
      cursor: pointer;  
      .icon{
        font-size: 24px;
      }
    }
  }
  @media @l-up{
    .search_order{
      border-bottom: none;
      background: #fafafa;
       &-input{
         padding: 2rem;
         height: @control_height_tablet;
         background: transparent;
       }
       &-button{
        width: 96px;
        .icon{
          font-size: 32px;
        }
      }
    }
  }
}
</style>
