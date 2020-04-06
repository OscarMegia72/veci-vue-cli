<template>
  <div class="flat_rate_option">
    <div class="flat_rate_option-title">Titulo</div>
    <div class="flat_rate_option-price">14,95€</div>
    <ul class="flat_rate_option-description_list">
      <li>Sin Compromiso: cancela cuando quieras</li>
      <li>Para todos tus pedidos con envío a domicilio o a la dirección que indiques</li>
      <li>Para envíos con recogida en Supercor u otros puntos de recogida</li>
      <li>Renovable anualmente</li>
      <li>Garantía de satisfacción</li>
    </ul>
    <div class="flat_rate_option-buttonset">
      <my-button :class="'button_new _secondary _cta'">Adminitrar tarifa plana</my-button>
    </div>
  </div>
</template>

<script>
import Button from './blocks/Button.vue';

export default {
  components: {
    'my-button': Button,
  }
}
</script>

<style lang="less">

@import '../../assets/reset';
.flat_rate_option{
  display: flex;
  flex-direction: column;
  background-color: @white;
  box-shadow: #000 0px 0px 6px;
  padding: 1rem;

  &-title{
    font-weight: 500;
    font-size: 18px;
    text-align: center;
    line-height: 2.2;
  }
  &-price{
    font-family: 'Lato';
    > span:nth-of-type(1) {
      font-weight: bold;
      font-size: 34px;
    }
    > span:nth-of-type(2) {
      font-weight: bold;
      font-size: 21px;
    }
  }
}

</style>
