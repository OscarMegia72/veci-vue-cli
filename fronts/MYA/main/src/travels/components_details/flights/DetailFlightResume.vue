<template>
<div :class="['details-fl-res',align_class]">
    <div :class="align_class" class="_date">
        <slot name="Date"/>
    </div>
     <div class="details-fl-res-hour">
         <slot name="Time"/>
    </div>
     <div class="details-fl-res-airport" :class="mod_airport" >
         <slot name="City"/>
    </div>
     <div v-if="terminal" class="departureTerminal">
         {{ $t('travels.terminal') }}
         <slot name="Terminal"/>
    </div>
    <div class="details-fl-res-airport">
         <slot name="DesAirport"/>
    </div>

</div>
</template>
<script>
export default {
    props:{
        terminal:{
                type:Boolean,
                default: false
            },
        align_items:{
            type:String,
            default:'left'
        }
    },
    computed: {
        align_class(){
            return `details-fl-res-${this.align_items}`;
        },
        mod_airport(){
            return `details-fl _${this.align_items}`
        }
    },
}
</script>
<style lang="less">
 @import '../../../styleguide/src/assets/icons.less';
 .details-fl-res{
    // background-color: aqua;
    font-size: 11px;
    color:#484848;
    display: flex;
    flex-flow: column;
    align-items: flex-start;
     &-date{

    }
    &-airport{

    }
    &-hour{
        font-size: 24px;
        font-weight: 400;
    }
    &-terminal{
       color: #8F8F8F
    }
    
    
 }
 .details-fl-res-left{
     &-date{

    }
    &-airport{

    }
    &-hour{
        font-size: 24px;
        font-weight: 400;
    }
    &-terminal{
       color: #8F8F8F
    }

 }
.details-fl{
     &._right{
        
        display: flex;
        flex-flow: column;
        align-items: flex-end;
        text-align: right;
    }
 }
 
.details-fl-res-right{
    display: flex;
    flex-flow: column;
    align-items: flex-end;
    // background-color: rgb(223, 140, 248);
    font-size: 11px;
    color:#484848;
    &-date{

    }
    &-airport{
        text-align: right;
    }
    &-hour{
        font-size: 24px;
        font-weight: 400;
    }
    &-terminal{
       color: #8F8F8F
    }
    &._left{
        display: flex;
        flex-flow: column;
        align-items: flex-start;
        // background-color: rgb(127, 208, 255);
    }
    
 }
 </style>