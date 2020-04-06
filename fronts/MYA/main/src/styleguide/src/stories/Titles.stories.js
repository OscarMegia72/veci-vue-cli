import { storiesOf } from '@storybook/vue';
storiesOf('Titles', module)
  .add('Main Title', () =>  ({
   template: `<v-title :tag="'h2'" :class="'_main'">Consulta de pedidos</v-title>`
  }))
  .add('Page Title', () =>  ({
    template: `<v-title :tag="'h2'" :class="'_page'">Consulta de pedidos</v-title>`
   }))