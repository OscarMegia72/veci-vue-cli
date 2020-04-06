<template>
  <div class="consent">
    <!--<div class="consent-title">
      <eci-text :tag="'h4'" :type="'_xs _semi _uppercase _24'">{{ consent.schema.description }}</eci-text>
    </div>-->
    <div class="consent-body">
    <eci-checkbox
    :field="`consent${consent.consent.code}`"
    :value="consent.consent.consents[0].response === 'ACCEPTED'"
     @change="handlerSubscriptionChange">
     <template slot="label">
       <eci-text :tag="'span'" :type="'_xs _light _48'">{{consent.schema.legal_description }}</eci-text>
     </template>
     </eci-checkbox>
    </div>
  </div>
</template>

<script>
import Title from './blocks/Title.vue';
import Text from './blocks/Text.vue';
import Checkbox from './blocks/Checkbox.vue';

export default {
  components: {
    'eci-title': Title,
    'eci-text': Text,
    'eci-checkbox': Checkbox
  },
  props: {
    consent: {
      default: () => {
        return {
          consent: {},
          schema: {}
        }
      }
    }
  },
  methods: {
    handlerSubscriptionChange: function (checkStatus) {
      this.consent.consent.consents.forEach(c => {
        c.accepted_check = checkStatus
      })
      this.$emit('update_consent', {
        code: this.consent.consent.code,
        version: this.consent.schema.version,
        consents: this.consent.consent.consents
      })
    }
  }
}
</script>

<style scoped lang="less">
  .consent{
    display: flex;
    flex-direction: column;
    &-title{
      padding: 1rem;
    }
    &-body{
      padding: 1rem;
    }
  }
</style>
