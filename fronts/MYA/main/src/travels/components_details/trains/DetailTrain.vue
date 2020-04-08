<template>
    <div class="detail-train">
       
        <div class="detail-train-wrapper">
             <!-- <p>DETALLE DE TREN</p> -->
            <div class="detail-train-group_company">
                <span class="detail-train-group_company-label">
                    Compañia
                </span>
                <span class="detail-train-group_company-data">
                    Renfe
                </span>
            </div>
            <div class="detail-train-group_rate">
                    <div class="detail-train-group_rate-rate">
                        <span class="detail-train-group_rate-rate-label">
                            Tarifa
                        </span>
                        <span class="detail-train-group_rate-rate-data">
                            rateDescription
                        </span>
                    </div>
                    <div class="detail-train-group_rate-train">
                        <span class="detail-train-group_rate-train-label">
                            Tren
                        </span>
                        <span class="detail-train-group_rate-train-data">
                            Alvia
                        </span>
                    </div>
             </div>
            <div class="detail-train-group_wagon">
                 <div class="detail-train-group_wagon-wagon">
                        <span class="detail-train-group_wagon-wagon-label">
                            Coche
                        </span>
                        <span class="detail-train-group_wagon-wagon-data">
                            5A
                        </span>
                    </div> 
                    <div class="detail-train-group_wagon-class">
                        <span class="detail-train-group_wagon-class-label">
                            Clase
                        </span>
                        <span class="detail-train-group_wagon-class-data">
                            Turista
                        </span>
                    </div> 
            </div> 
             <div class="detail-train-group_seat">
                 <div class="detail-train-group_seat-seat">
                        <span class="detail-train-group_seat-seat-label">
                            Asiento
                        </span>
                        <span class="detail-train-group_seat-seat-data">
                            14B
                        </span>
                    </div> 
            </div> 
             <div class="detail-train-line"/>
        </div>
        
    </div>
</template>
<style scoped lang="less">
@import '../../../styleguide/src/assets/icons.less';
@import '../../../styleguide/src/assets/variables.less';
.detail-train{
    font-size: 11px;
    &-wrapper{
         display: flex;
        flex-flow: column;
        padding: 1rem 1rem 1rem 2rem;
       
    }
    &-line{

            border-bottom: solid 1px;
            color:#F0F0F0;
        }
    &-group_company{
         display: flex;
        flex-flow: column;
        padding-bottom: 1rem;
        &-label{
            min-width: 6.5rem;
        }
        &-data{
                font-weight: 400;
            }
    }
    &-group_rate{
        display: flex;
        flex-flow: row;
        padding-bottom: 1rem;
        &-rate{
            display: flex;
            flex-flow: column;
            &-label{
                 
                min-width: 6.5rem;
            }
            &-data{
                font-weight: 400;
            }
        }
        &-train{
            display: flex;
            flex-flow: column;
            &-label{
                 
                min-width: 6.5rem;
            }
             &-data{
                font-weight: 400;
            }
        }
         
    }
    &-group_wagon{
        display: flex;
        flex-flow: row;
        padding-bottom: 1rem;
         &-wagon{
            display: flex;
            flex-flow: column;
            &-label{  
                min-width: 6.5rem;
            }
             &-data{
                font-weight: 400;
            }
        }
        &-class{
            display: flex;
            flex-flow: column;
            &-label{ 
                min-width: 6.5rem;
            }
             &-data{
                font-weight: 400;
            }
        }
    }
    &-group_seat{
        display: flex;
        flex-flow: row;
        padding-bottom: 1rem;
         &-seat{
            display: flex;
            flex-flow: column;
            &-label{  
                min-width: 6.5rem;
            }
             &-data{
                font-weight: 400;
            }
        }
        
    }
}
@media @l-up {

.detail-train{

    font-size: 11px;
    &-wrapper{
        padding: 1rem 1rem 1rem 2rem;
        display: flex;
        flex-flow: row;
    }
    &-group_company{
         
        &-label{
          
        }
        &-data{
               
            }
    }
    &-group_rate{
        
        &-rate{
         
            &-label{
                 
              
            }
            &-data{
              
            }
        }
        &-train{
           
            &-label{
              
            }
             &-data{
               
            }
        }
         
    }
    &-group_wagon{
       
         &-wagon{
           
            &-label{  
               
            }
             &-data{
               
            }
        }
        &-class{
           
            &-label{ 
               
            }
             &-data{
                
            }
        }
    }
    &-group_seat{
        
         &-seat{
           
            &-label{  
               
            }
             &-data{
               
            }
        }
        
    }
}

}
</style>