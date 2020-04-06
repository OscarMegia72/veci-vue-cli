import { storiesOf } from '@storybook/vue';
storiesOf('Fields / Search', module)
  .add('Search Orders', () =>  ({
   template: `<search :placeholder="\`Buscar pedido\`" />`
  }))
storiesOf('Fields / Stepper', module)
  .add('Simple Stepper', () =>  ({
   template: `<v-stepper
    :value="'5'"
    :min="1"
    :max="'10'"
    :integerOnly="true"
  />`
  }))

