<template>
    <div class="header_reserv_num_v2">
            
        <div class="header_reserv_num_v2-wrapper">
          <div class="header_reserv_num_v2-logo">
                    <img 
                    class="header_reserv_num_v2-logo-image"
                    :src="`${$assets_base}/stylesheets/images/my_account/travels/viajes_corte_ingles.png`" />
            </div>

            <div class="header_reserv_num_v2-group_date">
                        <span class="header_reserv_num_v2-group_date _label">
                        {{ $t('travels.order_date') }}
                        </span>
                        <span class="header_reserv_num_v2-group_date _data">
                            <slot name="reserv-date"/>
                        </span>
                        
            </div> 

            <div class="header_reserv_num_v2-group_num">
                        <span class="header_reserv_num_v2-group_num _label">
                        {{ $t('travels.with_number') }}
                        </span>
                        <span class="header_reserv_num_v2-group_num _data">
                            <slot name="reserv-num"/>
                        </span>
                        
            </div> 
        </div>
            <div class="header_reserv_num_v2-line"/> 
            <div class="header_reserv_num_v2-reserv_state">
                <span class="header_reserv_num_v2-reserv_state _label">
                     {{ $t('travels.bookingState') }}
                </span>
                <span class="header_reserv_num_v2-reserv_state _data">
                     <div :class="`state-booking-${booking_status}`" >
                        <slot name="booking-status"/>
                     </div>
                </span>
            </div>
        
       
    </div> 
           
</template>
<script>

export default {
    props:{
        booking_status:{
            type: String,
            default: 'normal'
        }
    },
}
</script>

<style lang="less">
@import '../../../styleguide/src/assets/icons.less';

state-booking-v2{
            color: #8F8F8F;
            font-size: 11px;
            font-weight: 400;
            &-normal{
                font-size: 11px;
            font-weight: 400;
                color: #8F8F8F
            }
             &-confirm{
                 font-size: 11px;
            font-weight: 400;
            color: #31AF6A
            }
             &-unpaid{
                 font-size: 11px;
            font-weight: 400;
            color: #CF8E08
            }
             &-enjoyed{
                 font-size: 11px;
            font-weight: 400;
            color: #8F8F8F
            }
             &-canceled{
                 font-size: 11px;
            font-weight: 400;
            color: #FC4965
            }
            
        }
.header_reserv_num_v2{
    padding-left: 1rem;
    padding-right: 1rem;
    &-wrapper{
        // height: 70px;
        display: flex;
        flex-flow: column;
       
    }
    &-logo{
        height: 70px;
        padding-top: 1rem;
        &-image{
            width: 150px;
        }
    }
     &-line{
            border-bottom: solid 1px;
            color:#F0F0F0;
            padding-top: 1rem;
            padding-left: 1rem;
        }
    &-group_date{
        
        display: flex;
        flex-flow: column;
        font-size: 13px;
        height: 54px;
        justify-content: flex-end;
        //padding-left: 1rem;
        // background-color: aquamarine;
        // span{
        //     padding-left: 1rem;
        // }
        &._label{
            color: #484848;
            height: auto;
            padding: 0;
        }
        &._data{
           font-size: 14px;
           font-weight: 400;
           height: auto;
           padding: 0;
        }
    }
    &-group_num{
        
        display: flex;
        flex-flow: column;
        font-size: 13px;
        height: 54px;
        justify-content: flex-end;
        //padding-left: 1rem;
        // background-color: aquamarine;
        &._label{
            color: #484848;
            height: auto;
            padding: 0;
        }
        &._data{
           font-size: 14px;
           font-weight: 400;
           height: auto;
           padding: 0;
        }
    }
    &-reserv_state{
        height: 62px;
        display: flex;
        flex-flow: column;
        justify-content: center;
         &._label{
            color: #484848;
            height: auto;
           
            font-size: 12px;
        }
        &._data{
           font-size: 12px;
           font-weight: 400;
           
           height: auto;
        }
    }
   
}
@media @l-up {
    .header_reserv_num_v2{
        padding-left: 2rem;
        padding-right: 2rem;
         &-wrapper{
            display: flex;
            flex-flow: row;
           
        }
         &-logo{
                width: 208px;
            }
    }
}

</style>