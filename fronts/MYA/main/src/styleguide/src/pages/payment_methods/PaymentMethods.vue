<template>
  <main-container>
    <template slot="title">{{ $t('views.payment_methods.my_digital_payments_portfolio') }}</template>
    <template slot="content">
      <template v-if="this.payment_methods.length === 0">
        <page-header>
          <template slot="icon">
            <hand-mobile-icon />
          </template>
          <template slot="title">
            {{ $t('views.payment_methods.still_no_payment.title') }}
          </template>
          <template slot="subtitle">
            {{ $t('views.payment_methods.still_no_payment.text') }}
          </template>
        </page-header>
      </template>
      <template v-else>
        <page-header>
          <template slot="icon">
            <hand-mobile-icon />
          </template>
          <template slot="title">
            {{ $t('views.payment_methods.has_payment.title') }}
          </template>
        </page-header>
      </template>

      <template v-if="this.payment_methods.length !== 0">
        <div v-for="payment_method in payment_methods" :key="payment_method.id" >
          <payment-method-tile :payment_method="payment_method"></payment-method-tile>
        </div>
      </template>

      <separator :class="'separator _type_2 _grey'" :tag="'h3'">
        {{ $t('views.payment_methods.add_payment.title') }}
      </separator>
      <div class="mb2">
        <router-link to="add_eci_card" title="Añadir tarjeta ECI" class="no_underline">
          <add-payment-method-tile>
            <template slot="icon">
              <icon-base width="50" height="70"><eci-card /></icon-base>
            </template>
            <template slot="text_1">
              {{ $t('views.payment_methods.tile.add') }}
            </template>
            <template slot="text_2">
              {{ $t('views.payment_methods.tile.ECI_card') }}
            </template>
          </add-payment-method-tile>
        </router-link>
        <router-link to="add_bank_card" title="Añadir tarjeta Bancaria" class="no_underline">
          <add-payment-method-tile>
            <template slot="icon">
              <icon-base width="50" height="70"><eci-card /></icon-base>
            </template>
            <template slot="text_1">
              {{ $t('views.payment_methods.tile.add') }}
            </template>
            <template slot="text_2">
              {{ $t('views.payment_methods.tile.BANK_card') }}
            </template>
          </add-payment-method-tile>
        </router-link>
      </div>
    </template>
  </main-container>
</template>

<script>
import MainContainer from '../../components/layouts/MainContainer.vue'
import PageHeader from '../../components/layouts/PageHeader.vue'
import IconBase from '../../components/icons/IconBase.vue'
import HandMobile from '../../components/icons/HandMobile'
import Separator from '../../components/common/Separator'
import EciCard from '../../components/icons/card_logos/eci.vue'
import AddPaymentMethodTile from '../../components/tiles/AddPaymentMethodTile.vue'
import ShowPaymentMethodTile from '../../components/tiles/ShowPaymentMethodTile.vue';


export default {
  created () {
    if(!this.payment_methods){
      this.$store.dispatch('getPaymentMethods')
    }
  },
  computed: {
    payment_methods () {
      return this.$store.getters.getPaymentMethods
    }
  },
  components: {
    'main-container': MainContainer,
    'page-header': PageHeader,
    'icon-base': IconBase,
    'hand-mobile-icon': HandMobile,
    'separator': Separator,
    'eci-card': EciCard,
    'add-payment-method-tile': AddPaymentMethodTile,
    'payment-method-tile': ShowPaymentMethodTile
  }
}
</script>

<style scoped lang="less">
  .no_underline{
    text-decoration: none;
  }
</style>
