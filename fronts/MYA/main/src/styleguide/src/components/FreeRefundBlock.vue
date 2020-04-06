<template>
  <div class="freerefund">
    <div class="freerefund-image">
      <img :src="`${$assets_base}/stylesheets/images/my_account/image_devolucion.svg`" alt="Devolución gratis en tienda">
    </div>
    <div>
      <p class="freerefund-title" v-html="$t('order_detail.refund.advert.title')"></p>
    </div>
    <div>
      <p class="freerefund-body" v-html="$t('order_detail.refund.advert.text', {'help_link': _help_url, 'instructions_link': _help_url})"></p>
      <p class="freerefund-body _alt" v-html="$t('order_detail.refund.advert.text_2', {'help_link': _help_url, 'instructions_link': _help_url})"></p>
    </div>
  </div>
</template>

<script>
export default {
  computed : {
    _help_url() {
      return window.vue_conf.domain_configuration.static_routes.help[this.$cookie.get('locale')]
    }
  }
}
</script>

<style lang="less">
  @import '../assets/variables.less';
  .freerefund {
    margin: 2rem 0;
    padding: 0 1rem;
    &-image {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      max-height: 60px;
      margin-bottom: 1.5rem;
      img {
        width: auto;
        height: 100%;
      }
    }
    &-title {
      font-weight: 500;
      text-transform: uppercase;
      font-size: 16px;
      color: #242424;
      text-align: center;
      padding: 0 1rem 1em 1rem;
      span {
        color: #4FA04F;
      }
    }
    &-body {
      font-size: 14px;
      color: #242424;
      line-height: 1.4;
      text-align: center;
      padding: 1em 1rem 1em 1rem;
      &._alt {
        font-weight: 200;
      }
      a{
        font-size: inherit;
        color: inherit;
        text-decoration: underline;
        &:hover{
          color: #4FA04F;
          text-decoration: none;
        }
      }
    }
  }

  @media @xl-up {
    .freerefund {
      &-title {
        font-size: 20px;
      }
    }
  }
</style>

