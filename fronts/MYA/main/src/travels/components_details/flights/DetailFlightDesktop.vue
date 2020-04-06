<template>
<div>
    <div class="details-fl-desktop">
     <div class="details-fl-desktop-start-resume">
        <detail-flight-resume
            :terminal="true"
            :align_items="'right'"
            >
                <template slot="Date">
                    {{sections.departureDate}}
                </template>
                <template slot="Time">
                    {{sections.departureTime}}
                </template>
                <template slot="City">
                    {{sections.departureCity}}
                    ({{sections.departureAirport}}) 
                </template>
                <template slot="Terminal">
                    {{sections.departureTerminal}}
                </template>
            </detail-flight-resume>
    </div>
    <div class="details-fl-desktop-center-graph">
        <div class="details-fl-desktop-center-graph-duration">
            <div class="details-fl-desktop-center-graph-duration-top">
                 <img :src="`${$assets_base}/stylesheets/images/my_account/travels/_icon_fly_departure_24.svg`"/>
                    <!-- <span class="icon-veci-flight" /> -->
                 <div class="details-fl-desktop-center-graph-duration-top-resume">
                    <div class="details-fl-desktop-center-graph-duration-top-resume-label">
                        {{ $t('travels.travel_duration') }}
                        </div>
                    <div class="details-fl-desktop-center-graph-duration-top-resume-data">
                        {{sections.travelTime}}
                    </div>
                    
                </div>

                <img :src="`${$assets_base}/stylesheets/images/my_account/travels/_icon_fly_landing_24.svg`"/>
           
            </div>
            <div class="details-fl-desktop-center-graph-duration-bottom">
                <div class="details-fl-desktop-center-graph-duration-bottom-circle">
                 o
                </div>
                 <div class="details-fl-desktop-center-graph-duration-bottom-line">
                     <div class="details-fl-desktop-center-graph-duration-bottom-line-dot"/>
                 </div>
                 
                 <div class="details-fl-desktop-center-graph-duration-bottom-circle">
                 o
                </div>
            </div>  
        </div>
    </div>
    <div class="details-fl-desktop-end-resume">
    <detail-flight-resume
        :terminal="false"
        >
            <template slot="Date">
                {{sections.arrivalDate}}
            </template>
            <template slot="Time">
                 {{sections.arrivalTime}}
            </template>
            <template slot="City">
                 {{sections.destinationCity}}
            </template>
            <!--Añadido por falta de terminal de de Destino-->
             <template slot="DesAirport">
                 {{sections.destinationAirport}}
            </template>
            
        </detail-flight-resume>
    </div>
    
    </div>
    <!-- <detail-stop-over-desktop/> -->
</div>

</template>
<script>
import DetailFlightResume from './DetailFlightResume'
import DetailStopOverDesktop from './DetailStopOverDesktop'
export default {
    props:{
        sections:{
                type:Object,
                default: function () {
                return { }
                }
            }
    },
    components:{
        'detail-flight-resume':DetailFlightResume,
        'detail-stop-over-desktop': DetailStopOverDesktop
    }
}
</script>
<style lang="less">
 @import '../../../styleguide/src/assets/icons.less';

 .details-fl-desktop{
      padding: 1rem;
         padding-left: 2rem;
         padding-right: 2rem;
          display: flex;
        justify-content: center;
        // background-color: rgb(219, 219, 219);
         flex-flow: row;
    &-start-resume{
            display: flex;
            padding-right: .5rem;
              width: 14.625rem;
              justify-content: flex-end;
            //   background-color: aquamarine;
    }
    &-center-graph{
        width: 14.625rem;
        // background-color: cadetblue;
        &-duration{
            // background-color: rgb(228, 218, 130);
            &-top{
                display: flex;
                flex-flow: row;
                justify-content: space-between;
                        &-resume{
                            display: flex;
                            flex-flow: column;
                            align-items: center;
                            font-size: 11px;
                            &-label{
                                    
                            }
                            &-data{
                                font-weight: 400;
                            }
                }
            
            }
            &-bottom{
                display: flex;
                flex-flow: row;
                justify-content: space-between;
                &-circle{
                 font-size: 9px;
                 font-weight: 600;
                }
                &-line{
                    padding-top: 1px;
                     width: 100%;
                     display: flex;
                    align-items: center;
                    &-dot{
                        border: 0;
                        width: 100%;
                        border-bottom: dotted 1px;
                    }
                }
            }
           
        }
    }
    &-end-resume{
            display: flex;
              width: 14.625rem;
              justify-content: flex-start;
            //  background-color: aquamarine;
             padding-left: .5rem;
    }



 }
 .details-fl-desktop-stopover{
    margin-left: 2rem;
    margin-right: 2rem;
     padding-top: 1.5rem;
     &-item{
         height:6rem;
         background-color: #F9F9F9;
         margin-bottom: .25em;
     }

 }

 </style>