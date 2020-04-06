<template>
    <div v-on:click='closeMe' class="modalError400">
        <div class="modalError400-container">
            <header class="modalError400-header">
                <slot name='header'/>
                </header>
            <div class="modalError400-message">
                <slot name='message'/>
                </div>
            <footer><slot name='footer'/></footer>  
        </div>
    </div>
    
</template>
<script>
export default {
    methods:{
        closeMe(){
            this.$emit('close')
        }
    }
}
</script>
<style lang='less'>
.modalError400{
    z-index: 900;
     width: 100%;
    background-color: rgba(0,0,0,0.4);
    overflow: hidden;
    display: flex;
    justify-content:center;
    align-items: center;
    padding: 2rem;
    
    &-container{
        width: 80%;
        background-color: white;
        border-radius: .5rem;
        padding: 2rem;
        max-width: 480px;

    }
    &-header{
        font-size: 18px;
        font-weight: 600;
    }
    &-message{
        padding-top: 1rem;
        font-size: 11px;
    }
}

   
</style>