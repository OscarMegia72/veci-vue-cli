<template>
  <div class="order_header">
    <div class="order_header-logo">
      <img :src="logo" :alt="order_id">
    </div>
    <div class="order_header-label" v-html="$t('order_detail.order_header.label', {order_id:order_id})"></div>
    <div v-if="date" class="order_header-date">{{ $t('order_detail.order_header.date', {date:date}) }}</div>
  </div>
</template>

<script>
export default {
  name: 'OrderHeader',
  props: {
    logo: {
      type: String,
      required: true,
      default: 'ECI'
    },
    order_id: {
      default: '########',
      required: true
    },
    date: {
      type: String
    }
  }
};
</script>

<style lang="less">
@import '../../assets/variables.less';
.order_header {
  display: block;
  padding: 1rem;
  width: 100%;
  background-color: #FFFFFF;
  color: #484848;

  &-logo {
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
   // padding: 1.2rem 1rem;
    img {
      width: 100%;
      height: auto;
      max-width: 100%;
      max-height: 100%;
    }
  }
  &-label {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 1rem;
    text-align: center;
    span {
      display: block;
    }
  }

  &-date {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    font-size: 16px;
    font-weight: 200;
    text-align: center;
  }
}

@media @m-up, @print {

  .order_header {
    display: grid;
    grid-template-columns: 208px 1fr;
    grid-column-gap: 12px;
    grid-template-areas:
      'logo pedido numero'
      'logo entrega entrega';
    &-logo {
      grid-area: logo;
      align-self: center;
      justify-self: center;
    }
    &-label {
      grid-area: pedido;
      margin-bottom: 0;
      span {
        display: inline-block;
      }
    }
    &-date {
      grid-area: entrega;
      margin-bottom: 0;
    }
  }
}

@media @xl-up {
  .order_header {
    &-label {
      font-size: 22px;
    }
    &-date {
      font-size: 18px;
    }
  }
}
</style>
