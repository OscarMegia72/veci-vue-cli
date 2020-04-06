<template>
  <a :href="orderData.detail_url"
     :title="$t('views.tiles.order_tile.order_detail')"
     class="order_tile">
    <div class="order_tile-image">
      <img :src="`${$assets_base}/stylesheets/images/companies/${_image}`">
    </div>
    <!-- number -->
    <div class="order_tile-value _number">
      <div class="order_tile-title">
        {{ $t('order_number') }}
      </div>
      <div class="order_tile-text">
        {{orderData.id || $t('views.tiles.order_tile.not_available') }}
      </div>
    </div>
    <!-- Date -->
    <div class="order_tile-value _date">
      <div class="order_tile-title">{{ $t('views.tiles.order_tile.date') }}</div>
      <div class="order_tile-text">{{orderData.date}}</div>
    </div>
    <!-- Status -->
    <div class="order_tile-value _status">
      <div class="order_tile-title">{{ $t('my_orders.table_head.status') }}</div>
      <div class="order_tile-text">
        <span class="order_tile-method">{{_method}}</span>
        <span class="order_tile-situation">
          <div v-if="orderData.has_multiple_status">{{ $t('views.tiles.order_tile.see_detail') }}</div>
          <div v-else>{{orderData.shippings[0].human_status}}</div>
        </span>
        <span class="order_tile-deliver">{{_deliver_text}}</span>
      </div>
    </div>

    <!-- Price -->
    <div class="order_tile-value _price">
      <div class="order_tile-title">{{ $t('views.tiles.order_tile.price_title') }}</div>
      <div class="order_tile-text">
        <price
          :amount="orderData.pricing.total_plus_shipping"
          :size="20"
          :important="true"
          :decimal_character="'.'"
        ></price>
      </div>
    </div>
    <div class="order_tile-button">
      <eci-button :type="'_contextual_with_icon _no_border _no_shadow'">
        <eci-text :tag="'span'" :type="'_xs _48 _semi'">{{ $t('views.tiles.order_tile.order_detail') }}</eci-text>
        <eci-text :tag="'span'" :type="'_xl _48 _semi pl'"><i class="icon arrow-right _inherit _flex" ></i></eci-text>
      </eci-button>
    </div>
    <div class="order_tile-arrow">
      <i class="icon arrow-right _xl"></i>
    </div>
  </a>
</template>

<script>
import Button from '../blocks/Button.vue';
import Price from '../common/Price.vue';
import Text from '../blocks/Text.vue';


export default {
  props: {
    order: {
      type: Object,
      default: function() {
        return {};
      },
      shippings: []
    }
  },
  components: {
    'eci-button': Button,
    price: Price,
    'eci-text': Text,
  },
  computed: {
    orderData() {
      if (this.$props.order) return this.$props.order;
    },
    _image() {
      if (!this.orderData || !this.orderData.other_ids) return null;
      switch (this.orderData.other_ids.company_id) {
        case '001':
          switch (this.orderData.other_ids.business_line_id) {
            case '0005':
              return 'brand_ltc_208x90.svg';
            case '0006':
              return 'brand_primeriti_208x90.svg';
            case '0013':
              return 'brand_supermercado-es_208x90.svg';
            case '0019':
            case '0020':
              return 'brand_hipercor_208x90.svg';
          }
          return 'brand_eci_208x90.svg';
        case '002':
          return 'brand_hipercor_208x90.svg';
        case '003':
        case '125':
          return 'supercor.png';
        case '004':
          if (this.orderData.other_ids.business_line_id == '0013')
            return 'brand_supermercado-es_208x90.svg';
          return 'brand_eci_208x90.svg';
        case '005':
          return 'brand_sfera_208x90.svg';
        case '008':
          return 'optica.png';
        case '010':
          return 'telecor.png';
        case '019':
        case '061':
          return 'brand_bricor_208x90.svg';
        case '098':
          return 'opencor.png';
        case '014':
          return 'brand_veci_208x90.svg';
      }
      return 'brand_eci_208x90.svg';
    },
    _method() {
      if (!this.orderData) return null;
      //If all shipping methods arent the same, 'SEE DETAILS
      if (this.orderData.shippings.length > 1) {
        var methods = this.orderData.shippings.map(o => o.method);
        if (!methods.every((val, i, arr) => val === arr[0])) {
          return this.$t('views.tiles.order_tile.see_detail');
        }
      }
      var curr_shipping = this.orderData.shippings[0];
      if (
        curr_shipping.method != 'Click & Collect' &&
        curr_shipping.method != 'PICKUP_CLICK_AND_COLLECT' &&
        curr_shipping.method != 'PICKUP_SAVE_TO_STORE'
      )
        return curr_shipping.human_method;
      var place;
      switch ((curr_shipping.shopping_centre_sts || {}).company_id) {
        case '01':
        case '001':
        case '02':
        case '002':
          place = 'Supercor';
          break;
        case '04':
        case '004':
        case '06':
        case '006':
          place = this.$t('views.tiles.order_tile.other.pickup_point');
          break;
        default:
          place = 'El Corte Inglés';
          break;
      }
      return `${curr_shipping.human_method} ${place}`;
    },
    _deliver_text() {
      if (!this.orderData) return null;
      if (this.orderData.shippings.length > 1) {
        return this.$t('views.tiles.order_tile.see_detail');
      }
      var currShipping = this.orderData.shippings[0];

      if (
        currShipping.status == 'ON_ROUTE' ||
        currShipping.status == 'FULFILLED' ||
        currShipping.status == 'CANCELLED'
      )
        return null;

      if (currShipping.delivery_dates && currShipping.delivery_dates.estimated) {
        var pre_text = this.$t('views.tiles.order_tile.deliver_before');
        if (
          currShipping.method == 'PICKUP_SAVE_TO_STORE' ||
          currShipping.method == 'PICKUP_CLICK_AND_COLLECT'
        ) {
          pre_text = this.$t('views.tiles.order_tile.available_the');
        }
        else if (currShipping.is_date_changed_by_cus) {
          pre_text = this.$t('views.tiles.order_tile.deliver_in');
        }
        var post_text = currShipping.delivery_dates.human_estimated_delivery;
        return `${pre_text} ${post_text}`;
      }
      return null;
    }
  }
};
</script>

<style lang="less">
@import '../../assets/variables';
& {
  .order_tile {
    display: grid;
    max-width: 500px;
    margin: 0 auto;
    padding: 1rem 0;
    grid-row-gap: 0.5rem;
    grid-template-rows: 1fr;
    text-decoration: none;
    grid-template-areas:
      'image'
      'number'
      'date'
      'status'
      'price'
      'buttonset';
    &-image {
      grid-area: image;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 80px;
      img {
        width: auto;
        max-height: 100%;
      }
    }
    &-value {
      display: grid;
      grid-gap: 0.75rem;
      grid-template-columns: 1fr 1fr;
      align-items: baseline;
      padding: 0 1rem;
      &:last-of-type {
        margin-bottom: 0;
      }
      &._number {
        grid-area: number;
        .order_tile-title {
          span:last-of-type {
            display: none;
          }
        }
      }
      &._date {
        grid-area: date;
      }
      &._status {
        grid-area: status;
      }
      &._price {
        grid-area: price;
      }
    }
    &-button {
      margin-top: 1rem;
      grid-area: buttonset;
      color: inherit;
      text-decoration: none;
      border-bottom: solid 1px #E1E1E1;
    }

    &-arrow {
      display: none;
      color: inherit;
      text-decoration: none;
    }

    &-title {
      font-size: 13px;
      color: #484848;
      text-align: right;
      font-weight: 500;
    }

    &-text {
      font-size: 12px;
      color: #484848;
      text-align: left;
      padding-right: 0.5rem;
    }
    &-method {
      font-weight: 500;
      font-size: 12px;
      color: #484848;
    }
    &-situation {
      font-weight: 500;
      font-size: 12px;
      line-height: 1.2;
      color: #484848;
    }
    &-deliver {
      font-weight: 200;
      font-size: 12px;
      color: #484848;
    }
  }

  @media @l-up {
    .order_tile {
      max-width: 100%;
      width: 100%;
      grid-template-columns: 150px 120px 120px 1fr 120px 60px;
      min-height: 80px;
      grid-column-gap: 0.5rem;
      grid-template-areas:
        'image number date status price buttonset';
      border-bottom: solid 1px #e1e1e1;
      padding: 0;
      align-items: center;
      &:hover {
        background-color: #fafafa;
      }
      &-image {
        img {
          width: auto;
          max-width: 100%;
          max-height: 100%;
        }
      }
      &-value {
        display: flex;
        &._number {
          .order_tile-title {
            span:last-of-type {
              display: block;
            }
            span:first-of-type {
              display: none;
            }
          }
        }
        &._status {
          .order_tile-title {
            display: none;
          }
        }
        &._price {
          text-align: right;
          .order_tile-title {
            display: none;
          }
          .order_tile-text {
            width: 100%;
            text-align: right;
          }
        }
      }

      &-button {
        display: none;
      }
      &-arrow {
        display: flex;
        align-items: center;
        justify-content: center;
        grid-area: buttonset;
        color: @white15;
        font-weight: bold;
      }
      &-title {
        display: none;
      }
      &-text {
        padding-right: 0;
      }
    }
  }

  @media only screen and (min-width: 900px){
    .order_tile {
      grid-template-columns: 1fr 110px 90px 1fr 110px 40px;
       &-value {
        padding-right: 0;
        &._status {
          padding: 1rem 0 1rem 1rem;
        }
      }
    }
  }

  @media only screen and (min-width: 1100px){
    .order_tile {
      grid-template-columns: 136px 120px 90px 1fr 130px 60px;
      &-image {
        padding-left: 1rem;
      }
    }
  }
  @media all and (-ms-high-contrast: none) {
    .order_tile {
      display: flex;
      flex: 1 0 100% !important;
      width: 100%;
      > * {
        flex: 1 1;
      }
      > *:nth-child(1) { width: 136px}
      > *:nth-child(2) { width: 120px}
      > *:nth-child(3) { width: 90px}
      > *:nth-child(4) { flex: 1}
      > *:nth-child(5) { width: 130px}
      > *:nth-child(6) { width: 60px}
      &-image {
        img {
          max-width: 130px;
        }
      }
    }
    .order_tile-arrow {
      display: none;
    }
  }
  @supports not (display: grid) {
    .order_tile {
      display: flex;
      flex: 1 0 100% !important;
      width: 100%;
      > * {
        flex: 1 1;
      }
      > *:nth-child(1) { width: 136px}
      > *:nth-child(2) { width: 120px}
      > *:nth-child(3) { width: 90px}
      > *:nth-child(4) { flex: 1}
      > *:nth-child(5) { width: 130px}
      > *:nth-child(6) { width: 60px}
      &-image {
        img {
          max-width: 130px;
        }
      }
    }
    .order_tile-arrow {
      display: none;
    }
  }
}
</style>
