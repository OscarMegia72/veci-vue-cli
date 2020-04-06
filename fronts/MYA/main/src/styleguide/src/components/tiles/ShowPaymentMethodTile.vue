<template>
    <router-link title="Ver detalle de metodo de pago" :to="{ name:'Payment_Methods_Detail', params: { id:payment_method.id } }" class="payment_method_tile">
      <div>
        <icon-base :width="card_icon.width" :height="card_icon.height"><component :is="card_icon.icon"></component></icon-base>
      </div>
      <div>
        <p class="payment_method_tile-alias">{{payment_method.alias}}</p>
          <template v-if="this.payment_method.type == 'ECI_CARD'">
            <p class="payment_method_tile-type">{{payment_method.description}}</p>
            <p class="payment_method_tile-mask">{{masked_number}}</p>
          </template>
          <template v-else>
            <p class="payment_method_tile-description"><span>{{ $t('views.payment_methods.tile.number') }}</span><span>*{{masked_number}}</span></p>
            <p class="payment_method_tile-description"><span>{{ $t('views.payment_methods.tile.date') }}</span><span>{{expiration_date}}</span></p>
          </template>
      </div>
      <div>
          <i class="icon arrow-right"></i>
      </div> 
    </router-link>
</template>

<script>
import amex from '../icons/card_logos/amex.vue';
import eci from '../icons/card_logos/eci.vue';
import generic from '../icons/card_logos/generic.vue';
import mastercard from '../icons/card_logos/mastercard.vue';
import visa from '../icons/card_logos/visa.vue';
import IconBase from '../icons/IconBase.vue';


export default {
  props: ['payment_method'],
  computed: {
    masked_number () {
      if(this.payment_method.type == 'ECI_CARD'){
        return `${this.payment_method.bin} ********* ${this.payment_method.mask[0]} ${this.payment_method.mask[1]}${this.payment_method.mask[2]}${this.payment_method.mask[3]}`
      } else{
        return this.payment_method.mask
      }
    },
    expiration_date () {
      if(this.payment_method.type != 'ECI_CARD') {
        return this.payment_method.expiry_date.substring(2,4) + '/' + this.payment_method.expiry_date.substring(0,2)
      }
    },
    card_icon () {
      switch(this.payment_method.description){
        case 'TARJETA EL CORTE INGLÉS':
          return {
            icon: 'eci',
            width: 50,
            height: 30            
          }
        break;

        case 'VISA':
          return {
            icon: 'mastercard',
            width: 50,
            height: 50           
          }
        break;
      }
    }
  },
  components: {
    'icon-base': IconBase,
    'amex': amex,
    'eci': eci,
    'generic': generic,
    'mastercard': mastercard,
    'visa': visa,
  }
}
</script>

<style scoped lang="less">
  .payment_method_tile{
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid 1px #F0F0F0;
    border-bottom: none;
    text-decoration: none;
    height: 90px;
    &:last-of-type{
      border-bottom: solid 1px #F0F0F0;
    }
    >div:nth-of-type(1){
      width: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }
    >div:nth-of-type(2){
      flex-grow: 1;
    }
    >div:nth-of-type(3){
      width: 60px;
      height: 90px;
      background: #FAFAFA;
      transition: all .2s ease-in-out;
      display: flex;
      align-items: center;
      justify-content: center;

      a{
        text-decoration: none;
        color: #8f8f8f;
      }
    }
    &:hover{
      >div:nth-of-type(3){
        background: darken(#FAFAFA, 5);
      }
    }
    &-alias{
      line-height: 1.8;
      color: #242424;
      font-weight: 500;
      font-size: 13px;
      text-transform: uppercase;
    }
    &-type{
      line-height: 1.8;
      color: #242424;
      font-weight: 100;
      font-size: 14px;
    }
    &-mask{
      line-height: 1.8;
      color: #242424;
      font-weight: 500;
      font-size: 14px;
    }
    &-description{
      span:first-of-type{
        line-height: 1.8;
        color: #242424;
        font-weight: 100;
        font-size: 13px;
      }
      span:last-of-type{
        line-height: 1.8;
        color: #242424;
        font-weight: 500;
        font-size: 13px;
      }
    }
  }

  @media only screen and (min-width: 56.25em){
    .payment_method_tile{
      >div:nth-of-type(1){
        width: 30%;
        justify-content: flex-end;
        padding-right: 2rem;
        svg{
          max-width: 60px;
        }
        .icon{
          width: 60px;
          text-align: center;
        }
      }

      >div:nth-of-type(3){
        width: 90px;
      }
    }
  }
  @media only screen and (min-width: 68.75em){
    .payment_method_tile{
      >div:nth-of-type(1){
        width: 40%;
        svg{
          max-width: 60px;
          height: 30px;
        }
      }

      >div:nth-of-type(3){
        width: 90px;
      }
    }
  }
</style>
