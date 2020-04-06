import { storiesOf } from '@storybook/vue';

storiesOf('Colors', module)
  .add('variables', () =>  ({
   template: '<eci-colors />'
}));
storiesOf('Icons', module)
  .add('icons', () =>  ({
   template: '<icons />'
}));