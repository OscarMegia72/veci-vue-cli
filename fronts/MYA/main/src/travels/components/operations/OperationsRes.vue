<template>
<div class='operations _wrapper'>
    <operation-title>
                    <template slot='operation_title'>
                       {{ $t('travels.cancelation_modification') }}
                    </template>
    </operation-title>
    <div class="operations-info">
        <div class="operations-info-icon">
             <img :src="`${$assets_base}/stylesheets/images/my_account/icons/info-solid.svg`" />
        </div>
        <div class="operations-info-text">
             {{generalDetails.cancellationPolicies.text}}
        </div>
       
    </div>
    <!-- <div class="operations-line"/> -->
    <operation-title>
            <template slot='operation_title'>
                       {{ $t('travels.payment_resume') }}
            </template>
    </operation-title>
    <div v-if="amounts.totalPrice.amount"  class="operations-payments-total-reservation">
                <div class="operations-payments-total-reservation-label">
                    
                    {{ $t('travels.reservation-amount') }}
                </div>
                <div class="operations-payments-total-reservation-amount">
                    <eci-price 
                                :amount="amounts.totalPrice.amount"
                                :size="18"
                                :important="true"
         
                    />
                </div>
    </div>
    <div v-if="warning_pending_amounts"  class="operations-payments-total-pending">
        <!-- <div  class="operations-payments-total-pending"> -->
        <!--ZONA DE ALERTA PARA AVISO DE PAGOS -->
            <div class="operations-payments-total-pending-warning">
                <div class="operations-payments-total-pending-warning-icon">
                    <img :src="`${$assets_base}/stylesheets/images/my_account/icons/info-solid.svg`" />
                </div>
                <div class="operations-payments-total-pending-warning-message">
                     {{ $t('travels.payment-completing') }}
                </div>
            </div>
        <!--PAGOS PENDIENTES-->
        <div class="operations-payments-total-pending-wrapper_amount">
                    <div class="operations-payments-total-pending-label">
                        
                         {{ $t('travels.pending_amount') }}
                    </div>
                    <div class="operations-payments-total-pending-amount">
                        <eci-price 
                                    :amount="amounts.pendingAmount.amount"
                                    :size="18"
                                    :important="true"
            
                        />
                    </div>
            </div>
    </div>
      <div v-if="amounts.paidAmount"  class="operations-payments-total-payments_methods">
          <template v-for="(method,idx) in amounts.paidAmount.payments">
              <div class="operations-payments-total-payments_methods-wrapper" :key="idx">
                    <div class="operations-payments-total-payments_methods-method">
                        <div class="operations-payments-total-payments_methods-method-label">
                            {{ $t('travels.payment-method') }}
                        </div>
                        <div class="operations-payments-total-payments_methods-method-data">
                            {{method.paymentMethod.description}}
                        </div>
                    </div>
                    
                    <div class="operations-payments-total-payments_methods-amount">
                            <div class="operations-payments-total-payments_methods-amount-label">
                                {{ $t('travels.amount-paid') }}
                            </div>
                            <div class="operations-payments-total-payments_methods-amount-data">
                                
                                <eci-price 
                                        :amount="method.amount"
                                        :size="14"
                                        :important="true"
                
                                />
                            </div>
                    </div>
                </div>
          </template>
                
    </div>
     <div v-if="amounts.discounts"  class="operations-payments-total-discount">
         <template v-for="(discount,idx) in amounts.discounts">
              <div class="operations-payments-total-discount-wrapper"
              :key="idx"
              >
                <div class="operations-payments-total-discount-label">
                    {{discount.discountType}}
                </div>
                <div class="operations-payments-total-discount-amount">
                    <eci-price 
                                
                                :amount="discount.amount"
                                :size="18"
                                :important="true"
         
                    />
                </div>
             </div>
        </template>
    </div>
    <div class="operations-payments-total-paid">
                <div class="operations-payments-total-paid-label">
                     {{ $t('travels.amount-total') }}
                </div>
                <div class="operations-payments-total-paid-amount">
                    <eci-price 
                                :amount="amounts.paidAmount.amount"
                                :size="18"
                                :important="true"
         
                    />
                </div>
    </div>
</div>

</template>
<script>

import OperationTitle from './OperationTitle'
import Price from '../PriceTravels';

export default {
    data(){
        return{

        }
        
    },
    components:{
        'operation-title': OperationTitle,
        'eci-price': Price
    },
    computed:{
        generalDetails(){
           return this.$store.state.api_data.generalDetails 
        },
        amounts(){
           return this.$store.state.api_data.amounts
        },
        warning_pending_amounts(){
            if(this.$store.state.api_data.amounts.pendingAmount && this.$store.state.api_data.amounts.pendingAmount.amount){

                if(this.$store.state.api_data.amounts.pendingAmount.amount!='0,00'){
                    return true;
                }
            }else{
                return false;
            }
            return false;
        }
    }
}
</script>
<style scoped lang="less" >
 @import '../../../styleguide/src/assets/icons.less';
 .operations{
    font-size: 11px;
     &._wrapper{
        padding-left: 1rem;
        padding-right: 1rem;
        display: flex;
        flex-flow: column;
     }
     &-info{
         letter-spacing: 0.7px;
         font-size: 14px;
         font-weight: 200;
         display: flex;
         flex-flow: row;
         

         &-icon{
             min-width: 32px;
         }
         
     }
     
     &-line{
         padding-top: 1rem;
         border-bottom: solid 1px;
         color:#F0F0F0;
     }
     &-payments{
          &-total{
               &-reservation{
                //    background-color: aquamarine;
                   display: flex;
                   flex-flow: row;
                    justify-content: space-between;
                    align-items: baseline;
                     border-bottom: solid 1px  #F0F0F0;
                      padding-bottom: 1rem;
                    padding-top: 1rem;
                      border-bottom: solid 1px  #F0F0F0;

               }
               &-pending{
                //    background-color: rgb(127, 197, 255);
                   display: flex;
                   flex-flow: row;
                    justify-content: space-between;
                    align-items: baseline;
                    padding-bottom: 1rem;
                    padding-top: 1rem;
                     border-bottom: solid 1px  #F0F0F0;
                     display: flex;
                     flex-flow: column;
                     padding-left: 1rem;
                     &-wrapper_amount{
                         display: flex;
                         flex-flow: row;
                        justify-content: space-between;
                        width: 100%;
                     }
                    &-warning{
                        padding-bottom: .5rem;
                        display: flex;
                        flex-flow: row;
                        &-icon{
                            width: 24px;
                            padding-right: 1rem;
                        }
                        &-message{
                            font-weight: 400;
                            color:#CF8E08;
                        }
                    }

               }
               &-discount{
                //    background-color: rgb(218, 250, 239);
                   display: flex;
                   flex-flow: column;
                    justify-content: space-between;
                    align-items: baseline;
                    color:#008C2E;
                    //  padding-bottom: 1rem;
                    // padding-top: 1rem;
                    &-wrapper{
                        padding-top: 1rem;
                        display: flex;
                        flex-flow: row;
                        width: 100%;
                        justify-content: space-between;
                        align-items: flex-end;
                        padding-bottom: 1rem;
                         border-bottom: solid 1px  #F0F0F0;
                    }

               }
               &-paid{
                //    background-color: rgb(218, 250, 239);
                 text-transform: uppercase;
                   display: flex;
                   flex-flow: row;
                    justify-content: space-between;
                    align-items: baseline;
                    padding-top: 1rem;
                    &-label{
                         font-size: 13px;
                   font-weight: 400;
                   letter-spacing: .7px;
                    }

               }
               &-payments_methods{
                   padding-top: .5rem;
                   //padding-left: 1rem;
                  // padding-bottom: .5rem;
                  
                   &-wrapper{
                        border-bottom: solid 1px  #F0F0F0;
                        padding-bottom: 1rem;

                    }
                    &-method{
                           
                                padding-top: .5rem;
                                // height: 78px;
                                padding-left: 1rem;
                            
                                &-label{

                                }
                                &-data{
                                    font-weight: 600;
                                }
                                
                        }
                        &-amount{
                                
                                display: flex;
                                flex-flow: row;
                                justify-content: space-between;
                                align-items: flex-end;
                                padding-left: 1rem;
                                &-label{

                                }
                                &-data{
                                        font-weight: 600;
                                }
                        }
                

               }
          }
     }
    
    
     
     
     
     
 }
 @media @l-up {
.operations{
    
     &._wrapper{
        padding-left: 2rem;
        padding-right: 2rem;
     }
      &-info{
          padding-left: 1rem;

         &-icon{
             min-width: 32px;
             
         }
         
     }
     &-payments{
          &-total{
               &-reservation{
                   font-size: 13px;
                    text-transform: uppercase;
                   justify-content: flex-end;
                   border-bottom: 0;
                   &-label{
                    //    padding-right: 5.625rem;
                    flex: 10;
                    display: flex;
                    justify-content: flex-end; 
                   }
                   &-amount{
                       flex: 3;
                        display: flex;
                        justify-content: flex-end; 
                   }
               }
               &-pending{
                //    background-color: rgb(127, 197, 255);
                     flex-flow: row;
                     align-items: inherit;
                     &-warning{
                        flex:1;
                        &-icon{
                            
                        }
                        &-message{
                            
                        }
                    }
                     &-wrapper_amount{
                        flex:1;
                        
                     }
                     &-label{
                            flex: 2;
                            // background-color: aqua;
                            display: flex;
                            justify-content:flex-end;
                        }
                        &-amount{
                            flex: 1;
                            // background-color: aquamarine;
                            display: flex;
                            justify-content:flex-end;
                        }
                    

               }
               &-payments_methods{
                //    height: 48px;
                   display: flex;
                   flex-flow: column;
                   height: inherit;
                  
                   &-wrapper{
                       display: flex;
                       flex-flow: row;
                       width: 100%;
                        padding-bottom: .5rem;
                   }
                    &-method{
                        display: flex;
                        flex-flow: row;
                        // background-color: aqua;
                        height: inherit;
                        padding-bottom: .5rem;
                        flex: 1;
                            &-label{
                               padding-right: .2rem;
                            }
                            &-data{
                               
                            }
                            
                    }
                    &-amount{
                        display: flex;
                        flex:1;
                        // background-color: rgb(255, 225, 127);
                        align-items: center;
                            &-label{
                                display: flex;
                                    flex: 2; 
                                    justify-content: flex-end; 
                                    // background-color: aqua;  
                            }
                            &-data{
                                display: flex;
                                    flex: 1;  
                                     justify-content: flex-end;  
                                    //  background-color: aquamarine;   
                            }
                                    
                    }

               }
               &-discount{

                    &-wrapper{
                        padding-top: .5rem;
                    }
                    &-label{
                        // background-color: aqua;
                        flex: 10;
                        display: flex;
                        justify-content: flex-end; 
                    }
                    &-amount{
                        flex: 2;
                        // background-color: aquamarine; 
                        display: flex;
                        justify-content: flex-end;  
                    }

               }
               &-paid{
                //    background-color: rgb(218, 250, 239);
                    &-label{
                        flex: 10;
                        display: flex;
                        justify-content: flex-end;  
                    }
                    &-amount{
                        flex: 3;
                        display: flex;
                        justify-content: flex-end;  
                    }

               }
          }
     }
 }
}
</style>