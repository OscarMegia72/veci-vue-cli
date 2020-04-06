<template>
  <div class="order_product_tile">
    <div class="order_product_tile-image">
      <img :src="_computed_image" :alt="product.description">
    </div>
    <div class="order_product_tile-description">
      <template v-if="product.pdp_url">
        <eci-link :title="product.description" :href="product.pdp_url" :type="'_secondary'" :target="'_blank'">{{ product.description }}</eci-link>
      </template>
      <template v-else>
        {{ product.description }}
      </template>

      <template v-for="(variant, idx) in product.variants">
        <div class="order_product_tile-variant" :key="idx">
          <span>{{variant.key}}:</span>
          <span>{{variant.value}}</span>
        </div>
      </template>
      <div v-if="_special_status === 'REPLACED'" class="order_product_tile-status">
        {{ $t('order_detail.product.replaced') }}
      </div>
      <div v-if="product.coupon_code" class="order_product_tile-variant">
        <span>Código: </span>
        <span>{{product.coupon_code}}</span>
      </div>
      <div v-if="product.display_digital_library_link" class="order_product_tile-variant">
        <a href="/mis-ebooks/" title="$t('order_detail.product.ebooks')">{{ $t('order_detail.product.ebooks') }}</a>
      </div>
      <template v-if="_is_modificable">
        <div>
          <eci-button v-if="product.quantity == 1" @click="emitModifyProduct" :type="'_link _cta'">{{ $t('order_detail.product.delete') }}</eci-button>
          <eci-button v-if="product.quantity > 1" @click="emitModifyProduct" :type="'_link _cta'">{{ $t('order_detail.product.delete') }}</eci-button>
        </div>
      </template>
    </div>
    <div class="order_product_tile-label order_product_tile-pum_label">{{ $t('order_detail.product.title_pum_label') }}</div>
    <template v-if="is_gift">
      <div class="order_product_tile-value order_product_tile-pum_value"> - </div>
    </template>

    <template v-else>
      <div v-if="_has_offer" class="order_product_tile-value order_product_tile-pum_value">
        <eci-price :amount="product.sale_price" :offer="true" :size="18" :important="true" v-if="product.sale_price"  />
        <eci-price :amount="product.unit_price.toString()" :before="true" :size="16" :important="true" />
        <template v-for="(discount,idx) in product.discounts_list">
          <eci-discount :key="idx" :amount="discount.percent"/>
        </template>
        <eci-price :pum="true" :size="12" v-if="pum">
          <template slot="price_slot">{{pum}}</template>
        </eci-price>
      </div>
      <div v-else class="order_product_tile-value order_product_tile-pum_value">
        <eci-price :amount="product.unit_price || base_price" :size="18" :important="true" />
        <eci-price :pum="true" :size="12" v-if="pum">
          <template slot="price_slot">{{pum}}</template>
        </eci-price>
      </div>
    </template>

    <div class="order_product_tile-label order_product_tile-quantity_label">{{ $t('order_detail.product.tile_quantity_label') }}</div>

    <div v-if="_special_status === 'NONE' || _special_status === 'MPC'" class="order_product_tile-value order_product_tile-quantity_value">
      <eci-quantity :quantity="product.quantity" :unit="product.quantity_unit_key"></eci-quantity>
    </div>

    <div v-if="_special_status === 'EDITABLE'" class="order_product_tile-value order_product_tile-quantity_value">
      <eci-stepper
        v-model="modified_quantity"
        :min="1"
        :max="product.quantity"
        :integerOnly="true"
      />
    </div>

    <div v-if="_special_status === 'CANCELLED'" class="order_product_tile-value order_product_tile-quantity_value">
      {{ $t('order_detail.product.cancelled') }}
    </div>

    <div v-if="_special_status === 'REPLACED'" class="order_product_tile-value order_product_tile-quantity_value">
      <eci-quantity :quantity="product.origin_status[0].quantity" :unit="product.quantity_unit_key || unit"></eci-quantity>
    </div>

    <div v-if="_special_status === 'NO_STOCK'" class="order_product_tile-value order_product_tile-quantity_value">
      {{ $t('order_detail.product.no_stock') }}
    </div>

    <div v-if="_special_status === 'TRANSFERRED'" class="order_product_tile-value order_product_tile-quantity_value">
      {{ $t('order_detail.product.returning') }}
    </div>

    <div v-if="_special_status === 'RETURN_PENDING_PICKING'" class="order_product_tile-value order_product_tile-quantity_value">
      {{ $t('order_detail.product.pending_pick') }}
    </div>

    <div v-if="_special_status === 'RETURN_ON_ROUTE'" class="order_product_tile-value order_product_tile-quantity_value">
      {{ $t('order_detail.product.returned_to_agency') }}
    </div>

    <div v-if="_special_status === 'RETURN_REVISION_PENDING'" class="order_product_tile-value order_product_tile-quantity_value">
      {{ $t('order_detail.product.revision_pending') }}
    </div>

    <div v-if="_special_status === 'RETURN_FINISHED'" class="order_product_tile-value order_product_tile-quantity_value">
      {{ $t('order_detail.product.returned') }}
    </div>

    <div v-if="_special_status === 'RETURN_CANCELLED'" class="order_product_tile-value order_product_tile-quantity_value">
      {{ $t('order_detail.product.return_cancelled') }}
    </div>

    <div class="order_product_tile-label order_product_tile-price_label">{{ $t('order_detail.product.total') }}</div>
    <div class="order_product_tile-value order_product_tile-price_value">
      <template v-if="_special_status !== 'CANCELLED' && _special_status !== 'RETURN_FINISHED'">
        <eci-price v-if="_special_status === 'MPC'" :amount="$t('order_detail.product.MPC')" :important="true" :size="18" />
        <eci-price v-else :amount="_computed_amount || total" :important="true" :size="18" />
      </template>
    </div>
  </div>
</template>

<script>
import Price from '../common/Price.vue';
import Quantity from '../common/Quantity.vue';
import Discount from '../common/Discount.vue';
import Button from '../blocks/Button.vue';
import Stepper from '../blocks/Stepper.vue';
import Link from '../blocks/Link.vue';


export default {
  components: {
    'eci-price': Price,
    'eci-quantity': Quantity,
    'eci-discount': Discount,
    'eci-button': Button,
    'eci-stepper': Stepper,
    'eci-link': Link
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
      modified_quantity: this.product.quantity
    }
  },
  computed: {
    _computed_image: function(){
      return this.$props.product.image_url || process.env.VUE_APP_ASSETS_BASE + '/stylesheets/images/my_account/no-photo.svg'
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
      const returnStateList = [
        'TRANSFERRED',
        'RETURN_PENDING_PICKING',
        'RETURN_ON_ROUTE',
        'RETURN_REVISION_PENDING',
        'RETURN_FINISHED',
        'RETURN_CANCELLED'
      ];

      if(this.product.status_key === 'CANCELLED') {
        if(!this.$props.product.origin_status || !this.$props.product.origin_status[0]) return 'CANCELLED';
        return {
          '03': 'CANCELLED',
          '04': 'REPLACED',
          '05': 'NO_STOCK',
          '07': 'MPC'
        }[this.$props.product.origin_status[0].status] || 'CANCELLED'
      }
      else if (returnStateList.includes(this.product.status_key)) {
        return this.product.status_key;
      }
      else {
        if(this.$props.editable) {
          return 'EDITABLE'
        }
        return 'NONE'
      }
    }
  },
  methods: {
    emitModifyProduct () {
      this.$root.$emit('propose_change_product', this.product)
    },
    getModifiedQuantity () {
      return this.modified_quantity;
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../assets/variables.less';
.order_product_tile {
  display: grid;
  grid-column-gap: 27px;
  grid-row-gap: 12px;
  grid-template-areas:
    'image description'
    'pum_label pum_value'
    'quantity_label quantity_value'
    'price_label price_value';
  grid-template-columns: 25% 1fr;
  font-size: 13px;
  color: #242424;
  line-height: 1.3;
  padding: 1rem 1rem 1.5rem 1rem;
  //max-width: 400px;
  margin: 0 auto;
  &:not(:last-of-type) {
    border-bottom: solid 1px #e1e1e1;
  }
  &-image {
    grid-area: image;
    text-align: right;
    img , svg{
      width: 80px;
      height: auto;
    }
  }
  &-description {
    grid-area: description;
  }
  &-pum_label {
    grid-area: pum_label;
  }
  &-pum_value {
    grid-area: pum_value;
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 6px;
    > span {
      justify-self: left;
    }
  }
  &-quantity_label {
    grid-area: quantity_label;
  }
  &-quantity_value {
    grid-area: quantity_value;
  }
  &-price_label {
    grid-area: price_label;
  }
  &-price_value {
    grid-area: price_value;
  }
  &-label {
   // padding: 0.5rem 0;
    text-align: right;
    align-self: center;
    font-size: 11px;
    font-weight: 500;
  }
  &-value {
    align-self: center;
  }
  &-variant {
    font-size: 80%;
    line-height: 1.7;
    font-weight: 200;
    a{
      color: inherit;
    }
  }
  &-status {
    font-size: 80%;
    line-height: 1.7;
    font-weight: 200;
    color: red;
    a{
      color: inherit;
    }
  }
}

@media @m-up, @print  {
  .order_product_tile {
    grid-template-columns: 80px 1fr 100px 100px 100px;
    grid-column-gap: 1rem;
    grid-template-areas:
      'image description pum_value quantity_value price_value'
      'offers offers offers offers offers';
    max-width: initial;
    padding-bottom: 1rem;
    &-label {
      display: none;
    }
    &-value {
      text-align: center;
    }
    &-pum_value {
      > span {
        justify-self: center;
      }
    }
  }
}
@media @xl-up, @print {
  .order_product_tile {
    padding-left: 0;
    padding-right: 0;
    &-price_value {
      text-align:right;
    }
  }
}
</style>
