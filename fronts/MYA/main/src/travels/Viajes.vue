<template>
    <div>
         <mya-title :tag="'h2'" 
            :data-cy="'travel-title'"
            :class="'_main'">{{ $t('travels.title') }}
        </mya-title>
        <h1>Travels Debug</h1>
        <p>{{ $t('travels.title') }}</p>
        <p>Debug: {{getStackDebug}}</p>
        <template >
                <empty-travels/>
        </template>
    </div>
</template>
<script>
import Title from '../styleguide/src/components/blocks/Title.vue';
import EmptyTravels from './components/EmptyTravels';
export default {
    components:{
        'mya-title': Title,
        'empty-travels': EmptyTravels
    },
    computed:{
       getStackDebug(){
           return this.$store.state.stack_debug;
       }
    },
   mounted(){
        this.$nextTick(function () {
          this.$store.dispatch('setStackDebug','Arranque aplicación');  
         })
   },
}
</script>
<style lang='less'>
 @import '../styleguide/src/assets/icons.less';
 @import '../styleguide/src/assets/variables.less';
 @media @l-up {
   
}
</style>