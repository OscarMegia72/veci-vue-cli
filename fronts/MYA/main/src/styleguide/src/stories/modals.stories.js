import {
  storiesOf
} from '@storybook/vue';
import MockAdapter from 'axios-mock-adapter';
import VueI18n from 'vue-i18n';
const axios = require('axios');

const trackingi18n = new VueI18n({
  locale: 'es',
  messages: {
    es: {
      obtaining_data: 'Obteniendo datos del pedido',
      close: 'Cerrar',
      order_number: 'Pedido número: ',
      order_made: 'Fecha de entrega: ',
      loading_status: 'Cargando información...',
      loading_status_error: 'Se produjo un error recibiendo el estado del pedido.',
      retry: 'Reintentar',
      loading_gps: 'Obteniendo información de posicionamiento',
      gps_error: 'No se ha podido obtener información de posicionamiento',
      delivery_title: 'Dirección de entrega',
      details: 'Detalles',
      not_order_found: 'No se ha encontrado la orden',
      order_error: 'Error en la recepción de datos',
    },
    en: {
      order_number: 'Pedido número: ',
      order_made: 'Compra realizada el',
    }
  }
})
const delivery = {
  "delivery_date": "2018-02-03T10:00:00",
  "today_is_delivery_date": false,
  "delivery_human_date": "3/02/2018",
  "delivery_human_hour": "10:00",
  "delivery_hour": "10:00",
  "old_date": false,
  "hour": true
}
const address = {
    "full_name": "Francisco Moldenhauer Gomez",
    "line1": "Cl/ Castillo De Aledo, 11",
    "line2": "3º B",
    "line3": "30506 Molina De Segura (Murcia)",
    "line4": "España"
}
const addresses =[
  {
    "country": "ES",
    "locality": "Madrid                             ",
    "_id": "f75fea0a-98be-4f31-8746-662fb535a03a",
    "way_name": "Castellana",
    "way_number": "21",
    "without_number": false,
    "way_type": "PS",
    "type": "ADDRESS",
    "alias": "Billing address",
    "postal_code": "28046",
    "tags": [
      "shipping"
    ],
    "shipping_contact": {
      "given_name": "RafaelNFT",
      "surname_1": "ArrañzNFT",
      "surname_2": "GómezNFTJoão",
      "cell_phone": {
        "number": "654654654",
        "type": "CELL_PHONE"
      }
    },
    "codes": {
      "street_code": "00451102",
      "locality_code": "0000101",
      "municipality_code": "079",
      "region_code": "28"
    },
    "province": "Madrid",
    "is_default": false,
    "is_billing": false,
    "is_ocb": false,
    "is_shipping": true,
    "is_mailing": false,
    "_way_type": "Paseo"
  },
  {
    "country": "ES",
    "locality": "Cantimpalos",
    "_id": "65d0c22f-44bf-4cac-8605-d6146e92dfa0",
    "way_name": "Barquillo",
    "way_number": "3",
    "without_number": false,
    "way_type": "CL",
    "type": "ADDRESS",
    "alias": "El Chalet de Pueblo V2.0",
    "postal_code": "40360",
    "tags": [
      "oneClick",
      "shipping"
    ],
    "shipping_contact": {
      "given_name": "RafaelNFT",
      "surname_1": "ArranzNFT",
      "surname_2": "GómezNFT",
      "cell_phone": {
        "number": "666777888",
        "type": "CELL_PHONE"
      }
    },
    "codes": {
      "street_code": "00628878",
      "locality_code": "0000101",
      "municipality_code": "041",
      "region_code": "40"
    },
    "province": "Segovia",
    "is_default": false,
    "is_billing": false,
    "is_ocb": true,
    "is_shipping": true,
    "is_mailing": false,
    "_way_type": "Calle"
  },
  {
    "country": "ES",
    "locality": "Madrid                             ",
    "_id": "181aeb64-127c-458f-8fe1-59d069bcbf7c",
    "way_type": "CL",
    "way_name": "Alcala",
    "without_number": false,
    "way_number": "8",
    "type": "ADDRESS",
    "alias": "sdfads",
    "postal_code": "28014",
    "tags": [
      "shipping"
    ],
    "shipping_contact": {
      "given_name": "Nombre",
      "surname_1": "Primero",
      "surname_2": "Segundo",
      "cell_phone": {
        "number": "666777888",
        "type": "CELL_PHONE"
      }
    },
    "codes": {
      "street_code": "00449803",
      "locality_code": "0000101",
      "municipality_code": "079",
      "region_code": "28"
    },
    "province": "Madrid",
    "is_default": false,
    "is_billing": false,
    "is_ocb": false,
    "is_shipping": true,
    "is_mailing": false,
    "_way_type": "Calle"
  },
  {
    "country": "ES",
    "door": "8",
    "level": "3",
    "locality": "Valencia                           ",
    "stairs": "b",
    "_id": "7c10644a-68dc-45f9-bbac-741c98a0e2ac",
    "way_type": "CL",
    "way_name": "Serrería",
    "without_number": false,
    "way_number": "18",
    "type": "ADDRESS",
    "alias": "Calle Serrería",
    "postal_code": "46011",
    "tags": [
      "default",
      "billing"
    ],
    "shipping_contact": {
      "given_name": "Nombre",
      "surname_1": "Apellido",
      "surname_2": null,
      "cell_phone": {
        "number": "722507073",
        "type": "CELL_PHONE"
      }
    },
    "codes": {
      "street_code": "00755780",
      "locality_code": "0001401",
      "municipality_code": "250",
      "region_code": "46"
    },
    "province": "Valencia/valència",
    "is_default": true,
    "is_billing": true,
    "is_ocb": false,
    "is_shipping": false,
    "is_mailing": false,
    "_way_type": "Calle"
  },
  {
    "country": "ES",
    "locality": "Madrid                             ",
    "_id": "18880911-f584-4f6d-bf81-4bb7feb8b60b",
    "door": "1",
    "building": "1",
    "stairs": "1",
    "description": "adicional",
    "level": "1",
    "way_type": "CL",
    "way_name": "Orense",
    "without_number": false,
    "way_number": "43",
    "additional_info": "adicional",
    "type": "ADDRESS",
    "alias": "asdqwe",
    "postal_code": "28020",
    "shipping_contact": {
      "given_name": "Nombre",
      "surname_1": "Apellido",
      "surname_2": null,
      "cell_phone": {
        "number": "687687687",
        "type": "CELL_PHONE"
      },
      "notes": "observaciones"
    },
    "codes": {
      "street_code": "00454423",
      "locality_code": "0000101",
      "municipality_code": "079",
      "region_code": "28"
    },
    "province": "Madrid",
    "is_default": false,
    "is_billing": false,
    "is_ocb": false,
    "is_shipping": false,
    "is_mailing": false,
    "_way_type": "Calle"
  }
]

const product =          {
  "reference": "001004710441918",
  "quantity": 1,
  "amount": "322,15",
  "description": "Lavavajillas Bosch Sms40e32eu Con Aquastop",
  "sale_price": "322,15",
  "unit_price": "409",
  "origin_status": [
    {
      "status": "9000",
      "quantity": 1
    }
  ],
  "stl_prime_line_no_sg": "1",
  "stl_sub_line_no": "1",
  "quantity_unit_key": "UNITS",
  "unit_price_unit_key": "UNITS",
  "status_key": "CANCELLED",
  "quantity_unit": "unidad",
  "has_discount": false,
  "coupon_code": "",
  "display_digital_library_link": false,
  "discounts_list": [],
  "status": "canceled"
}
storiesOf('Modals/Action', module)
  .add('Modal Ok', () => ({
    data() {
      return {
        type: 'OK'
      }
    },
    template: `<modal-action-message :type="type"/>`
  }))
  .add('Modal Error', () => ({
    data() {
      return {
        type: 'ERROR'
      }
    },
    template: `<modal-action-message :type="type"/>`
  }))
  .add('Modal Warning', () => ({
    data() {
      return {
        type: 'WARNING'
      }
    },
    template: `<modal-action-message :type="type"/>`
  }))

storiesOf('Modals/Flat Rate', module)
  .add('Change flat rate type', () => ({
    template: `<modal-change-flat-rate />`
  }))
storiesOf('Modals/Tracking', module)
  .add('Seur Order not found', () => ({
    i18n: trackingi18n,
    template: `<modal-seur-now :test="true" :id="6" :delivery="{delivery_human_date: 'Hoy mismo'}" />`
  }))
  .add('Seur Now', () => ({
    i18n: trackingi18n,
    data() {
      return {
        delivery: delivery,
        address: address
      }
    },
    template: `<modal-seur-now :test="true" :delivery="delivery" :id="'1'" :external_id="'12345678'" :address="address"/>`
  }))
storiesOf('Modals/Select Address', module)
  .add('Select Address', () => ({
    i18n: trackingi18n,
    beforeMount: function() {
      console.log('BeforeMount')
      var mock = new MockAdapter(axios);
      mock
        .onGet('http://localhost:6006/api/user/es/addresses/')
        .reply(200, addresses)
    },

    template: `<modal-select-address/>`
  }))
storiesOf('Modals/Change Quantity', module)
  .add('Delete Product', () => ({
    i18n: trackingi18n,
    data() {
      return {
        product: product,
      }
    },
    template: `<modal-change-quantity :product="product"/>`
  }))
  .add('Change Quantity', () => ({
    i18n: trackingi18n,
    data() {
      return {
        product: Object.assign({},product, {quantity: 5}),
      }
    },
    template: `<modal-change-quantity :product="product"/>`
  }))
