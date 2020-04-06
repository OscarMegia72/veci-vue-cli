<template functional>
  <svg xmlns="http://www.w3.org/2000/svg"
    :width="props.width"
    :height="props.height"
    :viewBox="`0 0 ${props.width} ${props.height}`"
    :aria-labelledby="props.iconName"
    role="presentation"
  >
    <title :id="props.iconName" lang="es">{{props.iconName}}</title>
    <g>
      <slot />
    </g>
  </svg>
</template>

<script>
export default {
  name: 'icon-base',
  props: {
    iconName: {
      type: String,
      default: 'box'
    },
    width: {
      type: [Number, String],
      default: 18
    },
    height: {
      type: [Number, String],
      default: 18
    },
    iconColor: {
      type: String,
      default: 'currentColor'
    }
  }
}
</script>
