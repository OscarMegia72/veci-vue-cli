<template>
    <div id='header-labels' class="header-labels">
        <div class="header-labels-empty"></div>
        <div class="header-labels-services">
             {{ $t('travels.services') }}
        </div>
        <div class="header-labels-reservation">
            <span class="header-labels-reservation _padleft" >
                 {{ $t('travels.reservation') }}
            </span>
            
            </div>
        <div class="header-labels-amount">
             {{ $t('travels.amount') }}
        </div>
        <div class="header-labels-arrow">&nbsp</div>
    </div>
</template>
<style lang="less">
.header-labels{
    display: none;
}
@media @l-up {
.header-labels{
    // background-color: antiquewhite;
    display: flex;
    font-size: 10px;
    font-weight: 600;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 1rem;
    padding-bottom: .75rem;
    text-transform: uppercase;
    &-empty{
        box-sizing: border-box;
        flex:80;
        // background-color: aqua;
 
    }
    &-services{

        box-sizing: border-box;
        // background-color: rgb(138, 162, 162);
        flex:50;

    }
    &-reservation{
        box-sizing: border-box;
        // background-color: rgb(191, 218, 218);
        flex:70;
        &._padleft{
           padding-left: 0rem;
        }
    }
    &-amount{
        box-sizing: border-box;
        // background-color: rgb(231, 224, 172);
        flex:30;
        display: flex;
        justify-content: center;
        //padding-right: 4rem;
        //padding-left: 1rem;
    }
    &-arrow{
        box-sizing: border-box;
        flex:10;
        //padding-left: .5rem;
        // background-color: rgb(220, 218, 204);
    }

}
}
</style>