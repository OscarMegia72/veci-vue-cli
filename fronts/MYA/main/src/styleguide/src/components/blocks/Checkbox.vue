<template>
<div class="textfield">
  <label :for="field" class="custom_check">
    <input ref="check" type="checkbox" :id="field" :name="field" :checked="value" @change="emitChange">
    <span></span>
    <slot name="label">
      <span class="label">{{label}}</span>
    </slot> 
    
  </label>
</div>
</template>

<script>
export default {
  props: {
    field: {},
    label: {},
    value: {
      default: false
    }
  },
  methods: {
    emitChange: function() {
      this.$emit('change', this.$refs.check.checked)
    },
    reset: function() {
      this.$refs.check.checked = false;
    }
  }
}
</script>

<style scoped lang="less">
@import '../../assets/variables.less';
.custom_check{
  cursor: pointer;
  input{
    display: none;
  }
  input+span{
    display: inline-block;
    vertical-align: middle;
    width: 18px;
    height: 18px;
    border: solid 2px #3E3E3E;
  }
  input:checked{
    +span{
      border-color: #3E3E3E;
      background-color: #3E3E3E;
      position: relative;
      &:before{
        position: absolute;
        left: -1px;
        top: -1px;
        color: white;
        content: "\e95a";
        // content: '*';
        font-family: 'moonshine-font', Open Sans, Arial, Helvetica, sans-serif;
      }
    }
  }
}
.label{
  color: #242424;
  font-size: 11px;
  font-weight: 500;
  display: inline-block;
  vertical-align: middle;
  text-transform: uppercase;
  padding-left: 10px;
  line-height: 1;
  line-height: 1.4;
}
</style>
