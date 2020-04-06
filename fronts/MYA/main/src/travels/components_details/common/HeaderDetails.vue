<template>
    <div class="header_details-wrapper">
        <div class="header_details-wrapper-icon">
           
            <slot name="icon"/>
        </div>
        <div class="header_details-wrapper-info">
            <div class="header_details-wrapper-info-data">
                <div class="header_details-wrapper-info-data-dates">
                    <slot name="dates"/>
                </div>
                
                <div class="header_details-wrapper-info-data-title" data-cy="header-details-title">
                    <slot name="title"/>
                </div> 
               
                <div class="header_details-wrapper-info-data-category_stars">
                    <slot name="category_stars"/>
                </div>
                <!-- <div class="header_details-wrapper-info-data-booking_status"> -->
                        <slot name="status"/>
                <!-- </div> -->
            </div>
           
                <div class="header_details-wrapper-info-locator">
                    <template v-if="$slots.departure_date">
                        <div class="header_details-wrapper-info-locator-departure_date">
                                <span class="header_details-wrapper-info-locator-departure_date _label">
                                   Salida
                                </span>
                                <div class="header_details-wrapper-info-locator-departure_date _data">
                                
                                    <slot name="departure_date"/> 

                                </div>
                        </div>
                    </template>
                    <template v-if="$slots.address_name_street">
                        <div class="header_details-wrapper-info-locator-address">
                                <span class="header_details-wrapper-info-locator-address _label">
                                    {{ $t('travels.address') }}
                                </span>
                                <div class="header_details-wrapper-info-locator-address-data">
                                <span class="header_details-wrapper-info-locator-address-data _street">
                                    <slot name="address_name_street"/> 
                                </span>
                                <span class="header_details-wrapper-info-locator-address-data _detail">
                                    <slot name="address_name_detail"/> 
                                </span>
                                </div>
                        </div>
                    </template>
                    <template v-if="$slots.arrival_date">
                            <div class="header_details-wrapper-info-locator-time_arrival">
                                <span class="header_details-wrapper-info-locator-time_arrival _label">
                                    
                                    <slot name="arrival_date_label"/>
                                    </span>
                                    <span class="header_details-wrapper-info-locator-time_arrival _data">
                                    
                                            <slot name="arrival_date"/>
                                        
                                        </span>
                            </div>
                    </template>
                    <template v-if="$slots.passengers">
                        <div  class="header_details-wrapper-info-locator-passenger">
                            <span class="header_details-wrapper-info-locator-passenger _label">
                                {{ $t('travels.travellers') }}
                                </span>
                                <span class="header_details-wrapper-info-locator-passenger _data">
                                    <span> 
                                        <slot name="passengers"/>
                                        </span>
                                        &nbsp;
                                {{ $t('travels.passengers') }}
                                    </span>
                        </div>
                    </template>
                    <template v-if="$slots.guests">
                        <div  class="header_details-wrapper-info-locator-passenger">
                            <span class="header_details-wrapper-info-locator-passenger _label">
                                {{ $t('travels.travellers') }}
                                </span>
                                <span class="header_details-wrapper-info-locator-passenger _data">
                                    <span> 
                                        <slot name="guests"/>
                                        </span>
                                        &nbsp;
                                {{ $t('travels.guests') }}
                                    </span>
                        </div>
                    </template>
                 <div  v-if="$slots.locator_number" class="header_details-wrapper-info-locator-locator_num">
                      <span class="header_details-wrapper-info-locator-locator_num _label">
                           {{ $t('travels.locator') }}
                        </span>
                        <span class="header_details-wrapper-info-locator-locator_num _data">
                                <slot name="locator_number"/>
                        </span>
                </div>
               
            </div>
           
        </div>
          <slot name="details"/>
    </div>
</template>
<style lang="less" >
.travel{
    &-service_status{
        &-anulated{
            color:rgb(53, 85, 226);
        }
    }
}
//  @import '../../../styleguide/src/assets/icons.less';
.header_details-wrapper{
    //background-color:#FAFAFA; 
    padding: 1rem;
    display: flex;
    flex-flow: row;
   color:#484848;
    &-icon{
        // background-color: aqua;
        font-size: 24px;
        padding-right: .5rem;
        padding-left: 1rem;
    }
    &-info{
        display: flex;
        flex-flow: column;
        &-data{

            // background-color: rgb(218, 218, 218);
            min-width: 250px;
            display: flex;
            flex-flow: column;
            
            &-dates{
                font-size: 11px;
                // height: 24px;
            }
            &-title{
                font-size: 14px;
                font-weight: 400;
                // height: 16px;
            }
            &-booking_status{
                font-size: 11px;
                font-weight: 400;
                height: 24px;
                
            }
        }
        
        &-locator{
            min-width: 240px;
            &-address{
                height: 36px;
                display: flex;
                flex-flow: row;
                &._label{
                    font-size: 11px;
                    flex:3
                }
                 &-data{
                     display: flex;
                     flex-flow: column;
                     flex:7;
                     height: fit-content;
                     > span{
                         font-size: 11px;
                         height: 12px;
                     }
                   &._street{
                        
                        font-weight: 400;
                        flex:7
                   }
                   &._detail{
                       color: #8F8F8F;
                   }
                }

            }
             &-departure_date{
                    height: 24px;
                    display: flex;
                    flex-flow: row;
                &._label{
                    font-size: 11px;
                    flex:3
                }
                 &._data{
                    font-size: 11px;
                   font-weight: 400;
                   flex:7
                }
            }
           
            &-passenger{
                height: 24px;
                 display: flex;
                flex-flow: row;
                &._label{
                    font-size: 11px;
                    flex:3
                }
                 &._data{
                    
                    font-size: 11px;
                   font-weight: 400;
                   flex:7
                }

            }
            &-time_arrival{
                height: 24px;
                display: flex;
                flex-flow: row;
                &._label{
                    font-size: 11px;
                    flex:3;
                    
                }
                 &._data{
                    font-size: 11px;
                   font-weight: 600;
                   flex:7;
                   
                }

            }
            &-locator_num{
                height: 24px;
                 display: flex;
                flex-flow: row;
                &._label{
                    font-size: 11px;
                    // color: red;
                    flex:3
                }
                 &._data{
                    font-size: 11px;
                   font-weight: 400;
                   flex:7
                }

            }
        }
    }
        
   
}
@media @l-up {
   
   .header_details-wrapper{
    //    padding-bottom: 0px;
       &-info{
        flex-flow: row;
        width: 100%;
        justify-content: space-between;
        padding-right: 1rem;
        display: flex;
         &-data{
             min-width: 290px;
            max-width: 290px;
            // background-color: khaki;
            &-dates{
              
                height:inherit;
            }
            &-title{
               
            }
            &-booking_status{
               
            }
        }
        &-locator{
             width: 100%;
            // background-color: lawngreen;
            display: flex;
            flex-flow: row;
            justify-content: space-between;
            &-address{
                // background-color: rgb(113, 184, 85);
                flex-flow:column;
                
            }
             &-time_arrival{
                flex-flow: column;
            }
             &-departure_date{
                flex-flow: column;
                padding-left: 1rem;
                &._data{
                    display: block;
                }
            }
            &-passenger{
                flex-flow: column;
                padding-left: 1rem;
                // background-color: rgb(103, 185, 147);
                &._data{
                    display: block;
                }
            }
            &-locator_num{
                padding-left: 1rem;
                flex-flow: column;

            }
        }
       }
   }
}
</style>