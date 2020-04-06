<template>
  <component :is="tag" :class="{'price':true, '_important':important, '_pum':pum, '_offer':offer, '_before':before}" :style="{fontSize: size + 'px' }">
    <slot name="price_slot">
      <span class="price-integer">{{ integerPart }}</span>
      <template v-if="!_is_literal">
        <span v-if="commaPart" class="price-comma">,{{ commaPart }}</span>
        <span class="price-euro"> €</span>  
      </template>
    </slot>
  </component>
</template>

<script>
export default {
  name: 'price',
  props: {
    amount: {},
    tag: {
      type: String,
      default: 'span'
    },
    size: {
      type: Number,
      default: 12
    },
    important: {
      type: Boolean,
      default: false
    },
    pum: {
      type: Boolean,
      default: false
    },
    offer: {
      type: Boolean,
      default: false
    },
    before: {
      type: Boolean,
      default: false
    },
    decimal_character: {
      type: String,
      default: ','
    }
  },
  computed: {
    integerPart() {
      if (!this.amount) return '';
      var value = String(this.amount).split(this.decimal_character)[0];
      return value.replace(/\B(?=(\d{3})+(?!\d))/g, c => '.' + c);
    },
    commaPart() {
      if (!this.amount) return '';
      var commapart = String(this.amount).split(this.decimal_character)[1];
      if(!commapart) return null;
      if(commapart && commapart.length === 1 ){
        commapart = commapart + '0';
      }
      return (commapart || '00').substring(0,2);
    },
    _is_literal() {
      return isNaN(parseInt(this.amount,10));
    }
  }
};
</script>

<style lang="less" scoped>
.price{  
  color: #242424;
  font-family: 'Open-Sans';
  font-weight: 500;
  &._important{
    font-family: 'Lato';
    .price-integer{
      font-weight: bold;
    }
    .price-comma{
      font-size: 70%;
    }
    .price-euro{
      font-size: 75%;
    }
  }
  &._pum{
    color: #8f8f8f;
  }
  &._offer{
    color: #FC4965;
  }
  &._before{
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
