<template>
  <div class="select_payment_method_tile">
    <div class="select_payment_method_tile-item-logo">
        <img :src="_logo" :alt="payment_method.type">
    </div>
    <div class="select_payment_method_tile-item">
        <div style="">
            <eci-radio
              :group="'payment_methods'"
              :custom_id="payment_method.id"
              @change="$emit('select', payment_method.id)">
              <div>
                  <eci-text :type="'_xxs _semi _24 mb'">{{payment_method.alias}}</eci-text>
                  <eci-text :type="'_xs _light _24'">{{payment_method.description}}</eci-text>
                  <eci-text :type="'_xs _light _24'">{{payment_method.masked_number}}</eci-text>
              </div>
            </eci-radio>
        </div>
        <div v-if="shoudShowTags" class="select_payment_method_tile-tag">
            <template v-for="tag in payment_method.labels" :v-bind="label">
                <p>{{tag}}</p>
            </template>
        </div>
    </div>
  </div>
</template>

<script>
import Radio from '../blocks/Radio.vue';
import Text from '../blocks/Text.vue';

export default {
  props: ['payment_method'],
  components: {
    'eci-radio': Radio,
    'eci-text': Text,
  },
  computed: {
    _logo() {
      const { payment_method, $assets_base } = this;

      const logo =  {
        '022': 'pago_teci_80x80',
        '000': 'pago_visa_80x80',
        '001': 'pago_mastercard_80x80',
        '009': 'pago_paypal_80x80',
        '008': 'pago_maestro_80x80',
        '003': 'pago_amex_80x80',
      }[payment_method.method] || 'pago_generic-card_80x80';

      return `${$assets_base}/stylesheets/images/my_account/logos/cards/${logo}.svg`;
    },
    _tags() {
        return this.payment_method.tags;
    },
    shoudShowTags() {
        return !this.payment_method.tags.some(tag => tag === '');
    }
  },
  data() {
    return {
      masked_number : '',
      expiration_date: '',
    }
  },
}
</script>

<style lang="less">
  @import '../../assets/variables.less';

  .select_payment_method_tile {
    display: flex;
    padding-bottom: 14px;

    &-item {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      align-items: start;

      &-logo {
        display: flex;
        width: 70px;
        justify-content: center;

        > img {
            width: 70px;
        }
      }
    }
    &-tag {
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      align-items: center;
      height: 40px;
      margin-left: 44px;

      > p {
          margin: 0 10px 3px 0;
          padding: 5px 10px 15px;
          border-radius: 10px;
          font-size: 8px;
          height: 16px;
          background-color: #E7F0F7;
      }
    }
  }

  @media @l-up {
      .select_payment_method_tile {
        display: flex;
        justify-content: center;
        max-height: 96px;

        &-item {
          flex-direction: row;
          align-items: center;
          display: flex;
          min-width: 355px;

          &-logo {
            display: flex;
            min-width: 150px;
            justify-content: left;

            > img {
                width: 80px;
            }
          }
        }
        &-tag {
          text-align: center;
          justify-content: space-evenly;
          flex-direction: column;
          align-items: center;
          > p {
              padding: 5px 10px 15px;
              border-radius: 10px;
              font-size: 8px;
              height: 16px;
              background-color: #E7F0F7;
          }
        }
      }
  }

</style>
