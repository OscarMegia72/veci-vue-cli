<template>
  <div class="textfield">
    <template v-if="label !== null">
      <eci-label :field="field">{{label}}</eci-label>
    </template>
    <template v-if="readonly === true">
      <div class="field-wrapper">
        <eci-input :placeholder="placeholder" :value="value_1" :class="'input'" :readonly="'true'"/>
        <span class="separator"></span>
        <eci-input :placeholder="placeholder" :value="value_2" :class="'input'" :readonly="'true'"/>
        <span class="separator"></span>
        <eci-input :placeholder="placeholder" :value="value_3" :class="'input'" :readonly="'true'"/>
        <span class="separator"></span>
        <eci-input :placeholder="placeholder" :value="renderValue" :class="'input'" :readonly="'true'"/>
      </div>
    </template>
  </div>
</template>

<script>
import Label from '../blocks/Label.vue';
import Input from '../blocks/Input.vue';

export default {
  components: {
    'eci-label': Label,
    'eci-input': Input
  },
  computed: {
    renderValue () {
      return this.value
    }
  },
  props: {
    field: {},
    label: {
      type: String,
      default: null
    },
    placeholder: {
      type: [String],
      default: 'Introduce texto'
    },
    value: {
      default: ''
    },
    readonly: {
      default: false
    },
    value_1:{ default: '****' },
    value_2:{ default: '****' },
    value_3:{ default: '****' },
    value_4:{ default: '****' }
  }
}
</script>

<style lang="less">
  .field{
    &-wrapper{
      width: 100%;
      max-width: 290px;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-content: stretch;
      align-items: center;
      border: solid 1px #c5c5c5;
      background-color: #F0F0F0;
      input{
        flex: 1;
        border: none !important;
        min-width: 0;
        height: inherit;
        text-align: center;
      }
    }
  }
  .separator{
    flex-shrink:1;
    width: 1px;
    height: 22px;
    background-color: #C5C5C5;
  } 
</style>

