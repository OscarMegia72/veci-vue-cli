<template>
  <div>
    <div>
        <template v-if="showForm">
          <order-refund-operation
            :single_operation="order.transactions.length === 1"
            :order_id="order.external_id"
            @onContinue="onShowSummary"
          />
        </template>
        <template v-else-if="showSummary">
          <order-refund-summary @closeSummary="onCloseSummary" @onContinue="onConfirmRefund" />
        </template>
    </div>
    <modal-action-message ref="error_message" v-if="current_modal==='ERROR_MESSAGE'"
      v-show="current_modal==='ERROR_MESSAGE'"
      :title="'Error'"
      :message="$t('order_detail.modals.change_address.error.generic')"
      :buttons="'OK'"
      :type="'ERROR'"
      :accept_text="$t('order_detail.modals.cancel_order_result.accept_text')"
      @close="acceptError"
      @accept="acceptError">
    </modal-action-message>
  </div>
</template>

<script>
import ModalActionMessage from '../modals/ModalActionMessage.vue';
import OrderRefundOperation from './OrderRefundOperation.vue';
import OrderRefundSummary from './OrderRefundSummary.vue';

let uri = window.location.search.substring(1);
let params = new URLSearchParams(uri);


export default {
  components: {
    'order-refund-operation': OrderRefundOperation,
    'order-refund-summary': OrderRefundSummary,
    'modal-action-message': ModalActionMessage,
  },
  props: {
    order: {
      default: function() {
        return {
          date: {},
          total: {},
          discounts: [],
          transactions: []
        }
      }
    }
  },
  data() {
    return {
      invoices: [],
      print_mode: false,
      showForm: true,
      showSummary: false,
      current_modal: '',
    };
  },
  methods: {
    onShowSummary() {
      this.showForm = false;
      this.showSummary = true;
    },

    onCloseSummary() {
      this.showForm = true;
      this.showSummary = false;
    },
    async onConfirmRefund() {
      const { $rest } = this;
      const {order, packages, address} = this.$store.state;
      const finalProducts = this.$store.getters.finalProducts;
      const refundData = {
        address,
        packages,
        order: order,
        transactions: order.transactions.map(transaction => {
            transaction.lineItems = transaction.order_lines.map(productId => {
                return finalProducts.find(prod => prod.productInfo._id === productId)
            }).filter(p => p);
            return transaction;
        })
      };

      try {
        const response = await $rest.postP('/api/user/orders_api/return-product', refundData)
        window.location.href = order.order_url;
      } catch(err) {
        this.current_modal = 'ERROR_MESSAGE';
        console.error('Error performing refund:', err)
      }

      this.showForm = true;
      this.showSummary = false;
    },
    acceptError() {
      window.location.href = this.$store.state.order.order_url;
    }
  }
};
</script>

<style>
</style>
