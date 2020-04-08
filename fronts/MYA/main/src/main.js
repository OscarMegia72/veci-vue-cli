import Vue from 'vue'
import Vuex from 'vuex';
import i18n from './i18n';

//-travels
import Travels from './travels/Travels.vue'
import TravelDetails from './travels/TravelDetails.vue'
import travelsStore from './store/travelsStore'
import travelsDetailsStore from './store/travelDetailsStore'
//-
Vue.config.productionTip = false
Vue.use(i18n);
Vue.use(Vuex);
Vue.prototype.$assets_base = 'http://localhost:8085/';
//-Carga Elemento
if (document.getElementById("app")) {
  new Vue({
      i18n,
      store: new Vuex.Store(travelsStore),
      render(h) {
        return h(Travels);
      }
  }).$mount('#app');
}
if (document.getElementById("details")) {
  new Vue({
      i18n,
      store: new Vuex.Store(travelsDetailsStore),
      render(h) {
        return h(TravelDetails);
      }
  }).$mount('#details');
}
