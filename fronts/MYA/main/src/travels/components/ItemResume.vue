<template>
<div class='item_resumen-wrap _unselectable'  >
    <div  class='item_resumen-main' v-on:click='openDetails'>
        <div class='item_resumen-main-info' >
            <p class='item_resumen-main-info-date _unselectable'>
                <slot name="date"/>
            </p>
            <p class='item_resumen-main-info-title _unselectable'  >
               
                <slot name="title"/>
                
            </p>
             
             <p :class='booking_status' class="item_resumen-main-info-state _unselectable">
                <slot name="state"/>
             </p>
        </div>
        <div class='item_resumen-main-services'>
            <span class='item_resumen-main-services-label'>Servicios:</span><slot name="icon_list"/>
        </div>
        <div  class="item_resumen-main-reservation">
            <p class='item_resumen-main-reservation-number _unselectable'>
                <span class='item_resumen-main-labels'>Reserva Nº:</span>
                <span class='_bold' >
                    <slot name="res_number"/>
                </span>
            </p>
            <p class='item_resumen-main-reservation-date _unselectable'>
                <span class='item_resumen-main-labels'>Realizada el:</span>
                <span class='_bold'>
                    <slot name="res_date"/>
                </span>
            </p>
        </div>
        <div  class="item_resumen-main-price">
            <slot name="price"/> 
        </div>
         <div class="travel-arrow">
                <span class="travel-arrow-icon">
                    <slot name="arrow"/>
                </span>
        </div>
        
    </div>
    <div class="item_resumen-main-line"/>
</div>
</template>
<script>
export default {
    props:{
        booking_code:{
            type: String,
            default:''
        },
        booking_status:{
            type: String,
            default: 'normal'
        },
        has_details:{
            type: Boolean,
            default: false
        }
    },
    methods: {
        openDetails(){
            this.$emit('openDetails',this.booking_code)
            // if(this.has_details){
            //     this.$emit('openDetails',this.booking_code)
            // }else{
                
            //     this.$store.dispatch('setStackDebug', `Sin detalle para ${this.booking_code}`)
            // }
            
        }
    },
}
</script>

<style lang="less">
@import '../../assets/variables.less';
.tr-mvp-details{
    visibility: visible
}
.tr-mvp-no_details{
    opacity: .1;
}
.travel-arrow{
        visibility: hidden;
        display: flex;
        align-items: center;
        &-icon{
            padding-left: 1rem;
        }
    }
.item_resumen-wrap{
    padding-left: 1rem;
    padding-right: 1rem;
    
    }
.item_resumen-main{
    // background-color: rgb(225, 224, 224);
    // border-bottom: solid 1px #E1E1E1;
    padding-top: 2rem;
    color: #484848;
    display: flex;
    flex-flow: column;
     ._unselectable {
        //  background-color: lawngreen;
        -moz-user-select: -moz-none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
        }
   
     &-labels{
            
            min-width: 6rem;
            font-size: 11px;
        }
    &-info{
        display:flex;
        flex-flow: column;
        margin-bottom: 1rem;
        color: #484848;
        padding-left: 1rem;
        padding-right: 1rem;
        
        // background-color: rgb(238, 238, 238);
        &-date{
            font-size: 11px;
            margin-bottom: .5rem;
        }
        &-title{
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;  
            overflow: hidden;
            font-size: 14px;
            font-weight: 400;
            
        }
        &-title:hover{
             //background-color: rgb(223, 223, 223);
             //padding: .4rem;
              -webkit-line-clamp: inherit;
              //border-radius:5px;
        }
        &-state{
            color: #8F8F8F;
            font-size: 11px;
            font-weight: 400;
            &.normal{
                color: #8F8F8F
            }
             &.confirm{
            color: #31AF6A
            }
             &.unpaid{
            color: #CF8E08
            }
             &.enjoyed{
            color: #8F8F8F
            }
             &.canceled{
            color: #FC4965
            }
            
        }
       
    }
    &-services{
        // background-color: rgb(222, 222, 222);
        font-size: 9px;
        // margin-bottom: .5rem;
        display: flex;
        align-items: center;
        padding-left: 1rem;
        padding-right: 1rem;
        font-size: 12px;
        &-label{
             min-width: 6rem;
           
            margin-bottom: .2rem;
        }
        
        
    }
    &-reservation{
        
        // background-color: rgb(238, 238, 238);
        display:flex;
        flex-flow: column;
        // margin-bottom: .5rem;
        padding-left: 1rem;
        // padding-right: 1rem;
        font-size: 12px;
        &-label{
            font-size: 10px;
            &._bold{
            font-weight: 600;
            }
            &._padding-r{
                padding-right: .2rem;
            }

        }
        
        &-number{
            // font-size: 10px;
            display: flex;
            flex-flow: row;
            margin-bottom: .5rem;
        }
        &-date{
            display: flex;
            flex-flow: row;
            // font-size: 10px;
            // margin-bottom: .5rem;
        }
    }
    &-price{
       
        // background-color: rgb(205, 205, 205);
        padding-left: 1rem;
        //padding-right: 1rem;
        margin-top: 1rem;
    }
    &-arrow{
        // background-color: rgb(238, 238, 238);
        visibility: hidden;
    }
    &-line{
        // padding: 1rem;
        padding-top: .5rem;
        border-bottom: solid 1px #E1E1E1;
        // border-bottom: solid 1px rgb(196, 0, 183);
    }

}
//  iPhone 6/7/8 Plus // 375
@media only screen and (min-width: 23.4375rem) {
    .item_resumen-main{
        //background-color: #CF8E08;
        padding-left: 1rem;
        padding-right: 1rem;
        &-info{
            padding-left: 0;
        }
        &-services{
        padding-left: 0;
        }
        &-reservation{
            padding-left: 0;
        }
        &-price{
            padding-left: 0;
        }
        &-line{
            margin-left: 1rem;
            margin-right: 1rem;
        }
    }
} 
// 'only screen and (min-width: 48em)'
@media @l-up {
    .item_resumen-wrap{
    padding-left: 1rem;
    padding-right: 1rem;
    }
    .travel-arrow{
        visibility: visible;
    }
    .tr-mvp-details{
        visibility: visible
    }
    .item_resumen-main{
        // background-color: rgb(32, 176, 219);
        margin: 0;
        border: 0;
        
        flex-flow: row;
        // padding-left: 0;
        // padding-right: 0;
        // padding-left: 2rem;
        // padding-right: 2rem;
        // padding-top:1rem;
         &-labels{
            //  background-color: #31AF6A;
            min-width: 0;
            margin-right: .5rem;
        }
        &-info{
            padding: 0;
            flex:80;
            margin-bottom: 0;
            &-title{
            -webkit-line-clamp: 1;
            }
        }
        &-services{
            flex: 50;
            padding-left: 0;
             padding-right: 0;
            &-label{
                display: none;
            }
        }
        &-reservation{ 
            flex: 70;
            margin-bottom: 0;
            display: flex;
            justify-content: center;
            padding-left: 0; 
        }
        &-price{
           
            flex: 30;
            margin-top: 0;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            //padding-right: 1rem;
            font-size: 18px;
        }
         &-arrow{
            visibility: visible;
             flex:10;
             align-items: center;
             //padding-left: 1rem;
         }
    }

}
/* ----------- iPad Pro ----------- */
/* Portrait and Landscape */
// @media only screen 
//   and (min-width: 1024px) 
//   and (max-height: 1366px) 
//   and (-webkit-min-device-pixel-ratio: 1.5) {
//     .item_resumen-wrap{
//             padding-left: 5rem;
//             padding-right: 5rem;
//     }
      
// }
</style>