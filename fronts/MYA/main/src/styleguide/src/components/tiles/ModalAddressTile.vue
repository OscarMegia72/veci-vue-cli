<template>
  <div class="address_tile-container">
    <v-radio
        :group="'address'"
        :custom_id="address._id"
        :is_disabled="!address.valid"
        @change="changeHandler">
        <div :class="['address_tile',{'_disabled':!address.valid}]">
          <div class="address_tile-data">
            <p class="address_tile-alias">{{address.alias}}</p>
            <div class="address_tile-address" v-html="address.human_address.multi_line"></div>
          </div>
          <div class="address_tile-tags">
            <v-tag v-if="address.is_default" :type="'_primary'">{{ $t('order_detail.modals.change_address.to_select_ok') }}</v-tag>
            <v-tag v-if="!address.valid" :type="'_primary _error'">{{ $t('order_detail.modals.change_address.to_select_ko') }}</v-tag>
          </div>
        </div>
    </v-radio>
  </div>

</template>

<script>
import Button from '../blocks/Button.vue';
import Tag from '../blocks/Tag.vue';
import Radio from '../blocks/Radio.vue';


export default {
  props: {
    address: {
      default: function() {
        () => {};
      }
    }
  },
  components: {
    'v-button': Button,
    'v-tag': Tag,
    'v-radio': Radio
  },

  methods: {
    changeHandler: function() {
      this.$emit('address_selected', this.$props.address._id, this.$props.address);
    }
  }
};
</script>

<style lang="less">
@import '../../assets/variables.less';
.address_tile {
  display: block;
  font-size: 13px;
  color: #242424;
  &._disabled{
    opacity: .75;
  }
  &-container{
    .radio-label {
      display: grid;
      grid-template-columns: 60px 1fr;
      align-content: flex-start;
      max-width: 600px;
      margin: 0 auto;
      &:before{
        justify-self: flex-end;
        margin-top: .3rem;
      }
    }
    border-bottom: solid 1px #f0f0f0;
  }

  &:not(:last-of-type) {
    &-container{
      border-bottom: solid 1px #f0f0f0;
    }
  }
  &-tags {
  }
  &-data {
  }

&-alias {
    text-transform: uppercase;
    line-height: 1.8;
    font-weight: 500;

  }
  &-address {
    font-weight: 200;
    margin-bottom: .5rem;
  }
}

@media @l-up {
  .address_tile {
    display: grid;
    grid-template-columns: 300px 1fr;
    &-tags{
      text-align: center;
      align-self: center;
    }
  }
}

</style>
