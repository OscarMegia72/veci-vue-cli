<template>
<modal-action-message :custom="'_select_payment_methods'" :title="$t('payment.modal.selector_title')" >
    <template slot="header">
      <div class="select_payment_methods-header">
        <div>
          {{ $t('payment.method') }}
        </div>
        <div>
          <button @click="close"><i class="icon cross _xxl"></i></button>
        </div>
      </div>
    </template>
    <template slot="body">
      <div class="select_payment_methods-container">
      <payment-method v-for="(payment_method,idx) in payment_methods"
                    :key="'payment_method' + idx"
                    :payment_method="payment_method"
                    :class="[{'_selected': false}]"
                    @select="onPaymentMethodSelect"/>
      </div>
    </template>
    <template slot="footer">
      <div class="modal_addresses-footer">
        <button-set :type="'_ok'">
          <template slot="ok" >
            <reactive-button :type="'button _primary _cta'" @click="acceptHandler" :disabled="!selected">Seleccionar medio de pago</reactive-button>
          </template>
        </button-set>
      </div>
    </template>
</modal-action-message>
</template>

<script>
import ModalActionMessage from './ModalActionMessage.vue';
import SelectPaymentMethodTile from '../tiles/SelectPaymentMethodTile.vue';
import ButtonSet from '../layouts/ButtonSet.vue';
import ReactiveButton from '../blocks/ReactiveButton.vue';




export default {
  props: {
    payment_methods: {
      type: Array,
      default: []
    }
  },
  components: {
    'modal-action-message': ModalActionMessage,
    'payment-method': SelectPaymentMethodTile,
    'button-set': ButtonSet,
    'reactive-button': ReactiveButton
  },
  methods: {
    onPaymentMethodSelect: function(id) {
      this.selected = true;
      this.id = id;
    },
    acceptHandler: function() {
      this.$emit('accept', this.id);
    },
    close: function() {
      this.$emit('close');
    },
  },
  data() {
    return {
      id_selected: null,
      selected: false
    }
  }

}
</script>

<style lang="less">
  @import '../../assets/variables.less';
  .select_payment_methods {
    &-header{
      display: flex;
      > *:nth-child(1) {
        flex: 1 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
      }
      > *:nth-child(2) {
        flex: 0 1 50px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: 22px;
        color: #484848;
      }
    }
    &-container {
      max-height: 300px;
      overflow-y: auto;
      > * {
        border-bottom: solid 1px #f0f0f0;
        border-top: solid 1px #F0F0F0;
        padding: 1rem 0;
      }
    }
  }
  @media @l-up {
    .select_payment_methods {
      &-header{
        > *:nth-child(1) {
          font-size: 22px;
        }
      }
      &-container {
        max-width: 550px;
        margin: 2rem auto;
      }
    }
  }
</style>