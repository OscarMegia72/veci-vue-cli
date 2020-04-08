<template>
<div>
    <div class="dtls_services_dsk">
     <div class="dtls_services_dsk-start-resume">
          <slot name="resume_start"/>
    </div>
    <div class="dtls_services_dsk-center-graph">
        <div class="dtls_services_dsk-center-graph-duration">
            <div class="dtls_services_dsk-center-graph-duration-top">
                  <slot name="icon_start"/>

                 <div class="dtls_services_dsk-center-graph-duration-top-resume">
                    <div class="dtls_services_dsk-center-graph-duration-top-resume-label">
                        {{ $t('travels.travel_duration') }}
                        </div>
                    <div class="dtls_services_dsk-center-graph-duration-top-resume-data">
                        {{sections.travelTime}}
                    </div>
                    
                </div>
                     <slot name="icon_end"/>
            </div>
            <div class="dtls_services_dsk-center-graph-duration-bottom">
                <div class="dtls_services_dsk-center-graph-duration-bottom-circle">
                 o
                </div>
                 <div class="dtls_services_dsk-center-graph-duration-bottom-line">
                     <div class="dtls_services_dsk-center-graph-duration-bottom-line-dot"/>
                 </div>
                 
                 <div class="dtls_services_dsk-center-graph-duration-bottom-circle">
                 o
                </div>
            </div>  
        </div>
    </div>
    <div v-if="$slots.resume_end" class="dtls_services_dsk-end-resume">
        <slot name="resume_end"/>
    </div>
     <div v-if="$slots.resume_end_cruise" class="dtls_services_dsk-end-resume_cruise">
                <slot name="resume_end_cruise"/>
            </div>
    
    </div>
    <!-- <detail-stop-over-desktop/> -->
</div>

</template>
<script>
// import DetailFlightResume from './DetailFlightResume'
// import DetailStopOverDesktop from './DetailStopOverDesktop'
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
        // 'detail-flight-resume':DetailFlightResume,
        // 'detail-stop-over-desktop': DetailStopOverDesktop
    }
}
</script>
<style lang="less">
@import '../../../styleguide/src/assets/icons.less';
@import '../../../styleguide/src/assets/variables.less';
</style>
<style lang="less">
//  @import '../../../styleguide/src/assets/icons.less';

 .dtls_services_dsk{
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
                font-size: 24px;
                justify-content: space-between;
                        &-resume{
                            display: flex;
                            flex-flow: column;
                            align-items: center;
                            font-size: 11px;
                           
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
    &-end-resume_cruise{
        // display: flex;
        // align-items: flex-end;

        padding-left:1rem;
             flex:8;
             padding-top:1.5rem;
             //padding-bottom: 1rem;
            font-size: 12px;
            font-weight: 400;
    }



 }
 .dtls_services_dsk-stopover{
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