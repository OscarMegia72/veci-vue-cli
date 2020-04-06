<template>
<div class='insurance _wrapper'>
    <div class="insurance-agency">
        <span class="insurance-agency-label">
             {{ $t('travels.insurance-company') }}
            </span>
        <span class="insurance-agency-data">
            <slot name="insurance-company"/>
            </span>
    </div>
    <div class="insurance-police">
        <div class="insurance-police-number">
        <span class="insurance-police-number-label">
            {{ $t('travels.police-number') }}
            </span>
        <span class="insurance-police-number-data">
            <slot name="insurance-police-number"/>
            </span>
        </div>

        <div class="insurance-police-modules">
        <span class="insurance-police-modules-label">
            {{ $t('travels.number-of-modules') }}
            </span>
        <span class="insurance-police-modules-data">
             <slot name="police-modules-number"/>
            </span>
        </div>
    </div>
    <div class="insurance-line"/>
</div>

</template>
<style lang="less">
 @import '../../../styleguide/src/assets/icons.less';
 .insurance{
    font-size: 11px;
    padding-bottom: 2rem;
     &._wrapper{
        padding-top: 1rem;
        padding-left: 2rem;
        padding-right: 2rem;
        display: flex;
        flex-flow: column;
     }
     &-agency{
         display: flex;
         flex-flow:  column;
         height: 48px;
        &-label{
            color:#484848;
        }
        &-data{
            font-weight: 600;
        }
     }
     &-police{
         display: flex;
         flex-flow: row;
            &-number{
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
     .insurance{
         padding-bottom: 0rem;
    &._wrapper{
            flex-flow: row;
            justify-content: flex-start;
            padding-left: 3rem;
        }
    &-agency{
         display: flex;
         flex-flow:  column;
         height: 48px;
         
        &-label{
            color:#484848;
        }
        &-data{
            font-weight: 600;
        }
     }
     &-police{
         display: flex;
         flex-flow: row;
         padding-left: 1rem;
        //  flex: 2;
        &-number{
                    display: flex;
                    flex-flow: column;
                    align-self: flex-start;
                    
                    flex: auto;
                    &-label{
                        
                        height: inherit;
                    }
                    &-data{
                        
                        display: flex;
                        flex-flow: column;
                    }
        }
        &-modules{
                    display: flex;
                    flex-flow: column;
                    padding-left: 1rem;
                    align-self: flex-start;
                    
                    flex:auto;
                    &-label{
                         height: inherit;
                      
                    }
                    &-data{
                        
                    }
        }
     }
     }
 }
</style>