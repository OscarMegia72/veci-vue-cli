<template>
  <div>
    <div class="flat_rate_current">
      <div class="flat_rate_current-description">
        <div class="flat_rate_current-title">{{mockdata[0].flatRateSeller.items[0].description}}</div>
        <div class="flat_rate_current-subtitle">Activaste esta tarifa plana. Desde el 14 de Abril de 2018 disfrutas de 1 año de envios gratuitos*</div>
        <div class="flat_rate_current-list_container">
          <p class="flat_rate_current-list_title">Nueva tarifa plana de El Corte Inglés</p>
          <p class="flat_rate_current-price"><span>29</span><span>,95 €</span></p>
          <p class="flat_rate_current-list_subtitle">Al terminar tu periodo de tarifa plana, Las condiciones del servicio de tarifa plana pasarán a ser las siguientes:</p>
          <ul class="flat_rate_current-list">
            <li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g transform="translate(-308.081 -14)"><circle data-name="Ellipse 464" cx="12" cy="12" r="12" transform="translate(308.081 14)" fill="#77e4ff"/><path data-name="Path 5502" d="M314.797 26.133l2 2.205a.86.86 0 0 0 1.307 0l5.706-6.293.677-.745a.86.86 0 0 1 1.307 0l.13.143a1.1 1.1 0 0 1 0 1.446l-7.054 7.768a1.891 1.891 0 0 1-2.853 0l-2.661-2.942a1.1 1.1 0 0 1 0-1.446l.123-.136a.865.865 0 0 1 1.318 0z" fill="#fff"/></g></svg>Entrega gratuita a domicilio de productos de no alimentación con un importe superior a 15 €</li>
            <li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g transform="translate(-308.081 -14)"><circle data-name="Ellipse 464" cx="12" cy="12" r="12" transform="translate(308.081 14)" fill="#77e4ff"/><path data-name="Path 5502" d="M314.797 26.133l2 2.205a.86.86 0 0 0 1.307 0l5.706-6.293.677-.745a.86.86 0 0 1 1.307 0l.13.143a1.1 1.1 0 0 1 0 1.446l-7.054 7.768a1.891 1.891 0 0 1-2.853 0l-2.661-2.942a1.1 1.1 0 0 1 0-1.446l.123-.136a.865.865 0 0 1 1.318 0z" fill="#fff"/></g></svg>Entrega gratuita a domicilio de productos de alimentación con un importe superior a 100 €</li>
            <li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g transform="translate(-308.081 -14)"><circle data-name="Ellipse 464" cx="12" cy="12" r="12" transform="translate(308.081 14)" fill="#77e4ff"/><path data-name="Path 5502" d="M314.797 26.133l2 2.205a.86.86 0 0 0 1.307 0l5.706-6.293.677-.745a.86.86 0 0 1 1.307 0l.13.143a1.1 1.1 0 0 1 0 1.446l-7.054 7.768a1.891 1.891 0 0 1-2.853 0l-2.661-2.942a1.1 1.1 0 0 1 0-1.446l.123-.136a.865.865 0 0 1 1.318 0z" fill="#fff"/></g></svg>Entrega en 2 horas de productos de no alimentación con un importe superior a 40 € (Para importes superiores a 25 €, el coste sera de 3,90 €</li>
          </ul>
        </div> 
        <div class="flat_rate_current-toggle">
            <toggle :value="mockdata.renewalRequest">Renovar a esta tarifa</toggle>
        </div>    
      </div>
      <div class="flat_rate_current-image">
          <img src="https://picsum.photos/90/90/?random" alt="">
          <a :href="mockdata[0].flatRateSeller.items[0].serviceConditionsUrl">Condiciones tarifa plana</a>
      </div>
    </div>

  </div>

</template>

<script>
import Toggle from './blocks/Toggle.vue';
import mock from '../../assets/mocks/flat_rate/client_with_one_flat_rate';



export default {
  computed: {
    mockdata () {
      if(!mock) return null;
      return mock.data.flatRateCustomers.items;
    }
  },
  components: {
    'toggle': Toggle
  }
}
</script>

<style lang="less">
@import '../../assets/reset';
@import '../../assets/less/my_account/components/flat_rate_current';
</style>
