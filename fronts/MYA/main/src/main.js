import Vue from 'vue'
import Vuex from 'vuex';
import i18n from './i18n';

//-travels
import Travels from './travels/Travels.vue'
import travelsStore from './store/travelsStore'
//-
Vue.config.productionTip = false
Vue.use(i18n);
Vue.use(Vuex);
Vue.prototype.$assets_base = 'http://localhost:8081/';
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
//-PRIMEROS PASOS PARA DESACOPLAR
//-viajes-debug-montaje
// import Viajes from './travels/Viajes.vue'
// import viajesStore from './store/viajesStore'
// if (document.getElementById("app")) {
//   new Vue({
//     i18n,
//     store: new Vuex.Store(viajesStore),
//     render(h) {
//       return h(Viajes);
//     }
//   }).$mount('#app');
// }
//================================