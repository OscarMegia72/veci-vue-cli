<template>
  <div class="refund_address">
    <eci-text :tag="'h3'" :type="'_xs _semi _24 _uppercase mb2'"> {{ $t('picking_title') }} </eci-text>
    <div v-if="address">
      <eci-text v-if="address.alias" :tag="'p'" :type="'_xxs _24 mb'"> {{address.alias}} </eci-text>
      <eci-text v-if="human_address.multi_line" :tag="'p'" :type="'_s _light _24'" ><span v-html="human_address.multi_line"></span></eci-text>
    </div>
    <template v-if="editable">
      <eci-button v-if="editable" @click="current_modal ='CHANGE_ADDRESS_PROPOSAL'" :type="'_link _cta'">
        <template v-if="address.way_name">
            {{ $t('order_detail.refund.other.picking.address') }}
        </template>
        <template v-else>
            {{ $t('order_detail.refund.select.picking.address') }}
        </template>
      </eci-button>
      <div>
        <modal-select-address v-if="current_modal === 'CHANGE_ADDRESS_PROPOSAL'" ref="select_address_modal"
          @close="current_modal =''"
          @accept="changeAddress"
          :filter="address_filter"
          v-show="current_modal === 'CHANGE_ADDRESS_PROPOSAL'"
        />
      </div>
    </template>
  </div>
</template>


<script>
import ModalSelectAddress from '../modals/ModalSelectAddress.vue';
import Text from '../blocks/Text.vue';
import Button from '../blocks/Button.vue';


export default {
  props: {
    editable: {
      type: Boolean,
      default: true
    },
  },
  components: {
    'modal-select-address': ModalSelectAddress,
    'eci-text': Text,
    'eci-button': Button,
  },
  data () {
    let address_filter = {};
    if (this.editable) {
        const operation = this.$store.state.order.transactions[0];
        const country = operation.shipping_address.line4;
        const zipCode = operation.shipping_address.line3;
        address_filter = {
          shipping_zone: {
            zip_code: zipCode,
            country: country ? country : 'no_country'
          }
        };
    }

    return {
      opened: true,
      current_modal: '',
      address_filter,
    }
  },
  computed: {
    address() {
      return this.$store.state.address || {};
    },
    selectable(){
      return this.editable && _.isEmpty(this.address);
    },
    human_address() {
      const {$store} = this;
      if($store.state.address)  return $store.state.address.human_address;
      return {}
    }
  },
  methods: {
    changeAddress(address_id, address) {
      this.current_modal = 'WORKING';
      this.$store.commit('changeAddress', address);
    },
  },
}
</script>

<style lang="less" scoped>
@import '../../assets/variables.less';
.refund_address {
  padding: 0 1rem 1rem 1rem;
  border-bottom: solid 1px #E0E0E0;
}

@media @xl-up {
  .refund_address {
    padding: 1rem 2rem 2rem 2rem;
  }
}
</style>
