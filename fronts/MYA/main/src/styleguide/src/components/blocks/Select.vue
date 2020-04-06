<template>
  <div :class="['select', {'_disabled': disabled}]">
    <select :disabled="disabled"  name="name" id="name" @change="onChange" :value="current_value">
      <template v-for="(option, idx) in options">
      <option :key="`${name}_${idx}`" :value="option.value">{{option.label}}</option>
      </template>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    'name': {
      type: String,
      default: 'input_select'
    },
    options: {
      type: Array,
      default: []
    },
    value: {
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      current_value: this.value || ''
    }
  },
  methods: {
    onChange: function (event) {
      this.current_value = event.target.value;
      this.$emit('change', event.target.value, this.name)
    },
    getValue: function() {
      return this.current_value
    }
  }
}
</script>

<style scoped lang="less">
  .select{
    font-size: 12px;
    border: 1px solid #C5C5C5;
    padding: 8px;
    -webkit-appearance: none;
    width: 100%;
    outline: none;
    position:relative;
    overflow: hidden;
    transition: opacity .3s ease-in-out;
    background-color: white;
    &:before{
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      display: block;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: -100;
      background-color: #C5C5C5;
      transition: all .3s ease-out;
    }

    &:after{
      content: "";
      position: absolute;
      right: 1rem;
      color: #242424;
      top: ~"calc(50% - 6px)";
      font-family: 'moonshine-font', Open Sans, Arial, Helvetica, sans-serif;
      font-size: 12px;
      speak: none;
      font-style: normal;
      font-weight: normal;
      font-variant: normal;
      text-transform: none;
      text-decoration: none;
      -webkit-font-smoothing: antialiased;
      content: "\E91C";
    }

    &._disabled {
      opacity: .5;
      pointer-events: none;
    }

    &._selected{
      border: 1px solid #242424;
      &:before{
        transform: translateY(100%);
      }
      &:after{
        color :#242424;
      }
      select{
        color: #242424;
      }
    }
    select {
      padding: 5px 8px;
      width: 130%;
      border: none;
      box-shadow: none;
      background-color: transparent;
      background-image: none;
      color: #242424;
      outline: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }
  }

</style>
