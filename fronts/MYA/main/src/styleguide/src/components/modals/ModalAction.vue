<template>
  <div class="modal_base-viewport">
    <transition name="modal_base">
      <div class="modal_base-fog" @click="maskClicked">
      </div>
    </transition>
    <transition>
      <div class="modal_base-wrapper _action">
        <template v-if="has_cross">
          <div class="modal_base-header _action">
            <button v-if="has_cross" @click="close">
              <i class="icon cross"></i>
            </button>
          </div>
        </template>
        <div class="modal_base-body _action">
          <slot/>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import ModalBase from './ModalBase.vue';


export default {
  extends: ModalBase,
  props: {
    has_cross: {
      type: Boolean,
      default: true,
    }
  }
}
</script>
