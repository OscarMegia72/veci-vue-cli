<template>

    <div class="details-packs">
         <template  v-for="(pack,idx) in getPacks">
             <header-details :key="`${idx}-pack`">
                  <template slot="icon">
                    <span class="icon-EntradasL" />
                  </template>
                    <template slot="dates">
                      {{pack.startDate}}
                    </template>
                    <template slot="title">
                      {{pack.name}}
                    </template>
              </header-details>
        
          <detail-pack
          :pack="pack"
          :key="`${pack.ServiceId}-ticket`"
          />
          </template>


    </div>
</template>
<script>
// fronts/vue/MYA/travels/components_details/tickets/DetailTicket.vue
import DetailPack from './DetailPack'
import HeaderDetails from '../common/HeaderDetails'
export default {

    data(){
        return{
            placement:false,
            full_cover:'',
        }
        
    },
     components:{
        'header-details': HeaderDetails,
        'detail-pack': DetailPack
    },
    
 
   computed:{
       getPacks(){
         return this.$store.state.api_data.services.packs
       },
   },
   
}
</script>
<style lang="less">
 @import '../../../styleguide/src/assets/icons.less';
.details-packs{
    // background-color: aquamarine;
    // &-mobile{
    //   // display: block;
    // }
    // &-desktop{
    //   display: none;
    // }
}

@media @l-up {
//   .details-flight{
//       &-mobile{
//         display: none;
//       }
//       &-desktop{
//         // background-color: aqua;
//         // margin-bottom: 2rem;
//         display: flex;
//         flex-flow: column;
//       }
//   }
}
</style>