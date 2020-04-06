<template>
<div class="page_header">
    <div class="page_header-image">
      <slot name="image">
      </slot>
    </div>
    <div class="page_header-claim">
      <p class="page_header-title">
        <slot name="title">
        </slot>
      </p>
      <p class="page_header-subtitle">
        <slot name="subtitle">
        </slot>
      </p>
    </div>
</div>
</template>

<script>

export default {

}
</script>


<style lang="less">
 @import '../../assets/variables.less';
.page_header {
  padding: 2rem 1rem;
  text-align: center;
  font-family: "Open Sans",Arial,sans-serif;
  //border-bottom: 1px solid @white95;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ._image {
    padding-bottom: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img, svg {
      fill: #B7B7B7;
      max-width: 90px;
      max-height: 90px;
      min-width: 90px;
      min-height: 90px;
    }
  }
  ._title {
    font-weight: 100;
    font-size: @font-size-xl;
    color: @white15;
    line-height: 1.5rem;
    margin-bottom: 1rem;
  }
  ._subtitle {
    font-weight: 100;
    font-size: @font-size-l;
    line-height: 1.5rem;
    color: @white15;
  }

  //modifiers
  &._thin {
      padding: 1rem;
  }

  &._white{
    background-color: @white;
  }
  &._grey{
    background-color: #FAFAFA;
  }

  &._line_bottom {
    border-bottom: 1px solid @white95;
  }
  &._line_top {
    border-top: 1px solid @white95;
  }
}

@media @m-up{
  .page_header{
    .test & {
      background: red;
    }
    &-image{
      padding: 2rem 0;
      width: 100%;
      .test & {
        background: blue;
      }
    }

    &-claim {
      width: 100%;
    }

    &-title {
      font-weight: 100;
      font-size: @font-size-xl;
      line-height: 2rem;
      color: @white15;
      padding-bottom: 2rem;
      .test & {
        background: green;
      }
    }
    &-subtitle {
      font-weight: 100;
      font-size: @font-size-s;
      line-height: 1.5rem;
      color: @white15;
      padding-bottom: 2rem;
      .test & {
        background: yellow;
      }
    }
  }
}


@media @m-up{
  .page_header{
    //padding: 3rem 2rem;
    //max-width: 764px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    &-image {
      padding: 0;
      width: 50%;
      img, svg{
        max-width: 50%;
        max-height: 120px;
        min-width: 50%;
        min-height: 120px;
      }
    }
    &-title {
      font-size: @font-size-xl-header;
    }
    &-subtitle {
      padding-bottom: 0;
      font-size: @font-size-l;
    }
  }
}
</style>
