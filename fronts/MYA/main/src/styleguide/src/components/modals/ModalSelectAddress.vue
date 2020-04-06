<template>
  <modal-action-message :custom="'modal_addresses'">
    <template v-if="status ==='LOADING'">
      <template slot="header"><span></span></template>
      <template slot="body">
        <p class="modal_addresses-infotext">{{ $t('order_detail.modals.change_address.loading') }}.</p>
      </template>
      <template slot="footer">
        <span></span>
      </template>
    </template>
    <template v-if="status === 'ERROR'">
      <template slot="header"><span></span></template>
      <template slot="body">
        <div v-if="status_error == 'NO_ADDRESSES'">
          <p class="modal_addresses-infotext"> {{ $t('order_detail.modals.change_address.error.no_addresses') }} </p>
        </div>
        <div v-if="status_error == 'ERROR_ON_DATA'">
          <p class="modal_addresses-infotext"> {{ $t('order_detail.modals.change_address.error.generic') }}</p>
        </div>
      </template>
      <template slot="footer">
        <button-set :type="'_ok'">
          <template slot="ok" >
            <v-button :type="'button_new _primary _cta'" @click="close">{{ $t('close')}}</v-button>
          </template>
        </button-set>
      </template>
    </template>
    <template v-if="status ==='LOADED'">
        <template slot="header">
          <div class="modal_addresses-header">
            <div class="modal_addresses-close_wrapper">
              <button @click="close"><i class="icon cross"></i></button>
            </div>
            <div class="modal_addresses-title_wrapper">
              {{ $t('order_detail.modals.change_address.select_address') }}
            </div>
          </div>
        </template>
        <template slot="body">
          <div class="modal_addresses-body">
           <address-tile v-for="(address,idx) in addresses"
                         :key="'address' + idx"
                         :address="address"
                         :class="[{'_selected':address_selected === address._id}]"
                         @address_selected="onAddressSelected"/>
          </div>
        </template>
        <template slot="footer">
          <div class="modal_addresses-footer">
            <button-set :type="'_ok_cancel'">
              <template slot="ok" >
                <r-button :type="'button _primary _cta'" @click="acceptHandler" :disabled="!(Boolean(address_selected))"> {{ $t('order_detail.modals.change_address.accept_text')}} </r-button>
              </template>
              <template slot="cancel">
                <v-button :type="'button _secondary _cta'" @click="redirectToNewAddress">{{ $t('views.home.add_new_address') }}</v-button>
              </template>
            </button-set>
          </div>
        </template>
    </template>
  </modal-action-message>
</template>

<script>
import ModalActionMessage from './ModalActionMessage.vue';
import ButtonSet from '../layouts/ButtonSet.vue';
import Button from '../blocks/Button.vue';
import ModalAddressTile from '../tiles/ModalAddressTile.vue';
import ReactiveButton from '../blocks/ReactiveButton.vue';
import { setTimeout } from 'timers';

export default {
  data_url: '/api/user/es/addresses/',
  components: {
    'modal-action-message': ModalActionMessage,
    'button-set': ButtonSet,
    'v-button': Button,
    'address-tile': ModalAddressTile,
    'r-button': ReactiveButton
  },
  props: {
    close_outside: {
      default: true
    },
    data_url: {
      default: null
    },
    filter: {
      default: () => {}
    }
  },
  data() {
    return {
      status: 'LOADING',
      addresses: [],
      status_error: '',
      address_selected: null,
    };
  },
  methods: {
    getData: function() {
      const { $rest } = this;
      var vm = this;
      var url = this.$props.data_url || this.$options.data_url;
      $rest
        .getP(url, {params: {
          filter: 'shipping_zone',
          zip_code: vm.$props.filter.shipping_zone.zip_code,
          country: vm.$props.filter.shipping_zone.country.trim()
        }})
        .then(result => {
          vm.addresses = result.data;
          vm.status = 'LOADED';
        })
        .catch(err => {
          vm.status = 'ERROR';
          if (!err.response) {
            vm.status_error = 'ERROR_ON_DATA';
          } else {
            if (err.response.status === 404) {
              vm.status_error = 'NO_ADDRESSES';
            } else {
              vm.status_error = 'ERROR_ON_DATA';
            }
          }
        });
    },

    close: function() {
      this.$emit('close');
    },
    onAddressSelected: function(id, addressSelectedObject) {
      this.address_selected = id;
      this.addressSelectedObject = addressSelectedObject;
    },
    acceptHandler: function() {
      this.$emit('accept', this.address_selected, this.addressSelectedObject);
    },
    resetData: function(){
      this.address_selected = null;
      this.addresses = [];
      this.status = 'LOADING';
    },
    updateFilter: function(value){
      this.filter = value
    },
    redirectToNewAddress: function() {
      window.location.href = '/mis-direcciones/direccion/?data-event=custom_event_profile'
    }
  },
  mounted: function(){
      this.resetData();
      setTimeout(this.getData.bind(), 500)
  },
};
</script>

<style lang="less">
@import '../../assets/variables.less';

.modal_addresses {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  &-header {
    display: flex;
    width: 100%;
    flex-direction: row;
   // padding-bottom: 1.5rem;
    button {
      .reset-button();
      i {
        font-size: 32px;
      }
    }
  }
  &-body {
    display: flex;
    flex-direction: column;
  }
  &-footer {
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 1rem;
    font-size: 13px;
    color: #242424;
  }

  .modal-header{
    flex: 0;
  }
  .modal-body{
    max-height: ~"calc(150vh - 150px)";
    flex: 1;
    overflow-y: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar{
      display: none;
    }
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
  &-infotext {
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    text-transform: uppercase;
    font-size: 11px;
    color: #484848;
  }
}

@media @l-up {
  .modal_addresses {
    max-width: 768px !important;
    margin: 0px auto !important;
    &-header {
      width: 100%;
    }
    &-body {
      padding: 0 1rem;
      width: 100%;
      max-height: 400px;
    }
  }
}
</style>

