import { storiesOf } from '@storybook/vue';
storiesOf('Buttons/Basic', module)
  .add('Primary CTA', () =>  ({
    template: `<eci-button :type="\'button_new _primary _cta\'">Texto de prueba</eci-button>`
  }))
  .add('Primary Warning', () =>  ({
    template: `<eci-button :type="\'button_new _primary _warning\'">Texto de prueba</eci-button>`
  }))
  .add('Secondary CTA', () =>  ({
    template: `<eci-button :type="\'button_new _secondary _cta\'">Texto de prueba</eci-button>`
    }))
  .add('Secondary Warning', () =>  ({
    template: `<eci-button :type="\'button_new _secondary _warning\'">Texto de prueba</eci-button>`
  }))
  .add('Terciary CTA', () =>  ({
    template: `<eci-button :type="\'button_new _terciary _cta\'">Texto de prueba</eci-button>`
    }))
  .add('Terciary Warning', () =>  ({
    template: `<eci-button :type="\'button_new _terciary _warning\'">Texto de prueba</eci-button>`
  }))
  .add('Primary Icon CTA', () =>  ({
    template: `
    <eci-button :type="\'button_new _primary_icon _cta\'">
      <span>Texto de prueba</span>
      <span><i class="icon check"></i></span>
    </eci-button>`
  }))
  .add('Primary Icon Warning', () =>  ({
    template: `
    <eci-button :type="\'button_new _primary_icon _warning\'">
      <span>Texto de prueba</span>
      <span><i class="icon check"></i></span>
    </eci-button>`
  }))
storiesOf('Buttons/Special', module)  
  .add('Contextual with icon up', () =>  ({
    template: `
    <eci-button :type="\'button_new _contextual_with_icon _arrow_up\'">
      <i class="icon i-geo"></i>
      <span class="_text">Texto de prueba</span>
    </eci-button>`
  }))
  .add('Contextual with icon down', () =>  ({
    template: `
    <eci-button :type="\'button_new _contextual_with_icon _arrow_down\'">
      <i class="icon i-geo"></i>
      <span class="_text">Texto de prueba</span>
    </eci-button>`
  }))
  .add('Round Button', () => ({
    template: `<round-button :icon="\'check\'" >
      Anular pedido
    </round-button>`
  }))
  .add('Round Button Disabled', () => ({
    template: `<round-button disabled :icon="\'check\'" >
      Anular pedido
    </round-button>`
  }))
  .add('Radius inline cta button', () => ({
    template: `<eci-button :type="\'button_new _radius _cta\'">
      Anular pedido
    </round-button>`
  }))
  storiesOf('Buttons/Links', module)  
  .add('Primary link', () =>  ({
    template: `
    <eci-button :type="\'button_new _link _cta\'">
      Texto de prueba
    </eci-button>`
  }))
