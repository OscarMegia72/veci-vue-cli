<template>
  <div class="flat_rate_block">
    <separator :class="'separator _type_1'" :tag="'h3'">
        Tarifa plana de Envios
    </separator>
    <div class="flat_rate_block-body">
      <div class="flat_rate_block-description">
        <ul>
          <li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g transform="translate(-308.081 -14)"><circle data-name="Ellipse 464" cx="12" cy="12" r="12" transform="translate(308.081 14)" fill="#77e4ff"/><path data-name="Path 5502" d="M314.797 26.133l2 2.205a.86.86 0 0 0 1.307 0l5.706-6.293.677-.745a.86.86 0 0 1 1.307 0l.13.143a1.1 1.1 0 0 1 0 1.446l-7.054 7.768a1.891 1.891 0 0 1-2.853 0l-2.661-2.942a1.1 1.1 0 0 1 0-1.446l.123-.136a.865.865 0 0 1 1.318 0z" fill="#fff"/></g></svg><span>Solo 14,95€ al año</span></li>
          <li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g transform="translate(-308.081 -14)"><circle data-name="Ellipse 464" cx="12" cy="12" r="12" transform="translate(308.081 14)" fill="#77e4ff"/><path data-name="Path 5502" d="M314.797 26.133l2 2.205a.86.86 0 0 0 1.307 0l5.706-6.293.677-.745a.86.86 0 0 1 1.307 0l.13.143a1.1 1.1 0 0 1 0 1.446l-7.054 7.768a1.891 1.891 0 0 1-2.853 0l-2.661-2.942a1.1 1.1 0 0 1 0-1.446l.123-.136a.865.865 0 0 1 1.318 0z" fill="#fff"/></g></svg><span>Solo 14,95€ al año</span></li>      
          <li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g transform="translate(-308.081 -14)"><circle data-name="Ellipse 464" cx="12" cy="12" r="12" transform="translate(308.081 14)" fill="#77e4ff"/><path data-name="Path 5502" d="M314.797 26.133l2 2.205a.86.86 0 0 0 1.307 0l5.706-6.293.677-.745a.86.86 0 0 1 1.307 0l.13.143a1.1 1.1 0 0 1 0 1.446l-7.054 7.768a1.891 1.891 0 0 1-2.853 0l-2.661-2.942a1.1 1.1 0 0 1 0-1.446l.123-.136a.865.865 0 0 1 1.318 0z" fill="#fff"/></g></svg><span>Solo 14,95€ al año</span></li> 
          <li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g transform="translate(-308.081 -14)"><circle data-name="Ellipse 464" cx="12" cy="12" r="12" transform="translate(308.081 14)" fill="#77e4ff"/><path data-name="Path 5502" d="M314.797 26.133l2 2.205a.86.86 0 0 0 1.307 0l5.706-6.293.677-.745a.86.86 0 0 1 1.307 0l.13.143a1.1 1.1 0 0 1 0 1.446l-7.054 7.768a1.891 1.891 0 0 1-2.853 0l-2.661-2.942a1.1 1.1 0 0 1 0-1.446l.123-.136a.865.865 0 0 1 1.318 0z" fill="#fff"/></g></svg><span>Solo 14,95€ al año</span></li>
          <li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g transform="translate(-308.081 -14)"><circle data-name="Ellipse 464" cx="12" cy="12" r="12" transform="translate(308.081 14)" fill="#77e4ff"/><path data-name="Path 5502" d="M314.797 26.133l2 2.205a.86.86 0 0 0 1.307 0l5.706-6.293.677-.745a.86.86 0 0 1 1.307 0l.13.143a1.1 1.1 0 0 1 0 1.446l-7.054 7.768a1.891 1.891 0 0 1-2.853 0l-2.661-2.942a1.1 1.1 0 0 1 0-1.446l.123-.136a.865.865 0 0 1 1.318 0z" fill="#fff"/></g></svg><span>Solo 14,95€ al año</span></li>
        </ul>
      </div>
      <div class="flat_rate_block-image">
        <stamp :width="160" :height="160" />
        <a href="">Condiciones tarifa plana</a>
      </div>
    </div>
    <buttonset :class="'flat_rate_block-buttonset _ok'">
      <template slot="ok">
        <my-button :class="'button_new _primary _cta'">CONTRATAR ESTA TARIFA PLANA</my-button>
      </template>
    </buttonset>
  </div>
</template>

<script>
import Separator from './common/Separator.vue';
import Button from './blocks/Button.vue';
import ButtonSet from './layouts/ButtonSet.vue';
import FlatRateStamp from './icons/FlatRateStamp.vue';


export default {
  components: {
    separator: Separator,
    buttonset: ButtonSet,
    'my-button': Button,
    'stamp': FlatRateStamp
  }
};
</script>

