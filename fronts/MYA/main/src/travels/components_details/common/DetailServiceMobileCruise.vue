<template>
<div class="dtls_services_mb _wrap">
    
    <div class="dtls_services_mb-start">
        <div class="dtls_services_mb-start-icon">
            <slot name="icon_start"/>
            </div>
        <div class="dtls_services_mb-start-line">
                <div class="dtls_services_mb-start-line-circle">
                 o
                 </div>
                 <div class="dtls_services_mb-start-line-dot">
                 </div>

             </div>
        <div class="dtls_services_mb-start-resume">
            <slot name="resume_start"/>
        
         
        </div>
    </div>
    <div v-if="sections.travelTime" class="dtls_services_mb-duration">
        <div class="dtls_services_mb-duration-icon"/>
            <div class="dtls_services_mb-duration-line">
                
                    <div class="dtls_services_mb-duration-line-dot"/>   

            </div>
        
        <div class="dtls_services_mb-duration-resume">
            <div class="dtls_services_mb-duration-resume-label">
                 {{ $t('travels.travel_duration') }}
                </div>
            <div class="dtls_services_mb-duration-resume-data">
                 {{sections.travelTime}}
                </div>
            
        </div>
    </div>
    <div class="dtls_services_mb-stopover"></div>
    <div class="dtls_services_mb-end">
            <div class="dtls_services_mb-end-icon">
                 <slot name="icon_end"/>
             </div>
            <div class="dtls_services_mb-end-line">
                 <div class="dtls_services_mb-end-line-dot">
                 </div>
                <div class="dtls_services_mb-end-line-circle">
                 o
                 </div>
                

             </div>
            <div v-if="$slots.resume_end" class="dtls_services_mb-end-resume">
                <slot name="resume_end"/>
            </div>
            <div v-if="$slots.resume_end_cruise" class="dtls_services_mb-end-resume_cruise">
                <slot name="resume_end_cruise"/>
            </div>
    </div>
</div>
</template>
<script>
import DetailServiceResume from './DetailServiceResume'
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
        'detail-service-resume':DetailServiceResume
    }
}
</script>
<style lang="less">
@import '../../../styleguide/src/assets/icons.less';
@import '../../../styleguide/src/assets/variables.less';
</style>
<style lang="less" scoped>
 @import '../../../styleguide/src/assets/icons.less';
 .dtls_services_mb{
     &._wrap{
         padding: 1rem;
     }
     &-start{
         display: flex;
         flex-flow: row;
         &-icon{
             padding-top: .5rem;
             flex:4;
             font-size: 24px;
             display:flex;
             justify-content: flex-end;
             align-items: flex-start;
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
             flex:4;
             
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
             padding-bottom: 1rem;
             
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
        //  background-color: skyblue;
         &-icon{
            flex:4;
            display:flex;
            justify-content: flex-end;
            align-items: flex-end;
            //padding-bottom: 2.5rem;
            font-size: 24px;
         }
        &-line{
            display: flex;
            flex-flow: column;
             flex:1;
             padding-bottom: .5rem;
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
         &-resume_cruise{
             padding-left:1rem;
             flex:8;
             padding-top:.5rem;
             //padding-bottom: 1rem;
            font-size: 12px;
            font-weight: 400;
             
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