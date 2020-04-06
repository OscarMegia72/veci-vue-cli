<template>
    <div  class="operation-title-main">
         <slot name="operation_title"/>
         <div class="operation-title-main-border"/>
    </div>
</template>
<style lang="less">
.operation-title-main{
    text-transform: uppercase;
    min-height: 5rem; // no cuadra los espacios de maqueta con el kit a 4 rem
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 1.4px;
    padding-bottom: 4px;
    padding-top: 2.5rem; // ajuste para parecido visual con maqueta
    // debería ser un componente actulizado a última versión
    &-border{
        margin-top: 4px;
        border-bottom: 2px solid black;
        
    }
}
@media only screen and (min-width: 23.4375rem) {
    .operation-title-main{
        // background-color: aquamarine;
        min-height: 5rem;
        // padding-left: 2rem;
        // padding-right: 2rem;
    }   
} 
</style>