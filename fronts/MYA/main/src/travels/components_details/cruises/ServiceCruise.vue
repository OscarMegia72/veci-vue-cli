<template>

    <div >
         <template  v-for="(cruise,idx) in getCruises">
              <header-details :key="`${idx}-cruise`">
                    <template slot="icon">
                      <span class="icon-veci-cruise" />
                    </template>
                      <template slot="dates">
                        {{cruise.departureDate}} - {{getGeneralDetails.returnDate}}
                      </template>
                      <template slot="title">
                        {{getGeneralDetails.title}}
                      </template> 
                      <template slot="status">
                          <div class="header_details-wrapper-info-data-booking_status" :class="cruise.status.class">
                          {{cruise.status.description}}
                      </div>
                        
                      </template> 
                      <template slot="departure_date">
                        {{cruise.departureDate}} {{cruise.departureTime}} h
                      </template>
                      <template v-if="cruise.locatorNumber" slot="locator_number">
                        {{cruise.locatorNumber}}
                      </template>
                      <template slot="passengers">
                      {{getTravelers.travellersNumber}}
                      </template>
              </header-details>
              <detail-cruise
              :cruise="cruise"
              :key="`${cruise.ServiceId}-cruise`"
              />
          </template>


    </div>
</template>
<script>

import DetailsCruise from './DetailsCruise'
import HeaderDetails from '../common/HeaderDetails'

export default {

    data(){
        return{
            debug_id: this.$store.state.data_ssr.booking_code
        }
        
    },
     components:{
        'header-details': HeaderDetails,
        'detail-cruise': DetailsCruise,
        
    },
    
 
   computed:{
     getGeneralDetails(){
       return this.$store.state.api_data.generalDetails;
     },
       getCruises(){
         return this.$store.state.api_data.services.cruises
       },
       getTravelers(){
         return this.$store.state.api_data.travellers
       }
   },
   
}
</script>
<style lang="less">
 @import '../../../styleguide/src/assets/icons.less';
</style>