<template>
    <div class="detail_hotel">
        <div class="detail_hotel-item_wrap">
                <item-detail class="detail_hotel-item_wrap-noches">
                    <template slot="item_detail_label">
                        {{ $t('travels.numberOfNights') }}
                    </template>
                    <template slot="item_detail_data">
                        {{hotel.numberOfNights}}  {{ $t('travels.nigths') }}
                    </template>
                </item-detail>
                <item-detail class="detail_hotel-item_wrap-habitacion">
                    <template slot="item_detail_label">
                        {{ $t('travels.roomType') }} {{hotel.ordinal}}
                    </template>
                    <template slot="item_detail_data">
                        {{hotel.roomType}}
                    </template>
                </item-detail>

                

                <item-detail class="detail_hotel-item_wrap-regimen">
                    <template slot="item_detail_label">
                        {{ $t('travels.accommodationType') }}
                    </template>
                    <template slot="item_detail_data">
                        {{hotel.accommodationType}}
                    </template>
                </item-detail>

                <item-detail class="detail_hotel-item_wrap-locator">
                    <template slot="item_detail_label">
                         {{ $t('travels.locator') }}
                    </template>
                    <template slot="item_detail_data">
                        {{hotel.locatorNumber}}
                    </template>
                </item-detail>
        </div>
         <div class="detail_hotel-line"/>
         
    </div>
    
</template>
<script>
import ItemDetail from '../common/ItemDetail'
export default {
    props:{
        hotel:{
            type: Object,
            default:()=>({})
        }
    },
    components:{
        'item-detail': ItemDetail,

    }
   
}
</script>

<style lang="less" scoped>
@import '../../../styleguide/src/assets/icons.less';
@import '../../../styleguide/src/assets/variables.less';
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
    // &-info{
    //     display: flex;
    //     padding-left: 1rem;
    //     font-size: 12px;
    //     height: 3rem;
    //     align-items: center;

    // }
}
@media @l-up {
    .detail_hotel{
        padding: 0 2rem 0 2rem;
         &-item_wrap{
            flex-flow: row;
            align-items: baseline;
           // background-color: aquamarine;
            justify-content: space-between;
            &-noches{
                // background-color: rgb(236, 127, 255);
                flex: 15;
            }
            &-habitacion{
                // background-color: rgb(127, 187, 255);
                flex: 30;
                padding-left: 1rem;
            }
            &-regimen{
                // background-color: rgb(255, 242, 127);
                flex: 40;
                padding-left: 1rem;
            }
            &-locator{
                flex: 15;
                // background-color: rgb(251, 127, 255);
                padding-left: 1rem;
            }
        }
        &-info{
            justify-content: flex-end;
            padding: 0 1rem 0 1rem;
        }

    }
}
</style>