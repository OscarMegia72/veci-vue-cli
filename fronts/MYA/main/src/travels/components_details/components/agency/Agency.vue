<template>
    <div class="agency-wrapper">
        <div class="agency-header">
            <header-agency>
                    <template slot="agency_title">
                        {{ $t('travels.agency-title') }}
                    </template>
            </header-agency>
        </div>
        <div class="agency-data">
            <span class="agency-data-name">
                {{getAgency.name}}
            </span>
           
            <span class="agency-data-streetName">
                {{getAgency.address.streetName}}, C.P. {{getAgency.address.postalCode}} 
            </span>
             <span class="agency-data-city">
                 {{getAgency.address.city}}
            </span>
             <span class="agency-data-telephone">
                 Telef. {{getAgency.telephone}}
            </span>
             <span class="agency-data-fax">
                Fax {{getAgency.fax}}
            </span>
             <span class="agency-data-email">
                  <eci-link 
                  :href="getMail" 
                  :type="'_primary _cta'">
                {{getAgency.email}}
                  </eci-link>
            </span>
           
        </div>
    </div>
</template>
<script>
import HeaderAgency from './HeaderAgency';
import Link from '../../../styleguide/src/components/blocks/Link.vue';

export default {
    data(){
        return{

        }
        
    },
    components:{
        'header-agency': HeaderAgency,
        'eci-link':Link
    },
    computed:{

       getAgency(){
         return this.$store.state.api_data.agency
       },
       getMail(){
           return `mailto:${this.$store.state.api_data.agency.email}`
       }
       
   }
    
}
</script>
<style scoped lang="less" >
 @import '../../../styleguide/src/assets/icons.less';
 .agency{
    
     &-wrapper{
         padding-left: 1rem;
         padding-right: 1rem;
         
     }
     &-data{
          font-size: 14px;
          display: flex;
          flex-flow: column;
          &-name{
              padding-bottom: .5rem;
              font-weight: 400;
          }
          &-email{
              font-weight: 400;
          }
     }
 }
 @media @l-up {
     .agency{
    
        &-wrapper{
            padding-left: 2rem;
            padding-right: 2rem;
            
        }
        &-data{
           
            &-name{
              
            }
            &-email{
               
            }
        }
    }
 }
 </style>