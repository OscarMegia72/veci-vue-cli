<template>
<div class='travellers _wrapper'>
    <!-- <div v-if="$slots.travel_name" class="travellers-name"> -->
    <div class="travellers-info">
        <div  class="travellers-name">
            <span class="travellers-name-label">
                {{ $t('travels.travellers-name') }}
                </span>
            <span class="travellers-name-data">
                <slot name="travel_name"/>
                </span>
        </div>
        <!-- <div v-if="$slots.travellers_birthDate" class="travellers-documents"> -->
            <div   class="travellers-documents">
            <div v-if="$slots.travellers_birthDate" class="travellers-documents-birthdate">
                    <span class="travellers-documents-birthdate-label">
                        {{ $t('travels.birthDate') }}
                        </span>
                    <span class="travellers-documents-birthdate-data">
                        <slot name="travellers_birthDate"/>
                        </span>
            </div>

            <!-- <div v-if="$slots.ravellers_dni_number" class="travellers-documents-modules"> -->
                <div v-if="$slots.travellers_dni_number" class="travellers-documents-modules">
                <span class="travellers-documents-modules-label">
                    {{ $t('travels.dni_number') }}
                    </span>
                <span class="travellers-documents-modules-data">
                    <slot name="travellers_dni_number"/>
                    </span>
            </div>
        </div>
    </div>
    <div class="travellers-line"/>
</div>

</template>
<style lang="less" scoped>
 @import '../../../styleguide/src/assets/icons.less';
 .travellers{
    font-size: 11px;
    // padding-bottom: 2rem;
     &._wrapper{
        // padding-top: 1rem;
        padding-left: 2rem;
        padding-right: 2rem;
        display: flex;
        flex-flow: column;
     }
     &-name{
         padding-top: 1rem;
         display: flex;
         flex-flow:  column;
        //  height: 48px;
        // background-color: aqua;
        &-label{
            color:#484848;
             
        }
        &-data{
            font-weight: 600;
        }
     }
     &-documents{
         padding-top: 1rem;
         display: flex;
         flex-flow: row;
        // height: 48px;
        //    background-color: rgb(73, 168, 168);
        &-birthdate{
                max-width: 9rem;
                flex:1;
                    display: flex;
                    flex-flow: column;
                   
                    &-label{
                       
                        flex:1;
            
                    }
                    &-data{
                        flex:1;
                        display: flex;
                        flex-flow: column;
                        font-weight: 400;
                    }
                }
        &-modules{
                 flex:1;
                    display: flex;
                    flex-flow: column;
                   
                    &-label{
                         
                        flex:1;
                    }
                    &-data{
                        font-weight: 400;
                        flex:1;
                    }
        }
     }
     &-line{
         padding-top: 1rem;
         border-bottom: solid 1px;
         color:#F0F0F0;
     }
     
     
     
     
 }
 @media @l-up {
      .travellers{
            &._wrapper{
                    padding-top: 1rem;
                    padding-left: 2rem;
                    padding-right: 2rem;
                    display: flex;
                    flex-flow: column;
                }
            &-info{
                padding-left: 1rem;
                display: flex;
                flex-flow: row;
            }
            &-name{
                min-width: 250px;
                &-label{
                   
                }
                &-data{
                   
                }
            }
            &-documents{
                    
                    &-birthdate{
                            min-width: 150px;
                            &-label{
                               
                            }
                            &-data{
                               
                            }
                        }
                &-modules{
                        
                            &-label{
                              
                            }
                            &-data{
                               
                            }
                }
            }
            &-line{
                padding-top: 1rem;
                border-bottom: solid 1px;
                color:#F0F0F0;
            }
      }
 }
</style>