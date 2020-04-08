<template>
        <div>
            <mya-title :tag="'h2'" 
            :data-cy="'travel-title'"
            :class="'_main'">demo-{{ $t('travels.title') }}
            </mya-title>
        <div class="tr-container">
           <div v-html="full_cover"/>
                <transition name="slide-fade">
                <messages-400 v-if='showError400.show' @close="closeModal400">
                    <template slot="header">
                        {{showError400.head}}
                    </template>
                    <template slot="message">
                        {{showError400.message}}
                    </template>
                </messages-400>
            </transition>
            

           
            <template v-if="isClientEmpty">
                <empty-travels/>
            </template>
            <!-- {{getActives}} -->
            <eci-loading v-if="!getEndXhrResume" />
             <!-- <transition-group name="slide-fade"> -->
                 <!-- <div class="tr-vspace-header"></div> -->
            <div  v-if="getActives.hasReservations" data-cy="active-reserv" class="tr-resume">
                <booking-state>
                    <template slot='booking_state'>
                         {{ $t('travels.title.active_reservs') }}
                    </template>
                </booking-state>
                <header-labels/>
                
                <template v-for='travel in getActives.listReservations'>
                    <item-res
                    :booking_status='travel.bookingStatus.class '
                    :booking_code='travel.bookingCode'
                    :has_details='travel.hasDetails'
                    :data-cy='`item-res-${travel.bookingCode}`'
                    @openDetails='openDetails'
                    v-bind:key="travel.bookingCode"
                    >
                        <template slot='date'>
                            {{travel.departureDate}} - {{travel.returnDate}}
                        </template>
                        <template slot='title'>
                            {{travel.title}}
                        </template>
                        <template slot='state'>
                            {{travel.bookingStatus.description}}
                        </template>
                        <template slot='icon_list'>
                            <!-- {{travel.services.icon_list}} -->
                            <services-icons :icons="travel.services.icon_list"/> 

                        </template>
                        <template  slot='res_number'>
                                {{travel.bookingCode}}

                        </template>
                        <template slot='res_date'>
                            {{travel.bookingCreationDate}}
                        </template>
                        <template slot='price'>
                            <eci-price 
                                :amount="travel.totalPrice.amount"
                                :size="18"
                                :important="true"
         
                            />
                        </template>
                        <template slot='arrow'>
                           <i :class="travel.hasDetailsClass" class="icon arrow-right travel-arrow"></i>
                         </template> 
                    </item-res>
                </template>
                
            </div>

             <transition name="plz">
                <div v-if="placement" class="tr-simil-camp">
                    <img class="tr-simil-camp-img" src='https://www.viajeselcorteingles.es/imagen/camp/img_camp_nueva_york_ene20_400x405.jpg'/>
                </div>
             </transition> 
            <!-- {{getOldies}} -->           
          <transition name="slide-fade">
            <div  v-if="getOldies.hasReservations" data-cy="old-reserv" class="tr-resume">
                <booking-state>
                    <template slot='booking_state'>
                         {{ $t('travels.title.oldies_reservs') }}
                    </template>
                </booking-state>
                <header-labels/>
                <template v-for='travel in getOldies.listReservations' >
                     <item-res
                    :booking_status='travel.bookingStatus.class '
                    :booking_code='travel.bookingCode'
                    :has_details='travel.hasDetails'
                    :data-cy='`item-res-${travel.bookingCode}`'
                    @openDetails='openDetails'
                    v-bind:key="travel.bookingCode"
                    >
                        <template slot='date'>
                            {{travel.departureDate}} - {{travel.returnDate}}
                        </template>
                        <template slot='title' >
                            {{travel.title}}
                        </template>
                        <template slot='state'>
                            {{travel.bookingStatus.description}}
                        </template>
                        <template slot='icon_list'>
                            <services-icons :icons="travel.services.icon_list"/> 

                        </template>
                        <template slot='res_number'>
                            {{travel.bookingCode}}
                        </template>
                        <template slot='res_date'>
                            {{travel.bookingCreationDate}}
                        </template>
                        <template slot='price'>
                            <eci-price 
                                :amount="travel.totalPrice.amount"
                                :size="18"
                                :important="true"
                            />
                        </template>
                         <template slot='arrow'>
                           <i :class="travel.hasDetailsClass" class="icon arrow-right _inherit travel-arrow"></i>
                         </template>
                    </item-res>
                </template>
                
            </div>
           
             </transition>
              
        </div>
          <message-update-data/>
        </div>
    
</template>
<script>
import Error400 from './messages/error400';
import MessageUpdateData from './components/MessageUpdateData';
import EmptyTravels from './components/EmptyTravels';
import ItemResume from './components/ItemResume';
import Price from './components/PriceTravels';
import ServicesIcons from './components/ServicesIcons'
import BookingState from './components/BookingState'
import HeaderLabels from './components/HeaderLabels'
import loading from './components/_loading'
import Title from '../styleguide/src/components/blocks/Title.vue';

export default {
    data(){
        return{
            placement:false,
            full_cover:''
        }
        
    },
    components:{
        'mya-title': Title,
        'messages-400': Error400,
        'message-update-data': MessageUpdateData,
        'empty-travels': EmptyTravels,
        'item-res': ItemResume,
        'eci-price': Price,
        'services-icons': ServicesIcons,
        'booking-state': BookingState,
        'header-labels': HeaderLabels,
        'eci-loading': loading
    },
   async created(){
        // await this.$store.dispatch('getMockApiTravelResume');
        await this.$store.dispatch('getApiTravelResume');
   },
   mounted(){
        // this.$nextTick(function () {
        //     return
        //     let fullCover = document.getElementById('ManagerFullCover').innerHTML;
        //     this.full_cover = fullCover ;
           
        // })
   },
   computed:{
       getStFullCover(){
           return this.$store.state.sheets.fullCover;
       },
       showError400(){
           return this.$store.state.errors.error400;
       },
       isClientEmpty(){
            return this.$store.state.client_empty
       },
      
       getOldies(){
           return this.$store.state.reservation_group_oldies;
       },
       getActives(){
           return this.$store.state.reservation_group_actives;
       },
       isMock(){
           return this.$store.state.mock
       },
       isMockList(){
           return (this.$store.state.mock && this.$store.state.list)
       },
       hasResume(){
           return this.$store.state.hasResume
       },
       getResume(){
           return this.$store.state.resume
       },
       getEndXhrResume(){
           return this.$store.state.endXhrResume
       }
   },
   methods: {
       closeModal400(){
           this.$store.dispatch('setViewModal400',{
                show:false,
                head:'',
                message:''
          
           })
       },
       openMock(id){
           window.location = 'viajes'+`?mock=true&id=${id}`
            window.location = `/${id}`
       },
       openDetails(id){
           //window.location = `viajes/detalle?id=${this.$store.state.mock_user.id}&booking_code=${id}`
           let url = `/viajes/detalle/${id}`
           if(this.$store.state.mock_cuc){
               url +=`?cuc=${this.$store.state.mock_cuc}`
           }
            window.location = url;
            console.info('open-details', id)
       }
       
   },
}
</script>
<style lang="less">
 @import '../styleguide/src/assets/icons.less';

.travel-size:before{
    font-size: 18px;
}
.tr-simil-camp{
    
    padding: 1rem;
    &-img{
        width: 100%;
        border-radius:5px;
    }
}
@media @l-up {
    .tr-simil-camp{
        display: none;
    }
}
</style>
<style lang='less'>

.tr-vspace{
    padding: 1rem;
    &-header{
        padding-top: 3rem;
    }
}
</style>
<style lang='less'>
 
.tr-resume{

    &-item{
        font-size: 11px;
        margin-bottom: 2px;
    }
    
}

</style>
<style lang='less'>
.tr-list-ids{
    padding: 1rem;
    &-title{
        font-weight: 600;
        font-size: 18px;
        margin-bottom: 1rem;
        color: rgb(145, 145, 145);
    }
    &-banners{
        width: 100%;
    }
}
</style>
<style lang='less'>
 @import '../styleguide/src/assets/icons.less';

.tr-container{
    display: flex;
    flex-flow: column;  
}
</style>
<style>
.slide-fade-enter-active {
  transition: all .8s ease;
}
.slide-fade-leave-active {
  transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(20px);
  opacity: 0;
}
.plz-enter-active{
    animation: bounce-in 1s;

}
@keyframes bounce-in {
  0% {
      opacity: 0;
    transform: scale(0);
  }
  100% {
      opacity: 100%;
    transform: scale(1);
  }
}


</style>