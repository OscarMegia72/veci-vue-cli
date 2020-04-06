import { storiesOf } from '@storybook/vue';

storiesOf('Components / Pagination', module)
  .add('Pagination', () =>  ({
    template: `<pagination />`
  }))
storiesOf('Components / Discount', module)
  .add('Discount', () =>  ({
    template: `<discount :amount="\'30\'" />`
  }))
storiesOf('Components / Notifications', module)
  .add('Notification', () => ( {
  template: `
  <notification>
    <template slot="content"><p>Texto de la notificación</p></template>
  </notification>
  `
  }))
  .add('Notification Yellow', () => ( {
    template: `
    <notification :class="\'_yellow\'">
      <template slot="content">Texto de la notificación</template>
    </notification>
    `
  }))
  .add('Notification Icon', () => ( {
    template: `
    <notification :icon="\'help\'" :class="\'_yellow\'">
      <template slot="content">Texto de la notificación</template>
    </notification>
    `
  }))
  .add('Notification Action', () => ( {
    template: `
    <notification :icon="\'help\'" :class="\'_yellow\'" :action="true">
      <template slot="content">Texto de la notificación</template>
      <template slot="action"><a href="">Activar</a></template>
    </notification>
    `}))
  .add('Notification 2 lines', () => ( {
      template: `
      <notification :icon="\'help\'" :class="\'_yellow\'" :action="true">
        <template slot="content">
        <p>Algunas operaciones de este pedido no pueden ser modificadas.</p>
        <p>Para obtener cualquier aclaración contacta con nosotros por correo electrónico en clientes@elcorteinles.es</p>
        </template>
        <template slot="action"><a href="">Activar</a></template>
      </notification>
    `
  }))

storiesOf('Components / Price', module)
  .add('Price (with comma)', () =>  ({
  template: `<price :amount="\'99,99\'" size=24 />`
  }))
  .add('Price (with comma important)', () =>  ({
  template: `<price :amount="\'99,99\'" size=24 :important="true" />`
  }))
  .add('Price (Big)', () =>  ({
  template: `<price :amount="\'9999,99\'" size=24 />`
  }))
  .add('Price (Big) important', () =>  ({
  template: `<price :amount="\'9999,99\'" size=24 :important="true"  />`
  }))
  .add('Price Integer', () =>  ({
  template: `<price :amount="\'99\'" size=24 />`
  }))
  .add('Price 0', () =>  ({
  template: `<price :amount="\'0\'" size=24 />`
  }))
   
   