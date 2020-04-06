<template>

    <div class="details-flight">
        <template  v-for="(flight,idx) in getFligths">
              <header-details
                :key="idx"
                :data-testid ="flight.locatorNumber"
                    >
                  <template slot="icon">
                    <span class="icon-veci-flight" />
                  </template>
                    <!--cabecera detalle -->
                    <template slot="dates">
                      {{flight.departureDate}}
                      <!-- -
                      {{flight.arrivalDate}} -->
                    </template>
                    <template slot="title">
                      {{flight.departureCity}} -> {{flight.destinationCity}}
                    </template>
                    <template slot="status">
                          <div class="header_details-wrapper-info-data-booking_status" :class="flight.status.class">
                          {{flight.status.description}}
                        </div>
                       </template> 
                    <template slot="arrival_date_label">
                      {{ $t('travels.arrival_date') }} 
                    </template>
                    <template slot="arrival_date">
                      {{flight.arrivalDate}}, {{flight.arrivalTime}}
                    </template>
                    <template slot="passengers">
                      {{flight.numberOfPassengers}}
                    </template>
                    <template slot="locator_number">
                      {{flight.locatorNumber}}
                    </template>
                </header-details>
                <!-- loop services-->
                <template v-for="sections in flight.flightSections">
                    <detail-company 
                    :key="sections.guid"
                    >
                        <template slot="company-logo">
                           <!-- <img :src="`https://${sections.logoUrl}`"/> -->
                           <img src="https://www.viajeselcorteingles.es/estaticos/imagen/vuelos/airlines/IB.gif"/> 
                        </template>
                         <template slot="number-flight">
                             {{sections.fligthNumber}}
                         </template>
                          <template v-if="sections.className" slot="class_name">
                             {{sections.className}} 
                         </template>
                         
                         <template  v-if="sections.checkedLuggageNumber" slot="checked_luggage_number">
                              {{sections.checkedLuggageNumber}}
                         </template>
                    <!-- <detail-company
                    
                    > -->
                    </detail-company>
                     <detail-flight-mobile class="details-flight-mobile"
                    :key="`${sections.guid}-mobile`"
                    :sections="sections"
                    />
                    <detail-flight-desktop class="details-flight-desktop"
                    :key="`${sections.guid}-desktop`"
                    :sections="sections"
                    />
                </template>
        </template>
    </div>
</template>
<script>

import HeaderDetailFlights from './HeaderDetailFlights'
import HeaderDetails from '../common/HeaderDetails'
import DetailCompany from './DetailCompany'
import DetailFlightDesktop from './DetailFlightDesktop'
import DetailFlightMobile from './DetailFlightMobile'


export default {

    data(){
        return{
            placement:false,
            full_cover:'',
            debug_id: this.$store.state.data_ssr.booking_code
        }
        
    },
    components:{
        'header-detail-flights': HeaderDetailFlights,
        'header-details': HeaderDetails,
        'detail-flight-mobile':DetailFlightMobile,
        'detail-flight-desktop':DetailFlightDesktop,
        'detail-company':DetailCompany
    },
 
   computed:{
       getFligths(){
         return this.$store.state.api_data.services.flights
       },
       //no aplica a este nivel
       getGeneralDetails(){
         return this.$store.state.api_data.generalDetails
       },
   },
   
}
</script>
<style lang="less">
 @import '../../../styleguide/src/assets/icons.less';
.details-flight{
    &-mobile{
      // display: block;
    }
    &-desktop{
      display: none;
    }
}

@media @l-up {
  .details-flight{
      &-mobile{
        display: none;
      }
      &-desktop{
        // background-color: aqua;
        // margin-bottom: 2rem;
        display: flex;
        flex-flow: column;
      }
  }
}
</style>