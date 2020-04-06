<template>
<div class="details-fl _wrap">
    <div class="details-fl-start">
        <div class="details-fl-start-icon">
            <img :src="`${$assets_base}/stylesheets/images/my_account/travels/_icon_fly_departure_24.svg`"/>
              <!-- <span class="icon-veci-flight" /> -->
             </div>
        <div class="details-fl-start-line">
                <div class="details-fl-start-line-circle">
                 o
                 </div>
                 <div class="details-fl-start-line-dot">
                 </div>

             </div>
        <div class="details-fl-start-resume">
        <detail-flight-resume
        :terminal="true"
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
    </div>
    <div class="details-fl-duration">
        <div class="details-fl-duration-icon"/>
            <div class="details-fl-duration-line">
                
                    <div class="details-fl-duration-line-dot"/>   

            </div>
        
        <div class="details-fl-duration-resume">
            <div class="details-fl-duration-resume-label">
                 {{ $t('travels.travel_duration') }}
                </div>
            <div class="details-fl-duration-resume-data">
                 {{sections.travelTime}}
                </div>
            
        </div>
    </div>
    <div class="details-fl-stopover"></div>
    <div class="details-fl-end">
            <div class="details-fl-end-icon">
            <img :src="`${$assets_base}/stylesheets/images/my_account/travels/_icon_fly_landing_24.svg`"/>
              <!-- <span class="icon-veci-flight" /> -->
            </div>
            <div class="details-fl-end-line">
                 <div class="details-fl-end-line-dot">
                 </div>
                <div class="details-fl-end-line-circle">
                 o
                 </div>
                

             </div>
            <div class="details-fl-end-resume">
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
</div>
</template>
<script>
import DetailFlightResume from './DetailFlightResume'
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
        'detail-flight-resume':DetailFlightResume
    }
}
</script>
<style lang="less">
 @import '../../../styleguide/src/assets/icons.less';
 .details-fl{
     &._wrap{
         padding: 1rem;
     }
     &-start{
         display: flex;
         flex-flow: row;
       
         &-icon{
             padding-top: 1rem;
             flex:4;
             display:flex;
             justify-content: flex-end;
             align-items: flex-start;
             font-size: 24px;
         }
         &-line{
            display: flex;
            flex-flow: column;
             flex:1;
             padding-top: 1rem;
             align-items: center;
             &-circle{
                 font-size: 9px;
                 font-weight: 600;
             }
             &-dot{
                border: 0;
                width: 1px;
                border-left: dotted 1px;
                height: 100%;
             }
             
         }
         &-resume{
             padding-left:1rem;
             flex:8;
             padding-bottom: 2rem;
            
         }
     }
     &-duration{
         display: flex;
         flex-flow: row;
         &-icon{
             flex:4
         }
         &-line{
            display: flex;
            flex-flow: column;
             flex:1;
             align-items: center;
             &-dot{
                border: 0;
                width: 1px;
                border-left: dotted 1px;
                height: 100%;
             }
             
         }
         &-resume{
             font-size: 11px;
             padding-left:1rem;
             flex:8;
              &-label{

             }
             &-data{
                 font-weight: 400;
             }
 
         }
     }
     &-stopover{
         background-color: rgb(224, 224, 224);
         padding: 2rem;
         display: none;
     }
     &-end{
         display: flex;
         flex-flow: row;
         &-icon{
            flex:4;
            display:flex;
            justify-content: flex-end;
            align-items: flex-end;
            padding-bottom: 2.5rem;
            font-size: 24px;
         }
        &-line{
            display: flex;
            flex-flow: column;
             flex:1;
             padding-bottom: 3rem;
             align-items: center;
             &-circle{
                 font-size: 9px;
                 font-weight: 600;
             }
             &-dot{
                border: 0;
                width: 1px;
                border-left: dotted 1px;
                height: 100%;
             }
             
         }
         &-resume{
             padding-left:1rem;
             flex:8;
             padding-top:2rem;
             padding-bottom: 1rem;
             
             &-label{
                 color: #484848

             }
             &-data{
                 font-weight: 400;
             }
         }
     }
 }
 </style>