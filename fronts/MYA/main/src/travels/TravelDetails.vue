<template>
       <div>
       
         <mya-title :tag="'h2'" :class="'_main'">
           {{ $t('travels.details') }}
         </mya-title>
        
          <eci-loading v-if="!getEndXhrDetails" />
          <template v-if="isClientEmpty">
                <empty-travels/>
            </template>
          <transition name="slide-fade">
                <messages-400 v-if='showError400.show' @close="closeModal400">
                    <template slot="header">
                        {{showError400.head}}
                    </template>
                    <template slot="message">
                        {{showError400.message}}
                    </template>
                </messages-400>
            </transition> 
            <template v-if="showUI">
             <header-reserv-num v-if="!showHeaderV2"
            :booking_status="getGeneralDetails.bookingStatus.class"
            >
              <template slot="reserv-num">
                {{getGeneralDetails.bookingCode}}
              </template>
              <template slot="reserv-date">
                {{getGeneralDetails.bookingCreationDate}}
              </template>
              <template slot="booking-status">
                {{getGeneralDetails.bookingStatus.description}}
              </template>
            </header-reserv-num>  
            <!--SHOW HEADER V2 with paramas-->
            <header-reserv-num-v2 v-if="showHeaderV2"
            :booking_status="getGeneralDetails.bookingStatus.class"
            >
              <template slot="reserv-num">
                {{getGeneralDetails.bookingCode}}
              </template>
              <template slot="reserv-date">
                {{getGeneralDetails.bookingCreationDate}}
              </template>
              <template slot="booking-status">
                {{getGeneralDetails.bookingStatus.description}}
              </template>
            </header-reserv-num-v2> 
             <service-flight/>
              <service-cruise/>
              <service-hotel-grouped/>
            <service-train/>
            <service-ticket/>
             <service-pack/>
              <service-ticket/>
             
            <service-bus/>
            
           
             <template v-if="getHasInsurances" >
                <template v-for="insurance in getInsurances">
                  <header-insurance
                  :key="insurance.startDate"
                  >
                      <template slot="dates">
                        {{insurance.startDate}} - {{insurance.endDate}}
                      </template>
                      <template slot="policy-type">
                        {{insurance.policyType.description}}
                      </template>
                  </header-insurance>
                    <insurance
                    :key="insurance.policyNumber"
                    >
                      <template slot="insurance-company">
                        {{insurance.company}} 
                      </template>
                      <template slot="insurance-police-number">
                        {{insurance.policyNumber}}
                      </template>
                      <template slot="police-modules-number">
                          {{insurance.numberOfModules}}
                      </template>
                    </insurance>
                </template>
              </template>
             <header-travellers/>
             <template v-for="(travel,idx) in getTravellersList">
               <travellers
               :key="idx"
               >
                 <template slot="travel_name">
                     {{travel.person.firstName}} {{travel.person.surname}}
                   </template>
                 <template >
                      <template  v-if='travel.person.birthDate' slot="travellers_birthDate">
                        {{travel.person.birthDate}}
                      </template>
                      <template v-if='travel.person.documentNumber' slot="travellers_dni_number">
                        {{travel.person.documentNumber}}
                      </template>
                 </template>
                 
               </travellers>
             </template>
             <template>
               <header-operations/>
                <operation-res/>
             </template>
             <template>
               <agency/>
             </template>
             <message-update-data/>
            </template>
        
        </div>
       
</template>
<script>
//-generic-components
import Error400 from './messages/error400';
import loading from './components/_loading';
import MessageUpdateData from './components/MessageUpdateData';
import EmptyTravels from './components/EmptyTravels';
//--
// import ItemResume from './components/ItemResume';

// import Price from './components/PriceTravels';

// import BookingState from './components/BookingState'
import HeaderReservNum from './components_details/common/HeaderReservNum'
import HeaderReservNumV2 from './components_details/common/HeaderReservNum_v2'
import HeaderInsurance from './components/insurances/HeaderInsurance'
import HeaderTravellers from './components/travellers/HeaderTravellers'
import ServicePack from './components_details/packs/ServicePack'

import Insurance from './components/insurances/Insurance'
import Travellers from './components/travellers/Travellers'

import ServiceFlight from './components_details/flights/ServiceFlight'
// 
import ServiceTrain from './components_details/trains/ServiceTrain'

import ServiceTicket from './components_details/tickets/ServiceTicket'
import ServiceCruise from './components_details/cruises/ServiceCruise'

//- Resueltos
import ServiceBus from './components_details/buses/ServiceBus'
import ServiceHotelGrouped from './components_details/hotels/ServiceHotelGrouped'

//-eci-components
import Title from '../styleguide/src/components/blocks/Title.vue';
// import Link from '../styleguide/src/components/blocks/Link.vue';
// operations
import OperationsRes from "./components/operations/OperationsRes.vue"
import HeaderOperations from './components/operations/HeaderOperations'
// agency
import Agency from "./components/agency/Agency.vue"

export default {
    data(){
        return{
            placement:false,
            full_cover:'',
          
        }
        
    },
    components:{
        'service-bus': ServiceBus,
       'service-hotel-grouped': ServiceHotelGrouped,
       'service-flight': ServiceFlight,
       'service-train': ServiceTrain,
       'service-ticket': ServiceTicket,
        'service-pack': ServicePack,
        'service-cruise': ServiceCruise,
        'mya-title': Title,
        'messages-400': Error400,
        'eci-loading': loading,
        'message-update-data': MessageUpdateData,
        'empty-travels': EmptyTravels,
        'header-reserv-num': HeaderReservNum,
        'header-reserv-num-v2': HeaderReservNumV2,
        'header-insurance':HeaderInsurance,
        'header-operations':HeaderOperations,
        'insurance':Insurance,
        'header-travellers': HeaderTravellers,
        'travellers': Travellers,
        'operation-res': OperationsRes,
        'agency': Agency,
    },
   async created(){
        // await this.$store.dispatch('getMockApiTravelDetails');
   },
   mounted(){
        this.$nextTick(function () {
            this.$store.dispatch('getApiTravelDetails'); 
        })
   },
   computed:{
       showError400(){
           return this.$store.state.errors.error400;
       },
       isClientEmpty(){
            return this.$store.state.client_empty
       },
       getEndXhrDetails(){
           return this.$store.state.endXhrDetails
       },
       getGeneralDetails(){
         return this.$store.state.api_data.generalDetails
       },
       getTravellers(){
         return this.$store.state.api_data.travellers
       },
       getFligths(){
         return this.$store.state.api_data.services.flights
       },
       getHasInsurances(){
         return this.$store.state.api_data.hasInsurance
       },
       getInsurances(){
         return this.$store.state.api_data.insurance
       },
       getTravellersList(){
         return this.$store.state.api_data.travellers.travellersList
       },
       showUI(){
         return this.$store.state.showUI
       },
       showHeaderV2(){
         return this.$store.state.showHeaderV2
       }
   },
   methods: {
       closeModal400(){
           this.$store.dispatch('setViewModal400',{
                show:false,
                head:'',
                message:''
          
           })
       },
   },
}
</script>
<style lang="less">
 @import '../styleguide/src/assets/icons.less';
 
@media @l-up {
    .tr-simil-camp{
        display: none;
    }
}
</style>
<style lang='less'>

</style>
<style lang='less'>

</style>
<style lang='less'>
 @import '../styleguide/src/assets/icons.less';

</style>
<style>
.slide-fade-enter-active {
  transition: all .8s ease;
}
.slide-fade-leave-active {
  transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(20px);
  opacity: 0;
}
.plz-enter-active{
    animation: bounce-in 1s;

}
@keyframes bounce-in {
  0% {
      opacity: 0;
    transform: scale(0);
  }
  100% {
      opacity: 100%;
    transform: scale(1);
  }
}
