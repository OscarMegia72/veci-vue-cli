<template>
  <div class="modal_base-viewport">
    <transition name="modal_base">
      <div class="modal_base-fog">
      </div>
    </transition>
    <transition>
      <div class="modal_base-wrapper _static">
        <div class="modal_base-body _static">
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
}
</script>

<style>

</style>