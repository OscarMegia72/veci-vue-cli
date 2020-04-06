import { storiesOf } from '@storybook/vue';
import VueI18n from 'vue-i18n';
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

storiesOf('Tiles / All Tiles', module)
  .add('Order Tile', () =>  ({
   template: `<order-tile />`
  }))
  .add('Cancel Order Tile Error', () =>  ({
    data() {
      return {
        idx: 'OPERACION Nº1',
        id: '166 3906 1376 2063 23612034 262813',
        icon: 'cross'
      }
    },
    template: `<v-cancel-tile :idx="idx" :id="id" :icon="icon" />`
   }))
   .add('Cancel Order Tile Success', () =>  ({
    data() {
      return {
        idx: 'OPERACION Nº1',
        id: '166 3906 1376 2063 23612034 262813',
        icon: 'check'
      }
    },
    template: `<v-cancel-tile :idx="idx" :id="id" :icon="icon" />`
   }))
   .add('Select Address Tile', () =>  ({
    data() {
      return {
        address: {
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
          "is_default": true,
          "is_billing": false,
          "is_ocb": false,
          "is_shipping": true,
          "is_mailing": false,
          "_way_type": "Paseo"
        }
      }
    },
    template: `<v-address-tile :address="address"/>`
   }))
   .add('InvoiceTile', () => ({
    i18n: {
      locale: 'es',
      messages: {
        es: {
          'order_detail.modals.invoices.tile.title': 'Operación de venta',
          'order_detail.modals.invoices.tile.total': 'Total'
        }
      }
    },
    data () {
      return {
        invoice:  {
          "name": "1c7a65b5-8f97-42ca-94fb-4c9a2a5d334b",
          "number": "ST 01431731/00015197",
          "order_number": "1724835000211",
          "transaction": "004 - 0143 - 0770 - 0240 - 20170905 - 083931",
          "price": "15,98",
          "status": {
            "status": "OK"
          }
        },
        invoice_2:  {
          "name": "1c7a65b5-8f97-42ca-94fb-4c9a2a5d334b",
          "number": "ST 01431731/00015197",
          "order_number": "1724835000211",
          "transaction": "004 - 0143 - 0770 - 0240 - 20170905 - 083931",
          "price": "15,98",
          "status": {
            "status": "PENDING"
          }
        },
        invoice_3:  {
          "name": "1c7a65b5-8f97-42ca-94fb-4c9a2a5d334b",
          "number": "ST 01431731/00015197",
          "order_number": "1724835000211",
          "transaction": "004 - 0143 - 0770 - 0240 - 20170905 - 083931",
          "price": "15,98",
          "status": {
            "status": "ERROR",
            "description": "Error en la generación de la factura"
          }
        },
      }
    },
    template: `<div>
    <v-invoice-tile :invoice="invoice"/>
    <v-invoice-tile :invoice="invoice_2"/>
    <v-invoice-tile :invoice="invoice_3"/>
    </div>`
   }))

storiesOf('Tiles / Product Tile')
  .add('Standar Product', () =>  ({
    i18n: trackingi18n,
    data () {
      return {
        product: product
      }
    },
    template: `<v-product-tile :product="product" />`
  }))
  .add('Editable Product', () =>  ({
    i18n: trackingi18n,
    data () {
      return {
        product: product
      }
    },
    template: `<v-product-tile :product="product" :editable="true" />`
  }))

