<template>
  <div class="flat_rate_upgrade">
    <p class="flat_rate_upgrade-title">Mejora tu tarifa plana añadiendo otros descuentos y servicios</p>
    <buttonset :class="'flat_rate_upgrade-buttonset _ok'">
      <template slot="ok">
        <my-button :class="'button_new _primary _warning'">MEJORAR MI TARIFA PLANA</my-button>
      </template>
    </buttonset>
  </div>
</template>

<script>
import ButtonSet from './layouts/ButtonSet.vue';
import Button from './blocks/Button.vue';

export default {
  components: {
    'my-button': Button,
    buttonset: ButtonSet,
  }

}
</script>

<style lang="less">
  .flat_rate_upgrade{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
    border-bottom: 1px solid #f0f0f0;
    &-title{
      font-size: 22px;
      font-weight: 200;
      padding: 0 2rem 2rem 2rem;
      text-align: center;

    }
    &-buttonset{
      padding: 0 1rem;
    }
  }
</style>
