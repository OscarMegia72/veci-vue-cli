<template>
  <modal-action-message :custom="'modal_refund_summary'">
    <template slot="header">
        <div class="modal_refund_summary-header">
          <eci-text :tag="'div'" :type="'_l _48 _l14 _xl-l-up'">
              {{ $t('order_detail.refund.summary.title') }}
          </eci-text>
          <div>
            <eci-button class="close_button" @click="close"><i class="icon cross _xxl"></i></eci-button>
          </div>
        </div>
    </template>
    <template slot="body">
      <div class="modal_refund_summary-body">
        <div>
          <template v-for="product in products">
            <order-refund-product-tile :editable="false" :product="product" />
          </template>
        </div>
        <div class="p1">
          <order-refund-address-tile :editable="false" :showBillingInfo="true" />
        </div>
        <div class="p1 modal_refund_summary-packages">
          <eci-text :type="'_s _48 _l14 mb'">{{ $t('order_detail.refund.number_of_packages') }}</eci-text>
          <div class="block tc mb">
            <stepper :value="packages" :min="1" :disabled="true" />
          </div>
        </div>
        <div v-if="isPickupExpenseCost" class="modal_refund_summary-delivery_cost">
          <ul class="price_resume">
            <li class="price_resume-line">
                <div>{{ $t('order_detail.refund.delivery_cost') }}</div>
                <div> <price class="ts-refund-price" :amount="$t('order_detail.refund.delivery_cost_value')" :important=true :size=28 :decimal_character="','" ></price></div>
            </li>
          </ul>
        </div>
        <div v-else>
          <ul class="price_resume">
            <li class="price_resume-line">
                <div>{{ $t('order_detail.refund.delivery_cost') }}</div>
                <div class="ts-refund-free">{{$t('generic.free')}}</div>
            </li>
          </ul>
        </div>
      </div>
    </template>
    <template slot="footer">
      <button-set :type="'_ok'">
        <template slot="ok">
          <div class="p1">
            <eci-button :type="'_button _primary _cta ts-order-refund-confirm'" v-on:click="onContinue">{{ $t('generic.confirm') }}</eci-button>
          </div>
        </template>
      </button-set>
    </template>
  </modal-action-message>
</template>

<script>
import ModalActionMessage from '../modals/ModalActionMessage.vue';
import OrderRefundProductTile from './OrderRefundProductTile.vue';
import OrderRefundAddressTile from './OrderRefundAddressTile.vue';
import ButtonSet from '../layouts/ButtonSet.vue';
import Button from '../blocks/Button.vue';
import Link from '../blocks/Link.vue';
import Stepper from '../blocks/Stepper.vue';
import Text from '../blocks/Text.vue';
import Price from '../common/Price.vue';
import 'array-flat-polyfill';




export default {
  blockStatuses : ['CANCELLED','TRANSFERRED', 'PAYMENT_DENIED'],
  components: {
    'order-refund-product-tile': OrderRefundProductTile,
    'order-refund-address-tile': OrderRefundAddressTile,
    'eci-button': Button,
    'eciLink': Link,
    'button-set': ButtonSet,
    'stepper': Stepper,
    'modal-action-message': ModalActionMessage,
    'eci-text': Text,
    'price': Price
  },
  data () {
    return {
      editable: true
    }
  },
  computed: {
    packages() {
      return this.$store.state.packages;
    },
    products() {
      return this.$store.state.products.filter(product => product.selected);
    },
    order() {
      return this.$store.state.order;
    },
    isPickupExpenseCost() {
      const isPickupExpenseCostBackend = this.$store.state.order.isPickupExpenseCost;
      if (this.$store.state.order.isPickupExpenseCost) {
        return (this.$store.getters.finalProducts
          .filter((prod) => prod.productInfo.order_line_type !== 'SHIPPING_COST')
          .map((prod) => !!prod.refundCosts)
          .flat()
          .reduce((shouldCharge, refundCosts) => shouldCharge && refundCosts, true));
      } else {
        return isPickupExpenseCostBackend;
      }
    },
    _image_url () {
      return process.env.VUE_APP_ASSETS_BASE + '/stylesheets/images/my_account/image_devolucion.svg'
    },
    _help_url() {
      return window.vue_conf.domain_configuration.static_routes.help[this.$cookie.get('locale')]
    }
  },
  methods: {
    onContinue() {
      this.$emit('onContinue');
    },
    close: function() {
      this.$emit('closeSummary');
    },
  }
};

</script>

<style lang="less">
@import '../../assets/variables.less';
.modal_refund_summary {
  padding: 0;
  max-width: 650px;
  &-header{
    display: flex;
    flex-direction: row;
    min-height: 64px;
    padding: 1rem;
    border-bottom: solid 1px #E0E0E0;
    >*:first-child {
      flex: 1 0;
    }
    >*:last-child {
      flex: 0 1 48px;
    }
    >* {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &-body {
    margin : -2rem -1rem -1rem -1rem;
    padding: 0;
  }

  &-packages {
    display: flex;
    flex-direction: column;
    border-bottom: solid 1px #F0F0F0;
    >* {
      flex: 1 1 100%;
    }
    >p {
      text-align: center;
    }
    >div {
      display: flex;
      justify-content: center;
    }
  }
}

@media @l-up {
  .modal_refund_summary {
    &-packages {
      flex-direction: row;
      > *+* {
        padding-left: 1rem;
      }
      align-items: center;
      >p {
        text-align: right;
      }

      >div {
        justify-content: flex-start;
      }

    }
  }
}

.price_resume {
  color: #242424;
  font-size: 11px;
  font-weight: 500;
  padding: 2rem 1rem;
  &-line {
    display: grid;
    grid-template-columns: 1fr minmax(min-content, 170px);
    align-items: center;
    justify-items: right;
    text-transform: uppercase;

    &._special {
      color: #008c2e;
      padding: 0.3rem 0;
    }
  }
}
@media @l-up {
  .price_resume {
    padding: 2rem;
  }
}

@media all and (-ms-high-contrast:none) {
  .price_resume-line  {
    display: flex;
    >* {
      width: 50%;
    }
  }
}
</style>
