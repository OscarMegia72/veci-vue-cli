<template>
  <div class="VInvoiceTile">
    <div v-if="invoice.transaction">
      <p><b>{{ $t('order_detail.modals.invoices.tile.title') }} :</b></p>
      <p>{{invoice.transaction}}</p>
      <p class="error" v-if="invoice.status.status === 'ERROR'">{{invoice.status.description}}</p>
      <p class="error" v-if="download_error">{{ $t('order_detail.modals.invoices.donwload_error') }}</p>
    </div>
    <div v-else>
      <p><b>Factura: </b></p>
      <p>{{invoice.number}}</p>
      <p class="error" v-if="invoice.status.status === 'ERROR'">{{invoice.status.description}}</p>
      <p class="error" v-if="download_error">{{ $t('order_detail.modals.invoices.donwload_error') }}</p>
    </div>
    <div></div>
    <eci-button v-if="invoice.status.status === 'OK'" @click="downloadInvoice" :type="'button_new _contextual_with_icon _arrow_up'">
      <i class="icon i-up"></i>
      <span class="_text">{{ $t('order_detail.modals.invoices.donwload_status_ok') }}</span>
    </eci-button>
    <eci-button v-if="invoice.status.status === 'PENDING'" @click="requestInvoice" :type="'button_new _contextual_with_icon _arrow_up'">
      <i class="icon info"></i>
      <span class="_text">{{ $t('order_detail.modals.invoices.donwload_status_pending') }}</span>
    </eci-button>
    <eci-button v-if="invoice.status.status === 'ERROR'" :type="'button_new _contextual_with_icon _warning'">
      <i class="icon cross _xxl"></i>
      <span class="_text">{{ $t('order_detail.modals.invoices.donwload_status_error') }}</span>
    </eci-button>
    <!--<button @click="downloadInvoice()">
      <i class="icon i-up"></i>
    </button>-->
  </div>
</template>

<script>
import Button from '../blocks/Button.vue';

export default {
  props: {
    'invoice': {
      default: function() {
        return {}
      }
    }
  },
  components: {
    'eci-button': Button
  },
  data () {
    return {
      endpoint: '/api/user/es/invoices/',
      download_error: false
    }
  },
  methods: {
    downloadInvoice: function(){
      const { $rest } = this;
      var that = this;
      that.download_error = false;
      $rest.getP(`${this.endpoint}${this.invoice.name}`, {
        responseType:'arraybuffer',
        params: {
          invoice_id: this.invoice.number
        }
      })
        .then(function(response) {
          let blob = new Blob([response.data], { type:   'application/pdf' } )
          let link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          var downloadName = that.invoice.number.replace(/\s/g, "")
          link.download = `${downloadName}.pdf`
          link.click()
      })
        .catch(function(err) {
          that.download_error = true;
        })
    },
    requestInvoice: function(){
      console.log('Estado de factura incorrecto', this)
    }
  }
}
</script>

<style lang="less">
@import '../../assets/variables.less';
  .VInvoiceTile{
    width: 100%;
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
    display: grid;
    grid-template-areas: "name"
                         "price"
                         "button";
    grid-template-rows: repeat(3, auto);
    &:not(:last-of-type){
      margin-bottom: 1rem;
    }

    >div:nth-of-type(1){
      grid-area: name;
      padding: 1rem 1rem .5rem 1rem;
      font-size: 14px;
      text-align: left;
      .error{
        font-size: 11px;
        color: #d30000;
      }
    }
    >div:nth-of-type(2){
      grid-area: price;
      padding: .5rem 1rem 1rem 1rem;
      font-size: 14px;
      text-align: center;
    }
    button {
      i{
        transform: rotate(180deg);
      }
    }
  }

  @media @l-up {
    .VInvoiceTile{
    width: 100%;
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
    display: grid;
    grid-template-areas: "name price button";
    grid-template-columns: 1fr 200px 60px;
      >div:nth-of-type(1){
        padding: 1rem;
        display: grid;
        grid-template-columns: auto 1fr;
        grid-column-gap: .5rem;
        grid-template-areas: "title description"
                             "error error";
        align-items: center;
        .error{
          font-size: 11px;
          grid-area: error;
          color: #d30000;
        }
      }
      >div:nth-of-type(2){
        padding: 1rem;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
    }
    button{
      border: none !important;
      box-shadow: none !important;
      ._text{
        display: none;
      }
      &:before{
        display: none;
      }
    }
  }
</style>
