<template>
  <div :class="['subscription', {'_active': subscription.current}]">
    <div class="subscription-content">
      <div >
        <eci-checkbox v-if="!subscription.current"
        :field="`subscription${subscription.schema.code}`"
        :value="subscription.current"
        @change="selectSubscription"/>
      </div>
      <div>
        <div class="subscription-body">
            <template v-if="!subscription.current">
              <eci-text :tag="'p'" :type="'_l _semi _24 mb'">{{ subscription.schema.description }}</eci-text>
              <eci-text :tag="'p'" :type="'_s _light _24'">{{ $t('commercial_comunications.pressing_here') }} <eci-button @click="showPolicy" :type="'_link _cta'">{{ $t('commercial_comunications.policy.title') }}</eci-button>.</eci-text>
            </template>
            <template v-else>
              <eci-text :tag="'p'" :type="'_l _semi _24 mb tc'">{{ subscription.schema.description }}</eci-text>
              <eci-text :tag="'p'" :type="'_s _light _24 mb tc'">{{ $t('commercial_comunications.subscription_already_activated') }}</eci-text>
            </template>
            <eci-transitions-expand>
              <div v-if="subscription.current">
                  <div class="subscription-options">
                    <!-- Channel -->
                    <div>
                      <eci-text :tag="'p'" :type="'_xs _semi _24 _uppercase pt pb mb'">{{ $t('views.signup.how') }}</eci-text>
                      <template v-for="(channel, idx) in subscription.schema.communication_channel">
                        <eci-radio :key="`channel${idx}.value`"
                                   :group="`communication_channel_${subscription.schema.code}`"
                                   :custom_id="`${subscription.schema.code}${channel.value}`"
                                   :value="_channel === channel.value"
                                  @change="updateChannel(channel.value)"> <eci-text :tag="'span'" :type="'_xs _24'">{{ $t(channel.label) | capitalize }}</eci-text>
                        </eci-radio>
                      </template>
                    </div>
                    <!-- Frequency -->
                    <div>
                      <eci-text :tag="'p'" :type="'_xs _semi _24 _uppercase pt pb mb'">{{ $t('views.signup.when') }}</eci-text>
                      <template v-for="(frequency, idx) in this.subscription.schema.communication_frequency">
                        <eci-radio :key="`frequency${idx}`"
                                  :group="`frequency${subscription.schema.code}`"
                                  :custom_id="`${subscription.schema.code}${frequency.value}`"
                                  :value="_frequency === frequency.value"
                                  @change="updateFrequency(frequency.value)"> <eci-text :tag="'span'" :type="'_xs _24'">{{ $t(frequency.label) | capitalize }}</eci-text>
                        </eci-radio>
                      </template>
                    </div>
                  </div>
              </div>
            </eci-transitions-expand>
        </div>
        <div class="subscription-button_holder" v-if="subscription.current">
          <eci-button :type="'_primary_icon _warning'" @click="sendRemoveSubscription">
            <span>{{ $t('commercial_comunications.cta_cancel') }}</span>
            <span><i :class="['icon', _icon_button]"></i></span>
          </eci-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from './blocks/Title.vue';
import Text from './blocks/Text.vue';
import Button from './blocks/Button.vue';
import Radio from './blocks/Radio.vue';
import Expand from './transitions/Expand.vue';
import Checkbox from './blocks/Checkbox.vue';


export default {
  components: {
    'eci-title': Title,
    'eci-text': Text,
    'eci-button': Button,
    'eci-radio': Radio,
    'eci-transitions-expand': Expand,
    'eci-checkbox': Checkbox
  },
  props: {
    subscription: {
      default: () => {
        return {
          consent: {},
          schema: {},
          current: {},
        }
      }
    }
  },
  data () {
    return {
      active: this.subscription && this.subscription.current && this.subscription.current.status === 'ACTIVE' ? true: false,
      selected_frequency: '',
      selected_channel: '',
      icon_button: 'check',
      status: ''
    }
  },
  computed: {
    _frequency: function () {
      if (this.subscription.current) {
        return this.subscription.current.communication_frequency
      }
      return this.subscription.schema.communication_frequency[0]
    },
    _channel: function () {
      if (this.subscription.current) {
        return this.subscription.current.communication_channel
      }
      return this.subscription.schema.communication_channel[0]
    },
    _icon_button: function() {
      if(this.status === 'SENDING') {
        return 'spinner'
      }
      return this.subscription.current? 'cross _xxl': 'check'
    }
  },
  mounted: function() {
    this.selected_frequency = this.subscription.current ? this.subscription.current.communication_frequency : null
    this.selected_channel = this.subscription.current ? this.subscription.current.communication_channel : null
  },
  watch: {
    subscription: function(value) {
      this.selected_frequency = value.current ? value.current.communication_frequency : null
      this.selected_channel = value.current ? value.current.communication_channel : null
      this.status = '';
    }
  },
  methods: {
    sendUpdateSubscription: function () {
      let newSubscription = this.updateSubscriptionObject()
      this.$emit('update_subscription', newSubscription)
    },

    sendCreateSubscription: function () {
      if(this.status === 'SENDING') return false;
      let newSubscription = this.createSubscriptionObject()
      this.status = 'SENDING';
      this.$emit('create_subscription', newSubscription)
    },

    sendRemoveSubscription: function () {
      this.$emit('remove_subscription', this.subscription.schema.service)
    },

    showPolicy: function() {
      this.$emit('show_policy',this.subscription.schema.sites[0]);
    },

    updateChannel: function(value) {
      this.selected_channel = value;
      return this.sendUpdateSubscription();
    },

    updateFrequency: function(value) {
      this.selected_frequency = value;
      return this.sendUpdateSubscription();
    },

    resetStatus: function() {
      this.status = '';
    },

    createSubscriptionObject: function() {
      return {
        communication_channel: this._channel,
        communication_frequency: this._frequency,
        service: this.subscription.schema.service,
        selected_function: this.subscription.schema.code,
        text_version: this.subscription.schema.version,
        code: this.subscription.consent.consents[0].code,
        version: this.subscription.schema.version,
        site: this.subscription.schema.sites[0]
      }
    },

    updateSubscriptionObject: function() {
      return {
        communication_channel: this.selected_channel,
        communication_frequency: this.selected_frequency,
        service: this.subscription.schema.service,
        selected_function: this.subscription.schema.code,
        text_version: this.subscription.schema.version,
        code: this.subscription.consent.consents[0].code,
        version: this.subscription.schema.version
      }
    },
    selectSubscription: function() {
      if(this.status === 'SENDING') return false;
      let newSubscription = this.createSubscriptionObject()
      this.$emit('select_subscription', newSubscription)
    }
  },

}
</script>

<style lang="less">
@import '../assets/variables.less';
.subscription{
    background-color: #F9F9F9;
    padding: 1.5rem 1rem;
    &._active {
      background-color: white;
    }
    &._consent {
      background-color: white;
      border-bottom: none !important;
    }
    &:not(:last-of-type) {
      border-bottom: solid 1px #E1E1E1;
    }
    &-content {
      display: flex;
      flex-direction: row;
      width: 100%;
      margin: 0 auto;
      >div:first-of-type {
        flex: 0 1 40px;
        display: flex;
        justify-content: flex-end;
        padding-top: .2rem;
        ._active & {
          flex: 0 0;
        }
      }
      >div:last-of-type {
        flex: 1 0;
      }
    }

    &-button_holder{
      padding: 1rem;
    }

    &-select_holder{
      display: flex;
      margin-bottom: .5rem;
      align-items: center;
      max-width: 350px;
      .new_text {
        margin-right: 12px;
      }
    }
    &-options {
      margin: 1rem auto;
    }

    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
    &-button_holder{
      padding: 1rem 0;
    }
}

@media @l-up {
  .subscription {
    &-options {
      display: flex;
      flex-direction: row;
      max-width: 600px;
      margin: 1rem auto;
      > * {
        flex: 1 0 auto;
      }
      &._signup {
        max-width: initial;;
      }
    }
    &-button_holder{
      justify-self: center;
      max-width: 311px;
      margin: 0 auto;
      padding: 1rem 0;
    }
  }
}

@media @xl-up {
    .subscription {
      &-content {
        max-width: 600px;
    }
  }
}

</style>
