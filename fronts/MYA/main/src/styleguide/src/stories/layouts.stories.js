import { storiesOf } from '@storybook/vue';

storiesOf('Layouts', module)
  .add('page_header', () =>  ({
   template: `<page-header>
    <template slot="image">
      <img src="https://picsum.photos/90/90/?random" alt="">
    </template>
    <template slot="title">
      Titulo de prueba
    </template>
    <template slot="subtitle">
      Subtitulo de prueba
    </template>
   </page-header>`
  }))
  .add('Page Header Thin', () =>  ({
    template: `<page-header :class="\`thin\`">
     <template slot="image">
       <img src="https://picsum.photos/90/90/?random" alt="">
     </template>
     <template slot="title">
       Titulo de prueba
     </template>
    </page-header>`
   }))

