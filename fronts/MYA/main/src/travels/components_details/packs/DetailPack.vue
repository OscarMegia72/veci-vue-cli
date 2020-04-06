<template>
    <div class='prueba'>
        <h4> DetailPack </h4>
        <p  v-html="pack.description" /> 
    </div>
</template>
<script>
export default {
    props:{
        pack:{
            type:Object,
            default:{}
        }
    }

}
</script>
<style lang="less" scoped>
.demo{
     animation:blinkingText 2s infinite;
    font-size: 14px;
    color:cornflowerblue;
    font-weight: 600;

    padding: 2rem 3.5rem 2rem 3.5rem
}
@keyframes blinkingText{
    0%{     color: cornflowerblue;    }
    60%{    color: transparent; }
    99%{    color:transparent;  }
    100%{   color: cornflowerblue;    }
}
.prueba{
    margin-top: 1rem;
    font-size: 11px;
    padding-left: 3.5rem;
    margin-bottom: 2rem;
}
</style>