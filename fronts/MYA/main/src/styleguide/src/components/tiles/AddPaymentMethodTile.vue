<template>
  <div class="payment_methods-tile">
    <div>
      <slot name="icon"></slot>
    </div>
    <div>
      <p class="payment_methods-tile_text_1">
        <slot name="text_1"></slot>
      </p>
      <p class="payment_methods-tile_text_2">
        <slot name="text_2"></slot>
      </p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
  .payment_methods-tile{
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid 1px #F0F0F0;
    border-bottom: none;
    text-decoration: none;
    height: 90px;
    &:last-of-type{
      border-bottom: solid 1px #F0F0F0;
    }
    >div:nth-of-type(1){
      width: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }
    >div:nth-of-type(2){
      flex-grow: 1;
    }
    >div:nth-of-type(3){
      width: 60px;
      height: 90px;
      background: #FAFAFA;
      transition: all .2s ease-in-out;
      display: flex;
      align-items: center;
      justify-content: center;

      a{
        text-decoration: none;
        color: #8f8f8f;
      }
    }
    &:hover{
      >div:nth-of-type(3){
        background: darken(#FAFAFA, 5);
      }
    }
    &_text_1{
      line-height: 1.8;
      color: #242424;
      font-weight: 100;
      font-size: 14px;
    }
    &_text_2{
      line-height: 1.8;
      color: #242424;
      font-weight: 500;
      font-size: 14px;
    }
  }

  @media only screen and (min-width: 56.25em){
    .payment_methods-tile{
      >div:nth-of-type(1){
        width: 30%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 2rem;
        svg{
          max-width: 60px;
        }
        .icon{
          width: 60px;
          text-align: center;
        }
      }

      >div:nth-of-type(3){
        width: 90px;
      }
    }
  }
  @media only screen and (min-width: 68.75em){
    .payment_methods-tile{
      >div:nth-of-type(1){
        width: 40%;
        svg{
          max-width: 60px;
          height: 30px;
        }
      }

      >div:nth-of-type(3){
        width: 90px;
      }
    }
  }
</style>
