<template functional>
  <component :is="props.tag" :class="['new_text',props.type]">
    <slot></slot>
  </component>
</template>

<script>
export default {
  props: {'tag':{ default: 'p'}, 'type': { default: ''}}
}
</script>

<style scoped lang="less" >
@import '../../assets/variables.less';
  .new_text{
    &._page{
      display: block;
      text-align: center;
      font-size: 18px;
      font-weight: 200;
      color: #242424;
      text-align: center;
    }
    &._primary{
      font-size: 14px;
      color: #242424;
    }

    /*@font-size-xxs: 11px;
    @font-size-xs-button: 12px;
    @font-size-xs: 13px;
    @font-size-s: 14px;
    @font-size-m: 16px;
    @font-size-l: 18px;
    @font-size-xl: 22px;
    @font-size-xl-header: 28px;
    @font-size-xxl: 30px;
    */
    //modifiers
    &._pdl {padding-left: 0}
    &._tc { text-align: center }
    &._tl { text-align: left }
    &._tr { text-align: right }
    &._tiny{ font-size: 8px;}
    &._xxs{ font-size: @font-size-xxs}
    &._xs{ font-size: @font-size-xs}
    &._s{ font-size: @font-size-s }
    &._m{ font-size: @font-size-m }
    &._l{ font-size: @font-size-l }
    &._xl{ font-size: @font-size-xl }
    &._xxl{ font-size: @font-size-xxl }
    &._inherit{ font-size: inherit}

    &._light{ font-weight: 200};
    &._regular{ font-weight: 400};
    &._semi { font-weight: 500};
    &._bold { font-weight: 700};

    &._uppercase { text-transform: uppercase}
    &._underline { text-decoration: underline}


    &._brand {color: @brand_color };
    &._48{ color: #484848; };
    &._24{ color: #242424; };
    &._8F{ color: #8F8F8F  };

    &._l12{ line-height: 1.2};
    &._l14{ line-height: 1.4};
    &._l16{ line-height: 1.6};
    &._l18{ line-height: 1.8};
    &._l24{ line-height: 2.4};
    &._opacity3 {opacity: .3};

    &._ac {align-self: center;}
  }
      @medias: 'xs-up', 's-up', 'm-up', 'l-up', 'xl-up', 'xxl-up';

      .-(@i: 1) when (@i <= length(@medias)) {
      @mq: e(extract(@medias,@i));
      @media @@mq {
        .new_text{
          &._tiny-@{mq}{ font-size: 8px;}
          &._xxs-@{mq}{ font-size: @font-size-xxs}
          &._xs-@{mq}{ font-size: @font-size-xs}
          &._s-@{mq}{ font-size: @font-size-s }
          &._m-@{mq}{ font-size: @font-size-m }
          &._l-@{mq}{ font-size: @font-size-l }
          &._xl-@{mq}{ font-size: @font-size-xl }
          &._xxl-@{mq}{ font-size: @font-size-xxl }
          &._light-@{mq}{ font-weight: 100};
          &._semi-@{mq} { font-weight: 500};
          &._bold-@{mq} { font-weight: 700};
          &._l12-@{mq}{ line-height: 1.2};
          &._l14-@{mq}{ line-height: 1.4};
          &._l16-@{mq}{ line-height: 1.6};
          &._l18-@{mq}{ line-height: 1.8};
          &._l24-@{mq}{ line-height: 2.4};
        }
      }
      .-((@i + 1));
    } .-;
</style>
