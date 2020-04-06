<template>
  <div class="stepper">
    <template v-if="disabled">
        <div class="stepper-button _disabled _left"></div>
        <div class="stepper-input">{{numericValue}}</div>
        <div class="stepper-button _disabled _right"></div>
    </template>
    <template v-else>
        <button @click.prevent="decreaseNumber" :class="['stepper-button _left',{'_disabled':numericValue <= min}]">-</button>
        <input
            type="number"
            v-bind:value="numericValue"
            @keypress="validateInput"
            @input="numericValue = $event.target.value"
            class="stepper-input"
            :min="min"
            :max="max"
            debounce="500"
        />
        <button @click.prevent="increaseNumber" :class="['stepper-button _right',{'_disabled':numericValue >= max}]">+</button>
    </template>
  </div>
</template>

<script>
export default {
  name: 'NumberInputSpinner',

  data: function() {
    return {
      numericValue: this.value
    };
  },

  props: {
    value: {
      type: Number,
      default: 0
    },
    min: {
      default: 0,
      type: Number
    },
    max: {
      default: 10,
      type: Number
    },
    step: {
      default: 1,
      type: Number
    },
    inputClass: {
      default: 'vnis__input',
      type: String
    },
    buttonClass: {
      default: 'vnis__button',
      type: String
    },
    integerOnly: {
      default: false,
      type: Boolean
    },
    disabled: {
      default: false,
      type: Boolean
    }
  },

  methods: {
    increaseNumber() {
      this.numericValue += this.step;
    },

    decreaseNumber() {
      this.numericValue -= this.step;
    },

    isInteger(evt) {
      evt = evt ? evt : window.event;
      let key = evt.keyCode || evt.which;
      key = String.fromCharCode(key);
      const regex = /[0-9]/;

      if (!regex.test(key)) {
        evt.returnValue = false;
        if (evt.preventDefault) evt.preventDefault();
      }
    },

    isNumber(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;

      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },

    validateInput(evt) {
      if (this.integerOnly === true) {
        this.isInteger(evt);
      } else {
        this.isNumber(evt);
      }
    }
  },

  watch: {
    numericValue: function(val, oldVal) {
      if (val <= this.min) {
        this.numericValue = parseInt(this.min);
      }

      if (val >= this.max) {
        this.numericValue = parseInt(this.max);
      }

      if (val <= this.max && val >= this.min) {
        this.$emit('input', val, oldVal);
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../assets/variables.less';
.stepper-disabled {
}
.stepper {
  font-size: 16px;
  display: grid;
  grid-template-columns: 2em 1fr 2em;
  grid-template-rows: 2.5em;
  border: solid 1px #E1E1E1;
  border-radius: 3em;
  overflow: hidden;
  width: 7em;
  &._small {
    font-size: 12px;
  }
  &-button{
    .reset-button();
    font-size: 1em;
    font-weight: 500;
    background: #F7F7F7;
    &._left {
      font-size: 1.25em;
      border-radius: 3em 0 0 3em;
    }
    &._right {
      border-radius: 0 3em 3em 0;
      padding-right: 1em;
    }
    &._disabled{
        pointer-events: none;
        color: #cacaca;
    }

  }
  &-input{
    border: none;
    outline: none;
    background: #F7F7F7;
    text-align: center;
    padding: 0 .5em;
    &:focus{
        background: #fff;
    }
    display: grid;
    font-size: .8em;
    align-items: center;
  }
}
</style>