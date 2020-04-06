<template>
<div class='travelIconsServices'>
    <!-- <span>{{icons}}</span> -->
    <span v-for="icon in images_list" v-bind:key="icon.id">
        <span class="travelIconsServices-myIcon" :class="icon.icon" :title="icon.title"></span>
    </span>
   
    <span v-if='overflow' class="travelIconsServices-myIcon-overflow">...</span>
</div>
</template>
<script>
let max_num_icons = 4;
export default {
  
  props: {
    icons:{},
    hasDetails:false
  },
  data () {
    return {
      images_list:[],
      overflow: false 
    }
  },
  created(){
    if(this.icons.length > max_num_icons){
      this.overflow = true
    }
    this.icons.forEach(element => {
      if(this.images_list.length < max_num_icons){
        switch(element){
            case 'flight':
                // let bb = this.$store.state.i18n_key['travels.icons.flight'] 
                  this.images_list.push({icon:'icon-Avion', title:'Avión'})
                  break;
            case 'hotel':
                  this.images_list.push({icon:'icon-Hotel', title:'Hotel'})
                break;
            case 'car':
                  this.images_list.push({icon:'icon-Coche',title:'Coche'})
                break;
            case 'train':
                  this.images_list.push({icon:'icon-Tren',title:'Tren'})
                break;
            case 'transfer':
                  this.images_list.push({icon:'icon-Coche', title:'Coche'})
                break;
            case 'tour':
                  this.images_list.push({icon:'icon-Escapada', title:'Escapada'})
                break;
            case 'buse':
                  this.images_list.push({icon:'icon-Coche', title:'Bus'})
                break;
            case 'ticket':
                  this.images_list.push({icon:'icon-EntradasL', title:'Entradas'})
                break;
            default:
                this.images_list.push({icon:'icon-Multidestino', title:'Multidestino'})
              
          }
      }
    });

     
  },
   computed:{
       getOverFlowIcons(){
           return this.$store.state.icons_max_overflow;
       }
   }
}
</script>
<style lang='less'>
 @import '../../styleguide/src/assets/icons.less';
.travelIconsServices{
    
    display: flex;
    flex-flow: row;
    &-myIcon{
      font-size: 24px;
      &-overflow{
        // background-color: rgb(247, 247, 247);
        //display: flex;
        font-weight: 200;
        font-size: 16px;
      
      }
    }
}
@media @l-up {
    .travelIconsServices{
      display: flex;
      flex-flow: row;
    &-myIcon{
      font-size: 24px;
      
      &-overflow{
        // background-color: rgb(247, 247, 247);
        display: flex;
        font-weight: 200;
        font-size: 16px;
      
      }
    }
}
}
</style>



