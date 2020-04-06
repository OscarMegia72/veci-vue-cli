<template functional >
    <div :class="['radio', props.customClass]" v-on="listeners">
      <input :id="props.custom_id" :name="props.group" type="radio" :disabled="props.is_disabled" :checked="props.value">
      <label :for="props.custom_id" class="radio-label"><slot></slot></label>
    </div>
</template>

<script>
export default {
  props: ['is_disabled', 'value', 'group', 'custom_id', 'customClass']
}
</script>

<style lang="less">
@import '../../assets/variables.less';
& {
  @color1: #FFFFFF;
  @color2: #4FA04F;
  @size: 18px;
  .radio {
    margin: 0.5rem;
    input[type="radio"] {
      position: absolute;
      opacity: 0;
      + .radio-label {
        display: flex;
        &:before {
          content: '';
          background: @color1;
          border-radius: 100%;
          border: 2px solid @color2;
          display: inline-block;
          width: @size;
          height: @size;
          position: relative;
          top: -0.2em;
          margin-right: 1em;
          vertical-align: top;
          cursor: pointer;
          text-align: center;
          transition: all 250ms ease;
        }
      }
      &:checked {
        + .radio-label {
          &:before {
            background-color: @color2;
            box-shadow: inset 0 0 0 4px @color1;
          }
        }
      }
      &:disabled {
        + .radio-label {
          &:before {
            box-shadow: inset 0 0 0 4px @color1;
            border-color: darken(@color1, 25%);
          }
        }
      }
      + .radio-label {
        &:empty {
          &:before {
            margin-right: 0;
          }
        }
      }
    }
  }
}
</style>