<template>
  <div :class="['refund_tile', {'_refundable':editable}]">
    <template v-if="editable">
        <div class="refund_tile-checkbox">
          <eci-checkbox @change="onSelectReturnableProduct" :value="selected"/>
          <eci-text :tag="'div'" :type="'_xs _24 _light tr pr _ac'">{{ $t('order_detail.refund.product_tile.check_for_refund') }}</eci-text>
        </div>
    </template>
    <div class="refund_tile-image">
      <img :src="_computed_image" :alt="productInfo.description">
    </div>
    <div class="refund_tile-description">
        <eci-text :tag="'p'" :type="'_xs _48 _l14'">{{ productInfo.description }}</eci-text>
        <template v-for="(variant, idx) in productInfo.variants">
          <eci-text :tag="'p'" :type="'_xxs _brand _l14'" :key="`variante_${idx}`">
            <span>{{idx}}:</span>
            <span>{{variant}}</span>
          </eci-text>
        </template>
        <eci-text v-if="productInfo.coupon_code" :tag="'p'" :type="'_xs _48 _light _l14'" :key="`variante_${idx}`">
          <span>{{ $t('order_detail.refund.product_tile.code') }}: </span>
          <span>{{productInfo.coupon_code}}</span>
        </eci-text>
    </div>
    <div class="refund_tile-prices">
      <!--eci-text :tag="'div'" :type="'_xxs _24 _semi tr pr _ac'">{{ $t('order_detail.product.pum') }}</eci-text>
      <template v-if="is_gift">
        <eci-text :tag="'span'" :type="'_xs _24 _semi'"> - </eci-text>
      </template>
      <template v-else>
        <div v-if="_has_offer">
          <eci-price :amount="productInfo.unit_price.toString()" :before="true" :size="16" :important="true" :decimal_character="'.'" />
          <span>&nbsp;&nbsp;&nbsp</span>
          <eci-price :amount="productInfo.sale_price" :offer="true" :size="18" :important="true" v-if="productInfo.sale_price" :decimal_character="'.'"  />
          <template v-for="(discount,idx) in productInfo.discounts_list">
            <eci-discount :key="idx" :amount="discount.percent"/>
          </template>
          <eci-price :pum="true" :size="12" v-if="pum" :decimal_character="'.'">
            <template slot="price_slot">{{pum}}</template>
          </eci-price>
        </div>
        <div v-else>
          <eci-price :amount="productInfo.unit_price || base_price" :size="18" :important="true" :decimal_character="'.'" />
          <eci-price :pum="true" :size="12" v-if="pum">
            <template slot="price_slot">{{pum}}</template>
          </eci-price>
        </div>
      </template-->
      <eci-text :tag="'div'" :type="'_xxs _24 _semi tr pr _ac'">{{ $t('order_detail.product.quantity') }}</eci-text>
      <div class="product_quantity_value">
        <template v-if="editable">
          <eci-stepper :class="'_small mt mb'"
            :value="quantityToReturn"
            :min="1"
            :max="product.productInfo.quantity"
            :integerOnly="true"
            :disabled="!selected"
            @input="onProductQuantityChange"
          />
        </template>
        <template v-else>
          <div class="_no-editable">
            <eci-stepper :class="'_small mt mb'"
            :value="quantityToReturn"
            :disabled="true"
          />
          </div>
        </template>

        <!--<div>

          <eci-quantity :quantity="productInfo.quantity" :unit="productInfo.quantity_unit_key"></eci-quantity>
        </div>-->
      </div>
      <!--eci-text :tag="'div'" :type="'_s _24 _semi tr pr _ac'">{{ $t('order_detail.products_list.total') }}</eci-text>
      <div class="product_total_value">
        <div>
          <eci-price v-if="_special_status === 'MPC'" :amount="$t('order_detail.productInfo.MPC')" :important="true" :size="18"/>
          <eci-price v-else :amount="_computed_amount || total" :important="true" :size="18"/>
        </div>
      </div-->
    </div>
    <eci-transitions-expand v-if="editable && selected">
      <div class="refund_tile-reason">
        <eci-text :tag="'p'" :type="'_xs _48 _semi _l24'">{{ $t('order_detail.refund.product_tile.refund_reason') }}</eci-text>
        <eci-select name="'campo1'" v-model="selectedReason" @change="onReasonChange" :options="reasons" :current_value="selectedReason" />
      </div>
    </eci-transitions-expand>
    <template v-if="!editable">
      <div class="refund_tile-reason">
        <eci-text :tag="'p'" :type="'_xs _48 _semi _l24 mb'">{{ $t('order_detail.refund.product_tile.refund_reason') }}</eci-text>
        <div class="refund_tile-reason_block">
          <eci-text :type="'_xs _light _l14'">{{selectedReasonName}}</eci-text>
        </div>
      </div>

    </template>
  </div>
</template>

<script>
import Price from '../common/Price.vue';
import Quantity from '../common/Quantity.vue';
import Discount from '../common/Discount.vue';
import Stepper from '../blocks/Stepper.vue';
import Checkbox from '../blocks/Checkbox.vue';
import Text from '../blocks/Text.vue';
import Expand from '../transitions/Expand.vue';




export default {
  components: {
    'eci-price': Price,
    'eci-quantity': Quantity,
    'eci-discount': Discount,
    'eci-stepper': Stepper,
    'eci-checkbox': Checkbox,
    'eci-text': Text,
    'eci-transitions-expand': Expand,
  },
  props: {
    product: {
      default: () => {
        return {};
      }
    },
    editable: {
      type: Boolean,
      default: false
    },
    disallow_modification: {
      type: Boolean,
      default: false
    },
    image: {
      default: process.env.VUE_APP_ASSETS_BASE + '/stylesheets/images/my_account/no-photo.svg'
    },
    quantity: {
      default: 1
    },
    unit: {
      default: 'UNITS'
    },
    total: {
      default: '999,99'
    },
    is_gift: {
      type: Boolean,
      default: false
    },
    pum: {
      type: String,
      default: ''
    },
    order_status: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      //modified_quantity: this.product.quantity
    }
  },
  computed: {
    reasons() {
      return this.$store.state.reasons;
    },
    productInfo() {
      return this.$props.product.productInfo;
    },
    quantityToReturn() {
      return this.$props.product.quantityToReturn || 1;
    },
    selectedReason() {
      var reason = this.reasons.find(reason => reason.value === this.$props.product.reason)[0];
      if(reason) {
        return String(reason.value);
      } else{
        return '0';
      }
    },
    selectedReasonName() {
      return this.reasons.find(reason => reason.value === this.$props.product.reason).label;
    },
    selected() {
      return this.$props.product.selected;
    },
    _computed_image: function(){
      return this.$props.product.productInfo.image_url || process.env.VUE_APP_ASSETS_BASE + '/stylesheets/images/my_account/no-photo.svg'
    },
    _has_offer: function(){
      return this.$props.product.unit_price !== this.$props.product.sale_price && !this.$props.is_gift
    },
    _computed_amount: function(){
      if(this.$props.is_gift){
        return 'Gratis'
      }
      return this.product.amount;
    },
    _is_modificable: function(){
      if(this.disallow_modification) return false;
      return (this.$props.product.is_less_quantity || this.$props.product.is_cancel) &&
             this.$props.order_status !== 'TRANSFERRED' &&
             this.$props.order_status !== 'FULFILLED' &&
             this.$props.order_status !== 'CANCELLED'
    },
    _special_status: function(){
      if(this.product.status_key === 'CANCELLED') {
        if(!this.$props.product.origin_status || !this.$props.product.origin_status[0]) return 'CANCELLED';
        return {
          '03': 'CANCELLED',
          '04': 'REPLACED',
          '05': 'NO_STOCK',
          '07': 'MPC'
        }[this.$props.product.origin_status[0].status] || 'CANCELLED'
      } else {
        if(this.$props.editable) {
          return 'EDITABLE'
        }
        return 'NONE'
      }
    }
  },
  methods: {
    getModifiedQuantity () {
      return this.modified_quantity;
    },
    onReasonChange(reason) {
      this.$store.commit('changeProductReason', {
        productId: this.productInfo._id,
        reason,
      });
    },
    onSelectReturnableProduct(selected) {
      this.$store.commit('selectProduct', {
        productId: this.productInfo._id,
        selected,
      });
    },
    onProductQuantityChange(value) {
      this.$store.commit('changeProductQuantity', {
        productId: this.productInfo._id,
        quantityToReturn: value,
      });
    }
  },
};
</script>

<style lang="less">
@import '../../assets/variables.less';
.refund_tile {
  display: grid;
  width: 100%;
  padding: 1rem;
  grid-template-areas: "checkbox checkbox"
                       "image    description"
                       "prices   prices"
                       "reason   reason";
  grid-template-columns: minmax(min-content, 120px) 1fr;
  grid-row-gap: .75rem;
  grid-column-gap: 1rem;
  border-bottom: solid 1px #E0E0E0;

  &-checkbox { grid-area: checkbox};
  &-image {grid-area: image};
  &-description { grid-area: description};
  &-prices {grid-area: prices};
  &-reason {grid-area: reason};

  &-checkbox {
    display: flex;
    margin-bottom: 1rem;
  }

  &-image {
    text-align: center;
    img {
      max-width: 100%;
      max-height: 100px;
      height: auto;
    }
  }

  &-reason_block {
    background-color: #F8F8F8;
    padding: 1em;
  }

  &-prices {
    display: grid;
    grid-template-columns: minmax(min-content, 120px) 1fr;
    grid-column-gap: 1rem;
    margin-bottom: 1rem;
    .label {
      align-self: center;
    }
  }
}

.product_quantity_value {
    display: flex;
    align-items: center;
}

@media @l-up {
  .refund_tile {
    grid-template-areas: "checkbox image description prices"
                         "- reason reason reason";
    grid-template-columns: 24px 80px 1fr minmax(100px, 200px);
    &-checkbox {
      .new_text {
        display: none !important;
      }
    }
    &-reason {
      max-width: 80%;
      justify-self: center;
    }
  }
}
@media @xl-up {
  .refund_tile {
    padding: 2rem;
    grid-template-columns: 24px 100px 1fr minmax(100px, 200px);
  }
}
</style>
