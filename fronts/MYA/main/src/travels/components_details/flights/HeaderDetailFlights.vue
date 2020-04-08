<template>
    <div class="fligth-wrapper">
        <div class="fligth-wrapper-icon">
            <span class="icon-Avion" />
        </div>
        <div class="fligth-wrapper-info">
            <div class="fligth-wrapper-info-data">
                <div class="fligth-wrapper-info-data-dates">
                    <slot name="dates"/>
                </div>
                <div class="fligth-wrapper-info-data-title">
                    <slot name="title"/>
                </div> 
                <div class="fligth-wrapper-info-data-booking_status">
                <!-- <slot name="booking-status"/> -->
                </div>
            </div>
            <div class="fligth-wrapper-info-locator">
                <div class="fligth-wrapper-info-locator-time_arrival">
                    <span class="fligth-wrapper-info-locator-time_arrival _label">
                          {{ $t('travels.arrival_date') }}
                        </span>
                        <span class="fligth-wrapper-info-locator-time_arrival _data">
                        
                                <slot name="arrival_date"/>
                              
                            </span>
                </div>
                 <div class="fligth-wrapper-info-locator-passenger">
                      <span class="fligth-wrapper-info-locator-passenger _label">
                          {{ $t('travels.travellers') }}
                        </span>
                        <span class="fligth-wrapper-info-locator-passenger _data">
                            <span> 
                                <slot name="passengers"/>
                                </span>
                                &nbsp;
                         {{ $t('travels.passengers') }}
                            </span>
                </div>
                 <div class="fligth-wrapper-info-locator-locator_num">
                      <span class="fligth-wrapper-info-locator-locator_num _label">
                           {{ $t('travels.locator') }}
                        </span>
                        <span class="fligth-wrapper-info-locator-locator_num _data">
                                <slot name="locator-number"/>
                        </span>
                </div>
               
            </div>
           
        </div>
          <slot name="details"/>
    </div>
</template>

<style lang="less">
 @import '../../../styleguide/src/assets/icons.less';
.fligth-wrapper{
    background-color:#FAFAFA; 
    padding: 1rem;
    display: flex;
    flex-flow: row;
   color:#484848;
    &-icon{
        // background-color: aqua;
        font-size: 24px;
        padding-right: 1rem;
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
                height: 24px;
            }
            &-title{
                font-size: 14px;
                font-weight: 400;
                height: 16px;
            }
            &-booking_status{
                font-size: 11px;
                color:green;
                font-weight: 400;
                height: 24px;
            }
        }
        &-locator{
            min-width: 240px;
            
           
            &-passenger{
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
   .fligth-wrapper{
       padding-bottom: 0px;
       &-info{
        flex-flow: row;
        width: 100%;
        justify-content: space-between;
        padding-right: 1rem;
         &-data{
            
            &-dates{
              
                height:inherit;
            }
           
        }
        &-locator{
            // width: 100%;
            display: flex;
            flex-flow: row;
             &-time_arrival{
                flex-flow: column;
            }
            &-passenger{
                flex-flow: column;
                padding-left: 1rem;
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