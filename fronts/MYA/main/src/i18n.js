import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

function loadLocaleMessages () {
  const messages = {}
  messages['es'] = require(`./locales/es.js`).default
  return messages
}

export default new VueI18n({
  locale: 'es',
  fallbackLocale: 'es',
  messages: loadLocaleMessages()
});
