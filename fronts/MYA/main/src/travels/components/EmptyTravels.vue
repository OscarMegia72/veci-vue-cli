<template>
    <div class="empty-travels">
        <div class="empty-travels-header">
            <div class="empty-travels-header-message">
                <!--message-->
                    <!-- <div class="empty-travels-wrap-img">
                        <img class="empty-travels-wrap-img-image" :src="`${$assets_base}/stylesheets/images/my_account/travels/sin_viajes.png`"/>
                    
                    </div> -->
                    <div class="empty-travels-header-message-title" data-cy='empty-travels-msg_where_find'>
                        {{ $t('travels.msg_where_find') }}
                    </div>
                    <div class="empty-travels-header-message-description">
                        {{ $t('travels.msg_reservation_show') }}
                        
                    </div>
                    <div class="empty-travels-header-message-button_next">
                            <eci-button
                            :type="'_primary _ctblack'"
                            @click="goToTravels"
                            >
                            <template>
                                {{ $t('travels.msg_next_travel') }}
                            </template>
                        </eci-button>
                    </div>
                <!--end-mesagge-->
            </div>
            <div class="empty-travels-header-photo">
                 <img class="empty-travels-header-photo-image" :src="`${$assets_base}/stylesheets/images/my_account/travels/sin_viajes.png`"/>  
             </div>

        </div>
        <div class="empty-travels-stmg">
        <div class="empty-travels-site_manager" v-html="full_cover"/> 
        </div>
        
        
        
        <!-- <message-update-data/> -->
    </div>
</template>
<script>
// import MessageUpdateData from './MessageUpdateData';
import Button from '../../styleguide/src/components/blocks/Button.vue';
export default {
    data(){
        return{
            placement:false,
            full_cover:''
        }
        
    },
    components:{
    //   'message-update-data': MessageUpdateData, 
      'eci-button': Button 
    },
    methods: {
        goToTravels: function() {
            console.log("go travels...")
            window.location.href = 'https://www.viajeselcorteingles.es/';
        }
    },
   mounted(){
        this.$nextTick(function () {
            let fullCover = document.getElementById('ManagerFullCover');
            if(fullCover){
                this.full_cover = fullCover.innerHTML;
            }else{
                this.full_cover ="<h4>Emplazamiento</h4>"
            }
            
        })
   }
}
</script>
<style lang='less'>
// overwrite for margin top .5rem
.sheet{
    margin: 0;
}

    .empty-travels{
    &-header{
        display: flex;
        flex-flow: column-reverse;
        // width: 100%;
       // height: 384px;
        &-message{
            display: flex;
            flex-flow: column;
            flex: 1;
            // background-color: aquamarine;
            justify-content: center;
             text-align: center;
             align-items: center;
             padding-bottom: 2rem; 
             padding-top: 2rem;
            &-title{
                padding: 0 1rem 1rem 1rem;
                font-size: 22px;
                font-weight: 400;
            }
            &-description{
                padding: 0 2rem 1rem 2rem;
                font-size: 14px;
            }
            &-button_next{
                max-width: 288px;
                height: 50px;
            }
        }
        &-photo{
            &-image{
                 width: 100%;
            }
        }
        &-sitemanager{
            padding: 0;
            flex: 1;
            display: flex;
            flex-flow: column;
            justify-content: center;
        }
    }
    &-stmg{
         width: 100%;
    }
    
}
@import '../../assets/variables.less';
@media @l-up {

//@import '../../src/assets/variables.less';
// fronts/MYA/main/src/travels/components/EmptyTravels.vue
// fronts/MYA/main/src/assets/variables.less
.empty-travels{
   
    &-header{
        // display: flex;
        // flex-flow: row;
        // width: 100%;
        height: 384px;
        flex-flow: row;
        &-message{
            // display: flex;
            // flex-flow: column;
            // flex: 1;
            // // background-color: aquamarine;
            // justify-content: center;
            //  text-align: center;
            &-title{
                // padding: 0 3rem 1.5rem 3rem;
                // font-size: 28px;
                // font-weight: 400;
               
                
            }
            &-description{
                // padding: 0 3rem 3rem 3rem;
                // font-size: 18px;
            }
            &-button_next{
                padding: 0 3rem 0 3rem;
            }
        }
        &-photo{
            flex: 1;
            display: flex;
            flex-flow: column;
            justify-content: center;
            &-image{
                 width: 100%;
            }
        }
        &-sitemanager{
            padding: 0;
            flex: 1;
            display: flex;
            flex-flow: column;
            justify-content: center;
        }
    }
    &-stmg{
        //  background-color: rgb(157, 214, 83);
         width: 100%;
        //  height: 215px;;
    }
    
}
 }
</style>