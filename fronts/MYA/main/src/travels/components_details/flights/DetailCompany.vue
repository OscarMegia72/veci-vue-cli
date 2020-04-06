<template>
<div class="details-company">
    <div class="details-company-wrap">
        <div class="details-company-wrap-logo">
            <div class="details-company-wrap-logo-image">
                <slot name="company-logo"/>
            </div>
        </div>
        <div class="details-company-wrap-number">
            <span class="details-company-wrap-number-label">
                {{ $t('travels.number_flight') }}
            </span>
            <span class="details-company-wrap-number-data">
                
                <slot name="number-flight"/>
            </span>
        </div>
        <!-- <div v-if="$slots.class_name" class="details-company-wrap-class"> -->
        <div v-if="$slots.class_name" class="details-company-wrap-class">
            <span class="details-company-wrap-class-label">
                {{ $t('travels.class') }}
            </span>
            <span class="details-company-wrap-class-data">
                <slot name="class_name"/>
            </span>
        </div>
        <!-- <div v-if="$slots.checked_luggage_number" class="details-company-wrap-luggage"> -->
        <div v-if="$slots.checked_luggage_number" class="details-company-wrap-luggage">
            <span class="details-company-wrap-luggage-label">
                {{ $t('travels.checkedLuggage') }}
            </span>
            <span class="details-company-wrap-luggage-data">
                <span class="details-company-wrap-luggage-data">
                    <slot name="checked_luggage_number"/>
                </span>
                &nbsp;
                {{ $t('travels.checkedLuggageNumber') }}
            </span>
        </div>
        
    </div>
    <div class="details-company-line"/>
</div>
</template>
<script>

export default {

}
</script>
<style lang="less">
 @import '../../../styleguide/src/assets/icons.less';
 .details-company{
      padding-left: 1rem;
        padding-right: 1rem;
        padding-top: 1rem;
    &-wrap{
        font-size: 11px;
        span{
            display: flex;
                align-items: flex-end;
        }
        &-logo{
                padding-left: 6.5rem;
                &-image{
                       
                        width: 75px;
   
                }
            }
        &-number{
            display: flex;
            flex-flow: row;
            height: 24px;
            
            
            &-label{
                width:6.5rem;
                
            }
            &-data{
                display: flex;
            
                font-weight: 400;
            }
        }
        &-class{
            display: flex;
            flex-flow: row;
            height: 24px;
            &-label{
                width:6.5rem;
            }
            &-data{

                font-weight: 400;
            }
        }
        &-luggage{
            display: flex;
            flex-flow: row;
            height: 24px;
            &-label{
                width:6.5rem;
            }
            &-data{

                font-weight: 400;
            }
        }
       
        
    } 
     &-line{
         margin-top: 1rem;
            border-bottom: solid 1px;
            color:#F0F0F0;
        }
 }
@media @l-up {
.details-company{
        padding-top: 0;
        padding-left: 2rem;
        padding-right: 2rem;
        &-wrap{
            height: 64px;
            font-size: 11px;
            display: flex;
            flex-flow: row;
            align-items: center;
            &-logo{
                padding-left: 0;
                &-image{
   
                        width: 75px;


                }
            }
        
            &-number{
                padding-left: 1rem;
                flex-flow: column;
                height: 24px;
                width: 5.25rem;
                &-label{
                    width:6.5rem;
                }
                &-data{

                    font-weight: 400;
                }
            }
            &-class{
                padding-left: 1rem;
                width: 5.25rem;
                flex-flow: column;
                height: 24px;
                
            }
            &-luggage{
                padding-left: 1rem;
                width: 5.25rem;
                flex-flow: row;
                height: 24px;
                flex-flow: column;
                
            } 
        }
         &-line{
             margin-top: 0;
            border-bottom: solid 1px;
            color:#F0F0F0;
        }
    
 }
 
}

 </style>

 
