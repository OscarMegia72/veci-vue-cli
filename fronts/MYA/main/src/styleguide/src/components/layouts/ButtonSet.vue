<template functional>
  <div :class="['button_set',props.type]">
    <slot name="cancel"></slot>
    <slot name="ok"></slot>
    <slot name="doit"></slot>
  </div>
</template>

<script>
export default {
  props: ['type']
}
</script>

<style scoped lang="less">
.button_set{
  &._ok_cancel{
    width: 100%;
    display: flex;
    > * {
      flex: 1 0 50%;
    }
    > * + * {
      margin-left: 1rem;
    }
  }

  &._ok{
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }
  &._three_slots{
    width: 100%;
    display: grid;
    grid-template-areas: "cancel"
                         "ok"
                         "doit";
    grid-template-rows: 1fr;
    grid-template-columns: auto;
    grid-row-gap: 1rem;
    >*:nth-of-type(1){
      width: 100%;
      grid-area: ok;
    }
    >*:nth-of-type(2){
      width: 100%;
      grid-area: cancel;
    }
    >*:nth-of-type(3){
      width: 100%;
      grid-area: doit;
    }
  }
}
@media only screen and (min-width: 37.5em){
  .button_set{
    &._ok_cancel{
      justify-content: center;
      grid-template-columns: repeat(auto-fit, minmax(auto, 250px) );
      grid-column-gap: 1rem;
      grid-template-areas: "cancel ok";
      >*:nth-of-type(1){
        width: auto;
        order: 1;
      }
      >*:nth-of-type(2){
        width: auto;
        order: 2
      }
    }
    &._three_slots{
      justify-content: center;
      grid-template-columns: repeat(auto-fit, minmax(auto, 250px) );
      grid-column-gap: 1rem;
      grid-template-areas: "cancel ok doit";
      >*:nth-of-type(1){
        width: auto;
        order: 1;
      }
      >*:nth-of-type(2){
        width: auto;
        order: 2
      }
      >*:nth-of-type(3){
        width: auto;
        order: 3
      }
    }
  }
}
</style>
