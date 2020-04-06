<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" :class="custom" >
          <div class="modal-header">
            <slot name="header">
              <button v-if="show_cross" @click="close" class="close_button">
                <i class="icon cross"></i>
              </button>
              <div class="default_header" v-if="title">
                <div>
                  <template v-if="type === 'OK'">
                    <ok></ok>
                  </template>
                  <template v-if="type === 'INFO'">
                    <info></info>
                  </template>
                  <template v-if="type === 'WARNING'">
                    <warning></warning>
                  </template>
                  <template v-if="type === 'ERROR'">
                    <error></error>
                  </template>
                </div>
                <div>
                  <h3>{{title}}</h3>
                </div>
              </div>
            </slot>
          </div>
          <div class="modal-body">
            <slot name="body">
              <div class="default_body" v-html="message"></div>
            </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <template v-if="buttons === 'OK'">
                <button-set :type="'_ok'">
                  <template slot="ok">
                    <ECI-button :type="'button _primary _cta'" @click="acceptHandler">{{accept_text}}</ECI-button>
                  </template>
                </button-set>
              </template>
              <template v-if="buttons === 'OK_CANCEL'">
                <button-set :type="'_ok_cancel'">
                  <template slot="ok">
                    <ECI-button :type="'button _primary _cta'" @click="acceptHandler">{{accept_text}}</ECI-button>
                  </template>
                  <template slot="cancel">
                    <ECI-button :type="'button _terciary _warning'" @click="cancelHandler">{{cancel_text}}</ECI-button>
                  </template>
                </button-set>
              </template>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import ButtonSet from '../layouts/ButtonSet.vue';
import Button from '../blocks/Button.vue';
import Error from '../icons/base_icons/Error.vue';
import Info from '../icons/base_icons/Info.vue';
import Ok from '../icons/base_icons/Ok.vue';
import Warning from '../icons/base_icons/Warning.vue';

export default {
  components: {
    'ECI-button': Button,
    'button-set': ButtonSet,
    'error': Error,
    'Info': Info,
    'Ok': Ok,
    'Warning':Warning
  },
  props: {
    title: {
      default: null
    },
    type: {
      default: 'info'
    },
    message: {
      default: 'Mensaje de la modal'
    },
    buttons: {
      default: 'OK_CANCEL'
    },
    close_outside: {
      default: true
    },
    accept_text: {
      default: 'Aceptar'
    },
    cancel_text: {
      default: 'Cancelar'
    },
    width: {
      default: 300
    },
    custom: {
      default: '_default'
    },
    show_cross: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    removeBodyStyle: function() {
      document.body.style.position = 'static';
      document.body.style.overflow = 'auto';
    },
    maskClicked: function () {
      if(this.close_outside){
        this.$emit('accept');
        this.$emit('close');
      }
    },
    open: function() {
      document.body.style.position = 'fixed';
      document.body.style.overflow = 'hidden';
    },
    close: function () {
      this.removeBodyStyle()
      this.$emit('close')
    },
    acceptHandler: function () {
      this.removeBodyStyle();
      this.$emit('accept')
      },
    cancelHandler: function () {
      this.removeBodyStyle()
      this.$emit('cancel')
      }
  },
  mounted: function () {
    document.addEventListener("keydown", (e) => {
      if (this.show && e.keyCode == 27) {
        this.close();
      }
    });
  }
}
</script>

<style lang="less">
  @import '../../assets/variables.less';
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
    font-family: 'Open sans';
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 100%;
    height: 100%;
    //max-width: 90vw;
    margin: 0px auto;
    padding: 1rem;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    //position: relative;
    overflow-y: auto;
    &._default{
      display: grid;
      align-items: center;
    }
    &._select_payment_methods{
      display: flex;
      flex-direction: column;
    }
  }

  .close_button {
    .reset-button();
    position: absolute;
    right: 0;
    top: 0;
    padding: 1rem;
    cursor: pointer;
    i{
      font-size: 30px;
    }
  }


  .default_header {
    display: grid;
    width: 100%;
    justify-items: center;
    grid-template-rows: auto auto;
    grid-row-gap: 1rem;

    h3{
      text-transform: uppercase;
      color: #42b983;
      font-weight: 500;
      font-size: 16px;
    }
  }

  .modal-body {
    margin: 20px 0;
    ._select_payment_methods & {
      flex: 1;
      padding: 0;
    }
  }
  .default_body {
    font-weight: 200;
    font-size: 14px;
    color: #484848;
    width: 100%;
    padding: 2rem;
    text-align: center;
  }

  .modal-default-button {
    float: right;
  }

  .iframe{
    border: none;
    outline: none;
    background: transparent;
    width: 100%;
  }

  /*
  * The following styles are auto-applied to elements with
  * transition="modal" when their visibility is toggled
  * by Vue.js.
  *
  * You can easily play with the modal transition by editing
  * these styles.
  */

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  @media only screen and (min-width: 48.0625em) {
    .modal-container {
      width: 90vw;
      max-width: 960px;
      height: initial;
      max-height: 90vh;
      padding: 2rem;
      &._default{
        max-width: 720px;
        display: flex;
        flex-direction: column;
      }
    }

    .modal-container {
      overflow-y: hidden;
    }

    .modal-body {
      overflow-y: auto;
      max-height: 70vh;
    }

    .default_body {
      font-size: 18px;
    }

    .modal_refund_summary {
      display: flex;
      flex-direction: column;
    }
  }

</style>
