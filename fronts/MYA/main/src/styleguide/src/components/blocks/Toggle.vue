<template>
  <div class="toggle">
    <input ref="check" :name="name" :id="name" type="checkbox" :disabled="is_disabled" :checked="!!value" @change="emitToggleChange">
    <label :for="name">
      <div class="toggle-switch"></div>
      <div class="toggle-text"><slot></slot></div>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    'is_disabled': {
      default: false
    },
    'value' : {
      default: ''
    },
    'name': {
      type: String,
      default: 'toggle'
    }
  },
  methods: {
    emitToggleChange: function() {
      this.$emit('toggle_change', this.$refs.check.checked)
    }
  }
};
</script>

<style lang="less">
@import '../../assets/variables.less';
& {
  @can-toggle-off-color: rgb(255, 255, 255);
  @can-toggle-on-color: #4fa04f;
  @can-toggle-inactive-text: rgba(255, 255, 255, 0.7);
  @can-toggle-transition: cubic-bezier(0.86, 0, 0.07, 1);
  @can-toggle-width: 44px;
  @can-toggle-height: 20px;
  @can-toggle-border-radius: 44px;
  @can-toggle-offset: 4px;
  @can-toggle-label-font-size: 13px;
  @can-toggle-switch-font-size: 13px;
  @can-toggle-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  @can-toggle-switch-width: 15px;

  .toggle {
    box-sizing: border-box;
    position: relative;
    input[type='checkbox'] {
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      cursor: pointer;
      &[disabled] ~ label {
        color: @can-toggle-off-color;
        pointer-events: none;
        .toggle-switch {
          opacity: 0.4;
        }
        cursor: auto;
      }

      &:checked {
        ~ label {
          .toggle-switch {
            background-color: lighten(@can-toggle-on-color, 5%);
            &:before {
              left: 0;
            }
            &:after {
              background: @can-toggle-off-color;
              transform: translate3d(
                @can-toggle-width -
                  (@can-toggle-switch-width + @can-toggle-offset),
                0,
                0
              );
            }
          }
        }
      }
    }

    label {
      font-size: @can-toggle-label-font-size;
      user-select: none;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .toggle-text {
        padding-left: 1rem;
        text-align: left;
      }
      .toggle-switch {
        position: relative;
        height: @can-toggle-height;
        flex: 0 0 @can-toggle-width;
        border-radius: @can-toggle-border-radius;
        transition: background-color 0.3s @can-toggle-transition;
        background: lighten(@can-toggle-off-color, 5%);
        border: solid 2px @can-toggle-on-color;
        &:before {
          content: '';
          position: absolute;
          top: 0;
          text-transform: uppercase;
          text-align: center;
          left: @can-toggle-width / 2;
          font-size: @can-toggle-switch-font-size;
          line-height: @can-toggle-height;
          width: @can-toggle-width / 2;
          padding: 0 12px;
          color: @can-toggle-inactive-text;
        }
        &:after {
          content: '';
          position: absolute;
          z-index: 5;
          text-transform: uppercase;
          text-align: center;
          background: @can-toggle-on-color;
          transform: translate3d(0, 0, 0);
          top: @can-toggle-offset / 2;
          left: @can-toggle-offset / 2;
          border-radius: @can-toggle-border-radius / 2;
          width: @can-toggle-switch-width - @can-toggle-offset;
          height: @can-toggle-height - (@can-toggle-offset*2);
          line-height: @can-toggle-height - (@can-toggle-offset*2);
          font-size: @can-toggle-switch-font-size;
          -webkit-transition: -webkit-transform 0.3s @can-toggle-transition;
          transition: transform 0.3s @can-toggle-transition;
          color: @can-toggle-off-color;
        }
      }
    }
  }
}
</style>
