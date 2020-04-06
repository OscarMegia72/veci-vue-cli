<template>
    <div class="detail-bus">
       
        <div class="detail-bus-wrapper">
            <div class="detail-bus-group_company">
                <span class="detail-bus-group_company-label">
                    <slot name="company_label"/>
                </span>
                <span class="detail-bus-group_company-data">
                   <slot name="company_data"/>
                </span>
            </div>
             <div class="detail-bus-line"/>
        </div>
        
    </div>
</template>
<style scoped lang="less">
.detail-bus{
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
        &-bus{
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

.detail-bus{

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
        &-bus{
           
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