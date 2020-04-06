<template>

    <div class="details-tickets">
         <template  v-for="(ticket,idx) in getTickets">
             <header-details :key="`${idx}-ticket`">
                  <template slot="icon">
                    <span class="icon-EntradasL" />
                  </template>
                    <template slot="dates">
                      {{ticket.startDate}}
                    </template>
                    <template slot="title">
                      {{ticket.description}}
                    </template>
              </header-details>
        
          <detail-ticket
          :ticket="ticket"
          :key="`${ticket.ServiceId}-ticket`"
          />
          </template>


    </div>
</template>
<script>
// fronts/vue/MYA/travels/components_details/tickets/DetailTicket.vue
import Detailticket from './DetailTicket'
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
        'detail-ticket': Detailticket
    },
    
 
   computed:{
       getTickets(){
         return this.$store.state.api_data.services.tickets
       },
   },
   
}
</script>
<style lang="less">
 @import '../../../styleguide/src/assets/icons.less';
.details-tickets{
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