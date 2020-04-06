import { storiesOf } from '@storybook/vue';

storiesOf('Toggle', module)
  .add('Simple Toggle', () =>  ({
   template: `<toggle>Etiqueta 1</toggle>`
  }))
  .add('Simple Toggle (Disabled)', () =>  ({
    template: `<toggle :is_disabled="\'true\'">Etiqueta 1</toggle>`
   }))