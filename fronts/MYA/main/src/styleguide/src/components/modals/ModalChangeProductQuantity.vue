<template>
  <modal-action-message :custom="'modal_change_quantity'">
    <template v-if="status === 'STATIC'">
      <template v-if="product.quantity != 1">
          <template slot="header">
            <div class="modal_change_quantity-header">
              <div class="modal_change_quantity-close_wrapper">
                <button @click="close"><i class="icon cross"></i></button>
              </div>
              <div class="modal_change_quantity-title_wrapper">
                {{ $t('order_detail.modals.change_product.title') }}
              </div>
            </div>
          </template>
          <template slot="body">
            <div class="modal_change_quantity-body">
              <p class="modal_change_quantity-title">{{ $t('order_detail.modals.change_product.quantity_title_modify') }}</p>
              <p class="modal_change_quantity-info">{{ $t('order_detail.modals.change_product.info') }}</p>
              <div class="modal_change_quantity-product">
                <order-product-tile :product="product" :editable="true" :disallow_modification="true" ref="ModificableProduct"/>
              </div>
            </div>
          </template>
          <template slot="footer">
            <div class="modal_change_quantity-footer">
              <button-set :type="'_three_slots'">
                <template slot="ok" >
                  <eci-button :type="'button _primary _cta'" @click="acceptHandler">{{ $t('order_detail.modals.change_product.quantity_cta_ok') }}</eci-button>
                </template>
                <template slot="cancel">
                  <eci-button :type="'button _secondary _cta'" @click="close">{{ $t('order_detail.modals.change_product.cancel') }}</eci-button>
                </template>
                <template slot="doit">
                  <eci-button :type="'button _primary _warning'" @click="deleteProductHandler">{{ $t('order_detail.modals.change_product.delete') }}</eci-button>
                </template>
              </button-set>
            </div>
          </template>
      </template>
      <template v-else>
          <template slot="header">
            <div class="modal_change_quantity-header">
              <div class="modal_change_quantity-close_wrapper">
                <button @click="close"><i class="icon cross"></i></button>
              </div>
              <div class="modal_change_quantity-title_wrapper">
                {{ $t('order_detail.modals.change_product.quantity_title_delete') }}
              </div>
            </div>
          </template>
          <template slot="body">
            <div class="modal_change_quantity-body">
              <div>
                <p class="modal_change_quantity-title">{{ $t('order_detail.modals.change_product.quantity_subtitle_delete') }}</p>
                <p class="modal_change_quantity-info">{{ $t('order_detail.modals.change_product.info') }}</p>
              </div>
              <div class="modal_change_quantity-product">
                <order-product-tile :product="product" :disallow_modification="true"/>
              </div>
            </div>
          </template>
          <template slot="footer">
            <div class="modal_change_quantity-footer">
              <button-set :type="'_ok_cancel'">
                <template slot="ok" >
                  <eci-button :type="'button _primary _warning'" @click="deleteProductHandler">{{ $t('order_detail.modals.change_product.delete') }}</eci-button>
                </template>
                <template slot="cancel">
                  <eci-button :type="'button _secondary _cta'" @click="close">{{ $t('order_detail.modals.change_product.cancel') }}</eci-button>
                </template>
              </button-set>
            </div>
          </template>
      </template>
    </template>
    <template v-if="status === 'WORKING'">
      <template slot="header"><span></span></template>
      <template slot="body">
        <p class="modal_change_quantity-info_text">{{ $t('order_detail.modals.change_product.processing_request') }}</p>
      </template>
      <template slot="footer"><span></span></template>
    </template>
  </modal-action-message>
</template>

<script>
import ModalActionMessage from './ModalActionMessage.vue';
import ButtonSet from '../layouts/ButtonSet.vue';
import Button from '../blocks/Button.vue';
import OrderProductTile from '../tiles/OrderProductTile.vue';




export default {
  data_url: '/api/user/es/addresses/',
  components: {
    'modal-action-message': ModalActionMessage,
    'button-set': ButtonSet,
    'eci-button': Button,
    'order-product-tile': OrderProductTile
  },
  props: {
    close_outside: {
      default: true
    },
    product: {
      default: function(){return {}}
    }
  },
  data() {
    return {
      status: 'STATIC',
    };
  },
  methods: {
    close: function() {
      this.$emit('close');
    },
    acceptHandler: function() {
      this.status = 'WORKING';
      this.$emit('accept', this.$refs.ModificableProduct.getModifiedQuantity());
    },
    deleteProductHandler: function() {
      this.status = 'WORKING';
      this.$emit('deleteProduct',0)
    },
  },
  mounted: function(){
    this.status = 'STATIC';
  }
};
</script>

<style lang="less">
@import '../../assets/variables.less';

.modal_change_quantity {
  padding: 1rem;
  &-header {
    display: flex;
    width: 100%;
    flex-direction: row;
    padding-bottom: 1.5rem;
    button {
      .reset-button();
      i {
        font-size: 32px;
      }
    }
  }
  &-body {
    margin-bottom: 1rem;
    color: #484848;
  }
  &-title {
    font-size: 16px;
    font-weight: 500;
    display: block;
    text-align: center;
    margin-bottom: 1rem;
    padding: 0 2rem;
  }
  &-info {
    font-weight: 200;
    font-size: 12px;
    display: block;
    text-align: right;
    margin-bottom: 1rem;
  }

  &-product{
    border-top: solid 1px #E0E0E0;
    border-bottom: solid 1px #E0E0E0;
  }

  &-close_wrapper {
    display: flex;
    justify-content: flex-end;
    order: 2;
  }
  &-title_wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    font-weight: 200;
    flex: 1;
    order: 1;
  }
}

@media @l-up {
  .modal_change_quantity {
    max-width: 768px !important;
    margin: 0px auto !important;
    &-header {
      width: 100%;
    }
    &-body {
      padding: 0 1rem;
    }
    &-title_wrapper {
      font-size: 28px;
    }
    &-title {
      font-size: 18px;
      font-weight: 200;
    }
  }
}
</style>

