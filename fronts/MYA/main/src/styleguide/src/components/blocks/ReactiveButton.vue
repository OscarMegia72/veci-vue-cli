<template>
  <button :class="['button_new',type]" :disabled="disabled" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {
    props: ['type', 'disabled'],
}
</script>