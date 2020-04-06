<template>
  <div :class="['the_options', {'_opened': opened}]">
    <div class="the_options-header" @click="togglePanel()">
      <span>{{ $t('order_detail.ui.order_options')}}</span>
      <button :class="[{'_opened':opened}]">
        <i :class="[{'icon kebab':!opened}, {'icon cross': opened}]"></i>
      </button>
    </div>
    <div :class="['the_options-body', {'_opened': opened}]">
      <eci-button v-if="is_cancelable" :type="'_link _alt'" @click="emitCancel">
        {{ $t('order_detail.ui.order_options.controls.cancel_order')}}
      </eci-button>
      <eci-button v-if="has_invoice" :type="'_link _alt'" @click="emitInvoice">
        {{ $t('order_detail.ui.order_options.controls.require_invoice')}}
      </eci-button>
      <eci-link :href="print_url" :title="$t('order_detail.ui.order_options.controls.print')" :target="$vue_conf.is_app?'_self':'_blank'" :type="'_link _alt ts-print-order-details'">{{ $t('order_detail.ui.order_options.controls.print')}}</eci-link>
      <template v-if="is_returnable">
        <eci-link :href="refund_url" :title="$t('order_detail.ui.order_options.controls.refund')" :target="'_self'" :type="'_link _alt ts-refund-order-details'">
            {{ $t('order_detail.ui.order_options.controls.refund') }}
        </eci-link>
      </template>
    </div>
  </div>
</template>

<script>
import Button from '../blocks/Button.vue';
import Link from '../blocks/Link.vue';


export default {
  components: {
    'eci-button': Button,
    'eci-link': Link
  },
  props: {
    is_primeriti_order: {
      type: Boolean,
      default: false
    },
    has_invoice: {
      type: Boolean,
      default: false
    },
    is_returnable: {
      type: Boolean,
      default: true
    },
    is_cancelable: {
      type: Boolean,
      default: false
    },
    is_modificable: {
      type: Boolean,
      default: false
    },
    print_url: {
      type: String,
    },
    refund_url: {
      type: String
    }
  },
  data() {
    return {
      opened: false
    };
  },
  methods: {
    togglePanel: function() {
      this.opened = !this.opened;
    },
    emitInvoice: function() {
      this.$emit('do-get-invoices');
    },
    emitCancel: function() {
      this.$emit('do-cancel');
    },
    emitModify: function() {
      this.$emit('do-modify');
    },
    emitPrint: function() {
      this.$emit('do-print');
    },
    emitRefund: function() {
      this.$emit('do-refund');
    }
  }
};
</script>

<style lang="less">
@import '../../assets/variables.less';
.the_options {
  background-color: #FFF;
  border-top: solid 1px #FAFAFA;
  border-bottom: solid 1px #FAFAFA;
  &-header {
    display: grid;
    height: 60px;
    font-size: 13px;
    font-weight: 500;
    grid-template-columns: 1fr 60px;
    width: 100%;
    padding: 1rem 0;
    align-items: center;
    justify-items: center;
    text-transform: uppercase;
    cursor: pointer;
    background-color: #FFF;
    border-bottom: 1px solid #E1E1E1;
    button {
      .reset-button();
      align-self: center;
      justify-self: center;
      &._opened{
        transform: rotate(-180deg);
      }
    }
    ._opened & {
      background-color: #FAFAFA;
    }
    i {
      font-size: 22px;
      color: #242424;
    }
  }

  &-body {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    max-height: 0;
    overflow: hidden;
    max-height: 0;
    transition: all 0.3s ease-in-out;
    border-bottom: solid 1px transparent;
    &._opened {
      max-height: 500px;
      border-bottom-color: #FAFAFA;
    }
    > * {
      padding: 1rem;
      width: 100% !important;
      text-align: center !important;
    }
  }
}

@media @m-up {
  .the_options {
    &-header {
      display: none;
    }
    &-body {
      max-height: initial;
      display: flex;
      flex-direction: row;
      padding: 1rem;
      > * {
        flex: 0 0;
        padding: 0 1rem;
      }
      > button {
        &:not(:last-of-type) {
          border-bottom: none !important;
        }
      }
    }
  }
}
</style>
