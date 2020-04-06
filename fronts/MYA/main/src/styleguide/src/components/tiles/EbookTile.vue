<template>
  <div class="ebook_tile">
    <div class="ebook_tile-image">
      <img :src="item.covers.medium_image" :alt="item.title">
    </div>
    <div class="ebook_tile-description">
      <eci-text :type="'_xxs _24'">{{item.title}}</eci-text>
    </div>
    <div class="ebook_tile-actions">
      <eci-link :type="'_cta'" :href="item.url_for_read" :target="'_blank'">{{ $t('ebooks.list.actions.read') }}</eci-link>
      <eci-button v-if="item.url_for_download" :type="'_link _cta'" @click="getDownloadLink">{{ $t('ebooks.list.actions.download') }}</eci-button>
      <eci-button v-if="!item.url_for_download" :type="'_link _cta'" @click="getDownloadLink">{{ $t('ebooks.list.actions.download') }}</eci-button>
    </div>
  </div>
</template>

<script>
import Text from '../blocks/Text.vue';
import Link from '../blocks/Link.vue';
import Button from '../blocks/Button.vue';

export default {
  api_endpoint: '/api/user/ebooks/',
  components: {
    'eci-text': Text,
    'eci-link': Link,
    'eci-button': Button,
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    getDownloadLink: async function() {
      const { $options, $rest, item, $cookie } = this;
      if(item.url_for_download) {
        $rest.get('https://streaming.tagusbooks.com/cdl-ebs/security/validate_token',
          { xhr: { withCredentials:true },
            data:{
              token: $cookie.get('token_param')
            }
          }, function(err, result) {
              return window.open(
              `https://streaming.tagusbooks.com/cdl-ebs/bookNoDRM/${item.isbn}/`,
              '_blank'
              )
          }
        )
      } else {
        try {
          var result = await $rest.getP(`${$options.api_endpoint}generate-download-link`,{params: {isbn: this.item.isbn}})
          window.location.href = result.data.link;
        } catch (err) {
          console.log(err)
        }
      }
    },

  }
}
</script>

<style lang="less">
@import '../../assets/variables';
.ebook_tile {
  padding: 1rem 1rem 0 1rem;
  box-shadow: 1px 1px 4px 1px rgba(46, 46, 46, 0.12);
  display: flex;
  flex-direction: column;
  align-items: center;
  > * + * {
    margin-top: 1.5rem;
  }
  &-description {
    padding: 0 1rem;
    text-align: center;
  }
  &-actions {
    min-height: 50px;
    display: flex;
    width: 100%;
    align-items: center;
    > * {
      flex: 1 0 50%;
      text-align: center;
    }
    a {
      text-align: center !important;
    }
  }
}
@media @l-up {
  .ebook_tile {
    box-shadow: none;
    flex-direction: row;
    width: 100%;
    > * + * {
      margin-top: 0;
    }
    &-image {
      flex: 0 0 115px;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        max-width: 64px;
        height: auto;
      }
    }
    &-description {
      flex: 1 0;
      text-align: left;
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    &-actions {
      flex: 0 1 200px;
    }
  }
}
</style>
