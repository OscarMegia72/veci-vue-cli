<template>
  <icon-base :width="50" :height="50">
    <path class="st0" d="M18.8 40.6l-11-10.9 4.7-4.7 6.3 6.2L36 14.1l4.6 4.6z" />
    <path class="st0" d="M25 50C11.2 50 0 38.7 0 25S11.2 0 25 0s25 11.2 25 25-11.2 25-25 25zm0-46.9C12.9 3.1 3.1 12.9 3.1 25S12.9 46.9 25 46.9 46.9 37.1 46.9 25 37.1 3.1 25 3.1z"
    />
  </icon-base>
</template>

<script>
import IconBase from '../IconBase.vue';

export default {
  components: {
    'icon-base': IconBase
  }
};
</script>

<style scoped>
.st0 {
  fill: #008c2e;
}
</style>
