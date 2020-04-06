<template>
    <div>
        <p class="demo"> Ticket Detalle </p>
    </div>
</template>
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
</style>