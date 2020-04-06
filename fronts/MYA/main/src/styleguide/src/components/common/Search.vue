<template>
  <div>
    <form class="search_order" @submit.prevent="doSearch">
      <button :class="['search_order-close',{'_open': filtered}]" type="button" @click="doReset">&#215;</button>
      <input
        type="text"
        name="question"
        class="search_order-input"
        :placeholder="placeholder"
        v-model="term"
      >
      <button
        :disabled="disableButton"
        class="search_order-button"
        title="Buscar"
        @click="doSearch"
      >
        <span class="icon search"></span>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String
    },
    min_length: {
      type: Number,
      default: 3
    },
    search_term: {
      type: String
    },
    filtered: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      term: this.$props.search_term
    };
  },
  computed: {
    disableButton: function() {
      if (!this.term) return false;
      return this.term.length < this.min_length;
    }
  },
  methods: {
    doSearch: function(ev) {
      ev.preventDefault();
      this.$emit('do-search', this.term);
    },
    doReset: function() {
      this.term = '';
      this.$emit('reset')
    }
  }
};
</script>

<style lang="less">
@import '../../assets/variables.less';
& {
  @control_height: 48px;
  @control_height_tablet: 68px;
  .search_order {
    width: 100%;
    display: flex;
    background-color: #FAFAFA;
    &-input {
      flex: 1;
      display: flex;
      align-items: center;
      padding: 1rem 0 1rem 1rem;
      height: @control_height;
      background-color: #FAFAFA;
      border: none;
      outline: none;
      font-size: 14px;
      color: @white15;
      transition: all 0.1s ease-in-out;
      &::-webkit-input-placeholder {
        font-size: 12px;
        color: #8f8f8f;
        font-style: italic;
      }
      &::-moz-placeholder {
        font-size: 12px;
        color: @white60;
        font-style: italic;
      }
      &:-ms-input-placeholder {
        font-size: 12px;
        color: @white60;
        font-style: italic;
      }
      &:-moz-placeholder {
        font-size: 12px;
        color: @white60;
        font-style: italic;
      }
    }
    &-button {
      .reset-button();
      width: 50px;
      flex-shrink: 0;
      color: #484848;
      cursor: pointer;
      .icon {
        font-size: 30px;
      }
      &:disabled {
        opacity: 0.5;
      }
    }
    &-close {
      .reset-button();
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 0;
      transition: width .3s ease-in-out;
      font-size: 18px;
      font-weight: bold;
      &._open {
        width: 40px;
      }
    }
  }
  @media @l-up {
    .search_order {
      &-input {
        padding: 2rem;
        height: @control_height_tablet;
        background: transparent;
      }
      &-button {
        width: 60px;
        .icon {
          font-size: 32px;
        }
      }
    }
  }
}
</style>
