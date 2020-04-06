<template>
  <input :type="type || 'text'" :placeholder="placeholder"
                     :name="name"
                      v-model="value"
                      v-bind="$attrs"
                      :readonly="readonly"
                      @change="onChange"

  :class="[{'input':true},{'_readonly':readonly}]">
</template>

<script>
export default {
  inheritAttrs: false,
  props: ['name', 'placeholder', 'readonly', 'initial_value', 'type'],
  data () {
    return {
      value: ''
    }
  },
  mounted(){
    this.value = this.initial_value
  },
  methods: {
    onChange() {
      this.$emit('change', this.value);
    },
    updateValue(value){
      this.value = value
      this.$emit('change', this.value);
    }
  }
}
</script>

<style scoped lang="less">
    .input{
      width: 100%;
      background-color: #fff;
      border: solid 1px #C5C5C5;
      padding: 15px 10px;
      height: 40px;
      min-height: 40px;
      font-size: 14px;
      color: #484848;
      font-weight: 400;
      transition: all .1s ease-in-out;

    &::-webkit-input-placeholder {
      font-size: 11px;
      color: #8F8F8F;
      font-weight: 200;
    }
    &::-moz-placeholder {
      font-size: 11px;
      color: #8F8F8F;
      font-weight: 200;
    }
    &:-ms-input-placeholder {
      font-size: 11px;
      color: #8F8F8F;
      font-weight: 200;
    }
    &:-moz-placeholder {
      font-size: 11px;
      color: #8F8F8F;
      font-weight: 200;
    }
    &:focus{
      border-color: #484848;
      box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.3);
    }
    &:-webkit-autofill {
      background-color: #F9FAD7;
    }
    &:-webkit-autofill {
      background-color: #F9FAD7;
    }
    &:invalid, &._invalid {
      border-color: #FF5068;
      box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.3);
    }
    //modifiers
    &._readonly {
      pointer-events: none;
      cursor: pointer;
      color: rgba(143,143,143,0.75);
      background-color: #F0F0F0;
    }
  }
</style>
