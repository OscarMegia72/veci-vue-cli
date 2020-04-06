<template>

    <div class="details-hotels">
         <template  v-for="(hotel,idx) in getHotels">
             <header-details :key="`${idx}-hotel`">
                  <template slot="icon">
                    <span class="icon-veci-hotel" />
                  </template>
                    <template slot="dates">
                      {{hotel.entryDate}}
                    </template>
                    <template slot="title">
                      {{hotel.name}}
                    </template>
                    <template slot="category_stars">
                        <star-rating
                        :stars_number="hotel.categoryNum"
                        />
                    
                    </template>  
                    <template slot="status">
                          <div class="header_details-wrapper-info-data-booking_status" :class="hotel.status.class">
                          {{hotel.status.description}}
                        </div>
                    </template> 
                    <template v-if="hotel.address.streetName" slot="address_name_street">
                      {{hotel.address.streetName}}
                    </template>
                    <template slot="address_name_detail">
                      {{hotel.address.postalCode}} {{hotel.address.city}}, {{hotel.address.country}}
                    </template>
                    <template slot="locator_number">
                      {{hotel.locatorNumber}}
                    </template>
              </header-details>
        
          <detail-hotel
          :hotel="hotel"
          :key="`${hotel.serviceId}-hotel-detail`"
          />
          </template>


    </div>
</template>
<script>

import DetailHotel from './DetailHotel'
import HeaderDetails from '../common/HeaderDetails'
import StarRating from '../common/star_rating/StarRating'
export default {

    data(){
        return{
            placement:false,
            full_cover:'',
            debug_id: this.$store.state.data_ssr.booking_code
        }
        
    },
     components:{
        'header-details': HeaderDetails,
        'star-rating': StarRating,
        'detail-hotel': DetailHotel
    },
    
 
   computed:{
       getHotels(){
         return this.$store.state.api_data.services.hotels
       },
   },
   
}
</script>
<style lang="less">
 @import '../../../styleguide/src/assets/icons.less';
.details-hotels{
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