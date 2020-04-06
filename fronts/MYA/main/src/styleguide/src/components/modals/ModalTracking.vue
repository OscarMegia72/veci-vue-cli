<template>
  <modal-action-message :custom="'modal_seur'">
    <template v-if="component_status === 'LOADING'">
      <template slot="header">
        <span></span>
      </template>
      <template slot="body">
        <p class="modal_seur-infotext">{{ $t('obtaining_data')}}</p>
      </template>
      <template slot="footer">
        <button-set :type="'_ok'">
          <v-button slot="ok" :type="'button_new _primary _cta'" @click="close">{{ $t('close')}}</v-button>
        </button-set>
      </template>
    </template>
    <template v-else>
      <template v-if="component_status === 'ERROR'">
        <template slot="header">
          <span></span>
        </template>
        <template slot="body">
          <div v-if="status_error == 'NOT_FOUND'">
            <p class="modal_seur-infotext">{{ $t('not_order_found')}}</p>
          </div>
          <div v-if="status_error == 'ERROR_ON_DATA'">
            <p class="modal_seur-infotext">{{ $t('order_error')}}</p>
          </div>
        </template>
        <template slot="footer">
          <button-set :type="'_ok'">
            <v-button slot="ok" :type="'button_new _primary _cta'" @click="close">{{ $t('close')}}</v-button>
          </button-set>
        </template>
      </template>
      <template v-if="component_status === 'LOADED'">
        <template slot="header">
          <div class="modal_seur-header">
            <div class="modal_seur-close_wrapper">
              <button @click="close">
                <i class="icon cross"></i>
              </button>
            </div>
            <div class="modal_seur-logo_wrapper">
              <img
                :src="`${this.$options.base_route}/stylesheets/images/my_account/eci_express.svg`"
                alt="eciexpress"
              >
            </div>
            <div>
              <div class="modal_seur-order_info_wrapper">
                <p>{{ $t('order_number') }} {{tracking_data.order_id}}</p>
              </div>
            </div>
          </div>
        </template>
        <template slot="body">
          <div class="modal_seur-body">
            <div class="modal_seur-map_wrapper">
              <template>
                <GmapMap
                  ref="mapRef"
                  :class="['map', {'visible':mapready}]"
                  :center="center_point"
                  :zoom="13"
                  :options="{ maxZoom: 20}"
                  map-type-id="roadmap"
                >
                  <GmapMarker
                    v-if="current_position"
                    :position="current_position"
                    :icon="{ url: `${this.$options.base_route}/stylesheets/images/my_account/marker_geo.svg`, scaledSize : {width: 50, height: 50, f: 'px', b: 'px'} }"
                    :clickable="false"
                    :draggable="false"
                  />
                  <GmapMarker
                    v-if="start_point"
                    :position="start_point"
                    :icon="{ url: `${this.$options.base_route}/stylesheets/images/my_account/marker_start.svg`, scaledSize : {width: 50, height: 50, f: 'px', b: 'px'}}"
                    :clickable="false"
                    :draggable="false"
                  />
                  <GmapMarker
                    v-if="end_point"
                    :position="end_point"
                    :icon="{ url: `${this.$options.base_route}/stylesheets/images/my_account/marker_end.svg`, scaledSize : {width: 50, height: 50, f: 'px', b: 'px'}}"
                    :clickable="false"
                    :draggable="false"
                  />
                </GmapMap>
              </template>
              <template v-if="error_on_map">
                <p>{{ $t('gps_error')}}</p>
              </template>
            </div>
          </div>
          <div v-if="!loading_map" class="tc mt">
            <v-text :tag="'p'" :type="'_primary _xs _light'">
              <span
                v-if="!error_on_map"
              >{{ $tc('order_detail.tracking.refreshing_in', position_time , {time:position_time}) }} </span>
              <v-button
                :type="'button_new _link _cta'"
                @click="reloadPosition"
              >{{ $t('order_detail.tracking.reload') }}</v-button>
            </v-text>
          </div>
        </template>
        <template slot="footer">
          <div class="modal_seur-footer">
            <div v-if="start && start.address" class="modal_seur-address_wrapper">
              <v-title :tag="'h2'" :class="'_level_2'">{{ $t('order_detail.tracking.start_point') }}</v-title>
              <v-text :tag="'p'" :type="'_primary _xs _light'">{{ start.address }}</v-text>
              <v-text v-if="start.city" :tag="'p'" :type="'_primary _xs _light'">{{ start.city }}</v-text>
              <v-text
                v-if="start.country"
                :tag="'p'"
                :type="'_primary _xs _light'"
              >{{ start.country }}</v-text>
            </div>

            <div v-if="end && end.address" class="modal_seur-address_wrapper">
              <v-title :tag="'h2'" :class="'_level_2'">{{ $t('delivery_title')}}</v-title>
              <v-text :tag="'p'" :type="'_primary _xs _light'">{{ end.address }}</v-text>
              <v-text v-if="end.city" :tag="'p'" :type="'_primary _xs _light'">{{ end.city }}</v-text>
              <v-text v-if="end.country" :tag="'p'" :type="'_primary _xs _light'">{{ end.country }}</v-text>
            </div>

            <!--<div v-if="end && end.slot_start" class="modal_seur-address_wrapper">
              <v-title
                :tag="'h2'"
                :class="'_level_2'"
              >{{ $t('order_detail.tracking.estimated_delivery_time.title') }}</v-title>
              <v-text
                :tag="'p'"
                :type="'_primary _xs _light'"
              >{{ $t('order_detail.tracking.estimated_delivery_time.text', {start:start.slot_start, end:end.slot_end} )}}</v-text>
            </div>-->

            <div class="modal_seur-details_wrapper" v-if="details">
              <h4 class="modal_seur-info_title">{{ $t('details')}}</h4>
              <ul>
                <li>
                  <span>FECHA DE EXPEDICIÓN:</span>
                  <span>06-08-2018</span>
                </li>
                <li>
                  <span>NÚMERO DE PAQUETES:</span>
                  <span>1</span>
                </li>
                <li>
                  <span>PESO:</span>
                  <span>1,0 kg</span>
                </li>
              </ul>
            </div>
          </div>
        </template>
      </template>
    </template>
  </modal-action-message>
</template>

<script>
import ModalActionMessage from './ModalActionMessage.vue';
import ButtonSet from '../layouts/ButtonSet.vue';
import Button from '../blocks/Button.vue';
import { gmapApi } from 'vue2-google-maps';
import Title from '../blocks/Title.vue';
import Text from '../blocks/Text.vue';
import { setTimeout } from 'timers';

export default {
  base_route: process.env.VUE_APP_ASSETS_BASE,
  seurGPS: '/api/tracking/seur/status/',
  statusURL: {
    PAACK: '/api/tracking/paack/status/',
    SEURNOW: '/api/tracking/seur/status/'
  },
  trackingURL: {
    PAACK: '/api/tracking/paack/localization/',
    SEURNOW: '/api/tracking/seur/localization/'
  },
  components: {
    'modal-action-message': ModalActionMessage,
    'button-set': ButtonSet,
    'v-button': Button,
    'v-title': Title,
    'v-text': Text
  },
  props: {
    test: {
      default: false
    },
    close_outside: {
      default: true
    },
    width: {
      default: 320
    },
    tracking_data: {
      default: () => {}
    }
  },
  data() {
    return {
      component_status: 'LOADING',
      status_error: false,
      status: [],
      status_interval: null,
      start: {},
      end: {},
      info: {},
      loading_map: true,
      current_position: null,
      error_on_map: false,
      position_interval: null,
      position_time: 60,
      map_centered: false
    };
  },
  methods: {
    getStatus: function() {
      const { $rest } = this;
      //if(!this.$props.operation.transaction_id) return false;
      this.component_status = 'LOADING';
      var statusURL = this.$options.statusURL[
        this.$props.tracking_data.shipping_company
      ];
      if (!statusURL) {
        this.component_status = 'ERROR';
        this.status_error = 'ERROR_ON_DATA';
        return false;
      }
      $rest
        .getP(statusURL, {
          timeout: 20000,
          params: {
            order_id: this.tracking_data.order_id,
            sale_transaction_id: this.tracking_data.sale_transaction_id
          }
        })
        .then(result => {
          this.component_status = 'LOADED';
          this.updating_status = false;
          this.start = result.data.start || null;
          this.end = result.data.end || null;
          this.current_position = result.data.position || null;
          this.info = result.data.info || {};
          this.loading_map = false; //Should be on for PAACK
          this.error_on_map = false;

          setTimeout(() => {
            this.getPosition();
          }, 1000);
        })
        .catch(err => {
          this.component_status = 'ERROR';
          if (!err.response) {
            this.status_error = 'ERROR_ON_DATA';
          } else {
            if (err.response.status === 404) {
              this.status_error = 'NOT_FOUND';
            } else {
              this.status_error = 'ERROR_ON_DATA';
            }
          }
        });
    },
    getPosition: function() {
      const { $rest } = this;
      var self = this;
      var trackingURL = this.$options.trackingURL[
        this.$props.tracking_data.shipping_company
      ];
      if (!trackingURL) {
        return false;
      }
      self.loading_map = true;
      self.error_on_map = false;

      $rest
        .getP(trackingURL, {
          timeout: 20000,
          params: {
            order_id: this.tracking_data.order_id,
            sale_transaction_id: this.tracking_data.sale_transaction_id
          }
        })
        .then(result => {
          var last;
          if(self.$props.tracking_data.shipping_company === 'SEURNOW') {
            last = result.data.position
          } else{
            var last = result.data;
          }
          self.current_position = new google.maps.LatLng(
            parseFloat(last.lat),
            parseFloat(last.lng)
          );
          self.loading_map = false;
          self.error_on_map = false;
          //if(!this.map_centered) {
          self.setMapBounds();
          //}
          self.position_interval = setInterval(() => {
            self.position_time = self.position_time - 1;
          }, 1000);
        })
        .catch(err => {
          self.loading_map = false;
          self.error_on_map = true;
        });
    },
    close: function() {
      this.$emit('close');
    },
    initialize: function() {
      this.getStatus();
    },
    destroy: function() {
      clearInterval(this.position_interval);
    },
    reloadPosition: function() {
      var self = this;
      clearInterval(this.position_interval);
      this.position_time = 60;
      this.getPosition();
    },
    setMapBounds() {
      var self = this;
      var bounds = new google.maps.LatLngBounds();
      this.$refs.mapRef.$mapPromise.then(map => {
        self.$nextTick(() => {
          self.$refs.mapRef.$children.forEach(marker => {
              var lat = typeof marker.position.lat === 'function'? marker.position.lat() : marker.position.lat;
              var lng = typeof marker.position.lng === 'function'? marker.position.lng() : marker.position.lng;
              bounds.extend(
                new google.maps.LatLng(lat, lng)
              );
            });
          map.fitBounds(bounds);
          self.map_centered = true;
        })
      });
    }
  },
  watch: {
    id(value) {
      if (value) {
        this.initialize();
      } else {
        this.destroy();
      }
    },

    status(value) {
      var last = value[value.length - 1];
      if (last) {
        last.current = true;
      }
      if (this.$refs.status_wrapper) {
        var elem = this.$refs.status_wrapper;
        elem.scrollTop = elem.scrollHeight;
      }
    },
    info(value) {
      if (value.status == 'ON_ROUTE') return this.reloadPosition();
    },
    position_time(value) {
      if (value == 0) return this.reloadPosition();
    }
  },
  mounted: function() {
    var self = this;
    document.addEventListener('keydown', e => {
      if (this.show && e.keyCode == 27) {
        this.close();
      }
    });
    this.initialize();
  },
  beforeDestroy: function() {
    clearInterval(this.position_interval);
  },
  computed: {
    google: gmapApi,
    mapready() {
      return !this.loading_map && !this.error_on_map;
    },
    details() {
      return false;
    },
    start_point() {
      if (!this.start) return null;
      return { lat: this.start.lat, lng: this.start.lng };
    },
    end_point() {
      if (!this.end) return null;
      return { lat: this.end.lat, lng: this.end.lng };
    },
    center_point() {
      return {
        lat: (this.start.lat + this.end.lat) / 2.0,
        lng: (this.start.lng + this.end.lng) / 2.0
      };
    }
  }
};
</script>

<style lang="less">
@import '../../assets/variables.less';

//vuemaps css to avoid production bug caused by lack of styles

.vue-map-container {
  position: relative;
}
.vue-map-container .vue-map {
  left: 0; right: 0; top: 0; bottom: 0;
  position: absolute !important;
}
.vue-map-hidden {
  display: none;
}

.vue-street-view-pano-container {
  position: relative;
}
.vue-street-view-pano-container .vue-street-view-pano {
  left: 0; right: 0; top: 0; bottom: 0;
  position: absolute;
}

.modal_seur {
  padding: 1rem;
  &-header {
    display: flex;
    width: 100%;
    flex-direction: column;
    button {
      .reset-button();
      i {
        font-size: 32px;
      }
    }
  }
  &-body {
    display: flex;
    flex-direction: column;
  }
  &-footer {
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 1rem;
    font-size: 13px;
    color: #242424;
  }
  &-close_wrapper {
    display: flex;
    justify-content: flex-end;
  }
  &-logo_wrapper {
    min-height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      max-width: 200px;
      height: auto;
    }
  }
  &-order_info_wrapper {
    color: #242424;
    font-weight: 200;
    line-height: 1.5;
    p {
      text-align: center;
    }
    p:nth-of-type(1) {
      font-size: 18px;
    }
    p:nth-of-type(2) {
      font-size: 14px;
    }
  }

  &-status_wrapper {
    flex: 1;
    max-height: 320px;
    overflow-y: auto;
    > p {
      width: 100%;
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ffffff;
      text-transform: uppercase;
      font-size: 11px;
      color: #484848;
    }
    ul {
      padding: 0;
    }
    li {
      list-style: none;
      display: grid;
      grid-template-columns: 20px 1fr;
      align-items: center;
      justify-items: left;
      font-size: 10px;
      font-weight: 200;
      grid-template-rows: 30px;
      > span.circle {
        width: 20px;
        height: 20px;
        border-radius: 100%;
        border: solid 1px #8f8f8f;
        background-color: white;
      }
      div.text {
        padding: 0 0.5rem;
        color: #8f8f8f;
        span {
          display: block;
        }
      }
      span.line {
        min-height: 15px;
        width: 2px;
        background-color: #8f8f8f;
        align-self: center;
        justify-self: center;
        height: 100%;
      }
      &._current {
        > span.circle {
          border-color: #008c2e;
          border-width: 2px;
        }
        div.text {
          font-weight: 500;
          font-size: 12px;
          color: #008c2e;
        }
        span.line {
          display: none;
          //background-color: #008c2e;
        }
      }
    }
  }
  &-map_wrapper {
    flex: 1;
    .map {
      width: 100%;
      height: 320px;
      display: none;
      &.visible {
        display: block;
      }
    }
    > p {
      width: 100%;
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f2f2f2;
      text-transform: uppercase;
      font-size: 11px;
      color: #484848;
    }
    margin-bottom: 1.5rem;
  }

  &-info_title {
    font-weight: 500;
    text-transform: uppercase;
  }

  &-info_value {
    font-weight: 200;
  }
  &-details_wrapper {
    li {
      list-style: none;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 1rem;
      margin-bottom: 0.6rem;
      > span:nth-of-type(1) {
        text-align: right;
        font-weight: 500;
      }
    }
  }
  &-infotext {
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    text-transform: uppercase;
    font-size: 11px;
    color: #484848;
  }
}

@media @l-up {
  .modal_seur {
    max-width: 768px !important;
    margin: 0px auto !important;
    &-header {
      display: grid;
      width: 100%;
      grid-template-columns: 3fr 4fr 96px;
      grid-template-areas: 'logo info close';
      grid-template-rows: 50px;
      align-items: center;
      justify-items: center;
    }
    &-body {
      width: 100%;
      flex-direction: row;
      min-height: 320px;
      background-color: #f2f2f2;
      margin-bottom: 0;
    }
    &-footer {
      padding: 0 1rem;
      display: grid;
      grid-auto-columns: 1fr;
      grid-auto-flow: column;
    }

    &-close_wrapper {
      grid-area: close;
    }

    &-logo_wrapper {
      grid-area: logo;
    }
    &-order_info_wrapper {
      grid-area: info;
    }

    &-status_wrapper {
      flex: 0 0 230px;
      margin-right: 26px;
    }
    &-map_wrapper {
      flex: 1 0;
      margin-bottom: 0;
      > p {
        height: 320px;
      }
    }
  }
}
</style>

