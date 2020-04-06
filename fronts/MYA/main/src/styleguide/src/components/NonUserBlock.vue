<template>
  <div class="non_user_block">
    <div class="non_user_block-body">
      <div>
        <v-list>
          <template v-for="(item,idx) in features">
            <li :key="idx">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g transform="translate(-308.081 -14)"><circle data-name="Ellipse 464" cx="12" cy="12" r="12" transform="translate(308.081 14)" fill="#77e4ff"/><path data-name="Path 5502" d="M314.797 26.133l2 2.205a.86.86 0 0 0 1.307 0l5.706-6.293.677-.745a.86.86 0 0 1 1.307 0l.13.143a1.1 1.1 0 0 1 0 1.446l-7.054 7.768a1.891 1.891 0 0 1-2.853 0l-2.661-2.942a1.1 1.1 0 0 1 0-1.446l.123-.136a.865.865 0 0 1 1.318 0z" fill="#fff"/></g></svg>
              {{ item }}
            </li>
          </template>
        </v-list>
      </div>
      <div class="non_user_block-image">
        <img :src="_image_url" alt="Crear Cuenta">
      </div>
    </div>
    <button-set :type="'_ok'">
      <template slot="ok">
        <v-link :href="'/registro'" :type="'_button _primary _cta'">{{ $t('non_user_block.create_account') }}</v-link>
      </template>
    </button-set>
  </div>
</template>

<script>
import ButtonSet from './layouts/ButtonSet.vue';
import Button from './blocks/Button.vue';
import List from './blocks/List.vue';
import Link from './blocks/Link.vue';


export default {
  components: {
    'button-set': ButtonSet,
    'v-button': Button,
    'v-list': List,
    'v-link': Link
  },
  data () {
    return {
        features: [
          this.$t('non_user_block.feature_1'),
          this.$t('non_user_block.feature_2'),
          this.$t('non_user_block.feature_3'),
          this.$t('non_user_block.feature_4'),
          this.$t('non_user_block.feature_5')
        ]
    }
  },
  computed: {
    _image_url () {
      return process.env.VUE_APP_ASSETS_BASE + '/stylesheets/images/my_account/crear_cuenta.svg'
    }
  }
}
</script>

<style lang="less">
  @import '../assets/variables.less';
  .non_user_block{
    &-body{
      display: flex;
      max-width: 500px;
      margin: 0 auto;
      padding: 3rem 0;
    }
    &-image{
      display: none;
    }
  }

  @media @l-up {
    .non_user_block{
      &-body{
        max-width: initial;
        > * {
          flex: 1 0 50%;
        }
      }
      &-image{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: auto;
        max-width: 300px;
      }
    }
  }


</style>
