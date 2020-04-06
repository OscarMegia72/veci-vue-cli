<template>
  <div class="modal_base-viewport" :data-modaltype="type">
    <transition name="modal_base">
      <div class="modal_base-fog" @click="maskClicked">
      </div>
    </transition>
    <transition name="modal_base">
      <div class="modal_base-wrapper _message">

        <div class="modal_base-header _message" v-if="title">
          <div>
            <template v-if="type === 'OK'">
              <i-Ok  :width="'1em'" :height="'1em'"/>
            </template>
            <template v-if="type === 'INFO'">
              <i-Info  :width="'1em'" :height="'1em'"/>
            </template>
            <template v-if="type === 'WARNING'">
              <i-Warning  :width="'1em'" :height="'1em'"/>
            </template>
            <template v-if="type === 'ERROR'">
              <i-Error  :width="'1em'" :height="'1em'"/>
            </template>
          </div>
          <eci-text :tag="'h3'" :type="'_l _24 _xl-l-up'">
            {{title}}
          </eci-text>
        </div>

        <div class="modal_base-body _message" v-html="message">
        </div>

        <div class="modal_base-footer _message">
          <eci-button :type="'_primary _cta'" @click="acceptHandler">{{accept_text}}</eci-button>
          <eci-button v-if="buttons === 'OK_CANCEL'" :type="'button _terciary _warning'" @click="cancelHandler">{{cancel_text}}</eci-button>
        </div>

      </div>
    </transition>
  </div>
</template>
<script>
import ModalBase from './ModalBase.vue';
import Button from '../blocks/Button.vue';
import i_Error from '../icons/base_icons/Error.vue';
import i_Info from '../icons/base_icons/Info.vue';
import i_Ok from '../icons/base_icons/Ok.vue';
import i_Warning from '../icons/base_icons/Warning.vue';
import Text from '../blocks/Text.vue';


export default {
  extends: ModalBase,
  components: {
    'eci-button': Button,
    'i-Error': i_Error,
    'i-Info': i_Info,
    'i-Ok': i_Ok,
    'i-Warning':i_Warning,
    'eci-text': Text,
  },

  props: {
    title: {
      type: String,
      default: null
    },
    type: {
      default: 'info'
    },
    message: {
      default: 'Mensaje de la modal'
    },
    buttons: {
      default: 'OK'
    },
    accept_text: {
      default: 'Aceptar'
    },
    cancel_text: {
      default: 'Cancelar'
    }
  },

  methods : {
    acceptHandler: function () {
      this.$emit('accept')
    },
    cancelHandler: function () {
      this.$emit('cancel')
    }
  },
}
</script>
