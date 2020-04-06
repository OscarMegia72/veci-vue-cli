import { storiesOf } from '@storybook/vue';
storiesOf('Link/Basic', module)
  .add('Link CTA', () =>  ({
    template: `<v-link :type="\'_cta\'">Texto de prueba</eci-button>`
  }))
storiesOf('Link/Button', module)
.add('Link Button Primary CTA', () =>  ({
  template: `<v-link :type="\'_button _primary _cta\'">Texto de prueba</v-link>`
}))
.add('Link Button Primary Warning', () =>  ({
  template: `<v-link :type="\'_button _primary _warning\'">Texto de prueba</v-link>`
}))
.add('Link Button Secondary CTA', () =>  ({
  template: `<v-link :type="\'_button _secondary _cta\'">Texto de prueba</v-link>`
  }))
.add('Link Button Secondary Warning', () =>  ({
  template: `<v-link :type="\'_button _secondary _warning\'">Texto de prueba</v-link>`
}))
.add('Link Button Terciary CTA', () =>  ({
  template: `<v-link :type="\'_button _terciary _cta\'">Texto de prueba</v-link>`
  }))
.add('Link Button Terciary Warning', () =>  ({
  template: `<v-link :type="\'_button _terciary _warning\'">Texto de prueba</v-link>`
}))
.add('Link Button Primary Icon CTA', () =>  ({
  template: `
  <v-link :type="\'_button _primary_icon _cta\'">
    <span>Texto de prueba</span>
    <span><i class="icon check"></i></span>
  </v-link>`
}))
.add('Link Button Primary Icon Warning', () =>  ({
  template: `
  <v-link :type="\'_button _primary_icon _warning\'">
    <span>Texto de prueba</span>
    <span><i class="icon check"></i></span>
  </v-link>`
}))