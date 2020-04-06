<template v-if="$slots.item_detail_data">

    <div class="common-item-detail">
        <div class="common-item-detail-wrapper">
            <span class="common-item-detail _label">
                <slot name="item_detail_label"/>
            </span>
            <span class="common-item-detail _data">
                <slot name="item_detail_data"/>
            </span>
             
        </div>
         <div class="comon-item-detail-line"/>
    </div>
</template>
<style lang="less" scoped>
.common-item-detail{
    height: 3rem;
    padding-left: 1rem;
    display: flex;
    flex-flow: column;
    min-width: 125px;
    // border: 1px solid black;
    justify-content: flex-end;
    &._label{
        font-size: 11px;
       padding-left: 0;
       height: auto;
    }
    &._data{
         height: auto;
         font-size: 11px;
        font-weight: 400;
        padding-left: 0;
    }
     &-line{
            // margin-top: 0;
            border-bottom: solid 1px;
            // color:#F0F0F0;
            color:rgb(224, 92, 92);
        }
    
}
@media @l-up {
    .common-item-detail{
        padding-left: 0;
        min-width: inherit;
        &-wrapper{
           // background-color: rgb(248, 211, 152);
            // min-width: 170px;
            // max-width: 170px;
           // align-items: baseline;
            //justify-content: space-between;
        }
    }
}

</style>