<template>
  <div :class="['v_mini_resume', {'_without_address': !address}]">
    <div v-if="address" class="v_mini_resume-block v_mini_resume-address">
      <div class="v_mini_resume-title">
        <slot name="title_1">
          {{ $t('order_detail.mini_resume.title') }}
        </slot>
      </div>
      <div class="v_mini_resume-body">
        <p v-if="address.full_name">{{address.full_name}}</p>
        <p v-if="address.line1">{{address.line1}}</p>
        <p v-if="address.line2">{{address.line2}}</p>
        <p v-if="address.line3">{{address.line3}}</p>
        <p v-if="address.line4">{{address.line4}}</p>
        <eci-button v-if="address_modificable" @click="changeAddress" :type="'_link _cta'">{{ $t('order_detail.mini_resume.change_deliver_address') }}</eci-button>
      </div>
    </div>
    <div v-if="payments.length" class="v_mini_resume-block v_mini_resume-payment">
      <div class="v_mini_resume-title">
        <slot name="title_2">
          {{ $t('order_detail.mini_resume.payment_method') }}
        </slot>
      </div>
      <div class="v_mini_resume-body">
        <template v-if="payments.length < 2">
          <p>{{payments[0].method}}</p>
        </template>
        <template v-else>
          <ul>
            <li v-for="(payment, index) in payments" :key="index">
              <p>{{payment.method}}</p>
            </li>
          </ul>
        </template>
      </div>
    </div>
    <div v-if="amount" class="v_mini_resume-block v_mini_resume-amount">
      <div class="v_mini_resume-body">
        <slot name="body_3"> <eci-price :amount="amount" :important=true :size=24 :decimal_character="'.'" ></eci-price>  </slot>
      </div>
    </div>
  </div>
</template>

<script>
import Price from '../common/Price.vue';
import Button from '../blocks/Button.vue';

export default {
  components: {
    'eci-price': Price,
    'eci-button': Button
  },
  props: {
    'address': {
      default: null
    },
    'payments': {
      type: Array,
      default: []
    },
    'amount': {
      default: null
    },
    'address_modificable': {
      default: false
    }
  },
  methods: {
    changeAddress () {
      this.$emit('click_change_address')
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../assets/variables.less';
.v_mini_resume {
  display: grid;
  grid-template-areas:
    'address'
    'payment'
    'amount';
  width: 100%;
  &._without_address {
    grid-template-areas:'payment'
                        'amount';
  }
  button {
    margin: .75rem 0;
  }

  &-address {
    grid-area: address;
  }
  &-payment {
    grid-area: payment;
  }
  &-amount {
    grid-area: amount;
    .v_mini_resume-body {
      text-align: center;
    }
  }
  &-title {
    font-size: 13px;
    font-weight: 800;
    text-transform: uppercase;
    color: #242424;
    padding: 1rem;
  }
  &-body {
    font-size: 13px;
    font-weight: 200;
    color: #242424;
    line-height: 1.6;
    padding: 0.75rem 1rem;
  }
}
@media @l-up, @print {
  .v_mini_resume {
    grid-template-areas: 'address payment'
                         'amount  amount';
    grid-template-columns: 6fr 6fr;
    grid-gap: 12px;
    &._without_address {
      grid-template-areas:'payment payment'
                          'amount  amount';
    }
    &-title{
      padding-left:0;
      padding-right: 0;
    }
    &-body{
      padding-left:0;
      padding-right: 0;
    }
    &-amount {
      .v_mini_resume-title {
        text-align: right;
      }
      .v_mini_resume-body {
        text-align: right;
      }
    }
  }
}
</style>
