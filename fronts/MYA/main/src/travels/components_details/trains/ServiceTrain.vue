<template>

    <div class="details-train">
        <template  v-for="train in getTrains">
          <template v-for="(segment,idx) in train.segments">
            <!--HEADER QUE SIEMPRE SE REPITE POR MODELO DE DATOS-->
            <header-details
              :key='`${idx}-segment-header-details`'
            >
                  <template slot="icon">
                    <span class="icon-veci-train" />
                  </template>
                    <template slot="dates">
                      {{segment.departureDate}}
                    </template>
                    <template slot="title">
                      {{segment.originCity}} -> {{segment.destinationCity}}
                    </template>
                    <template slot="status">
                          <div class="header_details-wrapper-info-data-booking_status" :class="train.status.class">
                          {{train.status.description}}
                        </div>
                    </template> 
                    <template slot="arrival_date_label">
                    {{ $t('travels.arrival_date') }} 
                  </template>
                    <template slot="arrival_date">
                      {{segment.arrivalDate}}, {{segment.arrivalTime}}
                    </template>
                    <template slot="locator_number">
                      {{train.locatorNumber}}
                    </template>
                </header-details>
                <detail-train
                  :key='`${idx}-segment-detail-train`'
                />
                 <!--DETALLE PARA VERSION mobile-->
                <detail-service-mobile class="details-train-mobile" 
                  :sections="segment"
                  :key='`${idx}-segment-mobile-train`'
                 
                  >
                  <template slot="icon_start">
                    <span class="icon-veci-train" />
                  </template>
                  <template slot="icon_end">
                    <span class="icon-veci-train" />
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
                              {{segment.originCity}}
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
                            {{segment.destinationCity}}
                        </template>
                        
                    </detail-service-resume>
                  </template>
                </detail-service-mobile>
                <!--DETALLE PARA VERSION DESKTOP-->
                <detail-service-desktop class="details-train-desktop"
                :sections="segment"
                :key='`${idx}-segment-desktop-train`'
                >

                  <template slot="icon_start">
                    <span class="icon-veci-train" />
                  </template>
                  <template slot="icon_end">
                    <span class="icon-veci-train" />
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
                              {{segment.originCity}}
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
                            {{segment.destinationCity}}
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
import DetailTrain from './DetailTrain'
import DetailServiceMobile from '../common/DetailServiceMobile'
import DetailServiceDesktop from '../common/DetailServiceDesktop'
import DetailServiceResume from '../common/DetailServiceResume'
export default {
    components:{
        'detail-train' : DetailTrain,
        'header-details': HeaderDetails,
        'detail-service-mobile': DetailServiceMobile,
        'detail-service-desktop': DetailServiceDesktop,
        'detail-service-resume': DetailServiceResume
    },
 
   computed:{
       getTrains(){
         return this.$store.state.api_data.services.trains
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
.details-train{
    &-mobile{
      // display: block;
    }
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