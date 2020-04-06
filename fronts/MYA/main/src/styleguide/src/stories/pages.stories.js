import { storiesOf } from '@storybook/vue';

storiesOf('Pages', module)
  .add('ORDERS / My Order', () =>  ({
    template: `<my-order-page :mock="\'101971962419796\'" />`
   }))
   .add('ORDERS / Order with multiple products', () =>  ({
    template: `<my-order-page :mock="\'1822510001254\'" />`
   }))
   .add('ORDERS / Food Order', () =>  ({
    template: `<my-order-page :mock="\'2018004827721\'" />`
   }))
  .add('Flat Rate', () =>  ({
    template: `<flat-rate-page  />`
   }))

   