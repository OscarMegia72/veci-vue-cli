<template>
  <icon-base :width="50" :height="50">
  <g>
    <path fill="#EAB33C" d="M22.9 37.4v-3.1h4.3v3.1h-4.3zM22.9 32.7l-1.1-20.3H28l-.9 20.3h-4.2z" />
  </g>
  <path fill="#EAB33C" class="st0" d="M25 50C11.2 50 0 38.8 0 25S11.2 0 25 0s25 11.2 25 25-11.2 25-25 25zm0-46.9C12.9 3.1 3.1 12.9 3.1 25S12.9 46.9 25 46.9 46.9 37.1 46.9 25 37.1 3.1 25 3.1z"
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