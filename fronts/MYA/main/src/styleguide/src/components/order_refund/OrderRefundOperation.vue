<template>
  <div class="refund_operation">
    <eci-separator :tag="'h3'" :class="'_grey mb'">
      <eci-text :type="'_m _48 _l14 _light _xl-xl-up tc'">
        {{ $t('order_detail.refund.subtitle') }}
      </eci-text>
    </eci-separator>
    <div class="refund_operation-disclaimer">
      <eci-text :type="'_xxs _48 tr'">
        {{ $t('order_detail.refund.disclaimer') }}
      </eci-text>
    </div>

    <div class="refund_operation-list">
      <template v-for="product in products">
        <order-refund-product-tile :editable="editable" :product="product" />
      </template>
    </div>

    <eci-separator :tag="'h3'" :class="'_grey mb'">
      <eci-text :type="'_m _48 _l14 _light _xl-xl-up tc'">
        {{ $t('order_detail.refund.picking_options') }}
      </eci-text>
    </eci-separator>
    <order-refund-address-tile />
    <div class="refund_operation-packages">
      <div>
        <eci-text :type="'_s _24 _l14'">{{ $t('order_detail.refund.number_of_packages') }}</eci-text>
      </div>
      <div>
        <stepper :value="packages" :min="1" @input="changePackages" />
      </div>
    </div>
    <freerefund-block v-if="!order.hiddenFooterReturnInCenters" />
    <div class="p1">
      <button-set :type="'_ok'">
        <template slot="ok">
          <v-button :type="'_button _primary _cta ts-order-refund-step1'" v-on:click="onContinue" :disabled="!_form_is_filled">{{ $t('generic.continue') }}</v-button>
        </template>
      </button-set>
    </div>
  </div>
</template>

<script>

import OrderRefundProductTile from './OrderRefundProductTile.vue';
import OrderRefundAddressTile from './OrderRefundAddressTile.vue';
import ButtonSet from '../layouts/ButtonSet.vue';
import Button from '../blocks/Button.vue';
import Link from '../blocks/Link.vue';
import Stepper from '../blocks/Stepper.vue';
import Separator from '../common/Separator.vue';
import Text from '../blocks/Text.vue';
import FreeRefundBlock from '../FreeRefundBlock.vue';

export default {
  blockStatuses : ['CANCELLED','TRANSFERRED', 'PAYMENT_DENIED'],
  components: {
    'order-refund-product-tile': OrderRefundProductTile,
    'order-refund-address-tile': OrderRefundAddressTile,
    'v-button': Button,
    'v-link': Link,
    'button-set': ButtonSet,
    'stepper': Stepper,
    'eci-separator': Separator,
    'eci-text': Text,
    'freerefund-block': FreeRefundBlock
  },
  data () {
    return {
      editable: true,
      vue_conf: global.vue_conf
    }
  },
  computed: {
    packages() {
      return this.$store.state.packages;
    },
    products() {
      return this.$store.state.products;
    },
    order() {
      return this.$store.state.order;
    },
    _form_is_filled() {
      const {$store} = this;
      return $store.getters.selectedProducts.filter(p => {
        return p.selected && p.reason && p.reason !== "0" && $store.getters.getSelectedAddress;
      }).length
    }
  },
  methods: {
    onContinue() {
      this.$emit('onContinue');
    },
    changePackages(newValue, curValue) {
      this.$store.commit('changePackages', newValue);
    },
  }
};

</script>

<style lang="less">
@import '../../assets/variables.less';

.refund_operation {
  &-disclaimer {
    padding: 1em;
    border-bottom: solid 1px #E1E1E1;
  }
  &-packages {
    display: flex;
    flex-direction: column;
    padding: 1rem;

    >div:first-of-type {
      margin-bottom: 1em;
      text-align: center;
    }
    >div:last-of-type {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

@media @m-up {
  .refund_operation {
    &-packages {
      flex-direction: row;
      padding: 2rem;
      > div {
        flex: 1 1 50%;
      }
      >div:first-of-type {
        margin-bottom: 0;
        padding-right: .5rem;
        text-align: right;
        align-self: center;
      }
      >div:last-of-type {
        padding-left: .5rem;
        justify-content: flex-start;
      }

    }
  }
}

/*
.operation {
  &-header {
    border-top: solid 1px #f0f0f0;
    color: #242424;
    font-weight: 200;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas: "name";
    &._cancelable {
      grid-template-areas: "name"
                           "cancel";
      grid-template-rows: auto 70px;
    }
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
    font-size: 18px;
    display: block;
    padding: .5rem;
    text-align: center;
  }
  &-number {
    font-size: 14px;
    display: block;
    text-align: center;
    padding: 0 1.5rem;
  }
  &-warn {
    color: #7d7d7d;
    font-size: 11px;
    display: block;
    text-align: right;
    padding: 1em;
    border-bottom: solid 1px #e1e1e1;
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
    grid-area: cancel;
    .reset-button();
    background-color: #484848;
    color: #F8F8F8;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    i + span {
      margin-left: 1rem;
      font-size: 13px;
    }
    &:before{
      content: "";
      width: 15px;
      height: 15px;
      transform: rotate(45deg);
      background-color: #484848;
      color: #F0F0F0;
      position: absolute;
      top: -5px;
      left: ~"calc(50% - 5px)";
      //left: -4px;
      //top: ~"calc(50% - 5px)";
    }
    i{
      font-size: 24px;
      color: inherit;
    }
    .print &{
      display: none;
    }
  }
  &-table_header{
    display: none;
  }
}
.refund-product-tile {
  display: grid;
  grid-column-gap: 27px;
  grid-row-gap: 12px;
  grid-template-areas:
    'checkbox image labels values';
  grid-template-columns: 50px 1fr 1fr;

  &-select {
    grid-area: checkbox;
  }

  &-product-info {
    grid-area: image;
  }

  &-labels {
    grid-area: labels;
  }

  &-values {
    grid-area: values;
  }
}

.refund-footer-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.8fr 0.6fr 0.5fr 0.5fr 1fr;
  grid-template-areas: "footer_logo" "footer_title" "footer_text" "footer_empty" "footer_button";
  text-align: center;
  align-items: center;
  padding: 2em;
}

.footer_logo {
  grid-area: footer_logo;
}

.footer_title {
  grid-area: footer_title;
  font-weight: bold;
  font-size: 19px;

  &-return-title {
    color: #008c2e;
  }
}

.footer_text {
  grid-area: footer_text;
  font-size: 14px;
  font-weight: 300;
  color: #2e2e2e;
  a {
    color: @brand_color;
  }
}

.footer_empty {
  grid-area: footer_empty;
}

.footer_button {
  grid-area: footer_button;
}

.refund-continue-button {
  min-width: 350px !important;
}


.section-title {
  height: 96px;
  background: #f9f9f9;
  text-align: center;
  color: #484848;
  font-size: 20px;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: ".";
}

.packages {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "packages_label packages_value";
  text-align: center;
  padding: 2em;
  align-items: center;

  &_label {
    font-size: 14px;
    grid-area: packages_label;
  }

  &_amount {
    grid-area: packages_value;
  }
}

@media @l-up, @print {
  .operation {
    &-header{
      &._cancelable {
        grid-template-columns: 1fr 90px;
        grid-template-areas: "name cancel";
        grid-template-rows: 1fr;
      }
    }
    &-cancel_button{
      i + span {
        display: none;
      }
      &:before{
        left: -4px;
        top: ~"calc(50% - 5px)";
      }
      i{
        font-size: 22px;
      }
    }
    &-table_header{
      display: grid;
      grid-template-columns: 150px 100px 100px;
      justify-items: end;
      grid-column-gap: .8rem;
      padding: 0 2rem;
      justify-content: end;
      >div{
        padding: 1rem;
      }
    }
  }
}

@media @xl-up, @print {
  .operation {
    &-header{
      grid-template-columns: 1fr;
      &._cancelable {
        grid-template-columns: 1fr 122px;
      }
    }
    &-name {
      font-size: 22px;
    }
    &-number {
      font-size: 16px;
    }
    &-warn {
      margin: 0 2em;
      font-size: 11px;
    }
    &-products {
      padding: 0 2rem;
    }
    &-mini_resume {
      padding: 0 2rem 1rem 2rem;
    }
    &-tracking{
      padding: 0;
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
    &-header{
      &._cancelable {
        grid-template-columns: 1fr;
      }
    }
  }
}

@media all and (-ms-high-contrast:none) {
  .operation-table_header  {
    display: flex;
  }
}
*/
</style>
