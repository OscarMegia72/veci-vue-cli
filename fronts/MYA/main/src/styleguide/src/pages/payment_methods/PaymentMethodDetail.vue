<template>
  <div>
    <main-container>
      <template slot="title">{{ $t('views.payment_methods.my_digital_payments_portfolio') }}</template>
      <template slot="content">
        <form @submit.prevent="updatePaymentMethod">
        <div class="payment_method_detail">
          <div class="payment_method_detail-card">
            <credit-card 
              :bank="model.description"
              :bin="model.bin"
              :expiration="model.expiry_date"
              :mask="model.mask"/>
          </div>
          <div class="payment_method_detail-form">
            <card-field :field="'card_number'"
                        :label="'Número de la tarjeta'"
                        :readonly="true"
                        :value="model.mask" />
            <date-field :field="'expiry_date'" 
                        :label="'Fecha de caducidad'" 
                        :readonly="true" 
                        :month="month"
                        :year="year"/>
            <text-field :field="'alias'" 
                        :label="'alias de la tarjeta'" 
                        :placeholder="'Ponle un nombre'" 
                        v-model="model.alias" />
            <!--<checkbox :field="'principal'"
                      :label="'Medio de pago por defecto'"
                      :value="is_principal"/>-->
          </div>
          <div class="payment_method_detail-buttonset">
            <button-set :class="'_ok_cancel'">
              <template slot="ok">
                <ECI-button :class="'button _primary _cta'">Modificar tarjeta</ECI-button>
              </template>
              <template slot="cancel">
                <ECI-button :class="'button _secondary _warning'">Eliminar tarjeta</ECI-button>
              </template>
            </button-set>
          </div>
        </div>
        </form>
      </template>
    </main-container>
    <modal-action-message 
    @close="showModal=false"  
    v-show="showModal"
    :type="modalType"
    :title="modalTitle"
    :message="modalMessage"
    @accept="showModal=false"
    >
    </modal-action-message>
  </div>

</template>

<script>
import MainContainer from '../../components/layouts/MainContainer.vue';
import CreditCard from '../../components/common/CreditCard.vue';
import TextField from '../../components/fields/TextField.vue';
import DateField from '../../components/fields/DateField.vue';
import CardField from '../../components/fields/CardField.vue';
import Checkbox from '../../components/blocks/Checkbox.vue';
import ButtonSet from '../../components/layouts/ButtonSet.vue';
import Button from '../../components/blocks/Button.vue';
import ModalActionMessage from '../../components/modals/ModalActionMessage.vue';



export default {
  components: {
    'main-container': MainContainer,
    'credit-card': CreditCard,
    'text-field': TextField,
    'date-field': DateField,
    'card-field': CardField,
    'checkbox': Checkbox,
    'button-set': ButtonSet,
    'ECI-button': Button,
    'modal-action-message': ModalActionMessage
  },
  beforeCreate () {
    if( !this.payment_methods ){
      this.$store.dispatch('getPaymentMethods')
    }
  },
  data() {
    return {
      showModal: true,
      modalType: '',
      modalTitle: '',
      modalMessage: 'Bo que pasa',
      modalButtons: 'OK'
    }
  },
  computed: {
    is_principal () {
      if(this.payement_method){
        return this.payment_method.tags.indexOf('default') != -1
      }
    },
    payment_methods () {
      return this.$store.getters.getPaymentMethods;  
    },
    month () {
      if(this.model.expiry_date){
        return this.model.expiry_date.substring(2,4)
      }
      return null
    },
    year () {
      if(this.model.expiry_date){
        return this.model.expiry_date.substring(0,2)
      }
      return null
    },
    model () {
      const byId = payment_method => payment_method.id === this.$route.params.id
      var pm = (this.payment_methods || []).filter(byId)[0];
      return Object.assign({}, pm);
    }
  },
  methods: {
    updatePaymentMethod(){
      this.$store.dispatch('updatePaymentMethod', this.model)
      .then( response => {
        this.modalType = 'info'
        this.modalTitle = "Operación realizada con éxito",
        this.modalMessage = "La tarjeta se ha actualizado correctamente"
        this.showModal = true;
      }, error =>{
        console.log('error', error)
      }) 
    }
  }
}
</script>

<style scoped lang="less">
.payment_method_detail {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
  &-card{
    padding: 0 1rem;
  }
  &-tags{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: .5rem;
    margin-bottom: 1.5rem;
    >*{
      margin: .25rem;
    }
  }
  &-form{
    padding: 0 1rem;
    margin-bottom: 1rem;
    .textfield{
      margin-bottom: 1rem;
    }
  }
  &-buttonset{
    padding: 0 1rem;
  }
}

@media only screen and (min-width: 37.5em){
  .payment_method_detail{
    max-width: initial;
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 650px;
    padding: 2rem 2rem 0 2rem;

    &-card{
      width: 40%;
      svg{
        max-width: 100%;
      }
      align-self: flez-start;
    }
    &-form{
      width: 60%;
      margin-top: 0;
    }
    &-buttonset{
      margin-top: 1rem;
      width: 100%;
    }
  }
}

@media only screen and (min-width: 56.25em){
  .payment_method_detail{
    flex-direction: column;
    max-width: 450px;
    padding: 2rem 1rem;
    &-card{
      width: 100%;
    }
    &-form{
      width: 100%;
      margin-top: 1rem;
    }
    &-buttonset{
      margin-top: 0;
      width: 100%;
    }
  }
}

@media only screen and (min-width: 68.75em){
  .payment_method_detail{
    max-width: initial;
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 750px;
    padding: 2rem 2rem 0 2rem;

    &-card{
      width: 50%;
    }
    &-form{
      width: 50%;
      margin-top: 0;
    }
    &-buttonset{
      margin-top: 3rem;
      width: 100%;
    }
  }
}
</style>
