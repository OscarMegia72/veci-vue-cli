import Vue from 'vue'
import Router from 'vue-router'
import OrderTracking from '@/pages/OrderTracking'
import PaymentMethods from '@/pages/payment_methods/PaymentMethods'
import PaymentMethodDetail from '@/pages/payment_methods/PaymentMethodDetail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/:locale([a-z]{2})?/medios-de-pago/:id',
      name: 'Payment_Methods_Detail',
      component: PaymentMethodDetail
    },
    {
      path: '/:locale([a-z]{2})?/medios-de-pago/',
      name: 'Payment_Methods',
      component: PaymentMethods
    },
    {
      path: '/:locale([a-z]{2})?/anadir-tarjeta-eci/',
      name: 'Payment_Methods',
      component: PaymentMethods
    },
    {
      path: '/:locale([a-z]{2})?/seguimiento/',
      name: 'Order_Tracking',
      component: OrderTracking
    },
    {
      path: '/:locale([a-z]{2})?/seguimiento/:order_id',
      name: 'Order_Tracking_id',
      component: OrderTracking
    }
  ]
})
