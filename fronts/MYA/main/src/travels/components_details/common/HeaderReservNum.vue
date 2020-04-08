<template>
        <div class="header_reserv_num-wrapper">
            <div class="header_reserv_num-logo">
                <img :src="`${$assets_base}/stylesheets/images/my_account/travels/brand_mya_veci_208x90.svg`" />
            </div>
            <div class="header_reserv_num-data" data-cy="reserv-num">
                <div class="header_reserv_num-data-group">
                    <span class="header_reserv_num-data-group _label">
                        {{ $t('travels.reserv_num') }}
                    </span>
                
                    <span class="header_reserv_num-data-group _num">
                        <slot name="reserv-num"/>
                    </span>
                </div>
                <div class="header_reserv_num-data-group-date">
                    {{ $t('travels.order_date') }}
                    <slot name="reserv-date"/>
                </div>
            <div :class="`state-booking-${booking_status}`" >
                <slot name="booking-status"/>
                </div>
            </div>
            <div>
              
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
    components:{
       
    }
}
</script>

<style lang="less">
@import '../../../styleguide/src/assets/icons.less';

.state-booking{
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
.header_reserv_num-wrapper{
    display: flex;
    flex-flow: column;
    // background-color: antiquewhite;
    padding-left: 1rem;
    padding-right: 1rem;
    align-items: center;
    height: 14.0625rem;
    padding-top: 1rem;
}
.header_reserv_num-data{
    color: #242424;
    // padding-top: 1rem;
    // background-color: rgb(186, 227, 247);

        display: flex;
        flex-flow: column;
        align-items: center;
        &-group{
            display: flex;
            flex-flow:column;
            align-items: center;
            width: 100%;
            
            &._label{
                font-size: 18px;
                font-weight: 600; 
            }
           
            &._num{
                 font-size: 18px;
                 font-weight: 600;
            }
            &-date{
                padding-top: .5rem;
                color: #8F8F8F;
                font-size: 14px;
            }
        }
        &-booking_status{
                font-size: 11px;
                color:green;
                font-weight: 400;
                height: 24px;
            }
        

}
@media @l-up {
   .header_reserv_num-wrapper{
    // height: 140px;
    height: 90px;
    display: flex;
    flex-flow: row;
    // background-color: antiquewhite;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-bottom: 1rem;

    }
    .header_reserv_num-logo{
        // background-color: aqua;
        // flex:1;
        display: flex;
    }
    .header_reserv_num-data{
        // flex:2;
        // background-color: rgb(222, 170, 103);
        display: flex;
        flex-flow: column;
        justify-content: center;
        //padding-right: 6rem;
       align-items: flex-start;
        // background-color: aquamarine;
        width: 100%;
        &-group{
            // background-color: rgb(201, 240, 164);
            display: flex;
            flex-flow: row;
            width: auto;
            &._label{
                // background-color: aqua;
                font-size: 18px;
                font-weight: 400;
                width: inherit;
                display: flex;
                justify-content: flex-start;
                padding-right: .4rem;
            }
            
            &._num{
                 font-size: 18px;
                 font-weight: 400;
            }
            &-date{
                color: #8F8F8F;
                font-size: 14px;
                padding: 0;
            }
        }
    }
}
</style>