<template functional>
  <div class="loading">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
  .loading {
      display: flex;
      min-height: 300px;
      align-items: center;
      justify-content: center;
      color: #484848;
      font-size: 12px;
      text-transform: uppercase;
  }

</style>
