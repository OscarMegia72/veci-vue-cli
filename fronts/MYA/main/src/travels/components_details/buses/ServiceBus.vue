<template>

    <div class="details-train">
     
        <template  v-for="(bus,idx) in getBuses">
              <header-details
              :key="idx"
              >
                  <template slot="icon">
                    <span class="icon-Coche" />
                  </template>
                  
                    <template slot="dates">
                      {{bus.departureDate}}
                    </template>
                    <template slot="title">
                      {{bus.originCity}} -> {{bus.destinationCity}}
                    </template>

                    <template slot="arrival_date_label">
                     <!-- {{ $t('travels.arrival_date') }} -->
                     Salida
                  </template>
                    <template slot="arrival_date">
                      {{bus.arrivalDate}}, {{bus.arrivalTime}}
                    </template>
                    <template slot="locator_number">
                      {{bus.locatorNumber}}
                    </template>
              </header-details>
              <template v-for="(segment,idx) in bus.segments">
                <detail-bus :key="idx">
                  <template slot="company_label">
                    Compañia
                  </template>
                  <template slot="company_data">
                    {{bus.company.name}}
                  </template>
                </detail-bus>
                <detail-service-mobile class="details-train-mobile" 
                  :sections="segment"
                 :key="idx"
                  >
                  <template slot="icon_start">
                    <span class="icon-Coche" />
                  </template>
                  <template slot="icon_end">
                    <span class="icon-Coche" />
                  </template>
                  <template slot="resume_start">
                      <detail-service-resume
                        :terminal="false"
                       
                        >
                            <template slot="Date">
                              {{segment.departureDate}}
                          </template>
                          <template slot="Time">
                              {{segment.departureTime}}
                          </template>
                          <template slot="City">
                              {{segment.departureCity}}
                          </template>
                          </detail-service-resume>
                  </template>
                  <template slot="resume_end">
                    <detail-service-resume
                    :terminal="false"
                    >
                        <template slot="Date">
                            {{segment.arrivalDate}}
                        </template>
                        <template slot="Time">
                            {{segment.arrivalTime}}
                        </template>
                        <template slot="City">
                            {{segment.arrivalCity}}
                        </template>
                        
                    </detail-service-resume>
                  </template>
                </detail-service-mobile>
                <!--DETAIL SERVICE DESKTOP-->
                <detail-service-desktop 
                class="details-train-desktop"
                :sections="segment"
                :key="idx"
                >

                  <template slot="icon_start">
                    <span class="icon-Coche" />
                  </template>
                  <template slot="icon_end">
                    <span class="icon-Coche" />
                  </template>
                  <template slot="resume_start">
                      <detail-service-resume
                        :terminal="false"
                        :align_items="'right'"
                        >
                            <template slot="Date">
                              {{segment.departureDate}}
                          </template>
                          <template slot="Time">
                              {{segment.departureTime}}
                          </template>
                          <template slot="City">
                               {{segment.departureCity}}
                          </template>
                          </detail-service-resume>
                  </template>
                  <template slot="resume_end">
                    <detail-service-resume
                    :terminal="false"
                    >
                        <template slot="Date">
                            {{segment.arrivalDate}}
                        </template>
                        <template slot="Time">
                            {{segment.arrivalTime}}
                        </template>
                        <template slot="City">
                             {{segment.arrivalCity}}
                        </template>
                        
                    </detail-service-resume>
                  </template>




                </detail-service-desktop>
              </template>
        </template>
    </div>
</template>
<script>
import HeaderDetails from '../common/HeaderDetails'
import DetailBus from './DetailBus'
import DetailServiceMobile from '../common/DetailServiceMobile'
import DetailServiceDesktop from '../common/DetailServiceDesktop'
import DetailServiceResume from '../common/DetailServiceResume'
export default {
    components:{
        'detail-bus' : DetailBus,
        'header-details': HeaderDetails,
        'detail-service-mobile': DetailServiceMobile,
        'detail-service-desktop': DetailServiceDesktop,
        'detail-service-resume': DetailServiceResume
    },
 
   computed:{
       getBuses(){
         return this.$store.state.api_data.services.buses
       },
       //no aplica a este nivel
       getGeneralDetails(){
         return this.$store.state.api_data.generalDetails
       },
   },
   
}
</script>

<style lang="less">
//  @import '../../../styleguide/src/assets/icons.less';
@import '../../../styleguide/src/assets/icons.less';

.details-train{
   
    &-desktop{
      display: none;
    }
}

@media @l-up {
  .details-train{
      &-mobile{
        display: none;
      }
      &-desktop{
        display: flex;
        flex-flow: column;
      }
  }
}
</style>