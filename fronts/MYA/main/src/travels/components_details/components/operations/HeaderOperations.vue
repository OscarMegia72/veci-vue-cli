<template>
    <div class='operations-header _wrapper'>
        <div class='operations-header-title'>
             {{ $t('travels.operations_title') }}
        </div>
    </div>
</template>
<style lang="less">
@import '../../../../styleguide/src/assets/icons.less';
@import '../../../../styleguide/src/assets/variables.less';
</style>
<style scoped lang="less">
@import '../../../styleguide/src/assets/icons.less';
@import '../../../styleguide/src/assets/variables.less';
 .operations-header{
     &._wrapper{
        background-color: #FAFAFA;
        // background-color: rgb(228, 228, 228);
        display: flex;
        flex-flow: row;
        height: 96px;
        display: flex;
        flex-flow: row;
        padding-left: 2rem;
        padding-right: 2rem;
     }
     &-title{
        letter-spacing: 2px;
        font-size: 18px;
        font-weight: 400;
        display: flex;
        flex-flow: row;
        align-items: center;
        width: 100%;
        text-align: center;
        justify-content: center;
     } 
 }
 @media @l-up {
    operations-header{
        &._wrapper{
            
            padding-left: 3rem;
            padding-right: 3rem;
        }
       
    }
 }
</style>