<i18n>
{
  "es": {
    "page": "Página",
    "of": "de",
    "previous": "Anterior",
    "next": "Siguiente"
  },
  "en": {
    "page": "Page",
    "of": "of",
    "previous": "Previous",
    "next": "Next"
  },
  "ca": {
    "page": "Page",
    "of": "of",
    "previous": "Previous",
    "next": "Next"
  },
  "fr": {
    "page": "Page",
    "of": "of",
    "previous": "Previous",
    "next": "Next"
  },
  "pt": {
    "page": "Página",
    "of": "de",
    "previous": "Anterior",
    "next": "Seguinte"
  }
}
</i18n>

<template>
  <div class="pagination" >
    <template v-if="paginationData.prev_page">
      <button type="button" @click="paginatePrev()" :title="$t('previous')">
        <i class="icon arrow-left" :alt="$t('previous')"></i>
      </button>
    </template>
    <template v-else>
      <span class="disabled">
        <i class="icon arrow-left" :alt="$t('previous')"></i>
      </span>
    </template>
    <div class="pagination-body">
      <span>{{ $t('page') }} </span>
      <template v-if="paginationData.search_term">
        <input type="hidden" name="search" :value="paginationData.search_term">
      </template>
      <custom-input ref="InputPage"
        :initial_value="curr_page"
        :size="paginationData.total_pages_length"
        :pattern="'[0-9]+'"
        @change="paginateTo($event)"/>
      <span>{{ $t('of') }} </span>
      <span>{{paginationData.human_total_pages}} </span>
    </div>
    <template v-if="paginationData.next_page">
      <button type="button" @click="paginateNext()" :title="$t('next')">
        <i class="icon arrow-right" :alt="$t('next')"></i>
      </button>
    </template>
    <template v-else>
      <span class="disabled">
        <i class="icon arrow-right" :alt="$t('next')"></i>
      </span>
    </template>
  </div>
</template>

<script>
import Input from '../blocks/Input.vue';

export default {
  components: {
    'custom-input': Input,
  },
  props: {
    'pagination': {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      curr_page: this.pagination.current_page
    }
  },
  computed: {
    paginationData() {
      if (this.pagination) return this.pagination;
    },
  },
  methods : {
    paginatePrev: function () {
      this.curr_page --;
      this.$refs.InputPage.updateValue(this.curr_page)
    },
    paginateNext: function () {
      this.curr_page ++;
      this.$refs.InputPage.updateValue(this.curr_page)
    },
    paginateTo: function (page) {
      this.paginationData.currentPage = page
      if (page === '') return false;
      if(page > this.paginationData.total_pages) {
        return this.$emit('do-paginate', this.paginationData.total_pages);
      }else if (page < 1) {
        return this.$emit('do-paginate', 1);
      }
      return this.$emit('do-paginate', page);
    }
  }
};
</script>

<style lang="less">
  .pagination {
    height: 60px;
    display: flex;
    width: 100%;
    background-color: white;
    .disabled{
      opacity: .3;
      pointer-events: none;
    }
    button{
      color: inherit;
      text-decoration: none;
      background: transparent;
      border: none;
      outline: none;
      cursor: pointer;
    }
    > button,  > span {
      flex-shrink: 0;
      width: 40px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
    }
    >div{
      flex: 1;
    }

    &-body {
      display: grid;
      grid-template-columns: repeat(4, auto);
      align-items: center;
      justify-content: center;
      grid-gap: 12px;
      text-transform: uppercase;
      font-size: 12px;
      font-weight: 500;
      color: #484848;
    }
  }
  @media all and (-ms-high-contrast:none)
  {
    .pagination-body {
        display: flex;
        > * {
          flex-grow: 1;
          flex-shrink: 0;
        }
        input {
          width: auto !important;
          margin: 0 .5rem;
        }
    }
}

</style>
