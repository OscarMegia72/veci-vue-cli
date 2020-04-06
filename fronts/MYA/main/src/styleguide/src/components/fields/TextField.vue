<i18n>
{
  "es": {
    "required": "Campo Requerido"
  },
  "en": {
    "required": "Required field"
  },
  "ca": {
    "required": "Aquest camp és obligatori"
  },
  "fr": {
    "required": "Champ obligatoire"
  },
  "pt": {
    "required": "Campo obrigatório"
  }
}
</i18n>
<template>
  <div class="textfield">
    <template v-if="label !== null">
      <eci-label :field="field">{{label}} <span v-if="required"><sup v-tooltip="$t('required')">*</sup></span></eci-label>
    </template>    
    <eci-input :name="field" :placeholder="placeholder" :initial_value="initial_value" :class="['input', {'_invalid':invalid}]" :readonly="readonly"   @change="updateValue" />
    <slot name="error"></slot>
    <slot name="contextual"></slot>
  </div>
</template>

<script>
import Label from '../blocks/Label.vue';
import Input from '../blocks/Input.vue';


export default {
  methods: {
    updateValue: function(value){
      this.$emit('change', value);
    }
  },
  components: {
    'eci-label': Label,
    'eci-input': Input
  },
  props: {
    field: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    placeholder: {
      type: [String],
      default: 'Introduce texto'
    },
    initial_value: {
      default: ''
    },
    invalid: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    if(this.initial_value){
      this.updateValue(this.initial_value);
    }
  }
}
</script>

<style lang="less">
.textfield{
  .error{
    color: #FF5068;
    font-size: 10px;
    padding: .25rem;
    text-transform: uppercase;
  }
}
</style>

