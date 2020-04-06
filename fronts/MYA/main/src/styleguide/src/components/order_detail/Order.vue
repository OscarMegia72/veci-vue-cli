<template>
  <div>
    <div class="order">
        <order-header
          :class="'order-header'"
          :logo="_image_source"
          :order_id="order.external_id"
          :date="order.date.purchase_human_date"
        />

        <order-options v-if="!print_mode"
          :has_invoice="Boolean(order.invoice_info && order.invoice_info.length)"
          :is_cancelable="order.is_full_cancellable && !!_has_user"
          :is_primeriti_order="order.isPrimeritiOrder"
          :is_returnable="_is_returnable"
          :print_url="order.print_url"
          :refund_url="order.refund_url"
          @do-get-invoices="showInvoicesModal"
          @do-cancel="cancelOrder"
        />

        <template v-for="(transaction, idx) in order.transactions">
          <div :key="idx">
            <order-operation
              :operation="transaction"
              :index="idx + 1"
              :single_operation="order.transactions.length === 1"
              :order_id="order.external_id" />
          </div>
        </template>

        <div class="pb" :style="'background-color: #FAFAFA'">
          <eci-separator :tag="'h3'" :class="'_grey'">
            <eci-text :type="'_l _24 _semi _xl-xl-up tc'">
              {{ $t('order_detail.transaction_summary') }}
            </eci-text>
          </eci-separator>
          <order-mini-resume
            :address_modificable="false"
            :address="order.billing_address"
            :class="'order-mini_resume mb2'"
            :payments="order.payments"
            :amount="order.total.total_amount_plus_shipping"
            >
            <template slot="body_3">
              <price-resume style="padding:0"
                :lines="_lines"
                :discounts="order.discounts"
                :total="{'amount':order.total_paid_amount + order.total.total_shipping_amount}"
                :shipping="_shipping || {}"
              />
            </template>
          </order-mini-resume>
          <template v-if="order.transactions[0].codebar && order.transactions.length === 1">
            <eci-text :tag="'p'" :type="'_xs _light _48 tc'">{{ $t('order_detail.control_code.title') }}: {{order.transactions[0].control_code}}</eci-text>
            <eci-qrcode class="operation-code" :value="order.transactions[0].codebar" :width="1.3"></eci-qrcode>
            <eci-text :type="'_xs _48 mb tc'">{{order.transactions[0].codebar}}</eci-text>
            <eci-text :type="'_xs _semi _brand tc mb pl pr'">{{ $t('order_detail.control_code.message') }}</eci-text>
          </template>
        </div>
    </div>

    <div v-if="!_has_user && !no_order_error && !loading" class="order-non_user_block">
      <eci-separator :tag="'h3'" :class="'_type_2'">
        {{ $t('order_detail.no_user_account')}}
      </eci-separator>
      <non-user-block/>
    </div>

    <modal-action-message ref="invoices" v-if="current_modal==='INVOICES'"
      @close="current_modal= ''"
      v-show="current_modal==='INVOICES'"
      :title="$t('order_detail.modals.download_invoices.title')"
      @accept="current_modal= ''"
      :type="'OK'"
      :buttons="'OK'"
      :accept_text="$t('close')"
      >
      <template slot="body">
        <p class="tc mb">{{ $t('order_detail.order_number')}} <b>{{order.external_id}}</b> {{ $t('order_detail.invoice_info_text_1')}} {{order.invoice_info.length}} {{ $t('order_detail.invoice_info_text_2')}}</p>
        <template v-for="invoice in order.invoice_info">
          <invoice-tile
          :invoice="invoice"
          :key="invoice.order_number"/>
        </template>
      </template>
    </modal-action-message>

   <!-- <modal-action-message ref="cancel_proposal" v-if="current_modal==='CANCEL_PROPOSAL'"
      @close="current_modal= ''"
      v-show="current_modal==='CANCEL_PROPOSAL'"
      :type="'WARNING'"
      :buttons="'OK_CANCEL'"
      :show_cross="false"
      :title="$t('order_detail.modals.cancel_order.title')"
      :message="$t('order_detail.modals.cancel_order.message', {external_id:this.order.external_id})"
      :accept_text="$t('order_detail.modals.cancel_order.accept_text')"
      :cancel_text="$t('order_detail.modals.cancel_order.cancel_text')"
      @accept="confirmCancelOrder"
      @cancel="current_modal= ''"
      >
    </modal-action-message> -->
    <modal-message ref="cancel_proposal" v-if="current_modal==='CANCEL_PROPOSAL'"
      @close="current_modal= ''"
      v-show="current_modal==='CANCEL_PROPOSAL'"
      :type="'WARNING'"
      :buttons="'OK_CANCEL'"
      :title="$t('order_detail.modals.cancel_order.title')"
      :message="$t('order_detail.modals.cancel_order.message', {external_id:this.order.external_id})"
      :accept_text="$t('order_detail.modals.cancel_order.accept_text')"
      :cancel_text="$t('order_detail.modals.cancel_order.cancel_text')"
      @accept="confirmCancelOrder"
      @cancel="current_modal= ''">
    </modal-message>

   <!-- <modal-action-message ref="working" v-if="current_modal==='WORKING'"
      v-show="current_modal==='WORKING'"
      :buttons="'NONE'"
      :show_cross="false"
      >
      <template slot="body">
        <div class="order-loading">{{ $t('order_detail.order_loading')}}</div>
      </template>
    </modal-action-message>-->
    <modal-static ref="working" v-if="current_modal==='WORKING'"
      v-show="current_modal==='WORKING'">
        <div class="order-loading">{{ $t('order_detail.order_loading')}}</div>
    </modal-static>



    <!--<modal-action-message ref="cancel_order_proposal" v-if="current_modal==='CANCEL_TRANSACTION_PROPOSAL'"
      @close="current_modal= ''"
      v-show="current_modal==='CANCEL_TRANSACTION_PROPOSAL'"
      :type="'WARNING'"
      :buttons="'OK_CANCEL'"
      :show_cross="false"
      :title="$t('order_detail.modals.cancel_transaction.title')"
      :message="$t('order_detail.modals.cancel_transaction.message', {transaction_id:_transaction_order_id})"
      :accept_text="$t('order_detail.modals.cancel_transaction.accept_text')"
      :cancel_text="$t('order_detail.modals.cancel_transaction.cancel_text')"
      @accept="confirmCancelOperation"
      @cancel="current_modal= ''"
    />-->
    <modal-message ref="cancel_order_proposal" v-if="current_modal==='CANCEL_TRANSACTION_PROPOSAL'"
      @close="current_modal= ''"
      v-show="current_modal==='CANCEL_TRANSACTION_PROPOSAL'"
      :type="'WARNING'"
      :buttons="'OK_CANCEL'"
      :title="$t('order_detail.modals.cancel_transaction.title')"
      :message="$t('order_detail.modals.cancel_transaction.message', {transaction_id:_transaction_order_id})"
      :accept_text="$t('order_detail.modals.cancel_transaction.accept_text')"
      :cancel_text="$t('order_detail.modals.cancel_transaction.cancel_text')"
      @accept="confirmCancelOperation"
      @cancel="current_modal= ''"
    />


   <!-- <modal-action-message ref="cancel_modal_result" v-if="current_modal==='CANCEL_RESULT'"
      @close="reload"
      v-show="current_modal==='CANCEL_RESULT'"
      :title="$t('order_detail.modals.cancel_order_result.title')"
      :type="cancelResult.every(r => r['@ExecuteAction'] == 'Y') == true ? 'OK': 'ERROR'"
      :buttons="'OK'"
      :show_cross="false"
      :accept_text="$t('order_detail.modals.cancel_order_result.accept_text')"
      @accept="reload">
      <template slot="body">
        <div class="order_cancel_result">
          <div>
            <template v-if="cancelResult.every(r => r['@ExecuteAction'] == 'Y')">
              <p>{{ $t('order_detail.modals.cancel_order_result.message.done')}}</p>
            </template>
            <template v-else-if="cancelResult.every(r => r['@ExecuteAction'] == 'N')">
              <p v-html="$t('order_detail.modals.cancel_order_result.message.not_done', {external_id:order.external_id} )"></p>
            </template>
            <template v-else>
              <p>{{ $t('order_detail.modals.cancel_order_result.message.almost_done', {external_id:order.external_id}) }}</p>
            </template>
          </div>
          <div>
            <cancel-order-title
              v-for="(result, idx) in cancelResult"
              :key="'cancel' + idx"
              :idx="$t('order_detail.modals.cancel_order_result.operation_number', {index: idx + 1})"
              :id="result.id"
              :icon="result['@ExecuteAction'] == 'Y' ? 'check':'cross'"
            />
          </div>
        </div>
      </template>
    </modal-action-message> -->

    <modal-action ref="cancel_modal_result" v-if="current_modal==='CANCEL_RESULT'"
      @close="reload"
      v-show="current_modal==='CANCEL_RESULT'"
      :has_cross="true">
      <eci-text :tag="'h3'" :type="'_l _24 _xl-l-up tc pb'"> {{ $t('order_detail.modals.cancel_order_result.title') }} </eci-text>
      <div class="order_cancel_result">
        <div>
          <template v-if="cancelResult.every(r => r['@ExecuteAction'] == 'Y')">
            <p>{{ $t('order_detail.modals.cancel_order_result.message.done')}}</p>
          </template>
          <template v-else-if="cancelResult.every(r => r['@ExecuteAction'] == 'N')">
            <p v-html="$t('order_detail.modals.cancel_order_result.message.not_done', {external_id:order.external_id} )"></p>
          </template>
          <template v-else>
            <p>{{ $t('order_detail.modals.cancel_order_result.message.almost_done', {external_id:order.external_id}) }}</p>
          </template>
        </div>
        <div>
          <cancel-order-title
            v-for="(result, idx) in cancelResult"
            :key="'cancel' + idx"
            :idx="$t('order_detail.modals.cancel_order_result.operation_number', {index: idx + 1})"
            :id="result.id"
            :icon="result['@ExecuteAction'] == 'Y' ? 'check':'cross'"
          />
        </div>
      </div>
    </modal-action>

    <modal-tracking ref="seur_modal" v-if="current_modal==='SEUR_TRACKING'"
      v-show="current_modal==='SEUR_TRACKING'"
      @close="current_modal = ''"
      :tracking_data="tracking_data"
    />

    <modal-tracking ref="paack_modal" v-if="current_modal==='PAACK_TRACKING'"
      v-show="current_modal==='PAACK_TRACKING'"
      @close="current_modal = ''"
      :tracking_data="tracking_data"
    />

    <modal-select-address v-if="current_modal === 'CHANGE_ADDRESS_PROPOSAL'" ref="select_address_modal"
      @close="current_modal =''"
      @accept="changeAddress"
      :filter="address_filter"
      v-show="current_modal === 'CHANGE_ADDRESS_PROPOSAL'"
    />

    <!--<modal-action-message v-if="current_modal==='CHANGE_ADDRESS_RESULT'" ref="select_address_modal_result"
      @close="reload"
      v-show="current_modal==='CHANGE_ADDRESS_RESULT'"
      :title="$t('order_detail.modals.change_address_result.title')"
      @accept="reload"
      :type="change_address_result === 'OK' ? 'OK' : 'ERROR'"
      :buttons="'OK'"
      :message="change_address_result === 'OK' ? $t('order_detail.modals.change_address_result.message.done')
                                               : $t('order_detail.modals.change_address_result.message.not_done')"
    />-->

    <modal-message v-if="current_modal==='CHANGE_ADDRESS_RESULT'" ref="select_address_modal_result"
      @close="reload"
      v-show="current_modal==='CHANGE_ADDRESS_RESULT'"
      :title="$t('order_detail.modals.change_address_result.title')"
      @accept="reload"
      :type="change_address_result === 'OK' ? 'OK' : 'ERROR'"
      :buttons="'OK'"
      :message="change_address_result === 'OK' ? $t('order_detail.modals.change_address_result.message.done')
                                               : $t('order_detail.modals.change_address_result.message.not_done')"
    />




    <modal-change-quantity v-if="current_modal==='CHANGE_PRODUCT_PROPOSAL'" ref="change_product_proposal"
      v-show="current_modal === 'CHANGE_PRODUCT_PROPOSAL'"
      @close="current_modal = ''"
      @accept="modifyProduct"
      @deleteProduct="modifyProduct(0)"
      :product="proposed_product"
    />

    <modal-action-message v-if="current_modal==='CHANGE_PRODUCT_RESULT'" ref="change_product_result"
      @close="reload"
      v-show="current_modal==='CHANGE_PRODUCT_RESULT'"
      :title="$t('order_detail.modals.modify_delete_product.title')"
      @accept="reload"
      :type="change_product_result === 'OK' ? 'OK' : 'ERROR'"
      :buttons="'OK'"
      :message="change_product_result === 'OK' ? $t('order_detail.modals.modify_product.message.done')
                                               : $t('order_detail.modals.modify_product.message.not_done')"
    />

    <modal-action-message ref="error_message" v-if="current_modal==='ERROR_MESSAGE'"
      @close="current_modal = ''"
      v-show="current_modal==='ERROR_MESSAGE'"
      :title="'Error'"
      :message="'Se ha producido un error en la petición. Por favor, inténtelo más tarde.'"
      :buttons="'OK'"
      :type="'ERROR'"
      :accept_text="$t('order_detail.modals.cancel_order_result.accept_text')"
      @accept="current_modal = ''">
    </modal-action-message>

  </div>
</template>

<script>
import OrderHeader from './OrderHeader.vue';
import OrderOptions from './OrderOptions.vue';
import OrderMiniResume from './OrderMiniResume.vue';
import OrderOperation from './OrderOperation.vue';
import InvoiceTile from '../tiles/InvoiceTile.vue';
import ModalActionMessage from '../modals/ModalActionMessage.vue';
import OrderPriceResume from './OrderPriceResume.vue';
import Separator from '../common/Separator.vue';
import NonUserBlock from '../NonUserBlock.vue';
import ModalTracking from '../modals/ModalTracking.vue';
import CancelOrderTile from '../tiles/CancelOrderTile.vue';
import ModalSelectAddress from '../modals/ModalSelectAddress.vue';
import ModalChangeProductQuantity from '../modals/ModalChangeProductQuantity.vue';
import Text from '../blocks/Text.vue';
import QrcodeVue from 'qrcode.vue';
import 'url-search-params-polyfill';
import ModalMessage from '../modals/ModalMessage.vue';
import ModalStatic from '../modals/ModalStatic.vue';
import ModalAction from '../modals/ModalAction.vue';




let uri = window.location.search.substring(1);
let params = new URLSearchParams(uri);

export default {
  components: {
    'order-header': OrderHeader,
    'order-options': OrderOptions,
    'order-mini-resume': OrderMiniResume,
    'order-operation': OrderOperation,
    'modal-action-message': ModalActionMessage,
    'invoice-tile': InvoiceTile,
    'price-resume':OrderPriceResume,
    'eci-separator':Separator,
    'non-user-block':NonUserBlock,
    'modal-tracking': ModalTracking,
    'cancel-order-title': CancelOrderTile,
    'modal-select-address': ModalSelectAddress,
    'modal-change-quantity': ModalChangeProductQuantity,
    'eci-qrcode': QrcodeVue,
    'eci-text': Text,
    'modal-message': ModalMessage,
    'modal-static': ModalStatic,
    'modal-action': ModalAction,

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
      addresses: [],
      current_modal: '',
      modal_title: '',
      invoices: [],
      loading: true,
      no_order_error: false,
      tracking_id: null,
      external_id: null,
      tracking_delivery: {},
      tracking_address: {},
      cancelResult : [],
      proposed_transaction_to_change: null,
      change_address_result:null,
      proposed_product: {},
      change_product_result: null,
      address_filter: {},
      print_mode: false,
      tracking_data: {}
    };
  },
  computed: {
    _is_returnable() {
      return this.order.is_returnable;
    },
    _lines() {
      if(!this.order) return [];
      return this.order.transactions.map((transaction,idx) => {
        return {
          id: idx +1,
          amount: transaction.total_products_amount
        }
      })
    },
    _shipping() {
      if(!this.order) return null;
      var shipping_cost = this.order.total.total_shipping_amount || null;
      if(shipping_cost !== null && shipping_cost != '0'){
        return [{
          amount: shipping_cost,
          description: this.$i18n.t('order_detail.ui.shipping_cost'),
          string_amount: shipping_cost.toString()
        }]
      }
      return null

    },
    _full_total(){
      if(!this.order) return null;
      var res =  this.order.total ? this.order.total.total_amount_plus_shipping
                                  : this.order.total_products_amount_plus_shipping
      return res;
    },
    _has_user() {
      return this.$cookie.get('oidc.sid')
    },
    _transaction_order_id () {
      if(!this.order._id) return null;
      if(!this.proposed_transaction_to_change) return null
      return this.order.transactions.filter(t => t._id === this.proposed_transaction_to_change)[0].transaction_id
    },
    _image_source() {
        if(!this.order) return null
        return this.order.image
    }
  },
  methods: {
    getOrderId: function() {
      var chunk = window.location.href.split('?')[0];
      if(chunk[chunk.length -1] !== '/'){
        chunk = chunk + '/'
      }
      var splits = chunk.split('/');
      return splits[splits.length - 2];
    },

    showInvoicesModal: function() {
      this.current_modal = 'INVOICES';
    },

    cancelOrder: function() {
      const {order} = this;
      //if(order && order.isPrimeritiOrder) return window.location.href=`https://postventa.primeriti.es/account/order/${this.order.external_id}`;
      this.current_modal = 'CANCEL_PROPOSAL';
    },

    cancelOperationProposal: function(id){
      //if(this.order && this.order.isPrimeritiOrder) return window.location.href=`https://postventa.primeriti.es/account/order/${this.order.external_id}`;
      this.proposed_transaction_to_change = id;
      this.current_modal = 'CANCEL_TRANSACTION_PROPOSAL'
    },

    confirmCancelOrder: function() {
      const { $rest } = this;
      //Generate data for cancel order
      var cancelData = this.order.transactions.map(t => {
        return {
          stl_enterprise_code:  t.stl_enterprise_code,
          stl_document_type:    t.stl_document_type,
          transaction_id:       t.transaction_id.replace(' ','').replace('-','').replace(' ',''),
          _id:                  t._id,
          }
        }
      )
      this.current_modal = 'WORKING';
      $rest.postP(`/api/${this.$i18n.locale}/delete-order-transaction`, cancelData)
      .then(result => {
        //Maybe we can get a 200 with an error on it
        this.cancelResult = Object.keys(result.data).map((key) => {
          if(result.data[key]['@ErrorCode']) {
            return {
              id: key,
              '@ErrorCode': result.data[key]['@ErrorCode'],
              '@ErrorMessage': result.data[key]['@ErrorMessage'],
              '@ExecuteAction': result.data[key]['@ExecuteAction'],
            }
          }else{
            return {
              id: key,
              '@ExecuteAction': 'Y',
            }
          }


        })
        this.current_modal = 'CANCEL_RESULT';

      })
      .catch(err => {
        this.current_modal = 'ERROR_MESSAGE';
      })
    },
    confirmCancelOperation: function(){
      const { $rest } = this;
      var transactionToCancel = this.order.transactions.filter(t => t._id === this.proposed_transaction_to_change)[0]
      var cancelData =  [{
        stl_enterprise_code:  transactionToCancel.stl_enterprise_code,
        stl_document_type:    transactionToCancel.stl_document_type,
        transaction_id:       transactionToCancel.transaction_id.replace(' ','').replace('-','').replace(' ',''),
        _id:                  transactionToCancel._id,
      }]
      this.current_modal = 'WORKING';
      $rest.postP(`/api/${this.$i18n.locale}/delete-order-transaction`, cancelData)
      .then(result => {
        //Maybe we can get a 200 with an error on it
        this.cancelResult = Object.keys(result.data).map((key) => {
          if(result.data[key]['@ErrorCode']) {
            return {
              id: key,
              '@ErrorCode': result.data[key]['@ErrorCode'],
              '@ErrorMessage': result.data[key]['@ErrorMessage'],
              '@ExecuteAction': result.data[key]['@ExecuteAction'],
            }
          }else{
            return {
              id: key,
              '@ExecuteAction': 'Y',
            }
          }
        })
        this.current_modal = 'CANCEL_RESULT';
      })
      .catch(err => {
        this.current_modal = 'ERROR_MESSAGE';
      })
    },

    showPaackTracking: function(trackingData) {
      this.tracking_data = trackingData;
      this.current_modal = 'PAACK_TRACKING'
    },

    showSeurTracking: function(trackingData) {
      this.tracking_data = trackingData;
      this.current_modal = 'SEUR_TRACKING';
    },

    closeSeurModal: function() {
      this.tracking_id = null;
      this.current_modal = ''
    },

    reload: function(){ window.location.reload(); },

    changeAddressProposal: function(id) {
      this.proposed_transaction_to_change = id;
      var operation = this.order.transactions.filter( t => t._id === id)[0];
      if(!operation) return
      var country = operation.shipping_address.line4
      var zipCode = operation.shipping_address.line3
      this.address_filter = {
        shipping_zone: {
          zip_code: zipCode,
          country: country ? country : 'no_country'
        }
      }
      this.current_modal = 'CHANGE_ADDRESS_PROPOSAL';
      //this.$refs.select_address_modal.initialize();
    },

    changeAddress: function(address_id) {
      const { $rest } = this;
      this.current_modal = 'WORKING';
      $rest.putP(`/api/user/es/order/${this.getOrderId()}/transaction/${this.proposed_transaction_to_change}/change-address?order_origin=${this.order.origin}`, {
        address_id: address_id,
        order_origin: this.order.origin,
      })
      .then(result => {
        this.change_address_result = 'OK'
        this.current_modal = 'CHANGE_ADDRESS_RESULT'
      })
      .catch(err => {
        this.change_address_result = 'KO'
        this.current_modal = 'CHANGE_ADDRESS_RESULT'
      })
    },

    modifyProductProposal: function(product){
      this.proposed_product = product
      this.current_modal = 'CHANGE_PRODUCT_PROPOSAL'
    },

    modifyProduct: function(quantity){
      const { $rest } = this;
      var modifyData = {
        order_origin      : this.order.origin,
        transaction : this.order.transactions.filter(f => f.products.some(p => p.reference === this.proposed_product.reference))[0]._id,
        quantity    : quantity,
        line        : this.proposed_product.stl_prime_line_no_sg,
        subline     : this.proposed_product.stl_sub_line_no,
      }
      this.current_modal = 'WORKING';
      $rest.putP(`/api/user/es/order/${this.getOrderId()}/product/modify`,
        modifyData
      )
      .then(result => {
        this.change_product_result = 'OK'
        this.current_modal = 'CHANGE_PRODUCT_RESULT'
      })
      .catch(err => {
        this.change_product_result = 'KO'
        this.current_modal = 'CHANGE_PRODUCT_RESULT'
      })
    },
    autoShowTracking: function() {
      let first_order_trackeable = this.order.transactions.filter(t => t.status_key === "ON_ROUTE")[0]
      if(first_order_trackeable) {
        this.$root.$emit('do_show_tracking', first_order_trackeable.transaction_id);
      }
    }
  },
  mounted () {
    var self = this;
    this.$root.$on('do_show_tracking', function(transaction_id){
      var parser_transaction_id = transaction_id.replace(/-/gi,'').replace(/\s/g, '')
      var operation = self.order.transactions.filter( t => t.sale_transaction_id === parser_transaction_id)[0];
      var tracking_data = operation.shipping_tracking
      tracking_data.order_id = self.$props.order.external_id;
      switch(tracking_data.shipping_company){
        case 'PAACK':
          return self.showPaackTracking(tracking_data)
        break;
        case 'SEURNOW':
          return self.showSeurTracking(tracking_data)
        break;
      }
    })
    this.$root.$on('propose_change_address', function(id){
      return self.changeAddressProposal(id)
    })
    this.$root.$on('propose_cancel_operation', function(id){
      return self.cancelOperationProposal(id)
    })
    this.$root.$on('propose_change_product', function(reference){
      return self.modifyProductProposal(reference)
    })
    this.print_mode = !!document.querySelector('input[name=print_mode]');

        //If show_tracking is in the url, automatic shows the modal if(there are more than one order, try to show the first one
    if(this.order.transactions.length && params.get('show_tracking')){
      return self.autoShowTracking();
    }
  }
};
</script>

<style lang="less">
@import '../../assets/variables.less';
  .order{
    //max-width: 500px;
    margin: 0 auto;
    &-loading {
        display: flex;
        min-height: auto;
        align-items: center;
        justify-content: center;
        color: #484848;
        font-size: 12px;
        text-transform: uppercase;
    }
    &_cancel_result {
      display: grid;
      width: 100%;
      grid-row-gap: 1rem;
      grid-template-columns: 1fr;
      >div:nth-of-type(1){
        font-size: 14px;
        font-weight: 200;
        color: #242424;
        text-align: center;
      }
      >div:nth-of-type(2){
        display: grid;
        grid-template-columns: 1fr;
        grid-row-gap: 2px;
      }

    }
  }
  @media @l-up {
    .order{
      //max-width: 700px;
      &_cancel_result {
        margin: 1rem 0;
        grid-column-gap: 1rem;
        grid-template-columns: 1fr 1fr;
        >div:nth-of-type(1){
          font-size: 16px;
        }
      }
      &-mini_resume{
        padding: 0 1rem 1rem 1rem;
      }
    }
  }
  @media @xl-up, @print{
    .order{
      max-width: 100%;
      &-header{
        padding: 1.5rem 2rem;
      }

      &-non_user_block{
        background-color: #F9F9F9;
        padding: 0 2rem 3rem 2rem;
      }

      &-mini_resume{
        padding: 0 2rem 1rem 2rem;
      }
    }
  }
  @media @print{
    .order{
      max-width: 900px;
      margin: 0 auto;
    }
  }
</style>
