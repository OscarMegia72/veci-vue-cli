<template>
    <div class="tracking">

      <div v-if="address" class="mb hide_on_print">
        <eci-text v-if="address_title" :tag="'h3'" :type="'_xs _semi _24 _uppercase mb2'"> {{address_title}} </eci-text>
        <eci-text v-if="address.full_name" :tag="'p'" :type="'_xxs _24 mb'"> {{address.full_name}} </eci-text>
        <template v-if="!centre_address">
          <eci-text v-if="address.line1" :tag="'p'" :type="'_s _light _24'"> {{address.line1}} </eci-text>
          <eci-text v-if="address.line2" :tag="'p'" :type="'_s _light _24'"> {{address.line2}} </eci-text>
          <eci-text v-if="address.line3" :tag="'p'" :type="'_s _light _24'"> {{address.line3}} </eci-text>
          <eci-text v-if="address.line4" :tag="'p'" :type="'_s _light _24'"> {{address.line4}} </eci-text>
        </template>

        <template v-if="centre_address">
          <eci-text :tag="'h3'" :type="'_xs _semi _24 mb mt'"> {{ $t('order_detail.tracking.collect') }} </eci-text>
          <eci-text v-if="centre_address.full_name" :tag="'p'" :type="'_xxs _24 mb'"> {{centre_address.full_name}} </eci-text>
          <eci-text v-if="centre_address.line1" :tag="'p'" :type="'_s _light _24'"> {{centre_address.line1}} </eci-text>
          <eci-text v-if="centre_address.line2" :tag="'p'" :type="'_s _light _24'"> {{centre_address.line2}} </eci-text>
          <eci-text v-if="centre_address.line3" :tag="'p'" :type="'_s _light _24'"> {{centre_address.line3}} </eci-text>
          <eci-text v-if="centre_address.line4" :tag="'p'" :type="'_s _light _24'"> {{centre_address.line4}} </eci-text>
        </template>
        <div class="tracking-modify_button">
          <eci-button v-if="address_modificable" @click="changeAddress" :type="'_link _cta'">{{ $t('order_detail.mini_resume.change_deliver_address') }}</eci-button>
        </div>
      </div>

      <template>
        <ul>
          <li :class="{'_current': _status === 'RECEIVED', '_passed': statusFlow.indexOf(_status) > statusFlow.indexOf('RECEIVED')}">
            <span></span>
            <span>{{ $t('order_detail.tracking.status.received') }}</span>
            <span></span>
            <span></span>
            <div v-if="_status === 'RECEIVED'">
              <h4 class="tracking-status_title">{{ $t('order_detail.tracking.status.received_full') }}</h4>
              <eci-text :tag="'p'" :type="'_semi _xs _48 tc'">{{_delivery_date_info}}</eci-text>
              <eci-text :tag="'p'" :type="'_light _xs _48 tc'"><span v-html="$t('order_detail.tracking.info_1')"></span></eci-text>
            </div>
          </li>
          <li v-if="_has_second_step" :class="{'_current': _status === 'PREPARED', '_passed': statusFlow.indexOf(_status) > statusFlow.indexOf('PREPARED')}">
            <span></span>
            <span>{{ _human_picking_finished_text }}</span>
            <span></span>
            <span></span>
            <div v-if="_status === 'PREPARED'">
              <h4 class="tracking-status_title">{{ _human_picking_finished_full_text }}</h4>
              <eci-text :tag="'p'" :type="'_semi _xs _48 tc'">{{_delivery_date_info}}</eci-text>
              <eci-text :tag="'p'" :type="'_light _xs _48 tc'"><span v-html="$t('order_detail.tracking.info_1')"></span></eci-text>
            </div>
          </li>
          <li v-if="_has_third_step" :class="{'_current': _status === 'DELIVERING', '_passed': statusFlow.indexOf(_status) > statusFlow.indexOf('DELIVERING')}">
            <span></span>
            <span>{{ _human_delivering_text }}</span>
            <span></span>
            <span></span>
            <div v-if="_status === 'DELIVERING'">
              <h4 class="tracking-status_title">{{_human_delivering_full_text}}</h4>
              <eci-text :tag="'p'" :type="'_semi _xs _48 tc mb'">{{_delivery_date_info}}</eci-text>
              <div class="tracking-track_holder" v-if="shipping_tracking.shipping_company">
                <div>
                  <img :src="`${$assets_base}/stylesheets/images/my_account/order-tracking.svg`" :alt="$t('order_detail.track_your_order')">
                </div>
                <div>
                  <eci-button @click="showTracking" :type="'_link _alt'">
                    {{ $t('order_detail.track_your_order') }}
                  </eci-button>
                </div>
              </div>
              <eci-text :tag="'p'" :type="'_light _xs _48 tc'"><span v-html="$t('order_detail.tracking.info_1')"></span></eci-text>
            </div>
          </li>
          <li :class="{'_current': _status === 'DELIVERED'}">
            <span></span>
            <span>{{ _human_delivered_text }}</span>
            <span></span>
            <span></span>
            <div v-if="_status === 'DELIVERED'">
              <h4 class="tracking-status_title">{{ _human_delivered_full_text }}</h4>
              <eci-text :tag="'p'" :type="'_light _xs _48 tc'"><span v-html="$t('order_detail.tracking.info_2')"></span></eci-text>
            </div>
          </li>
        </ul>
        <div class="tracking-desktop_status">
          <template v-if="_status === 'RECEIVED'">
            <div class="tracking-desktop_status_info">
                <h4 class="tracking-status_title mb">{{ $t('order_detail.tracking.status.received_full') }}</h4>
                <eci-text :tag="'p'" :type="'_semi _s _48 tc _l16'">{{_delivery_date_info}}</eci-text>
                <eci-text :tag="'p'" :type="'_light _xs _48 tc'"><span v-html="$t('order_detail.tracking.info_1')"></span></eci-text>
            </div>
          </template>
          <template v-if="_has_second_step && _status === 'PREPARED'">
            <div class="tracking-desktop_status_info" >
                <h4 class="tracking-status_title mb">{{ _human_picking_finished_text }}</h4>
                <p  class="tracking-status_text">
                    {{ _human_picking_finished_full_text }}
                </p>
                <eci-text :tag="'p'" :type="'_semi _s _48 tc _l16'">{{_delivery_date_info}}</eci-text>
                <eci-text :tag="'p'" :type="'_light _xs _48 tc'"><span v-html="$t('order_detail.tracking.info_1')"></span></eci-text>
            </div>
          </template>
          <template v-if="_has_third_step && _status === 'DELIVERING'">
            <div class="tracking-desktop_status_info">
                <div class="tracking-track_holder">
                  <div>
                    <img :src="`${$assets_base}/stylesheets/images/my_account/order-tracking.svg`" :alt="$t('order_detail.track_your_order')">
                  </div>
                  <div>
                    <h4 class="tracking-status_title mb">{{ _human_delivering_text }}</h4>
                    <p class="tracking-status_text">{{ _human_delivering_full_text }}</p>
                    <eci-text :tag="'p'" :type="'_semi _s _48 tc _l16 mb'">{{_delivery_date_info}}</eci-text>
                    <eci-button v-if="shipping_tracking.shipping_company" @click="showTracking" :type="'button_new _primary _cta'">
                      {{ $t('order_detail.track_your_order') }}
                    </eci-button>
                  </div>
                </div>
            </div>
          </template>
          <template v-if="_status === 'DELIVERED'">
            <div class="tracking-desktop_status_info">
                <h4 class="tracking-status_title mb">{{_human_delivered_full_text}}</h4>
                <eci-text :tag="'p'" :type="'_light _xs _48 tc'"><span v-html="$t('order_detail.tracking.info_2')"></span></eci-text>
            </div>
          </template>
        </div>
      </template>
    </div>
</template>

<script>
import Button from '../blocks/Button.vue';
import Text from '../blocks/Text.vue';

export default {
  props: {
    status: {
      default: 'DELIVERED'
    },
    statusFlow: {
      default: () => ['RECEIVED', 'PREPARED', 'DELIVERING', 'DELIVERED']
    },

    delivery_method: {
      type: String,
      default: 'HOME_DELIVERY',
      validator: function(value) {
        return (
          [
            'HOME_DELIVERY',
            'CLICK_AND_CAR',
            'CLICK_AND_EXPRESS',
            'DIGITAL_EBOOKS',
            'DIGITAL_FILMIN',
            'DIGITAL_SONY',
            'DIGITAL_SPOTIFY',
            'PICKUP_CLICK_AND_COLLECT',
            'PICKUP_SAVE_TO_STORE'
          ].indexOf(value) !== -1
        );
      }
    },

    delivery_data: {
      type: Object,
      default: function() {
        return {};
      }
    },

    shipping_tracking: {
      type: Object,
      default: function() {
        return null;
      }
    },

    transaction_id: {
      type: String
    },
    origin: {
      type: String,
      default: ''
    },
    address: {
      default: () => {
        return {};
      }
    },
    centre_address: {
      default: null
    },
    address_modificable: {
      type: Boolean,
      default: false
    },
    address_title: {
      type: String
    }
  },
  components: {
    'eci-button': Button,
    'eci-text': Text
  },
  computed: {
    _status: function() {
      return (
        {
          PENDING: 'RECEIVED',
          PENDING_ACTION: 'RECEIVED',
          PENDING_PICKING: 'RECEIVED',
          PICKING: 'RECEIVED',
          BLOCKED: 'RECEIVED',
          PICKING_FINISHED: 'PREPARED',
          ON_ROUTE: 'DELIVERING',
          FULFILLED: 'DELIVERED',
          RETURN_PENDING_PICKING: 'DELIVERED',
          RETURN_ON_ROUTE: 'DELIVERED',
          RETURN_REVISION_PENDING: 'DELIVERED',
          RETURN_FINISHED: 'DELIVERED',
          RETURN_CANCELLED: 'DELIVERED'
        }[this.$props.status] || this.$props.status
      );
    },

    _human_picking_finished_text: function() {
      return {
        HOME_DELIVERY: this.$i18n.t(
          'order_detail.tracking.status.picking_finished.home_delivery'
        ),
        CLICK_AND_CAR: this.$i18n.t(
          'order_detail.tracking.status.picking_finished.click_and_car'
        ),
        CLICK_AND_EXPRESS: this.$i18n.t(
          'order_detail.tracking.status.picking_finished.click_and_express'
        ),
        PICKUP_CLICK_AND_COLLECT: this.$i18n.t(
          'order_detail.tracking.status.picking_finished.click_and_collect'
        ),
        PICKUP_SAVE_TO_STORE: this.$i18n.t(
          'order_detail.tracking.status.picking_finished.pickup_save_to_store'
        )
      }[this.$props.delivery_method];
    },

    _human_picking_finished_full_text: function() {
      return {
        HOME_DELIVERY: this.$i18n.t(
          'order_detail.tracking.status.picking_finished_full.home_delivery'
        ),
        CLICK_AND_CAR: this.$i18n.t(
          'order_detail.tracking.status.picking_finished_full.click_and_car'
        ),
        CLICK_AND_EXPRESS: this.$i18n.t(
          'order_detail.tracking.status.picking_finished_full.click_and_express'
        ),
        PICKUP_CLICK_AND_COLLECT: this.$i18n.t(
          'order_detail.tracking.status.picking_finished_full.click_and_collect'
        ),
        PICKUP_SAVE_TO_STORE: this.$i18n.t(
          'order_detail.tracking.status.picking_finished_full.pickup_save_to_store'
        )
      }[this.$props.delivery_method];
    },

    _human_delivering_text: function() {
      return {
        HOME_DELIVERY:
          {
            GPER: this.$i18n.t(
              'order_detail.tracking.status.delivering.home_delivery.gper'
            )
          }[this.$props.origin] ||
          this.$i18n.t(
            'order_detail.tracking.status.delivering.home_delivery.non_gper'
          ),
        CLICK_AND_EXPRESS: this.$i18n.t(
          'order_detail.tracking.status.delivering.click_and_express'
        ),
        PICKUP_SAVE_TO_STORE: this.$i18n.t(
          'order_detail.tracking.status.delivering.pickup_save_to_store'
        )
      }[this.$props.delivery_method];
    },

    _human_delivering_full_text: function() {
      return {
        HOME_DELIVERY:
          {
            GPER: this.$i18n.t(
              'order_detail.tracking.status.delivering_full.home_delivery.gper'
            )
          }[this.$props.origin] ||
          this.$i18n.t(
            'order_detail.tracking.status.delivering_full.home_delivery.non_gper'
          ),
        CLICK_AND_EXPRESS: this.$i18n.t(
          'order_detail.tracking.status.delivering_full.click_and_express'
        ),
        PICKUP_SAVE_TO_STORE: this.$i18n.t(
          'order_detail.tracking.status.delivering_full.pickup_save_to_store'
        )
      }[this.$props.delivery_method];
    },

    _human_delivered_text: function() {
      return {
        HOME_DELIVERY: this.$i18n.t(
          'order_detail.tracking.status.delivered.home_delivery'
        ),
        CLICK_AND_CAR: this.$i18n.t(
          'order_detail.tracking.status.delivered.click_and_car'
        ),
        CLICK_AND_EXPRESS: this.$i18n.t(
          'order_detail.tracking.status.delivered.click_and_express'
        ),
        DIGITAL_EBOOKS: this.$i18n.t(
          'order_detail.tracking.status.delivered.digital_ebooks'
        ),
        DIGITAL_FILMIN: this.$i18n.t(
          'order_detail.tracking.status.delivered.digital_filmin'
        ),
        DIGITAL_SONY: this.$i18n.t(
          'order_detail.tracking.status.delivered.digital_sony'
        ),
        DIGITAL_SPOTIFY: this.$i18n.t(
          'order_detail.tracking.status.delivered.digital_spotify'
        ),
        PICKUP_CLICK_AND_COLLECT: this.$i18n.t(
          'order_detail.tracking.status.delivered.click_and_collect'
        ),
        PICKUP_SAVE_TO_STORE: this.$i18n.t(
          'order_detail.tracking.status.delivered.pickup_save_to_store'
        )
      }[this.$props.delivery_method];
    },

    _human_delivered_full_text: function() {
      return {
        HOME_DELIVERY: this.$i18n.t(
          'order_detail.tracking.status.delivered_full.home_delivery'
        ),
        CLICK_AND_CAR: this.$i18n.t(
          'order_detail.tracking.status.delivered_full.click_and_car'
        ),
        CLICK_AND_EXPRESS: this.$i18n.t(
          'order_detail.tracking.status.delivered_full.click_and_express'
        ),
        DIGITAL_EBOOKS: this.$i18n.t(
          'order_detail.tracking.status.delivered_full.digital_ebooks'
        ),
        DIGITAL_FILMIN: this.$i18n.t(
          'order_detail.tracking.status.delivered_full.digital_filmin'
        ),
        DIGITAL_SONY: this.$i18n.t(
          'order_detail.tracking.status.delivered_full.digital_sony'
        ),
        DIGITAL_SPOTIFY: this.$i18n.t(
          'order_detail.tracking.status.delivered_full.digital_spotify'
        ),
        PICKUP_CLICK_AND_COLLECT: this.$i18n.t(
          'order_detail.tracking.status.delivered_full.click_and_collect'
        ),
        PICKUP_SAVE_TO_STORE: this.$i18n.t(
          'order_detail.tracking.status.delivered_full.pickup_save_to_store'
        )
      }[this.$props.delivery_method];
    },

    _has_second_step: function() {
      return (
        [
          'DIGITAL_EBOOKS',
          'DIGITAL_FILMIN',
          'DIGITAL_SONY',
          'DIGITAL_SPOTIFY'
        ].indexOf(this.$props.delivery_method) === -1
      );
    },

    _has_third_step: function() {
      return (
        [
          'PICKUP_CLICK_AND_COLLECT',
          'CLICK_AND_CAR',
          'DIGITAL_EBOOKS',
          'DIGITAL_FILMIN',
          'DIGITAL_SONY',
          'DIGITAL_SPOTIFY'
        ].indexOf(this.$props.delivery_method) === -1
      );
    },

    _food_slot: function() {
      if (!this.$props.delivery_data.delivery_slot_start) return null;
      return {
        date: this.$props.delivery_data.delivery_human_date,
        start: this.$props.delivery_data.delivery_slot_start,
        end: this.$props.delivery_data.delivery_slot_end
      };
    },

    _track_url: function() {
      return (
        process.env.VUE_APP_ASSETS_BASE +
        '/stylesheets/images/my_account/order-tracking.svg'
      );
    },

    _delivery_date_info: function() {
      if (this.$props.delivery_data && this.$props.delivery_data.overdue_date)
        return null;
      switch (this.$props.delivery_method) {
        case 'HOME_DELIVERY':
          if (this.$props.origin === 'GPER') {
            //GPER
            return this.$i18n.t(
              'order_detail.tracking.status.delivery_date_info.home_delivery.gper',
              {
                slot_start: this.$props.delivery_data.delivery_slot_start,
                slot_end: this.$props.delivery_data.delivery_slot_end,
                human_date: this.$props.delivery_data.delivery_human_date
              }
            );
          }
          return this.$i18n.t(
            'order_detail.tracking.status.delivery_date_info.home_delivery.non_gper',
            { human_date: this.$props.delivery_data.delivery_human_date }
          );
          break;

        case 'CLICK_AND_CAR':
          return this.$i18n.t(
            'order_detail.tracking.status.delivery_date_info.click_and_car',
            {
              slot_start: this.$props.delivery_data.delivery_slot_start,
              slot_end: this.$props.delivery_data.delivery_slot_end,
              human_date: this.$props.delivery_data.delivery_human_date
            }
          );
          break;

        case 'CLICK_AND_EXPRESS':
          if (this.$props.delivery_data && this.$props.delivery_data.hour) {
            return this.$i18n.t(
              'order_detail.tracking.status.delivery_date_info.home_delivery.gper',
              {
                slot_start: this.$props.delivery_data.delivery_slot_start,
                slot_end: this.$props.delivery_data.delivery_slot_end,
                human_date: this.$props.delivery_data.delivery_human_date
              }
            );
          }
          return this.$i18n.t(
            'order_detail.tracking.status.delivery_date_info.click_and_express.slot',
            {
              slot_start: this.$props.delivery_data.delivery_slot_start,
              slot_end: this.$props.delivery_data.delivery_slot_end,
              human_date: this.$props.delivery_data.delivery_human_date
            }
          );
          break;

        case 'PICKUP_CLICK_AND_COLLECT':
        case 'PICKUP_SAVE_TO_STORE':
          return this.$i18n.t(
            'order_detail.tracking.status.delivery_date_info.save_to_store',
            { human_date: this.$props.delivery_data.delivery_human_date }
          );
          break;
        default:
          return this.$i18n.t(
            'order_detail.tracking.status.delivery_date_info.default',
            { human_date: this.$props.delivery_data.delivery_human_date }
          );
          break;
      }
    }
  },
  methods: {
    showTracking: function() {
      this.$root.$emit('do_show_tracking', this.$props.transaction_id);
    },
    changeAddress() {
      this.$emit('click_change_address');
    }
  }
};
</script>

<style lang="less">
@import '../../assets/variables.less';

.tracking {
  li {
    list-style: none;
    display: grid;
    grid-template-columns: 20px 1fr;
    align-items: center;
    justify-items: left;
    font-size: 10px;
    font-weight: 200;
    grid-template-rows: 30px;
    > span:first-of-type {
      width: 20px;
      height: 20px;
      border-radius: 100%;
      border: solid 1px #8f8f8f;
      background-color: white;
    }
    span:nth-of-type(2) {
      padding: 0 0.5rem;
      color: #8f8f8f;
    }
    span:nth-of-type(3) {
      min-height: 15px;
      width: 2px;
      background-color: #8f8f8f;
      align-self: center;
      justify-self: center;
      height: 100%;
    }
    span:nth-of-type(4) {
      display: none;
    }
    &._passed {
      > span:first-of-type {
        border: solid 1px #e1e1e1;
      }
      span:nth-of-type(2) {
        color: #e1e1e1;
      }
      span:nth-of-type(3) {
        background-color: #e1e1e1;
      }
    }
    > div {
      width: 100%;
      padding: 1rem 1.25rem;
    }
    &._current {
      > span:first-of-type {
        border-color: #008c2e;
        border-width: 2px;
      }
      span:nth-of-type(2) {
        font-weight: 500;
        font-size: 12px;
        color: #008c2e;
      }
      span:nth-of-type(3) {
        background-color: #008c2e;
      }
    }
  }
  &-modify_button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
  }
  .print & {
    ul {
      display: none !important;
    }
  }
  &-status_title {
    font-size: 16px;
    line-height: 1.2;
    color: #008c2e;
    display: block;
    text-align: center;
    font-weight: 500;
    width: 100%;
    margin-bottom: 1em;
  }
  &-status_text {
    width: 100%;
    font-size: 12px;
    font-weight: 200;
    color: #484848;
    display: block;
    text-align: center;
    padding: 0.25rem 0 0.5rem 0;
    line-height: 1.4;
    a {
      font-weight: 800;
      text-decoration: none;
      color: inherit;
    }
  }
  &-track_holder {
    display: flex;
    padding: 0 0 1rem 0;
    >div:nth-of-type(1) {
      flex: 0 0 50%;
      padding: 0 5% 0 0;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
          width: 100%;
          max-width: 180px;
          height: auto;
      }
    }
    >div:nth-of-type(2) {
      align-self: center;
      justify-self: center;
      flex: 0 1 50%;
      padding: 0 0 0 5%;
    }
  }
  &-desktop_status {
    display: none;
  }
}

@media @s-up {
  .tracking {
    &-modify_button {
      justify-content: flex-start;
      padding: 1.5rem 0;
    }
  }
}

@media @m-up, @print {
  .tracking {
    ul {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
      li {
        grid-template-columns: auto;
        grid-template-areas:
          'circle'
          'name'
          'downline';

        > span:nth-of-type(2) {
          grid-area: name;
          text-align: center;
          width: 100%;
          min-height: 30px;
        }
        > span:nth-of-type(3) {
          grid-area: circle;
          width: 100%;
          height: 2px;
          min-height: auto;
          z-index: 1;
        }
        > span:first-of-type {
          grid-area: circle;
          align-self: center;
          justify-self: center;
          z-index: 2;
          box-shadow: 0px 0px 0px 8px rgba(255, 255, 255, 1);
        }
        > span:nth-of-type(4) {
          display: block;
          grid-area: downline;
          width: 100%;
          height: 1px;
          background-color: #008c2e;
          align-self: center;
          justify-self: center;
          margin-top: 1rem;
        }

        &._current {
          > div {
            display: none;
          }
          > span:nth-of-type(4) {
            background-color: #008c2e;
            position: relative;
            &:after {
              content: '';
              display: block;
              width: 16px;
              height: 16px;
              background-color: white;
              border: solid 1px #008c2e;
              position: absolute;
              top: -8px;
              left: ~'calc(50% - 8px)';
              transform: rotate(45deg);
              border-bottom-color: transparent;
              border-right: transparent;
            }
          }
        }
      }
    }
    &-desktop_status {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &-status_title {
      font-size: 22px;
      font-weight: 200;
    }
    &-desktop_address{
      display: block;
      padding: 2rem;
      justify-self: center;
    }
    &-desktop_status_info{
      padding: 1.4rem 1rem;
    }
    &-track_holder {
      >div:nth-of-type(1) {
        img{
            max-width: 240px;
        }
      }
    }
  }
}
@media all and (-ms-high-contrast:none)
  {
  .tracking ul {
    display: flex;
    flex-direction: row;
    > * {
      flex: 1 1;
    }
  }
  .tracking-desktop_status {
    display: flex;
    >div {
      width: 50%;
    }
  }
}

@supports not (display: grid)
  {
  .tracking ul {
    display: flex;
    flex-direction: row;
    > * {
      flex: 1 1;
    }
  }
  .tracking-desktop_status {
    display: flex;
    >div {
      width: 50%;
    }
  }
}


@media @print {
  .hide_on_print {
    display: none !important;
  }
  .tracking {
    > ul {
      display: none !important;
    }
  }
}
</style>
