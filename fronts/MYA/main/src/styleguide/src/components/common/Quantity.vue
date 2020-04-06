<template>
  <component :is="tag" :class="{'quantity':true, '_stroked':stroked}" :style="{fontSize: size + 'px' }">
    <slot name="quantity_slot">
      <span>{{quantity}}</span>
      <span> {{quantity_label}}</span>
    </slot>
  </component>
</template>

<script>
export default {
  name: 'price',
  props: {
    tag: {
      type: String,
      default: 'span'
    },
    quantity: {
      type: Number,
      default: 1
    },
    unit: {
      default: 'UNITS'
    },
    size: {
      defautl: '12'
    },
    stroked: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    quantity_label() {
      if (!this.quantity) return '';
      switch (true) {
        case this.quantity <= 1:
          return (
            {
              UNITS: this.$i18n.t('order_detail.products_list.units.singular'),
              GRAMS: this.$i18n.t('order_detail.products_list.grams.singular'),
              KILOGRAMS: this.$i18n.t('order_detail.products_list.kilograms.singular'),
              TRAY: this.$i18n.t('order_detail.products_list.tray.singular')
            }[this.$props.unit] || 'Not specified ' + this.$props.unit
          );
        case this.quantity > 1:
          return (
            {
              UNITS: this.$i18n.t('order_detail.products_list.units.plural'),
              GRAMS: this.$i18n.t('order_detail.products_list.grams.plural'),
              KILOGRAMS: this.$i18n.t('order_detail.products_list.kilograms.plural'),
              TRAY: this.$i18n.t('order_detail.products_list.tray.plural')
            }[this.$props.unit] || 'Not specified ' + this.$props.unit
          );
      }
    }
  }
};
</script>

<style lang="less" scoped>
.quantity {
  color: #242424;
  font-family: 'ECIFont';
  span:nth-of-type(2) {
    font-size: 80%;
    color: #484848;
    padding-right: .5em;
  }
  &._stroked{
    //background: url('images/stroked.png') center center;
    color: #8F8F8F;
    position: relative;
    &:after{
    content: "";
    border-bottom: 2px solid #8F8F8F;
    width: 60%;
    position: absolute;
    right: 20%;
    top: 50%;
    transform: rotate(-33deg);
    }
  }
}
</style>
