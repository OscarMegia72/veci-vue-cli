import { storiesOf } from '@storybook/vue';

storiesOf('Radio', module)
  .add('Simple Radio', () =>  ({
   template: `<radio :value="\'true\'">Etiqueta 1</radio>`
  }))
  .add('Simple Radio (Disabled)', () =>  ({
    template: `<radio :is_disabled="\'true\'">Etiqueta 1</radio>`
   }))
   .add('Radio Group', () =>  ({
    template: `
      <div>
        <radio :group="\'grupo\'" :custom_id="\'valor_1\'">Etiqueta 1</radio>
        <radio :group="\'grupo\'" :custom_id="\'valor_2\'">Etiqueta 1</radio>
        <radio :group="\'grupo\'" :custom_id="\'valor_3\'">Etiqueta 1</radio>
      </div>
      `
   }))