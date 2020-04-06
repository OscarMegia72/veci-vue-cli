<template>
    <div class='insurance-header _wrapper'>
        <div class="insurance-header-logo">
             <img :src="`${$assets_base}/stylesheets/images/my_account/travels/_icon_fly_departure_24.svg`"/>
        </div>
        <div class="insurance-header-detail">
            <span class="insurance-header-detail-date">
                <slot name="dates"/>
               
            </span>
            <span class="insurance-header-detail-title">
                <slot name="policy-type"/>
            </span>
        </div>
    </div>
</template>
<style lang="less">
 @import '../../../styleguide/src/assets/icons.less';
 .insurance-header{
     &._wrapper{
        padding-left: 1rem;
        padding-right: 1rem;
        background-color: #FAFAFA;
        // background-color: rgb(228, 228, 228);
        display: flex;
        flex-flow: row;
        padding-bottom: 1rem;
        padding-top: 1rem;
        height: 80px;
     }
     &-logo{
        // padding: 1rem;
        //  background-color: rgb(197, 197, 197);
         // border-radius: 5px;
     }
     &-detail{
         font-size: 11px;
         display: flex;
         flex-flow: column;
         padding-left: 1rem;
         &-date{
             color:#484848;
             height: 24px;
         }
         &-title{
             font-size: 14px;
             font-weight: 400;
         }
     }
     
     
 }
</style>