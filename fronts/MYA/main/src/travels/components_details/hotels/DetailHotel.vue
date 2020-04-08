<template>
    <div class="detail_hotel">
        <div class="detail_hotel-item_wrap">
                <item-detail>
                    <template slot="item_detail_label">
                        {{ $t('travels.numberOfNights') }}
                    </template>
                    <template slot="item_detail_data">
                        {{hotel.numberOfNights}}
                    </template>
                </item-detail>
                <item-detail>
                    <template slot="item_detail_label">
                        {{ $t('travels.roomType') }}
                    </template>
                    <template slot="item_detail_data">
                        {{hotel.roomType}}
                    </template>
                </item-detail>
                <item-detail>
                    <template slot="item_detail_label">
                        {{ $t('travels.accommodationType') }}
                    </template>
                    <template slot="item_detail_data">
                        {{hotel.accommodationType}}
                    </template>
                </item-detail>
        </div>
         <div class="detail_hotel-line"/>
         <div class="detail_hotel-info">
                 <eci-link 
                  :href="`https://${hotel.dataSheetUrl}`" 
                  :type="'_primary _cta'">
                 {{ $t('travels.hotelInfo') }}
                  </eci-link>
        </div>
    </div>
    
</template>
<script>
import ItemDetail from '../common/ItemDetail'
import Link from '../../../styleguide/src/components/blocks/Link.vue';
export default {
    props:{
        hotel:{
            type: Object,
            default:{}
        }
    },
    components:{
        'item-detail': ItemDetail,
        'eci-link':Link
    }
   
}
</script>
<style lang="less" scoped>
@import '../../styleguide/src/assets/icons.less';
@import '../../styleguide/src/assets/variables.less';
.detail_hotel{
    // background-color: rgb(224, 147, 46);
    display: flex;
    flex-flow: column;
    padding: 0 1rem 0 1rem;
    &-item_wrap{
        // background-color: aqua;
         display: flex;
         flex-flow: column;
       
    }
      &-line{

            border-bottom: solid 1px;
            color:#F0F0F0;
            padding: 1rem 1rem 0 1rem;
        }
    &-info{
        display: flex;
        padding-left: 1rem;
        font-size: 12px;
        height: 3rem;
        align-items: center;

    }
}
@media @l-up {
    .detail_hotel{
        padding: 0 2rem 0 2rem;
         &-item_wrap{
            flex-flow: row;
             min-width: 150px;
            max-width: 190px;
            align-items: baseline;
            background-color: aquamarine;
            justify-content: space-between;
        }
        &-info{
            justify-content: flex-end;
            padding: 0 1rem 0 1rem;
        }

    }
}
</style>