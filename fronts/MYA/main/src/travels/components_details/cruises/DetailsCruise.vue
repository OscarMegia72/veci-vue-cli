<template>
    <div class="detail_cruise">
        <div class="detail_cruise-item_wrap">
                <div class="detail_cruise-item_wrap-group">
                        <item-detail>
                            <template slot="item_detail_label">
                                {{ $t('travels.company') }} 
                                
                            </template>
                            <template slot="item_detail_data">
                                {{cruise.company.name}}
                            </template>
                        </item-detail>
                        <item-detail>
                            <template slot="item_detail_label">
                                 {{ $t('travels.boat') }} 
                            </template>
                            <template slot="item_detail_data">
                                {{cruise.boat.name}}
                            </template>
                        </item-detail>
                        
                </div>
                <div class="detail_cruise-line"/>
                <div class="detail_cruise-item_wrap-group">
                    <item-detail>
                        <template slot="item_detail_label">
                        {{ $t('travels.deck') }} 
                        </template>
                        <template slot="item_detail_data">
                            {{cruise.deckDescription}}
                        </template>
                    </item-detail>
                    <item-detail>
                        <template slot="item_detail_label">
                        {{ $t('travels.cabin') }} 
                        </template>
                        <template slot="item_detail_data">
                            {{cruise.cabinDescription}}
                        </template>
                    </item-detail>
                   
                 </div>
                  <div class="detail_cruise-line"/>
        </div>
          <!-- DETAIL SERVICE mobile -->
            <detail-service-mobile-cruise class="detail_cruise-mobile"  :sections="cruise">
                <template slot="icon_start">
                    <span class="icon-veci-cruise" />
                  </template>
                  <template slot="icon_end">
                    <span class="icon-veci-cruise" />
                  </template>
                  <!-- ZONA HORARIOS -->
                  <template slot="resume_start">
                      <detail-service-resume
                        :terminal="false"
                       
                        >
                            <template slot="Date">
                              {{cruise.departureDate}}
                          </template>
                          <template slot="Time">
                              {{cruise.departureTime}}
                          </template>
                          <template slot="City">
                              {{cruise.originPort}}
                          </template>
                          </detail-service-resume>
                  </template>
                  <template slot="resume_end_cruise">
                    {{cruise.destinationPort}}
                  </template>
            </detail-service-mobile-cruise>
       <!-- END SERVCE mobile -->
        <!-- DETAIL SERVICE DESKTOP -->
        <detail-service-desktop class="detail_cruise-desktop" :sections="cruise">
            <template slot="icon_start">
                    <span class="icon-veci-cruise" />
                  </template>
                  <template slot="icon_end">
                    <span class="icon-veci-cruise" />
                  </template>
                  <!-- ZONA HORARIOS -->
                  <template slot="resume_start">
                      <detail-service-resume
                        :terminal="false"
                       :align_items="'right'"
                        >
                            <template slot="Date">
                              {{cruise.departureDate}}
                          </template>
                          <template slot="Time">
                              {{cruise.departureTime}}
                          </template>
                          <template slot="City">
                              {{cruise.originPort}}
                          </template>
                          </detail-service-resume>
                  </template>
                  <template slot="resume_end_cruise">
                    {{cruise.destinationPort}}
                  </template>
         </detail-service-desktop>
        <!-- END SERVCE DESKTOP -->
        <div class="detail_cruise-line"/>
        <div class="detail_cruise-stop_over">
            <p class="detail_cruise-stop_over-label">{{ $t('travels.stopOvers') }}: </p>
            <p class="detail_cruise-stop_over-data">{{cruise.stopoverCitiesString}} </p>
        </div>
         <div class="detail_cruise-line"/>
         <div class="detail_cruise-info">
             <template v-if="cruise.company.url">  
                 <eci-link 
                  :href="`${cruise.company.url}`" 
                  :type="'_primary _cta'">
                 {{ $t('travels.cruiseCompanyInfo') }}
                  </eci-link>
             </template>
             <template v-if="cruise.boat.url">  
                  <eci-link 
                  :href="`${cruise.boat.url}`" 
                  :type="'_primary _cta'">
                 {{ $t('travels.boatCompanyInfo') }}
                  </eci-link>
            </template>
         </div>
    </div>
    
</template>
<script>
import ItemDetail from '../common/ItemDetail'
import Link from '../../../styleguide/src/components/blocks/Link.vue';
import DetailServiceMobileCruise from '../common/DetailServiceMobileCruise'
import DetailServiceDesktop from '../common/DetailServiceDesktop'
import DetailServiceResume from '../common/DetailServiceResume'
export default {
    props:{
        cruise:{
             type: Object,
             default:()=>({})
        }
    },
    components:{
        'item-detail': ItemDetail,
        'eci-link':Link,
        'detail-service-mobile-cruise': DetailServiceMobileCruise,
        'detail-service-desktop': DetailServiceDesktop,
        'detail-service-resume': DetailServiceResume
    } ,
    computed:{
        getStopOver(){
            return this.cruise.stopoverCities.join()
        }
    }
}
</script>
<style lang="less" >
@import '../../../styleguide/src/assets/icons.less';
@import '../../../styleguide/src/assets/variables.less';
.detail_cruise{
    // background-color: rgb(224, 147, 46);
    display: flex;
    flex-flow: column;
    padding: 0 1rem 0 1rem;
    &-mobile{
      // display: block;
    }
    &-desktop{
      display: none;
    }
    &-line{
        // padding: 1rem;
        padding-top: 1rem;
        border-bottom: solid 1px #E1E1E1;
        // border-bottom: solid 1px red;
        // border-bottom: solid 1px rgb(196, 0, 183);
    }
    &-item_wrap{
         display: flex;
         flex-flow: column;
         &-group{
            display: flex;
            flex-flow: column;
         }
       
    }
    &-graph{
        background-color: rgb(236, 236, 236);
        padding: 1rem;
    }
    &-stop_over{
        padding: 1rem 1rem 0 1rem;
         &-label{
            font-size: 11px;
            padding-left: 0;
            height: auto;
        }
        &-data{
                height: auto;
                font-size: 11px;
                font-weight: 400;
                padding-left: 0;
        }
    }
    &-info{ 
        display: flex;
        flex-flow: column;
        height: 7rem;
        
        font-size: 12px;
        align-items: center;
        justify-content: space-evenly;

    }
}
@media @l-up {
    .detail_cruise{
        padding: 0 2rem 0 2rem;
         &-item_wrap{
            flex-flow: column;
            &-group{
           flex-flow: row;
         }
        }
        &-info{
            height: 50px;
            justify-content: flex-end;
            padding: 0 1rem 0 1rem;
            flex-flow: row;
            justify-content: space-evenly;
            padding-left: 15rem;
        }
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
