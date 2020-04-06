<template>
  <div class="operation">
    <div :class="['operation-header', {'_cancelable':_is_cancelable && !single_operation}]">
      <div class="operation-name_wrapper">
        <div class="operation-name">
          <eci-text :type="'_l _24 _semi _xl-xl-up tc'">
          {{ $t('order_detail.operation.name') }} #{{index}}
          </eci-text>
        </div>
        <div class="operation-number">
          <eci-text :type="'_s _24 _light _l-xl-up tc'">
          {{ $t('order_detail.operation.number') }} {{operation.transaction_id}}
          </eci-text>
        </div>
      </div>
      <button class="operation-cancel_button"  v-if="_is_cancelable && !single_operation"  @click="emitProposeCancelOperation" :title="$t('order_detail.operation.cancel_operation')">
        <i class="icon trash _xxl"></i>
        <eci-text :tag="'span'" :type="'_xs _48 _semi _uppercase'">
        {{ $t('order_detail.modals.cancel_transaction.title') }}
        </eci-text>
      </button>
    </div>
    <eci-notification v-if="operation.status_key === 'CANCELLED'" :class="'_grey'" :icon="'info-circle'">
      <template slot="content">
        <p>{{ $t('order_detail.eci-notifications.operation_cancelled.title') }}</p>
        <p v-html="$t('order_detail.eci-notifications.operation_cancelled.text')"></p>
      </template>
    </eci-notification>
    <eci-notification v-if="operation.status_key === 'TRANSFERRED'" :class="'_grey'" :icon="'info-circle'">
      <template slot="content">
        <p>{{ $t('order_detail.eci-notifications.operation_transferred.title') }}</p>
        <p v-html="$t('order_detail.eci-notifications.operation_transferred.text')"></p>
      </template>
    </eci-notification>
    <eci-notification v-if="operation.status_key === 'PAYMENT_DENIED'" :class="'_grey'" :icon="'info-circle'">
      <template slot="content">
        <p>{{ $t('order_detail.eci-notifications.payment_denied.title') }}</p>
        <p v-html="$t('order_detail.eci-notifications.payment_denied.text', {repayment_link:_has_user? operation.repayment.loggedURL : operation.repayment.notLoggedURL})"></p>
      </template>
    </eci-notification>

    <order-tracking
      :class="'operation-tracking'" v-if="_show_progess"
      :status="operation.status_key"
      :delivery_method="operation.method_key"
      :delivery_data="operation.delivery"
      :shipping_tracking="operation.shipping_tracking"
      :origin="operation.origin"
      :transaction_id="operation.transaction_id"
      :address_title="operation.method"
      :address="operation.shipping_address"
      :centre_address= "_centre_address"
      :address_modificable="_is_address_modificable"
      @click_change_address="emitProposeChangeAddress"
    />

    <div :class="['operation-body _opened mb']">
        <div class="hidden-m-up">
          <eci-separator :tag="'h3'" :class="'_type_2'">{{ $t('order_detail.products_list.title') }}</eci-separator>
        </div>
        <div class="operation-table_header">
          <eci-text :tag="'div'" :type="'_xs _24'">{{ $t('order_detail.products_list.priceunit') }}</eci-text>
          <eci-text :tag="'div'" :type="'_xs _24'">{{ $t('order_detail.products_list.quantity') }}</eci-text>
          <eci-text :tag="'div'" :type="'_xs _24'">{{ $t('order_detail.products_list.total') }}</eci-text>
        </div>
        <div class="operation-products">
          <template v-for="(product, index) in operation.products">
            <order-product-tile :key="index" :product="product" :order_status="operation.status_key" :disallow_modification="!_has_user"/>
          </template>
        </div>
        <template v-if="operation.gifts.length">
          <eci-separator :tag="'h3'" :class="'_type_2'">{{ $t('order_detail.gifts_list.title') }}</eci-separator>
          <div class="operation-products">
            <template v-for="(gift, index) in operation.gifts">
              <order-product-tile :key="index" :product="gift" :is_gift="true" :order_status="operation.status_key" :disallow_modification="!_has_user"/>
            </template>
          </div>
        </template>
    </div>
    <order-mini-resume  v-if="!single_operation"
      :address_modificable="_is_address_modificable"
      :class="'operation-mini_resume'"
      :payments="operation.payments"
      :amount="operation.total_products_amount_plus_shipping"
      >
      <template slot="title_3">{{ $t('order_detail.mini_resume.amount') }} #{{index}}</template>
      <template slot="body_3">
        <order-price-resume :style="{padding:0}"
          :lines="_lines"
          :discounts="operation.discounts ? operation.discounts : null"
          :total="operation.total_products_amount_plus_shipping"
          :shipping="operation.shipping_costs"
        />
      </template>
    </order-mini-resume>
    <template v-if="operation.codebar && !single_operation">
      <eci-text :tag="'p'" :type="'_xs _light _48 tc'">{{ $t('order_detail.control_code.title') }}: {{operation.control_code}}</eci-text>
      <eci-qrcode class="operation-code mb2" :value="operation.codebar" :width="1.3"></eci-qrcode>
      <eci-text :type="'_xs _48 mb tc'">{{operation.codebar}}</eci-text>
      <eci-text :type="'_xs _semi _brand tc mb'">{{ $t('order_detail.control_code.message') }}</eci-text>
    </template>
  </div>
</template>

<script>
import OrderMiniResume from './OrderMiniResume.vue';
import OrderProductTile from '../tiles/OrderProductTile.vue';
import OrderPriceResume from './OrderPriceResume.vue';
import OrderTracking from './OrderTracking.vue';
import Notification from '../common/Notification.vue';
import Separator from '../common/Separator.vue';
import Text from '../blocks/Text.vue';
import QrcodeVue from 'qrcode.vue';

export default {
  blockStatuses : ['CANCELLED','TRANSFERRED', 'PAYMENT_DENIED'],
  props: {
    operation: {
      default: () => {
        return {};
      }
    },
    index: {
      default: '1'
    },
    single_operation: {
      type: Boolean,
      default: true
    },
    order_id: {
      type: String,
      default: ''
    }
  },
  components: {
    'order-mini-resume': OrderMiniResume,
    'order-product-tile': OrderProductTile,
    'order-price-resume': OrderPriceResume,
    'order-tracking':OrderTracking,
    'eci-notification':Notification,
    'eci-separator': Separator,
    'eci-text': Text,
    'eci-qrcode': QrcodeVue
  },
  data () {
    return {
      opened: true
    }
  },
  computed: {
    _lines() {
      if (!this.operation) return [];
      return [
        {
          id: 1,
          amount: this.operation.total_products_amount
        }
      ];
    },
    _show_progess () {
      if (!this.operation) return false;
      if (this.operation.is_only_flat_rate) return false;
      if (this.$options.blockStatuses.indexOf(this.operation.status_key) !== -1) return false;
      return true;
    },

    _is_address_modificable () {
      if(!this.operation || !this._has_user) return false;
      return this.operation.is_modify_shipping_address && this.$options.blockStatuses.indexOf(this.operation.status_key) === -1
    },
    _is_cancelable () {
      if(!this.operation || !this._has_user) return false;
      return this.operation.is_cancel && this.$options.blockStatuses.indexOf(this.operation.status_key) === -1
    },

    _has_user() {
      return this.$cookie.get('oidc.sid')
    },
    _centre_address () {
      if(!this.operation) return {}
      switch(this.operation.method_key) {
        case 'CLICK_AND_CAR':
        case 'PICKUP_CLICK_AND_COLLECT':
        case 'PICKUP_SAVE_TO_STORE':
          return {
            full_name: this.operation.shopping_centre.name,
            line1: this.operation.shopping_centre.address_line1,
            line3: this.operation.shopping_centre.address_line3,
          }
        break
        default:
          return null
        break;
      }
    }
  },
  methods: {
    emitProposeChangeAddress () {
      this.$root.$emit('propose_change_address', this.operation._id)
    },
    emitProposeCancelOperation () {
      this.$root.$emit('propose_cancel_operation', this.operation._id)
    }
  }
};
</script>

<style lang="less">
@import '../../assets/variables.less';
.operation {
  &-header {
    background-color: #fafafa;
    border-top: solid 1px #f0f0f0;
    color: #242424;
    font-weight: 200;
    display: flex;
    flex-direction: column;
  }
  &-drop_button{
    grid-area: opener;
    .reset-button();
    .print & {
      display: none;
    }
  }
  &-name_wrapper{
    grid-area: name;
    padding: 1rem 0 1.5rem 0;
  }
  &-name {
    display: block;
    padding: .5rem;
  }
  &-number {
    display: block;
    padding: 0 1.5rem;
  }
  &-show_more{
    .reset-button();
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 100%;
    &:hover{
      color: #31AF6A;
    }
  }
  &-body {
    overflow: hidden;
    max-height: 0;
    &._opened{
      max-height: initial;
    }
  }
  &-code{
    text-align: center;
    padding: 1rem 1rem;
    svg{
      max-width: 100%;
    }
  }
  &-tracking{
    padding: 2rem 1rem;
  }
  &-cancel_button{
    .reset-button();
    background-color: #F0F0F0;
    color: #484848;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    min-height: 70px;
    i + span {
      margin-left: 1rem;
    }
    i{
      color: inherit;
    }
    .print &{
      display: none;
    }
  }
  &-table_header{
    display: none;
  }
  &-products {
    padding: 0 1rem;
  }
}

@media @s-up {
  .operation {
    &-header {
      flex-direction: row;
    }
    &-name_wrapper {
      flex: 1;
    }
    &-cancel_button {
      flex: 0 1 120px;
      i + span {
        display: none;
      }
    }
  }
}

@media @m-up {
  .operation {
      &-table_header{
      display: grid;
      grid-template-columns: 150px 100px 100px;
      justify-items: end;
      background: #FAFAFA;
      grid-column-gap: .8rem;
      padding: 0 2rem;
      justify-content: end;
      >div{
        padding: 1rem;
      }
    }
  }
}

@media @l-up, @print {
  .operation {
    &-header {
      flex-direction: row;
    }
    &-cancel_button{

      &:before{
        left: -4px;
        top: ~"calc(50% - 5px)";
      }
      i{
        font-size: 22px;
      }
    }
  }
}

@media @l-up, @print {
  .operation {
    &-name {
      font-size: 22px;
    }
    &-number {
      font-size: 16px;
    }
    &-products {
      padding: 0 2rem;
    }
    &-mini_resume {
      padding: 0 2rem 1rem 2rem;
    }
    &-tracking{
      padding: 2em;
    }
    &-cancel_button{
      i{
        font-size: 26px;
      }
    }
  }
}

@media @print{
  .operation {
    &-drop_button{
      display: none !important;
    }
  }
}

@media all and (-ms-high-contrast:none) {
  .operation-table_header  {
    display: flex;
  }
}

</style>
