<template>
            <div class="messge-update">
                  <div class="messge-update-wrap-img">
                        <img class="messge-update-wrap-img-icon" :src="`${$assets_base}/stylesheets/images/my_account/travels/icon_empty_travels.png`"/>
                  </div>
                  <div class="messge-update-title_question">
                      <p>
                          {{ $t('travels.msg_not_found_reservation') }}
                        </p>
                      <p>
                           {{ $t('travels.msg_not_found_data_update') }}
                    </p>
                      <p>

                    </p>
                     
                    
                  </div>
                  <div class="messge-update-contact">
                     {{ $t('travels.msg_dont_worry') }}
                      <span>
                      <eci-link 
                        :href="'mailto:clientes@elcorteingles.es'" 
                        :type="'_primary _cta'">
                         {{ $t('travels.msg_contact') }}
                    </eci-link>
                    </span>
                     {{ $t('travels.msg_helpyou') }}
                  </div>
              </div>
</template> 
<script>
import Link from '../../styleguide/src/components/blocks/Link.vue';
export default {
    
    components:{

      'eci-link':Link
    },
    
}
</script>
<style scoped lang='less'>
@import '../../assets/variables.less';
.messge-update{
    display: flex;
    flex-flow: column;
    // padding: 1rem;
    align-items: center;
    color: #242424;
    padding-top: 2rem;
    border-top: solid 1px  #F0F0F0;
    margin-top: 5rem;
    padding-left: 2rem;
    padding-right: 2rem;
    &-wrap-img{
        display: flex;
        flex-flow: row;
        justify-content: center;
        // max-width:288px;
        &-image{
            display: flex;
           
        }
        &-icon{
            width: 64px;
        }
    }
    
    &-title_question{
        display: flex;
        justify-content: center;
        font-size: 16px;
        font-weight: 400;
        // max-width:288px;
        padding-bottom: 1rem;
        text-align: center;
        flex-flow: column;
    }
    
     &-contact{
        font-size: 14px;
        //  display: flex;
        justify-content: center;
        text-align: center;
        padding-bottom: 1rem;
        // display: flex;
        // flex-flow: column;
        // max-width:288px;
        
    }
   
}
@media @l-up {
    .messge-update{
    padding-left: 5.5625rem;
    padding-right: 5.5625rem;
    }
}
</style>
