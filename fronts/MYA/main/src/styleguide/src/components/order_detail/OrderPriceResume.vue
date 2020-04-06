<template>
  <div class="price_resume">
  <template v-for="(line, index) in lines" >
    <div class="price_resume-line" :key="line.index">
      <div>{{ $t('order_detail.price_resume.total_operation') }} #{{index + 1}}</div>
      <div><price :amount="line.amount" :important=true :size=18 :decimal_character="'.'"></price></div>
    </div>
  </template>
  <template v-for="(ship, idx) in shipping">
    <div :key="'shipping' + idx" class="price_resume-line" v-if="ship.amount">
      <div>{{ship.description || $t('order_detail.price_resume.shipping_cost') }}</div>
      <div><price :amount="ship.amount" :important=true :size=18 :decimal_character="'.'"></price></div>
    </div>
  </template>
  <template v-for="(discount, idx) in discounts" >
    <div :key="'discount' + idx" class="price_resume-line _special">
      <div>{{discount.comments || $t('order_detail.price_resume.promotion_pass') }}</div>
      <div><price :style="{color: '#008C2E'}" :amount="`-${discount.amount}`" :important=true :size=18 :decimal_character="'.'"></price></div>
    </div>
  </template>
  <div class="price_resume-line _total">
    <div>{{ $t('order_detail.price_resume.total_amount') }}:</div>
    <div><price :amount="total.amount" :important=true :size=32 :decimal_character="'.'" ></price></div>
  </div>
</div>
</template>

<script>
import Price from '../common/Price.vue';


export default {
  components: {
    'price': Price
  },
  props: {
    lines: {
      default: function(){
        return []
      }
    },
    discounts: {
      default: function() {
        return []
      }
    },
    shipping: {
      default: function() { return []}
    },
    total: {
      default: () => {
        return {
          amount: '0'
        };
      }
    }
  }
};
</script>

<style lang="less">
@import '../../assets/variables.less';
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
@media @l-up, @print {
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
