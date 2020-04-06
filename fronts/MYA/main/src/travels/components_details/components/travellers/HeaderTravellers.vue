<template>
    <div class='travellers-header _wrapper'>
        <div class='travellers-header-title'>
             {{ $t('travels.travellers-title') }}
        </div>
    </div>
</template>
<style lang="less">
 @import '../../../styleguide/src/assets/icons.less';
 .travellers-header{
     &._wrapper{
        background-color: #FAFAFA;
        // background-color: rgb(228, 228, 228);
        display: flex;
        flex-flow: row;
        height: 96px;
        display: flex;
        flex-flow: row;
     }
     &-title{
        letter-spacing: 2px;
        font-size: 18px;
        font-weight: 400;
        display: flex;
        flex-flow: row;
        align-items: center;
        width: 100%;
        justify-content: center;
     } 
 }
</style>