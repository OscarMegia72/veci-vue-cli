<template>

    <div class="details-hotels">
         <template  v-for="(hotel,idx) in getHotels">
           <div class="header_hotel-wrapper" :key="`${idx}-hotel-line`">
              <div class="header_hotel-wrapper-line" />
          </div>
          
             <header-details :key="`${idx}-hotel`" >
                
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
                    <template slot="guests">
                      {{hotel.travellersNumber}}
                    </template>
                    <!-- <template slot="locator_number">
                      {{hotel.locatorNumber}}
                    </template> -->
              </header-details>
          <template v-for="(hotel_detail,idz) in hotel.rooms">
             <!-- <p> {{hotel_detail.locatorNumber}} - {{idx}}/{{idz}}</p> -->
               <detail-hotel :hotel="hotel_detail" :key="`${idx}-${idz}-hotel-detail`"/> 
          </template>
          <div class="header_hotel-info" :key="`${idx}-${idx}-hotel-detail-info`">
                 <eci-link 
                  :href="`https://${hotel.dataSheetUrl}`" 
                  :type="'_primary _cta'">
                 {{ $t('travels.hotelInfo') }}
                  </eci-link>
          </div>
          
          </template>


    </div>
</template>
<script>

import DetailHotel from './DetailHotelGrouped'
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
         return this.$store.state.api_data.services.hotels_grouped
       },
   },
   
}
</script>
<style lang="less">
@import '../../../styleguide/src/assets/icons.less';
 .header_hotel{ 
   &-wrapper{
     padding: 0rem 1rem 0 1rem ;
     //background-color: lightgreen;
      &-line{

            border-bottom: solid 1px;
            color:#F0F0F0;
            // color:#FF0000;
            padding: 1rem 1rem 0 1rem;
        }
   }
   
    &-info{
        margin: 1rem 0 1rem 0;
        display: flex;
        height: 50px;
        font-size: 12px;
        height: 3rem;
        align-items: center;
        justify-content: center;
    }
}
@media @l-up {
  // .hotel-header-details{
  //       background-color: lightcoral;
  //       &-info-locator{
  //           background-color: rgb(143, 167, 104)
  //       }
  //   }
.header_hotel{ 
    &-info{
      margin: 0 0 0 0;
      justify-content: flex-end;
      padding-right: 2rem;

    }
}


}
</style>